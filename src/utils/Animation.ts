import { gsap, Quint } from 'gsap';

class TextFX {
  DOM: { el: Element; texts: Element[]; textsTotal: number };
  middleIdx: number;
  loopInterval: { show: number; hide: number };
  loopEndIddleTime: number;

  constructor(el: Element) {
    this.DOM = { el: el, texts: [], textsTotal: 0 };
    this.DOM.texts = Array.from(this.DOM.el.querySelectorAll('.content__text'));
    this.DOM.textsTotal = this.DOM.texts.length;
    this.middleIdx = Math.floor(this.DOM.textsTotal / 2);
    this.loopInterval = { show: 80, hide: 80 };
    this.loopEndIddleTime = this.loopInterval.show;
  }

  show({ dir = 'both', halfwayCallback = null }: { dir?: string; halfwayCallback?: (() => void) | null } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const loopHide = (pos: number): void => {
        if (this.middleIdx - pos === this.middleIdx) {
          setTimeout(resolve, this.loopEndIddleTime);
          return;
        }
        this.hideText(pos, dir);
        setTimeout(() => loopHide(pos - 1), this.loopInterval.hide);
      };

      const loopShow = (pos: number): void => {
        if (this.middleIdx - pos > this.middleIdx) {
          if (halfwayCallback && typeof halfwayCallback === 'function') {
            halfwayCallback();
          }
          loopHide(this.middleIdx);
          return;
        }
        this.showText(pos, dir);
        setTimeout(() => loopShow(pos - 1), this.loopInterval.show);
      };

      loopShow(this.middleIdx);
    });
  }

  hide({ dir = 'both', halfwayCallback = null }: { dir?: string; halfwayCallback?: (() => void) | null } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const loopHide = (pos: number): void => {
        if (this.middleIdx - pos < 0) {
          setTimeout(resolve, this.loopEndIddleTime);
          return;
        }
        this.hideText(pos, dir);
        setTimeout(() => loopHide(pos + 1), this.loopInterval.hide);
      };

      const loopShow = (pos: number): void => {
        if (this.middleIdx - pos < 0) {
          if (halfwayCallback && typeof halfwayCallback === 'function') {
            halfwayCallback();
          }
          loopHide(0);
          return;
        }
        this.showText(pos, dir);
        setTimeout(() => loopShow(pos + 1), this.loopInterval.show);
      };

      loopShow(1);
    });
  }

  hideText(pos: number, dir: string): void {
    this.toggleText('hide', pos, dir);
  }

  showText(pos: number, dir: string): void {
    this.toggleText('show', pos, dir);
  }

  toggleText(action: string, pos: number, dir: string): void {
    const changeStyle: { [key: string]: () => void } = {
      up: () => {
        (this.DOM.texts[this.middleIdx - pos] as HTMLElement).style.opacity = action === 'show' ? '1' : '0';
      },
      down: () => {
        (this.DOM.texts[this.middleIdx + pos] as HTMLElement).style.opacity = action === 'show' ? '1' : '0';
      },
    };

    if (dir === 'both') {
      changeStyle['up']();
      changeStyle['down']();
    } else {
      changeStyle[dir]();
    }
  }
}

class Slide {
  DOM: { el: Element; img: { wrap: Element; inner: Element; }; };
  textFX: TextFX;

  constructor(el: Element) {
    this.DOM = { el: el } as any;
    // Assert that the result of querySelector is not null
    const imgWrap = this.DOM.el.querySelector('.content__img');
    const imgInner = this.DOM.el.querySelector('.content__img-inner');

    if (!imgWrap || !imgInner) {
      // Handle the case where either element is not found
      throw new Error('Image elements not found');
    }

    this.DOM.img = {
      wrap: imgWrap,
      inner: imgInner,
    };

    this.textFX = new TextFX(this.DOM.el.querySelector('.content__text-wrap') ?? document.createElement('div'));
  }

  hideImage(dir: string) {
    this.toggleImage('hide', dir);
  }

  showImage(dir: string) {
    this.toggleImage('show', dir);
  }

  toggleImage(action: string, dir: string) {
    gsap.timeline().add('begin')
      .to(this.DOM.img.wrap, action === 'hide' ? 0.3 : 0.7, {
        ease: action === 'hide' ? Quint.easeOut : Quint.easeOut,
        startAt: action === 'hide' ? {} : { x: dir === 'next' ? '110%' : '-110%', opacity: 1 },
        x: action === 'hide' ? dir === 'next' ? '-110%' : '110%' : '0%',
      }, 'begin')
      .to(this.DOM.img.inner, action === 'hide' ? 0.3 : 0.7, {
        ease: action === 'hide' ? Quint.easeOut : Quint.easeOut,
        startAt: action === 'hide' ? {} : { x: dir === 'next' ? '-100%' : '100%' },
        x: action === 'hide' ? dir === 'next' ? '100%' : '-100%' : '0%',
      }, 'begin');
  }
}

export default class Slideshow {
  DOM: { el: Element };
  slides: Slide[];
  slidesTotal: number;
  current: number;
  isAnimating: boolean;
  slideshowInterval: NodeJS.Timeout | number;

  constructor(el: Element) {
    this.DOM = { el };
    this.slides = [];
    this.slidesTotal = 0;
    this.current = 0;
    this.isAnimating = false;
    this.slideshowInterval = 0;

    // @ts-ignore
    [...(this.DOM.el.querySelectorAll('.content__slide') as NodeListOf<Element>)].forEach(slide =>
      this.slides.push(new Slide(slide))
    );

    this.slidesTotal = this.slides.length;
    this.slides[this.current].DOM.el.classList.add('content__slide--current');

    this.slideshowInterval = setInterval(() => {
      if (!document.hidden) {
        this.navigate('next');
        setTimeout(() => {
          this.isAnimating = false;
        }, 2000);
      }
    }, 4000);

    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange() {
    if (document.hidden) {
      clearInterval(this.slideshowInterval);
    } else {
      this.slideshowInterval = setInterval(() => {
        if (!document.hidden) {
          this.navigate('next');
          setTimeout(() => {
            this.isAnimating = false;
          }, 2000);
        }
      }, 4000);
    }
  }

  navigate(dir: string) {
    if (this.isAnimating) {
      return false;
    }

    this.isAnimating = true;
    const currentSlide = this.slides[this.current];
    this.current = dir === 'next' ? (this.current < this.slidesTotal - 1 ? this.current + 1 : 0) : (this.current > 0 ? this.current - 1 : this.slidesTotal - 1);
    const upcomingSlide = this.slides[this.current];

    const onCurrentHalfwayCallback = () => {
      currentSlide.hideImage(dir);
      // Use 'as HTMLElement' to resolve the 'style' error
      (upcomingSlide.textFX.DOM.texts[upcomingSlide.textFX.middleIdx] as HTMLElement).style.opacity = '0';
      upcomingSlide.DOM.el.classList.add('content__slide--current');
      upcomingSlide.showImage(dir);
    };

    const onCurrentEndCallback = () => {
      currentSlide.DOM.el.classList.remove('content__slide--current');
      upcomingSlide.textFX.show().then(() => {
        this.isAnimating = false;
      });
    };

    currentSlide.textFX.hide({ halfwayCallback: onCurrentHalfwayCallback }).then(onCurrentEndCallback);
  }
}
