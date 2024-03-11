import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/interfaces/user.interface';

@Pipe({
  name: 'fullname',
  standalone: true
})
export class FullnamePipe implements PipeTransform {

  transform(user: User): string {
    return `${user.name} ${user.lastname}`
  }

}
