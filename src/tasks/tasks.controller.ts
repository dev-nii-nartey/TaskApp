import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskIdDto } from './dto/create-task.dto';
import { TASK_STATUS } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createtaskdto: CreateTaskDto) {
    return this.tasksService.createTask(createtaskdto);
  }

  @Delete('/:id')
  deleteTask(@Param() taskiddto: TaskIdDto) {
    return this.tasksService.deleteTask(taskiddto);
  }

  @Post('/:id')
  getTaskById(@Param() taskdto: TaskIdDto) {
    return this.tasksService.getTask(taskdto);
  }

  @Patch('/:id')
  updateTask(@Param() taskdto: TaskIdDto, @Body('status') body: TASK_STATUS) {
    console.log(body);
    const element = this.tasksService.getTask(taskdto);
    return this.tasksService.updateTaskStatus(element, body);
  }

  @Post()
  filterTasks(@Query('status') status: TASK_STATUS) {
    return this.tasksService.filterTasks(status);
  }
}
