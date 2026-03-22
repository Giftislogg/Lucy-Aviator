// Push notification utilities

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const sendSignalNotification = (platform: string, time: string, signal1: string, signal2: string): void => {
  if (Notification.permission === "granted") {
    new Notification("New Signal Generated! 🎯", {
      body: `${platform}\nTime: ${time}\nSignals: ${signal1}x, ${signal2}x`,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag: "signal-notification",
      requireInteraction: false,
    });
  }
};

export const isNotificationSupported = (): boolean => {
  return "Notification" in window;
};

export const getNotificationPermission = (): NotificationPermission | null => {
  if (!isNotificationSupported()) return null;
  return Notification.permission;
};
