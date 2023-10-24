type Task = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  public: boolean;
  consequence: string;
  user: {
    username: string;
    image: string;
    id: string;
    name: string;
  };
  circleId: string;
  tags: {
    name: string;
  }[];
};

type NewTask = {
  title: string;
  description?: string;
  completed: boolean;
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

type UserNotification = {
  content: string;
  createdAt: string;
  id: string;
  seen: boolean;
  type: string;
  updatedAt: string;
  userId: string;
};
