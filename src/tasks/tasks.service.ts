import { Injectable } from '@nestjs/common';
import { TASK_STATUS, Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task = { title, description, status: TASK_STATUS.OPEN };
    this.tasks.push(task);
    return task;
  }
}
