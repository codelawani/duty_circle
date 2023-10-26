export async function getFeed(
  page: number
): Promise<{ tasks: Task[]; totalPages: number }> {
  const basePath = process.env.NEXTAUTH_URL ?? '';
  const res = await fetch(`${basePath}/api/feed?page=${page}&size=20`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('error loading feed');
  }
  return res.json();
}

export async function getNotifications(): Promise<UserNotification[]> {
  const basePath = process.env.NEXTAUTH_URL ?? '';
  const res = await fetch(`${basePath}/api/notifications`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('error loading notifications');
  }
  return res.json();
}
