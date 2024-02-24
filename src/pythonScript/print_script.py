import re
import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import win32print
import win32ui
from PIL import Image, ImageWin

PHYSICALWIDTH =110
PHYSICALHEIGHT = 111

printer_name ="HP LaserJet Pro MFP M125-M126 PCLmS"

# 'EPSON L3110 Series'
# "Hewlett-Packard HP LaserJet Pro MFP M125-M126 PCLmS"


import os

class ImageHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            print(f"File created: {event.src_path}")

    def on_modified(self, event):
        if not event.is_directory:
            print(f"File modified: {event.src_path}")

    def on_moved(self, event):
        if not event.is_directory:
            print(f"File renamed from {event.src_path} to {event.dest_path}")
       
            file_path = event.dest_path
            
                    # Check the file extension after waiting
            if file_path.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                print(f"Detected image file: {file_path}")
                print(f"Image detected: {file_path}")
                file_name=file_path

                bmp = Image.open (file_name)
                numberOfCopies = re.findall(r'\d+', file_name)
                print('num of copies',numberOfCopies[0])
                for i in range(int(numberOfCopies[0])):
                    hDC = win32ui.CreateDC ()
                    hDC.CreatePrinterDC (printer_name)

                    print('dims---------',hDC.GetDeviceCaps(PHYSICALWIDTH), hDC.GetDeviceCaps(PHYSICALHEIGHT))
                    hDC.StartDoc (file_name)
                    hDC.StartPage ()

                    dib = ImageWin.Dib (bmp)
                    dib.draw (hDC.GetHandleOutput (), (0,0,int(600*4.1*0.93),int(600*5.8*0.94)))
# (0,0,int(2480*0.93),int(3496*0.93)))
                    hDC.EndPage ()
                    hDC.EndDoc ()
                    hDC.DeleteDC ()
                    print('printing done',i)
        

                os.remove(file_name)

if __name__ == "__main__":
    
    # Specify the folder to monitor
    folder_to_monitor =  "../../../../Downloads"
    # "./images"
    # "../../../../Downloads"
    # "./images"
    # "C:\\Users\\hurri\\Downloads"
   
    event_handler = ImageHandler()
    observer = Observer()
    observer.schedule(event_handler, folder_to_monitor, recursive=True)

    print(f"Monitoring folder: {folder_to_monitor}")
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
