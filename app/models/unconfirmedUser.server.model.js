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
var UnconfirmedUserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		default: '',
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
    match: [/[0-9]{10}/, 'phonenumber must be 10 digits no spaces']
  },
  confirmCode: {
    type:String,
    select: false,
    required: 'confirmCode cannot be blank'
  }
});

mongoose.model('UnconfirmedUser', UnconfirmedUserSchema);