import { createReducer, on } from '@ngrx/store';
import * as TasksActions  from './tasks.actions';
import { Task } from '../../models/interfaces/task.interface';
import { TaskSortData } from '../../models/interfaces/task-sort-data.interface';
import { TaskFilterData } from '../../models/interfaces/task-filter-data.interface';

export interface TasksState {
  filter: TaskFilterData;
  applyedFiltersCount: number;
  sort: TaskSortData;
  applyedSortsCount: number;
  actionTaskLoading: boolean;
  getTaskByIdLoading: boolean;
  getAllTasksLoading: boolean;
  taskList: Task[];
  selectedTask: Task;
}

const initialState: TasksState = {
  filter: {
    deadline: null,
    assignee: null,
    status: null
  },
  applyedFiltersCount: 0,
  applyedSortsCount: 0,
  sort: {
    deadline: null,
    assignee: null,
    status: null
  },
  actionTaskLoading: false,
  getTaskByIdLoading: false,
  getAllTasksLoading: true,
  taskList: [],
  selectedTask: null,
};

export const tasksReducer = createReducer(
  initialState,
  // Get All Tasks
  on(TasksActions.getAllTasksStart, (state, action) => {
    return { ...state, getAllTasksLoading: true };
  }),
  on(TasksActions.getAllTasksSuccess, (state, action) => {
    return {
      ...state,
      getAllTasksLoading: false,
      taskList: action.taskList
    };
  }),
  on(TasksActions.getAllTasksFailure, (state, action) => {
    return { ...state, getAllTasksLoading: false };
  }),
  // Add Task
  on(TasksActions.addTaskStart, (state, action) => {
    return { ...state, actionTaskLoading: true };
  }),
  on(TasksActions.addTaskSuccess, (state, action) => {
    return {
      ...state,
      actionTaskLoading: false,
      taskList: [...state.taskList, action.task]
    };
  }),
  on(TasksActions.addTaskFailure, (state, action) => {
    return { ...state, actionTaskLoading: false };
  }),
  // Get Task By ID
  on(TasksActions.getTaskByIdStart, (state, action) => {
    return { ...state, getTaskByIdLoading: true };
  }),
  on(TasksActions.getTaskByIdSuccess, (state, action) => {
    return {
      ...state,
      getTaskByIdLoading: false,
      selectedTask: action.task
    };
  }),
  on(TasksActions.getTaskByIdFailure, (state, action) => {
    return { ...state, getTaskByIdLoading: false };
  }),
  // Edit Task
  on(TasksActions.editTaskStart, (state, action) => {
    return { ...state, actionTaskLoading: true };
  }),
  on(TasksActions.editTaskSuccess, (state, action) => {
    return {
      ...state,
      actionTaskLoading: false,
      taskList: updateTaskList([...state.taskList], action.task),
      selectedTask: action.task
    };
  }),
  on(TasksActions.editTaskFailure, (state, action) => {
    return { ...state, actionTaskLoading: false };
  }),
  // Delete Task
  on(TasksActions.deleteTaskStart, (state, action) => {
    return { ...state, actionTaskLoading: true };
  }),
  on(TasksActions.deleteTaskSuccess, (state, action) => {
    return {
      ...state,
      actionTaskLoading: false,
      selectedTask: null,
      taskList: [...state.taskList.filter(t => t.id !== action.task.id)],
    };
  }),
  on(TasksActions.deleteTaskFailure, (state, action) => {
    return { ...state, actionTaskLoading: false };
  }),
  // Task Filter Applyed
  on(TasksActions.taskFilterApplyed, (state, action) => {
    return {
      ...state,
      filter: action.filter,
      selectedTask: null,
      applyedFiltersCount: calcApplyedFiltersOrSortsCount(action.filter)
    };
  }),
  // Task Sort Applyed
  on(TasksActions.taskSortApplyed, (state, action) => {
    return {
      ...state,
      sort: action.sort,
      applyedSortsCount: calcApplyedFiltersOrSortsCount(action.sort)
    };
  }),
);


function updateTaskList(taskList: Task[], task: Task) {
  const taskFound = taskList.find(t => t.id === task.id);
  const index = taskList.indexOf(taskFound);
  taskList[index] = task;
  return taskList;
}

function calcApplyedFiltersOrSortsCount(entyty: TaskSortData | TaskFilterData) {
  let count = 0;
  if (entyty.deadline) { count++ }
  if (entyty.status) { count++ }
  if (entyty.assignee) { count++ }
  return count;
}
