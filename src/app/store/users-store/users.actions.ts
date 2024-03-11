import { createAction, props } from '@ngrx/store';
import { User } from '../../models/interfaces/user.interface';

// Get All Users
export const getAllUsersStart = createAction('[Main Page] Get User List Start');
export const getAllUsersSuccess = createAction('[Main Page] Get User List Success',
                                              props<{ usersList: User[] }>());
export const getAllUsersFailure = createAction('[Main Page] Get User List Failure',
                                              props<{ error: any }>());
