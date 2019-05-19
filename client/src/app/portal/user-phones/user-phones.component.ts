import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-phones',
    templateUrl: 'user-phones.component.html',
    styleUrls: ['user-phones.component.sass']
})
export class UserPhonesComponent implements OnInit, OnDestroy {
    public users: User[];
    public usersFull: User[];
    private alive = true;

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
