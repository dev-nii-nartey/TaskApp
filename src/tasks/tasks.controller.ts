import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskIdDto } from './dto/create-task.dto';
import { TASK_STATUS, Task } from './task.model';
import { FilterDto } from './dto/filter-task.dto';
import { TaskFilterValidationPipe } from './pipes/task-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) query: FilterDto): Task[] {
    if (Object.keys(query).length) {
      return this.tasksService.filterTasks(query);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createtaskdto: CreateTaskDto): Task {
    return this.tasksService.createTask(createtaskdto);
  }

  @Delete('/:id')
  deleteTask(@Param() taskiddto: TaskIdDto): void {
    return this.tasksService.deleteTask(taskiddto);
  }

  @Post('/:id')
  getTaskById(@Param() taskdto: TaskIdDto): Task {
    return this.tasksService.getTask(taskdto);
  }

  @Patch('/:id')
  updateTask(
    @Param() taskdto: TaskIdDto,
    @Body('status', TaskFilterValidationPipe) body: TASK_STATUS,
  ): Task {
    return this.tasksService.updateTaskStatus(taskdto, body);
  }
}
