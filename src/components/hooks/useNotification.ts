'use client';
import { useEffect, useRef, useState } from 'react';

export default function useNotification() {
  const [notifications, setNotifications] = useState<UserNotification[] | []>(
    []
  );

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    fetchNotifications();
    intervalId.current = setInterval(() => {
      fetchNotifications();
    }, 5 * 60 * 1000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications`, {
        cache: 'no-cache',
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
