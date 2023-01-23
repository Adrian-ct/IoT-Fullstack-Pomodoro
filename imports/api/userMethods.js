import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "user.signUp"(username, password) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password,
      });
    } else throw new Meteor.Error("user-exists", "User already exists!");
    const user = Accounts.findUserByUsername(username);
    return user;
  },
  "user.sendTimer"(timer) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const sTimer = JSON.stringify(timer);

    global.mqttClient.publish("pomodoro/timer", sTimer);
  },
});
