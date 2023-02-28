import { Meteor } from 'meteor/meteor';

import { Messages } from '../collections/messages';

Meteor.publish('messages', function () {
  if (!this.userId) {
    return this.ready();
  }

  return Messages.find({}, {
    sort: { createdAt: 1 },
  });
});
