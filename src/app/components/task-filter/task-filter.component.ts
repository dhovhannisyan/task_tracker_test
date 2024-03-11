import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TASK_STATUS } from '../../models/enums/task-status.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as UsersSelectors  from '../../store/users-store/users.selectors';
import { Observable, first } from 'rxjs';
import { User } from '../../models/interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-store/app.reducers';
import { FullnamePipe } from '../../pipes/fullname.pipe';
import * as TasksSelectors  from '../../store/tasks-store/tasks.selectors';
import * as TasksActions  from '../../store/tasks-store/tasks.actions';
import { TaskFilterData } from '../../models/interfaces/task-filter-data.interface';


@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [
    CommonModule,
    FullnamePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFilterComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;

  users$: Observable<User[]> = this.store.select(UsersSelectors.usersList);
  filter$: Observable<TaskFilterData> = this.store.select(TasksSelectors.taskFilter);
  applyedFiltersCount$: Observable<number> = this.store.select(TasksSelectors.taskApplyedFiltersCount);

  @ViewChild('menu') matMenu: MatMenu;

  taskStatusOptions: TASK_STATUS[] = [
    TASK_STATUS.ON_TRACK,
    TASK_STATUS.OFF_TRACK,
    TASK_STATUS.AT_RISK
  ];

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,) {}

  ngOnInit() {
    this.initFilterForm();
    this.filter$.pipe(first()).subscribe(filterData => this.filterForm.patchValue(filterData));
  }

  ngAfterViewInit() {
    this.matMenu.closed.subscribe(res => {
      this.filter$.pipe(first()).subscribe(filterData => this.filterForm.patchValue(filterData));
    });
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      deadline: null,
      status: null,
      assignee: null
    })
  }

  onFilterApply() {
    const filter = this.filterForm.getRawValue();
    this.store.dispatch(TasksActions.taskFilterApplyed({ filter }))
  }

}
