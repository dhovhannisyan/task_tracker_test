import { TASK_PRIORITY } from "../enums/task-priority.enum";
import { TASK_STATUS } from "../enums/task-status.enum";
import { User } from "./user.interface";

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TASK_STATUS;
  priority: TASK_PRIORITY;
  deadline: Date;
  assignee: User;
}

