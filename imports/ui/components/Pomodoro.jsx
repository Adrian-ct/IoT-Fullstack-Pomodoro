import React, { useEffect } from "react";

const timerObject = {
  timer: 6,
  status: "stopped",
  stage: 1,
  breakTime: 2,
};

export const Pomodoro = ({ timer, setTimer }) => {
  useEffect(() => {
    let interval = null;
    let breakInterval = null;
    let sendInterval = null;

    if (timer.status === "running" && timer.timer !== 0) {
      sendInterval && clearInterval(sendInterval);

      interval = setInterval(() => {
        setTimer((prevTimer) => ({ ...prevTimer, timer: prevTimer.timer - 1 }));
      }, 1500);
    } else if (timer.status === "running" && timer.timer === 0) {
      breakInterval = setInterval(() => {
        setTimer((prevTimer) => ({ ...prevTimer, status: "break" }));
      }, 1500);
      clearInterval(interval);
    } else if (timer.status === "break" && timer.breakTime !== 0) {
      breakInterval = setInterval(() => {
        setTimer((prevTimer) => ({
          ...prevTimer,
          breakTime: prevTimer.breakTime - 1,
        }));
      }, 1500);
    } else if (timer.status === "break" && timer.breakTime === 0) {
      clearInterval(breakInterval);
      sendInterval = setInterval(() => {
        if (timer.stage === 1) {
          setTimer({
            timer: timerObject.timer,
            status: "running",
            stage: 2,
            breakTime: timerObject.breakTime,
          });
        } else if (timer.stage === 2) {
          setTimer({
            timer: timerObject.timer,
            status: "running",
            stage: 3,
            breakTime: timerObject.breakTime,
          });
        } else if (timer.stage === 3) {
          setTimer({
            timer: timerObject.timer,
            status: "running",
            stage: 4,
            breakTime: timerObject.breakTime,
          });
        } else if (timer.stage === 4) {
          setTimer({
            timer: timerObject.timer,
            status: "running",
            stage: 5,
            breakTime: timerObject.breakTime,
          });
        }
      }, 1500);
    } else if (timer.status === "paused") {
      clearInterval(interval);
      clearInterval(breakInterval);
      clearInterval(sendInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(breakInterval);
      clearInterval(sendInterval);
    };
  }, [timer, setTimer]);

  return (
    <div className="text-white flex justify-between mx-5 bg-purple-600 py-3 px-6 rounded-xl">
      <div className="text-lg">
        {Math.floor(timer.timer / 60)} minutes and {timer.timer % 60} seconds
      </div>
      <p>Stage: {timer.stage}</p>
      <p>Status: {timer.status === "running" ? "Started" : "Stopped"}</p>
      <p>Break time: {timer.breakTime}</p>
    </div>
  );
};
