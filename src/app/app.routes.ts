import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { NoTasksComponent } from './pages/no-tasks/no-tasks.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component:  TaskListComponent,
    children: [
      { path: '', component: NoTasksComponent },
      { path: ':id', component:  TaskDetailsComponent },
      { path: '**', component: NoTasksComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent }
];
