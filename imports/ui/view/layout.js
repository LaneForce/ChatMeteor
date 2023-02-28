import './layout.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';

Template.ApplicationLayout.events({
  'click .btn-logout'(e) {
    e.preventDefault();
    if (Meteor.userId()) {
      AccountsTemplates.logout();
    } else {
      AccountsTemplates.linkClick('signIn');
    }
  },
});
