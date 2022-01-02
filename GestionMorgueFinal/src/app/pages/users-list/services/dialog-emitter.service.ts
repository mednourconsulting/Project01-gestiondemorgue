import {Injectable} from '@angular/core';
import {Subject, Observable, of, Subscription} from 'rxjs';
import {User} from '../../../@core/backend/common/model/User';

@Injectable()
export class DialogEmitterService {
  private dialogEmitter: Subject<User> = new Subject<User>();
  constructor() {}
  emit(user: User) {
    this.dialogEmitter.next(user);
  }
  sub(): Subscription {
    return this.dialogEmitter.subscribe({
      next: (user) => console.warn(user),
    });
  }
  subject() {
    return this.dialogEmitter;
  }
}
