import React, { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../db/MessagesCollection";
import { useTracker } from "meteor/react-meteor-data";
import { Pomodoro } from "./components/Pomodoro";

const timerObject = {
  timer: 6,
  status: "stopped",
  stage: 1,
  breakTime: 2,
};

export const Room = () => {
  const [timer, setTimer] = useState(timerObject);
  const [message, setMessage] = useState("");
  
  const sendMessage = () => {
    let text = message.trim();
    Meteor.call("message.insert", text);
  };

  useEffect(() => {
    Meteor.call("user.sendTimer", timer);
  }, [timer]);

  const messages = useTracker(() => {
    const handler = Meteor.subscribe("messages");
    const usersHandler = Meteor.subscribe("users");

    if (!handler.ready()) {
      console.log("Not ready");
      return;
    }

    console.log("Ready");

    const messages = MessagesCollection.find({
      roomNumber: 1,
    }).fetch();

    messages.forEach((message) => {
      const user = Meteor.users.findOne({ _id: message.userId });
      message.username = user?.username;
    });

    return messages;
  });

  const onStart = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      status: "running",
    }));
  };

  const onStop = () => {
    setTimeout(() => {
      setTimer(timerObject);
    }, 2100);
  };

  const onPause = () => {
    setTimeout(() => {
      setTimer((prevTimer) => ({
        ...prevTimer,
        status: prevTimer.status === "running" ? "paused" : "running",
      }));
    }, 2100);
  };

  return (
    <div className="h-screen background-screen-1 flex justify-center items-center">
      <div
        className="grid w-2/3 p-10 h-[80%] gap-x-3 gap-y-3 grid-cols-3 background-screen-3 border-solid border-8
       border-blue-500 rounded-xl"
      >
        <div className="col-span-3">
          {<Pomodoro timer={timer} setTimer={setTimer} />}
        </div>
        <button onClick={onStart} className="btn btn-success col-span-1">
          <div className="badge badge-info mr-4">5</div>
          Start
        </button>
        <button onClick={onPause} className="btn btn-warning col-span-1">
          Pause
        </button>
        <button onClick={onStop} className="btn btn-error col-span-1">
          Stop
        </button>
        <div className="row-span-5 col-span-full py-3 bg-[#27309000] rounded-2xl overflow-y-scroll">
          <div>
            {messages &&
              messages.map((item) => {
                return (
                  <Card
                    key={item._id}
                    username={item.username}
                    text={item.text}
                  />
                );
              })}
          </div>
        </div>
        <div className="col-span-full grid gap-x-4 grid-cols-3">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input col-span-2 focus:bg-[#7dd4ba] bg-blue-100 text-white input-bordered input-primary"
          />
          <button
            onClick={sendMessage}
            className="btn gap-2 bg-blue-500 hover:bg-blue-700 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
