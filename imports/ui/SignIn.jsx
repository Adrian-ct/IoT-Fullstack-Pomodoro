import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
//import Icon from "/imports/ui/pomybara.png";
import Icon from "./pomybara.png";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const logIn = (e) => {
    Meteor.loginWithPassword(username, password, (err, res) => {
      if (err) console.log(err.reason);
    });
  };

  const signUp = (e) => {
    Meteor.call("user.signUp", username, password, (err, res) => {
      if (err) {
        setError(err.reason);
      } else Meteor.loginWithPassword(username, password);
    });
  };

  return (
    <div className="h-screen background-screen-4 flex justify-center items-center">
      <div
        className="grid p-10 h-[70%] w-[20%] gap-y-0 gap-x-4 grid-rows-4 items-center grid-cols-4 bg-[#f5f3f5] border-solid border-4
       border-blue-500 rounded-xl"
      >
        <img
          className="w-48 h-auto object-contain col-span-4 justify-self-center"
          src={Icon}
          alt="icon"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="input input-primary bg-blue-600 text-white w-full max-w-xs col-span-4"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input input-primary bg-blue-600 text-white disabled:bg-blue-600 w-full max-w-xs col-span-4"
        />
        <div className="flex justify-around items-center col-span-4">
          <button onClick={logIn} className="btn btn-outline btn-success ">
            Log In
          </button>
          <button onClick={signUp} className="btn btn-outline btn-info ">
            Sign Up
          </button>
        </div>
        {error && (
          <div className="text-error col-span-4 justify-self-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
