import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressRounded = ({ percentage = 70 }) => {
  let color = `rgba(62, 152, 199, 100`;

  if (percentage < 70) {
    color = 'red';
  }

  return (
    <div className="w-20 h-20">
      <CircularProgressbar
        styles={{
          path: {
            // Path color
            stroke: color,
          },
          text: {
            fill: color,
          },
        }}
        value={percentage}
        text={`${percentage}%`}
      />
    </div>
  );
};

export default ProgressRounded;
