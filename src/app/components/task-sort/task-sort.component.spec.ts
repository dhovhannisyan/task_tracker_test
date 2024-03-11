import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSortComponent } from './task-sort.component';

describe('TaskSortComponent', () => {
  let component: TaskSortComponent;
  let fixture: ComponentFixture<TaskSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
