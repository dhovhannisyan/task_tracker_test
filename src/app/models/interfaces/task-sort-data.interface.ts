import { SORT_OPTION } from "../enums/sort-option.emum";

export interface TaskSortData {
  deadline: SORT_OPTION;
  assignee: SORT_OPTION;
  status: SORT_OPTION
}
