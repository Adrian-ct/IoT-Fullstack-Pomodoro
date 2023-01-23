import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { MessagesCollection } from "../db/MessagesCollection";

//After creating the user, it is now seen in the whole server, because the api is on the server
//using this.userid we can access
Meteor.methods({
  "message.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    MessagesCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
      roomNumber: 1,
    });
  },
  "messages.get"() {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const messages = MessagesCollection.find({
      roomNumber: 1,
    });
    messages.forEach((message) => {
      const user = Meteor.users.findOne({ _id: message.userId });
      message.username = user.username;
    });

    return messages;
  },

  //   "tasks.remove"(taskId) {
  //     check(taskId, String);

  //     if (!this.userId) {
  //       throw new Meteor.Error("Not authorized.");
  //     }

  //     const task = MessagesCollection.findOne({
  //       _id: taskId,
  //       userId: this.userId,
  //     });

  //     if (!task) {
  //       throw new Meteor.Error("Access denied.");
  //     }

  //     MessagesCollection.remove(taskId);
  //   },

  //   "tasks.setIsChecked"(taskId, isChecked) {
  //     check(taskId, String);
  //     check(isChecked, Boolean);

  //     if (!this.userId) {
  //       throw new Meteor.Error("Not authorized.");
  //     }

  //     const task = MessagesCollection.findOne({
  //       _id: taskId,
  //       userId: this.userId,
  //     });

  //     if (!task) {
  //       throw new Meteor.Error("Access denied.");
  //     }

  //     MessagesCollection.update(taskId, {
  //       $set: {
  //         isChecked,
  //       },
  //     });
  //   },
});
