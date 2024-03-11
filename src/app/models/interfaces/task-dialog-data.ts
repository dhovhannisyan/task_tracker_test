import { TASK_DIALOG_ACTION } from "../enums/task-dialog-action.enum";
import { Task } from "./task.interface";

export interface TaskDialogData {
  action?: TASK_DIALOG_ACTION;
  task?: Task;
}
