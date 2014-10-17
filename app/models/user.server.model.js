'use strict';

/**
 * Module dependencies.
 */
var
  _ = require('lodash'),
  mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for state
 */
  var validStates = ['app-unverified', 'app-unverified-havephone', 'app-verified'];
var validateState = function(state) {
  return _.contains(validStates, state);
};

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
    required: 'phoneNumber cannot be blank'
  },
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('User', UserSchema);