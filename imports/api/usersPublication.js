import { Meteor } from "meteor/meteor";

Meteor.publish("users", function publishTasks() {
  return Meteor.users.find({});
});
