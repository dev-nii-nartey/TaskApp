import { Injectable } from '@nestjs/common';
import { TASK_STATUS, Task } from './task.model';
import { CreateTaskDto, TaskIdDto } from './dto/create-task.dto';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createtaskdto: CreateTaskDto): Task {
    const { title, description } = createtaskdto;
    const task = {
      id: uuid.v1(),
      title,
      description,
      status: TASK_STATUS.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(taskId: TaskIdDto): void {
    const { id } = taskId;
    const index = this.tasks.findIndex((el) => {
      return id == el.id;
    });
    this.tasks.splice(index, 1);
  }

  getTask(taskId: TaskIdDto):Task {
    const { id } = taskId;
    return this.tasks.find((el) => {
      return id == el.id;
    });
  }

  updateTaskStatus(element: Task, status: TASK_STATUS):Task {
    element.status = status;
    return element;
  }

  filterTasks(status: TASK_STATUS):Task[] {
    return this.tasks.filter((el) => (el.status = status));
  }
}
