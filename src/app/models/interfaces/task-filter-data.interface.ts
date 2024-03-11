import { TASK_STATUS } from "../enums/task-status.enum";
import { User } from "./user.interface";

export interface TaskFilterData {
  deadline: Date;
  assignee: User;
  status: TASK_STATUS
}
