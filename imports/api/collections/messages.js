import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Messages = new Mongo.Collection('messages');

const MessagesSchema = new SimpleSchema({
  _id: {
    type: String
  },
  from: {
    type: String,
  },
  message: {
    type: String,
    max: 100,
    min: 1,
  },
  reply: {
    optional: true,
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }

      if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate || this.isUpsert || this.isInsert) {
        return new Date();
      }
    },
  },
});

Messages.attachSchema(MessagesSchema);
