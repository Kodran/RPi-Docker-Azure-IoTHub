'use strict';

var iothub = require('azure-iothub');
var connectionString = 'your-azure-iothub-primaryKey-connectionString';
var registry = iothub.Registry.fromConnectionString(connectionString);
var device = new iothub.Device(null);

this.init = function(){
	
	device.deviceId = 'dockerNodejsDevice';
	registry.create(device, function(err, deviceInfo, res) {
	  if (err) {
		registry.get(device.deviceId, printDeviceInfo);
	  }
	  if (deviceInfo) {
		printDeviceInfo(err, deviceInfo, res)
	  }
	});

	function printDeviceInfo(err, deviceInfo, res) {
	  if (deviceInfo) {
		console.log('Device ID: ' + deviceInfo.deviceId);
		console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
	  }
	}
}

this.sendMessage = function(){
	var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
	var Message = require('azure-iot-device').Message;	
	var deviceConnectionString = 'your-azure-iothub-device-primaryKey-connectionString';
	var client = clientFromConnectionString(deviceConnectionString);
	
	function printResultFor(op) {
	  return function printResult(err, res) {
		if (err) console.log(op + ' error: ' + err.toString());
		if (res) console.log(op + ' status: ' + res.constructor.name);
	  };
	}
	var connectCallback = function (err) {
	  if (err) {
		console.log('Could not connect: ' + err);
	  } else {
		console.log('Client connected');

		// Create a message and send it to the IoT Hub every second
		setInterval(function(){
			           
			var data = JSON.stringify({ deviceId: 'dockerNodejsDevice', msg: "Hello azure, i'm a dockerized node.js app", date: new Date() });
			var message = new Message(data);			
			console.log("Sending message: " + message.getData());
			client.sendEvent(message, printResultFor('send'));
		}, 1000);
	  }
	};
	client.open(connectCallback);
}

this.init();
this.sendMessage();







//const express = require('express');

// Constants
//const PORT = 8080;


// App
//const app = express();
//app.get('/', function (req, res) {
//  res.send('Hello world\n');
//});

//app.listen(PORT);
//console.log('Running on http://localhost:' + PORT);
