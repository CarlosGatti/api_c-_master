import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.sass']
})
export class UsersComponent implements OnInit, OnDestroy {
    public users: User[];
    public usersFull: User[];
    private alive = true;
    isAdmin = localStorage.getItem('role') === 'admin';

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.list().takeWhile(() => this.alive).subscribe((u) => {
            this.users = u;
            this.usersFull = u;
        });
    }

    search(search: string) {
        this.users = this.usersFull.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }
}
