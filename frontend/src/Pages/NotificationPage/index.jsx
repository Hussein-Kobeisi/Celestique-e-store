import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationItem from "../../components/NotificationItem";
import "./index.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const res = await axios.get("http://localhost:8000/api/notifications");
//       setNotifications(res.data);
//     };
  
//     fetchNotifications();
//   }, []);

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

      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          message={n.message}
          type={n.type}
          time={new Date(n.time).toLocaleDateString()}
          status={n.status}
        />
      ))}
    </div>
  );
};

export default NotificationsPage;