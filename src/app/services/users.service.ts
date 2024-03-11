import { Injectable } from '@angular/core';
import { User } from '../models/interfaces/user.interface';
import { Observable, delay, of } from 'rxjs';
import { mockUsers } from '../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  mockUsers: User[] = mockUsers;

  constructor() { }

  private get users (): User[] {
    const usersList = localStorage.getItem('users');
    if (usersList) {
      return (JSON.parse(usersList) as User[]);
    } else {
      return [];
    }
  }

  private set users (usersList: User[]) {
    localStorage.setItem('users', JSON.stringify(usersList))
  }

  // Get All Users
  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(500));
  }

  setMockUsers() {
    this.users = this.mockUsers;
  }

}
