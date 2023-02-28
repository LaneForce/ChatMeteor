import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/view/chat';
import '../../../ui/view/login/registration_modal';
import '../../../ui/view/login/login_modal';

FlowRouter.route('/', {
  name: 'chat',
  title: 'Chat',
  subscriptions() {
    this.register('users', Meteor.subscribe('users'));
    this.register('messages', Meteor.subscribe('messages'));
  },
  action() {
    BlazeLayout.render('ApplicationLayout', { content: 'Chat' });
  },
});

FlowRouter.route('/sing-in', {
  name: 'signIn',
  title: 'sign-in',
  action() {
    BlazeLayout.render('ApplicationLayout', { content: 'LoginModal' });
  },
});

FlowRouter.route('/sing-up', {
  name: 'signUp',
  title: 'sign-up',
  action() {
    BlazeLayout.render('ApplicationLayout', { content: 'RegistrationModal' });
  },
});

FlowRouter.notFound = {
  action() {
    FlowRouter.go('chat');
  },
};

Tracker.autorun(() => {
  FlowRouter.watchPathChange();
  const current = FlowRouter.current();
  const routeName = current.route?.name;
  if (!routeName) {
    return;
  }

  const unAuthRoutes = ['signIn', 'signUp'];
  const userId = Meteor.userId();
  if (!(unAuthRoutes.includes(routeName) || userId)) {
    FlowRouter.go('signIn');
  }
});
