export type TaskType = {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  assignedTo?: string;
};

export type StatusColumnType = {
  columnLabel: string;
  columnId: string;
  tasks: TaskType[];
};

export type ProjectType = {
  projectName: string;
  projectId: string;
  projectDescription: string;
  projectImageURL: string;
  statusColumns: StatusColumnType[];
};

export type ProjectsDataSliceType = {
  projects: ProjectType[];
};

export type UserDataSliceType = {
  userEmail: string;
  password: string;
  isLoggedIn: boolean;
};
