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

  deleteTask(taskId: TaskIdDto) {
    const { id } = taskId;
    const index = this.tasks.findIndex((el) => {
      return id == el.id;
    });
    return this.tasks.splice(index, 1);
  }


  getTask(taskId: TaskIdDto) {
    const { id } = taskId;
    return this.tasks.find((el) => {
      return id == el.id;
    });
  }
}
