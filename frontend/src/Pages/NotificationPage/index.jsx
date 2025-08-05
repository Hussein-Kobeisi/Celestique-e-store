import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationItem from "../../components/NotificationItem";
import "./index.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("Token:", token);
    axios.get("http://127.0.0.1:8000/api/notifications_user", {

      headers: {
        Authorization: `Bearer ${token}`,
      }})
      .then((response) => {
        console.log("Response:", response.data.payload);
        setNotifications(response.data.payload);
      })
  }, []);

  return (
    <div className="notifications-page">
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

      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          message={n.message}
          type={n.type}
          time={new Date(n.created_at).toLocaleDateString()}
          status={n.is_read ? "Read" : "Unread"}
        />
      ))}
    </div>
    </div>
  );
};

export default NotificationsPage;