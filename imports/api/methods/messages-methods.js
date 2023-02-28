import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

import { Messages } from '../collections/messages';

export const sendMessage = new ValidatedMethod({
  name: 'send.message',
  validate({ message, reply }) {
    check(message, String);
    check(reply, Match.Maybe(reply));
  },
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
  },
  run({ message, reply = '' }) {
    if (!Meteor.isServer) {
      return;
    }

    const user = Meteor.userId();

    return Messages.insert({
      from: user,
      message,
      reply,
    })
  },
});

export const deleteMessage = new ValidatedMethod({
  name: 'message.delete',
  validate({ id }) {
    check(id, String);
  },
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
  },
  run({ id }) {
    if (!Meteor.isServer) {
      return;
    }

    
    return Messages.remove(id);
  },
});
