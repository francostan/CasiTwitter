import React from "react";
import { useSelector } from "react-redux";
import "./Widgets.css";

const Widgets = () => {
  const logs = useSelector((state) => state.logs);
  return (
    <div className="widgets">
      <h2>Widgets</h2>
      {logs.map((log, i) => (
        <div key={`${log.url}-${i}`}>
          <p>
            {log.status} <small>{log.url}</small>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Widgets;
