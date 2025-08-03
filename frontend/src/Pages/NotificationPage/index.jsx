import React from "react";
// import NotificationItem from "./NotificationItem";
import "./index.css";
import NotificationItem from "../../components/NotificationItem";

const NotificationsPage = () => {
  const notifications = [
    {
      message: "You’ve got a new update! Check it out to see what’s new and exciting.",
      type: "Email",
      time: "3/10/2015",
      status: "Unread",
    },
    {
      message: "You’ve got a new update! Check it out to see what’s new and exciting.",
      type: "SMS",
      time: "3/10/2015",
      status: "Unread",
    },
    {
      message: "You’ve got a new update! Check it out to see what’s new and exciting.",
      type: "SMS",
      time: "3/10/2015",
      status: "Unread",
    },
    {
      message: "You’ve got a new update! Check it out to see what’s new and exciting.",
      type: "SMS",
      time: "3/10/2015",
      status: "Read",
    },
    // Add more dummy entries...
  ];

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="notifications-header">
  <span className="header-message">Message</span>
  <div className="header-meta">
    <span>Type</span>
    <span>Time</span>
    <span>Status</span>
  </div>
</div>
      {notifications.map((n, index) => (
        <NotificationItem key={index} {...n} />
      ))}
    </div>
  );
};

export default NotificationsPage;