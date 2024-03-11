import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as UsersActions  from './store/users-store/users.actions';
import * as UsersSelectors  from './store/users-store/users.selectors';
import * as TasksActions  from './store/tasks-store/tasks.actions';
import * as TasksSelectors  from './store/tasks-store/tasks.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './store/app-store/app.reducers';
import { UsersService } from './services/users.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, first, map, of, takeUntil, takeWhile, zip } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  initialLoading$: Observable<boolean> = zip(this.store.select(UsersSelectors.loading),
                                             this.store.select(TasksSelectors.getAllTasksLoading))
                                            .pipe(
                                              map(res => res[0] || res[1]),
                                              takeWhile(result => !result[0] && !result[1]),
                                            );

  constructor(private store: Store<AppState>,
              private usersService: UsersService) {}

  ngOnInit() {
    this.setMockUsers();
    setTimeout(() => {
      this.store.dispatch(UsersActions.getAllUsersStart());
      this.store.dispatch(TasksActions.getAllTasksStart());
    }, 50);
  }

  setMockUsers() {
    this.usersService.setMockUsers();
  }

}
