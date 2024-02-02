import React from "react";

interface ContentTextProps {
  innerText: string;
  isFull: boolean;
  hasStroke: boolean;
  hasBottom: boolean;
}

const ContentText: React.FC<ContentTextProps> = ({ innerText, isFull, hasStroke, hasBottom }) => {
  const classNames = ["content__text"];
  if (isFull) classNames.push("content__text--full");
  if (hasStroke) classNames.push("content__text-inner--stroke");
  if (hasBottom) classNames.push("content__text-inner--bottom");

  return (
    <span className={classNames.join(" ")}>
      <span className="content__text-inner">{innerText}</span>
    </span>
  );
};

export default ContentText;
