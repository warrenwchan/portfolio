import { useState, useEffect } from "react";
import Moment from "react-moment";
import "moment-timezone";

const Time = ({ format, timeStamp }) => {
  const [date, setDate] = useState();

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <Moment format={format} tz="America/Vancouver">
      {timeStamp ? timeStamp : date}
    </Moment>
  );
};

export default Time;
