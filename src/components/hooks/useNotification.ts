'use client';
import { useEffect, useState } from 'react';

export default function useNotification() {
  const [notifications, setNotifications] = useState<UserNotification[] | []>(
    []
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications`, {
        next: {
          revalidate: 300,
        },
      });
      const body = await res.json();

      if (res.ok) {
        setNotifications(body);
      } else {
        console.log(body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { notifications };
}
