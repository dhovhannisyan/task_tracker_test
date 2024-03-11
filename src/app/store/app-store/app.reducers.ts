import { TasksState, tasksReducer } from "../../store/tasks-store/tasks.reducers";
import { UsersState, usersReducer } from "../users-store/users.reducers";

export interface AppState {
  tasks: TasksState;
  users: UsersState;
}

export const appReducers = {
  tasks: tasksReducer,
  users: usersReducer
};
