import React, { Component } from "react";

import "./row.css";

const Row: React.FC<{ left: JSX.Element; right: JSX.Element }> = ({
  left,
  right,
}): JSX.Element => {
  return (
    <div className="row mb2 person-details-container">
      <div className="col-md-6">{left}</div>
      <div className="col-md-6">{right}</div>
    </div>
  );
};

export default Row;
