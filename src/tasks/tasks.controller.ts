import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskIdDto } from './dto/create-task.dto';

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
}
