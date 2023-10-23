type Privacy = 'PUBLIC' | 'PRIVATE';

type Status = 'PENDING' | 'COMPLETED';

type Task = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  privacy: Privacy;
  consequence: string;
  userId: string;
  circleId: string;
  username: string;
};

type NewTask = {
  title: string;
  description?: string;
  status: string;
  consequence?: string;
  public: boolean;
  dueDate: string;
  tag?: (
    | {
        label: string;
        value: string;
      }
    | undefined
  )[];
};
