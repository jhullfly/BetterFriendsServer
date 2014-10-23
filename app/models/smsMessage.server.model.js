'use strict';

/**
 * Module dependencies.
 */
var
  _ = require('lodash'),
  mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SmsMessageSchema = new Schema({
  phoneNumber: {
    type: String,
    match: [/[0-9]{10}/, 'phonenumber must be 10 digits no spaces']
  },
  message: {
    type:String,
    required: 'message cannot be blank'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('SmsMessage', SmsMessageSchema);
