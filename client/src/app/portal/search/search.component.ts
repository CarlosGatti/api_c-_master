import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';

@Component({
    selector: 'app-home',
    template: `
    <nb-card *ngIf="users && users.length > 0">
      <nb-card-header>
        <span>Usuarios com o nome parecidos com a pequisa "{{search}}"</span>
      </nb-card-header>
      <nb-card-body>
        <app-users-table [users]="users"></app-users-table>
      </nb-card-body>
    </nb-card>
  `
})
export class SearchComponent implements OnInit, OnDestroy {
    public search: string;
    public users: User[];
    private alive = true;

    constructor(private activatedRoute: ActivatedRoute,
                private userService: UserService) {

    }

    ngOnInit() {
        this.activatedRoute.queryParams
            .takeWhile(() => this.alive)
            .subscribe(params => {
                this.search = params['q'];
                if (this.search) {
                    this.searchForUser();
                }
            });
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    searchForUser() {
        this.userService.list()
            .takeWhile(() => this.alive)
            .subscribe((u) => {
                this.users = u.filter(x => x.name && x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
            });
    }
}
