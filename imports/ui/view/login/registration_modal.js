import './registration_modal.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Notifications } from 'meteor/gfk:notifications';

import { createUser } from '../../../api/methods/user-methods';

Template.RegistrationModal.events({
  'submit .registration-form'(e, t) {
    e.preventDefault();

    const { target = {} } = e;
    const {
      email: emailForm = {},
      password: passwordForm = {},
      username: usernameForm = {},
      border: borderForm = {},
      avatar: avatarForm = {}
    } = target;
    const email = (emailForm.value || '').trim();
    const password = (passwordForm.value || '').trim();
    const username = (usernameForm.value || '').trim();
    const border = (borderForm.value || '').trim();
    const avatar = (avatarForm.value || '').trim();

    if (!password) {
      Notifications.error('No password found');

      return;
    }
    t.$('[type=submit]').prop('disabled', true);

    createUser.call({
      email,
      password,
      username,
      border,
      avatar
    }, (err) => {
      if (err) {
        t.$('[type=submit]').prop('disabled', false);
        Notifications.error(err.message || err);

        return;
      }

      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          Notifications.error(err.message);

          return;
        }

        FlowRouter.go('chat', {});
      });
    });
  },
});
