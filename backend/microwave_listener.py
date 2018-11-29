import requests
import time
import math
from pygame import mixer
import signal
import sys

cookingQueue = []
rootURL = "http://localhost:5000"

def timeStampToSeconds(timestamp):
    timeFrags = timestamp.split(":")
    return int(timeFrags[0]) * 60 + int(timeFrags[1]) - 1

def subTimeStamp(timestamp):
    totalSeconds = timeStampToSeconds(timestamp)
    if totalSeconds <= 0:
        return False
    minutes = math.floor(totalSeconds/60)
    seconds = totalSeconds % 60
    if minutes < 10:
        minutes = "0" + str(minutes)
    if seconds < 10:
        seconds = "0" + str(seconds)
    return str(minutes) + ":" + str(seconds)

def updateAPIItem(index):
    if index < 0 or index >= len(cookingQueue):
        return False
    updatedTimeStamp = subTimeStamp(cookingQueue[index]["time"])
    if updatedTimeStamp:
        cookingQueue[index]["time"] = updatedTimeStamp
        cookingQueue[index]["executed"] = True

    updatePacket = cookingQueue[index]
    updatePacket["index"] = index
    if not updatedTimeStamp:
        updatePacket["remove"] = True
    requests.post(url = rootURL + "/update", data = updatePacket)
    return updatePacket

def killHandler(signal, frame):
    mixer.quit()
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, killHandler)
    mixer.init()
    currentlyPlaying = ""
    while(True):
        cookingQueue = requests.get(rootURL).json()
        updated = updateAPIItem(0)
        if updated:
            if currentlyPlaying != cookingQueue[0]["song"]:
                currentlyPlaying = cookingQueue[0]["song"]
                mixer.music.load("../songs/{0}".format(cookingQueue[0]["song"]))
                mixer.music.play(-1)
                print("Playing {0}".format(cookingQueue[0]["song"]))
            if "remove" in updated:
                currentlyPlaying = ""
                mixer.music.stop()
                print("Stopping {0}".format(cookingQueue[0]["song"]))
        time.sleep(1)
