type Privacy = 'PUBLIC' | 'PRIVATE';

type Task = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  privacy: Privacy;
  consequence: string;
  userId: string;
  circleId: string;
};
