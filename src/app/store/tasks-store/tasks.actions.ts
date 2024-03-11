import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/interfaces/task.interface';
import { TaskFilterData } from '../../models/interfaces/task-filter-data.interface';
import { TaskSortData } from '../../models/interfaces/task-sort-data.interface';

// Get All Tasks
export const getAllTasksStart = createAction('[Task List Page] Get Task List Start');
export const getAllTasksSuccess = createAction('[Task List Page] Get Task List Success',
                                              props<{ taskList: Task[] }>());
export const getAllTasksFailure = createAction('[Task List Page] Get Task List Failure',
                                              props<{ error: any }>());
// Add Task
export const addTaskStart = createAction('[Add Task Page] Add Task Start',
                                              props<{ task: Task }>());
export const addTaskSuccess = createAction('[Add Task Page]Add Task Success',
                                              props<{ task: Task }>());
export const addTaskFailure = createAction('[Add Task Page] Add Task Failure',
                                              props<{ error: any }>());
// Get Task By ID
export const getTaskByIdStart = createAction('[Task Details Page] Get Task By ID Start',
                                              props<{ taskId: string }>());
export const getTaskByIdSuccess = createAction('[Task Details Page] Get Task By ID Success',
                                              props<{ task: Task }>());
export const getTaskByIdFailure = createAction('[Task Details Page] Get Task By ID Failure',
                                              props<{ error: any }>());
// Edit Task
export const editTaskStart = createAction('[Edit Task Page] Edit Task Start',
                                              props<{ task: Task }>());
export const editTaskSuccess = createAction('[Edit Task Page] Edit Task Success',
                                              props<{ task: Task }>());
export const editTaskFailure = createAction('[Edit Task Page] Edit Task Failure',
                                              props<{ error: any }>());
// Delete Task
export const deleteTaskStart = createAction('[Delete Task Page] Delete Task Start',
                                              props<{ taskId: string }>());
export const deleteTaskSuccess = createAction('[Delete Task Page] Delete Task Success',
                                              props<{ task: Task }>());
export const deleteTaskFailure = createAction('[Delete Task Page] Delete Task Failure',
                                              props<{ error: any }>());
// Task Filter Applyed
export const taskFilterApplyed = createAction('[Task List Page] Task Filter Applyed',
                                              props<{ filter: TaskFilterData }>());
// Task Sort Applyed
export const taskSortApplyed = createAction('[Task List Page] Task Sort Applyed',
                                              props<{ sort: TaskSortData }>());
// Task Sort Applyed Success
export const taskSortApplyedSuccess = createAction('[Task List Page] Task Sort Applyed Success');

