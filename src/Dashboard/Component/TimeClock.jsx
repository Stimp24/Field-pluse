import React, { Fragment } from "react";

const TimeClock = props => {
  const { time } = props;

  return (
    <Fragment>
      <h2>{time}</h2>
    </Fragment>
  );
};

export default TimeClock;
