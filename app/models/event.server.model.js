'use strict';

/**
 * Module dependencies.
 */
var
  _ = require('lodash'),
  mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
  when: {
    type:Date,
    require: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  invited : [{
      user: Schema.Types.ObjectId,
      name: String,
      phoneNumber: {
        type: String,
        match: [/[0-9]{10}/, 'phonenumber must be 10 digits no spaces']
      },
      message : String,
      status: {
        type: String,
        enum: {
          values: 'invited accepted-none-sent accepted-sent declined'.split(' '),
          message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
        }
      },
      invitedOn: {
        type: Date,
        required: true
      },
      invitedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      inviteCode: {
        type: String,
        select: false
      }
  }],
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Event', EventSchema);