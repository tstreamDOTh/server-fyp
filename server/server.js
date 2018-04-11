var sys = require('sys');
var http = require('http');
var router = require('./router');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client2  = mqtt.connect('mqtt://test.mosquitto.org')
var client3  = mqtt.connect('mqtt://test.mosquitto.org')
var client4  = mqtt.connect('mqtt://test.mosquitto.org')
var client5  = mqtt.connect('mqtt://test.mosquitto.org')

var temp = [];
var hum = [];
var dist = [];
var gas =[];
var noise = [];

client.on('connect', function () {
  client.subscribe('thy1')
})

client.on('message', function (topic, message) {
	client.subscribe('thy1')
  console.log(message.toString())
  if(temp.length <=10 ){
  	temp.push(message.toString().trim())
  }
  else{
  	temp.shift()
  	temp.push(message.toString().trim())
  }
})

client2.on('connect', function () {
  client2.subscribe('thy2')
})

client2.on('message', function (topic, message) {
	client2.subscribe('thy2')
  console.log(message.toString().trim())
  if(hum.length <=10 ){
  	hum.push(message.toString().trim())
  }
  else{
  	hum.shift()
  	hum.push(message.toString().trim())
  }
})

client3.on('connect', function () {
  client3.subscribe('thy3')
})

client3.on('message', function (topic, message) {
	 client3.subscribe('thy3')
  console.log(message.toString().trim())
  if(dist.length <=10 ){
  	dist.push(message.toString().trim())
  }
  else{
  	dist.shift()
  	dist.push(message.toString().trim())
  }
})

client4.on('connect', function () {
  client4.subscribe('thy5')
})

client4.on('message', function (topic, message) {
  console.log("gas - "+message.toString())
  if(gas.length <=10 ){
  	gas.push(message.toString().trim())
  }
  else{
  	gas.shift()
  	gas.push(message.toString().trim())
  }
})

client5.on('connect', function () {
  client5.subscribe('thy4')
})

client5.on('message', function (topic, message) {
  console.log(message.toString())
  if(noise.length <=10 ){
  	noise.push(message.toString().trim())
  }
  else{
  	noise.shift()
  	noise.push(message.toString().trim())
  }
})

// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
});

router.register('/temp', function(req, res) {
  var myJsonString = JSON.stringify(temp);
  res.writeHead(200, {'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
  res.end(myJsonString.trim());
});

router.register('/hum', function(req, res) {
  var myJsonString = JSON.stringify(hum);
  res.writeHead(200, {'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
  res.end(myJsonString);
});

router.register('/dist', function(req, res) {
  var myJsonString = JSON.stringify(dist);
  res.writeHead(200, {'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
  res.end(myJsonString);
});

router.register('/gas', function(req, res) {
  var myJsonString = JSON.stringify(gas);
  res.writeHead(200, {'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
  res.end(myJsonString);
});

router.register('/noise', function(req, res) {
  var myJsonString = JSON.stringify(noise);
  res.writeHead(200, {'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'});
  res.end(myJsonString);
});

// We need a server which relies on our router
var server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(3000);
console.log('Server running');
