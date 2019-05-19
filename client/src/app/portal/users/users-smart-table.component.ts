import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'app-users-smart-table',
    template: `
        <ng2-smart-table
            [settings]="settings"
            [source]="source"
            (userRowSelect)="rowSelect($event)">
        </ng2-smart-table>
    `
})
export class UsersSmartTableComponent implements OnInit, OnDestroy {
    public users: User[];
    private alive = true;

    @Output() rowSelected = new EventEmitter<User>();
    settings = {
        columns: {
            name: {
                title: 'Nome',
                filter: true,
            },
            workUnit: {
                title: 'Unidade de trabalho',
                filter: true,
            },
            email: {
                title: 'Email',
                filter: true,
            },
        },
        actions: {
            columnTitle: 'Ações',
            add: false,
            edit: false,
            delete: false,
        },
        noDataMessage: 'Sem dados cadastrados.'
    };
    source: LocalDataSource;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.list().takeWhile(() => this.alive).subscribe((u) => {
            this.users = u;
            this.source = new LocalDataSource(this.users);
        });
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    rowSelect(event) {
        this.rowSelected.next(event.data);
    }
}
