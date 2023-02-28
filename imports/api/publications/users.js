import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find({}, {
    fields: {
      _id: 1,
      username: 1,
      border: 1,
      avatar: 1
    },
  });
});
