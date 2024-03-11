import { createReducer, on } from '@ngrx/store';
import * as UsersActions  from './users.actions';
import { User } from '../../models/interfaces/user.interface';

export interface UsersState {
  loading: boolean;
  userList: User[];
}

const initialState: UsersState = {
  loading: true,
  userList: []
};

export const usersReducer = createReducer(
  initialState,
  // Get All Users
  on(UsersActions.getAllUsersStart, (state, action) => {
    return { ...state, loading: true };
  }),
  on(UsersActions.getAllUsersSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      userList: action.usersList
    };
  }),
  on(UsersActions.getAllUsersFailure, (state, action) => {
    return { ...state, loading: false };
  }),
);


