import { useEffect } from "react";

export function useBrowserNotification() {
  const requestPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  const sendNotification = (title: string, options: NotificationOptions) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, options);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return { sendNotification };
}
