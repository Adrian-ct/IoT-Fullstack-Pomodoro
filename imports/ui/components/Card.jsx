import React from "react";

export const Card = (props) => {
  return (
    <div className="message m-8 p-4 rounded-3xl text-white">
      <span className="text-green-300 italic font-bolder">
        {props.username}
      </span>
      {`: ${props.text}`}
    </div>
  );
};
