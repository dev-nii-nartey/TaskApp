import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TASK_STATUS } from '../task.model';

@Injectable()
export class TaskFilterValidationPipe implements PipeTransform {
  readonly state = [TASK_STATUS.DONE, TASK_STATUS.OPEN, TASK_STATUS.PROGRESS];
  transform(val: any) {
    const value = val.toUpperCase();
    const exist = this.state.indexOf(value);
    if (exist === -1) {
      throw new UnprocessableEntityException();
    }
    return value;
  }
}
