import React from "react";
import { SignIn } from "./SignIn";
import { useTracker } from "meteor/react-meteor-data";
import { Room } from "./Room";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return <div className="w-full h-full">{user ? <Room /> : <SignIn />}</div>;
};
