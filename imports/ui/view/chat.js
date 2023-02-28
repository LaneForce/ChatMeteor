import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Notifications } from 'meteor/gfk:notifications';
import { ReactiveVar } from 'meteor/reactive-var';

import { sendMessage, deleteMessage } from '../../api/methods/messages-methods';
import { Messages } from '../../api/collections/messages';

import './chat.html';

Template.Chat.onCreated(function () {
  this.replyTo = new ReactiveVar('');
});

Template.Chat.onRendered(function () {
  setTimeout(() => $("#chat-container").animate({
    scrollTop: $('#chat-container').get(0).scrollHeight
  }, 1000), 300);
});

Template.Chat.helpers({
  isSubsReady() {
    return FlowRouter.subsReady();
  },
  getBorderUser(from){
    const user = Meteor.users.findOne(from) || {};
    var classColor;
    switch(user.border){
      case '1': 
      classColor = 'yellow'
        break;
      case '2':
        classColor = 'blue'
        break;
      case '3':
        classColor = 'green'
        break;
      default:
        classColor = ""
    }

    return classColor + '-border';
    
  },
  getAvatarUser(from){
    const user = Meteor.users.findOne(from) || {};
    return '/img/' + user.avatar;
  },
  getMessages() {
    return Messages.find().fetch();
  },
  getSenderInfo(id) {
    if (id === Meteor.userId()) {
      return 'Me';
    }

    return (Meteor.users.findOne(id) || {}).username;
  },
  isMineMessage(from) {
    return from === Meteor.userId();
  },
  isReply() {
    return Template.instance().replyTo.get();
  },
  getReliedMessage(id) {
    if (!id) {
      return;
    }

    const messageDoc = Messages.findOne(id);
    const username = (Meteor.users.findOne(messageDoc.from) || {}).username;

    return {
      username,
      message: messageDoc.message || '',
    };
  },
  getMessageToReply() {
    const messageDoc = Messages.findOne(Template.instance().replyTo.get());
    const username = (Meteor.users.findOne(messageDoc.from) || {}).username;

    return {
      username,
      message: messageDoc.message || '',
    };
  },
});

Template.Chat.events({
  'submit .chat-send-form'(e, t) {
    e.preventDefault();
    const message = (t.$('#message').val() || '').trim();
    if (!message) {
      Notifications.error('Enter message');

      return;
    }
    t.$('[type=submit]').prop('disabled', true);

    const reply = t.replyTo.get();

    sendMessage.call({ message, reply }, (err) => {
      t.$('[type=submit]').prop('disabled', false);
      if (err) {
        Notifications.error(err.message);

        return;
      }

      t.replyTo.set('');
      t.$('#message').val('');
      t.$("#chat-container").animate({
        scrollTop: $('#chat-container').get(0).scrollHeight
      }, 1000);
    });
  },
  'click #deleteMessage'(e,t){
    var id = this._id
    deleteMessage.call({ id }, (err) => {
      t.$('[type=submit]').prop('disabled', false);
      if (err) {
        Notifications.error(err.message);

        return;
      }
    })
  },
  'click .chat-message .nick-name'(e, t) {
    e.preventDefault();
    var user = Meteor.users.findOne(this.from);
    var text = t.$('#message').val();
    text = user.username + ', ' + text;
    // Template.instance().replyTo.set(Meteor.users.findOne(this.from));
  },
});
