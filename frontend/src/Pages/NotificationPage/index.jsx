import { useEffect, useState } from "react";
import axios from "axios";
import NotificationItem from "../../components/NotificationItem";
import "./index.css";
import echo from "../../components/Shared/Echo/echo";



const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const dummyUser = {
    "id": 11,
    "name": "hsne",
    "email": "axaa@kob.com",
  }

  localStorage.setItem("user", JSON.stringify(dummyUser))

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    axios.get("http://127.0.0.1:8000/api/notifications_user", {

      headers: {
        Authorization: `Bearer ${token}`,
      }})
      .then((response) => {
        setNotifications(response.data.payload);
      })


      const channel = echo.private(`notifications.${1}`)
    .listen('.notification.sent', (event) => {
        console.log('New NOTIFICATION!!!', event);
    });

      return () => {echo.leave(`notifications.${1}`)};

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

      {notifications.length == 0 && <div className="no-notifications-div">No Notifications Yet &nbsp; :(</div>}
    </div>
    </div>
  );
};

export default NotificationsPage;