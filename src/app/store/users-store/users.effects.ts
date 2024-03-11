import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as UsersActions  from './users.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app-store/app.reducers';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    // private alertService: AlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // Get All Tasks
  getAllUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.getAllUsersStart),
    mergeMap((action) => this.usersService.getUsers()
        .pipe(
          map(data => {
            return UsersActions.getAllUsersSuccess({ usersList: data });
          }),
          catchError(err => {
            // this.notificationService.alertError(err.error.message);
            return of(UsersActions.getAllUsersFailure({ error: err.error }));
          })
        )
    ))
  );

}
