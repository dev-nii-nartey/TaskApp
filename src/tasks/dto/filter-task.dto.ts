import { TASK_STATUS } from '../task.model';

export class FilterDto {
  status?: TASK_STATUS;
  search?: string;
}
