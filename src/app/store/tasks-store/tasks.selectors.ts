import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducers';

export const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getAllTasksLoading = createSelector(
  getTasksState,
  (state: TasksState) => state.getAllTasksLoading
);

export const getTaskByIdLoading = createSelector(
  getTasksState,
  (state: TasksState) => state.getTaskByIdLoading
);

export const actionTaskLoading = createSelector(
  getTasksState,
  (state: TasksState) => state.actionTaskLoading
);

export const taskList = createSelector(
  getTasksState,
  (state: TasksState) => state.taskList
);

export const selectedTask = createSelector(
  getTasksState,
  (state: TasksState) => state.selectedTask
);

export const taskFilter = createSelector(
  getTasksState,
  (state: TasksState) => state.filter
);

export const taskApplyedFiltersCount = createSelector(
  getTasksState,
  (state: TasksState) => state.applyedFiltersCount
);

export const taskSort = createSelector(
  getTasksState,
  (state: TasksState) => state.sort
);

export const taskApplyedSortsCount = createSelector(
  getTasksState,
  (state: TasksState) => state.applyedSortsCount
);
