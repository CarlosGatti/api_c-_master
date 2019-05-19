import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
    selector: 'app-users-table',
    templateUrl: 'users-table.component.html',
    styleUrls: ['users-table.component.sass']
})
export class UsersTableComponent {
    @Input() users: User[];

    constructor() {
    }

    trackUser(index: any, user: User): string | void {
        return user ? user.id : undefined;
    }
}
