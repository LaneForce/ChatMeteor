import { Meteor } from 'meteor/meteor';
import { Notifications } from 'meteor/gfk:notifications';
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Meteor.startup(function () {
  Notifications.defaultOptions.timeout = 5000;
});
