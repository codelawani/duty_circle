export async function getFeed({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<{ tasks: Task[]; totalPages: number }> {
  const basePath = process.env.NEXTAUTH_URL ?? '';
  const res = await fetch(`${basePath}/api/feed?page=${pageParam}&size=20`, {
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

export async function getTasks(): Promise<Task[]> {
  const basePath = process.env.NEXTAUTH_URL ?? '';
  const res = await fetch(`${basePath}/api/tasks`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('error loading tasks');
  }
  return res.json();
}
