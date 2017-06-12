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
			console.log('Waiting for cloud message...');
			
		  }
		}
	}

	this.readCloudToDeviceMessage = function(){
		var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
		var Message = require('azure-iot-device').Message;	
		var deviceConnectionString = 'your-iothub-deviceId-primaryKey-connectionString';
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
			client.on('message', function (msg) {
			  console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
			  client.complete(msg, printResultFor('completed'));
			});
			
		  }
		};
		client.open(connectCallback);
	}

	this.init();
	this.readCloudToDeviceMessage();
