import React from "react";

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div
      className="progress"
      style={{ width: `${progress}%` }}
    >
      <span className="progress-text">{progress}%</span>
    </div>
  </div>
);

export default ProgressBar;
