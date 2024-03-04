import React, { useState } from "react";
import Calendar from "react-calendar";

const Work = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default Work;
