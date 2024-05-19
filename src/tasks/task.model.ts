export interface Task {
  id: string;
  title: string;
  description: string;
  status: TASK_STATUS;
}

export enum TASK_STATUS {
  OPEN = 'OPEN',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}
