# let timeFrags = command.time.split(":");
# let newTimeSeconds = parseInt(timeFrags[0]) * 60 + parseInt(timeFrags[1]) - 1;
# let minutes = Math.floor(newTimeSeconds/60);
# let seconds = newTimeSeconds % 60;
# if (minutes < 10)
#   minutes = "0" + minutes;
# if (seconds < 10)
#   seconds = "0" + seconds;
# command.time = minutes + ":" + seconds;

import requests
import time
import math

cookingQueue = []
rootURL = "http://localhost:5000"

def subTimeStamp(timestamp):
    timeFrags = timestamp.split(":")
    newTimeSeconds = int(timeFrags[0]) * 60 + int(timeFrags[1]) - 1
    if newTimeSeconds <= 0:
        return False
    minutes = math.floor(newTimeSeconds/60)
    seconds = newTimeSeconds % 60
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
    return True

if __name__ == "__main__":
    while(True):
        cookingQueue = requests.get(rootURL).json()
        if updateAPIItem(0):
            print(cookingQueue)
        time.sleep(1)