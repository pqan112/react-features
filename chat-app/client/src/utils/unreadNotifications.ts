export const getUnreadNotifications = (
  notifications: Array<{ senderId: string; isRead: boolean; date: string }>
) => {
  return notifications.filter((n) => n.isRead === false);
};
