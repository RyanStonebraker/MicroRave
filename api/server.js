var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var router = express.Router();

var cookingQueue = [];

router.get('/', function (request, response) {
  response.json(cookingQueue);
});

function generateUUID (a) {
  return a ? (a^Math.random()*16>>a/4).toString(16) : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateUUID);
}

function updateFile() {
  fs.writeFile("api.txt", JSON.stringify(cookingQueue), function(err) {
    if(err)
        return console.log(err);
  });
}

router.post('/post', function (request, response) {
  let postData = request.body;

  if (!("time" in postData) || !("song" in postData)) {
    console.log("ERROR: Improperly formed posted JSON");
    response.send(cookingQueue);
    return;
  }

  let cookingData = {
    "time": postData["time"],
    "song": postData["song"],
    "executed": false,
    "uuid": generateUUID(Math.floor(Math.random() * 100))
  };

  cookingQueue.push(cookingData);
  response.send(cookingQueue);
  updateFile();
});

router.post('/update', function (request, response) {
  let postData = request.body;

  if (!("time" in postData) || !("song" in postData) || !("index" in postData) || !("executed" in postData)) {
    console.log("ERROR: Improperly formed posted JSON");
    response.send(cookingQueue);
    return;
  }

  let cookingData = {
    "time": postData["time"],
    "song": postData["song"],
    "executed": postData["executed"]
  };

  if ("remove" in postData)
    cookingQueue.splice(postData["index"], 1);
  else
    cookingQueue[postData["index"]] = cookingData;
  response.send(cookingQueue);
  updateFile();
});

app.use('/', router);
app.listen(port);
console.log("Listening on localhost:" + port);
