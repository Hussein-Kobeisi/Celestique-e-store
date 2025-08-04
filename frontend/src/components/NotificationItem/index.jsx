import React from "react";
import "./index.css";

const NotificationItem = ({ message, type, time, status }) => {
  return (
    <div className={`notification-row ${status === "Unread" ? "unread" : ""}`}>
      <div className="notification-message">{message}</div>
      <div className="notification-type">{type}</div>
      <div className="notification-time">{time}</div>
      <div className={`notification-status ${status.toLowerCase()}`}>{status}</div>
    </div>
  );
};

export default NotificationItem;