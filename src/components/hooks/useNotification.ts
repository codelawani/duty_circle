'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useNotification() {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/notifications`
      );
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { notifications };
}
