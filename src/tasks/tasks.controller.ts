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
import { FilterDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() query: FilterDto) {
    if (Object.keys(query).length) {
      return this.tasksService.filterTasks(query);
    } else {
      return this.tasksService.getAllTasks();
    }
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
    const element = this.tasksService.getTask(taskdto);
    return this.tasksService.updateTaskStatus(element, body);
  }

}
