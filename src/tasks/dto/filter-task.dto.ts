import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TASK_STATUS } from '../task.model';

export class FilterDto {
  @IsOptional()
  @IsIn([TASK_STATUS.DONE, TASK_STATUS.OPEN, TASK_STATUS.PROGRESS])
  status: TASK_STATUS;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
