var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

router.post('/post', function (request, response) {
  let postData = request.body;

  if (!("time" in postData) || !("song" in postData)) {
    console.log("ERROR: Improperly formed posted JSON");
    response.send(cookingQueue);
    return;
  }

  let cookingData = {
    "time": postData["time"],
    "song": postData["song"]
  };

  cookingQueue.push(cookingData);
  response.send(cookingQueue);
});

app.use('/', router);
app.listen(port);
console.log("Listening on localhost:" + port);
