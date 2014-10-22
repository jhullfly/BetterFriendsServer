'use strict';

/**
 * Module dependencies.
 */
var
  _ = require('lodash'),
  mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
    required: 'name cannot be blank'
	},
  uuid: {
    type: String,
    trim: true,
    unique: true,
    required: 'uuid cannot be blank'
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    match: [/[0-9]{10}/, 'phonenumber must be 10 digits no spaces']
  },
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('User', UserSchema);