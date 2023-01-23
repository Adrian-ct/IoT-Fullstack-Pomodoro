import { Meteor } from "meteor/meteor";
import "../imports/api/userMethods";
import "../imports/api/messagesMethods";
import "../imports/api/messagesPublication";
import "../imports/api/usersPublication";
import mqtt from "mqtt";

Meteor.startup(() => {
  global.mqttClient = mqtt.connect("mqtt://localhost:1883");
});
