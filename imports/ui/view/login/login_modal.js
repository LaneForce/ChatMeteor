import './login_modal.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Notifications } from 'meteor/gfk:notifications';

Template.LoginModal.events({
  'submit .login-form'(e, t) {
    e.preventDefault();
    t.$('[type=submit]').prop('disabled', true);

    const { target = {} } = e;
    const { email: emailForm = {}, password: passwordForm = {} } = target;
    const email = (emailForm.value || '').trim();
    const password = (passwordForm.value || '').trim();

    Meteor.loginWithPassword(email, password, (err) => {
      t.$('[type=submit]').prop('disabled', false);

      if (err) {
        Notifications.error('Invalid email or password');

        return;
      }

      FlowRouter.go('chat', {});
    });
  },
});
