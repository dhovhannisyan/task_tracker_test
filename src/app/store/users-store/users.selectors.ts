import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducers';

export const getUsersState = createFeatureSelector<UsersState>('users');

export const loading = createSelector(
  getUsersState,
  (state: UsersState) => state.loading
);

export const usersList = createSelector(
  getUsersState,
  (state: UsersState) => state.userList
);
