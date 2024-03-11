import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-no-tasks',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './no-tasks.component.html',
  styleUrl: './no-tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoTasksComponent {

}
