export interface Task {
  //   id: number;
  title: string;
  description: string;
  status: TASK_STATUS;
}

export enum TASK_STATUS {
  OPEN,
  PROGRESS,
  DONE,
}
