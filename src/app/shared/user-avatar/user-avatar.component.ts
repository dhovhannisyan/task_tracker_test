import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/interfaces/user.interface';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {

  @Input() user: User;

  constructor() {}

  ngOnInit() {

  }

}
