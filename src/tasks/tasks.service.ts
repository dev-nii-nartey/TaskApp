import { BadRequestException, Injectable } from '@nestjs/common';
import { TASK_STATUS, Task } from './task.model';
import { CreateTaskDto, TaskIdDto } from './dto/create-task.dto';
import * as uuid from 'uuid';
import { FilterDto } from './dto/filter-task.dto';

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
    const task = this.getTask(taskId);
    this.tasks = this.tasks.filter((el) => el.id !== task.id);
  }

  getTask(taskId: TaskIdDto): Task {
    const { id } = taskId;
    const task = this.tasks.find((el) => {
      return id == el.id;
    });
    if (!task) {
      throw new BadRequestException(`Task with id ${id} doesnt exist`);
    }
    return task;
  }

  updateTaskStatus(id: TaskIdDto, status: TASK_STATUS): Task {
    const task = this.getTask(id);
    task.status = status;
    return task;
  }

  filterTasks(query: FilterDto): Task[] {
    const { status, search } = query;
    let task: Task[] = [...this.tasks];
    if (status) {
      task = this.tasks.filter((task) => task.status === status.toUpperCase());
    }
    if (search) {
      task = this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return task;
  }
}
