import { Component, OnDestroy, OnInit } from '@angular/core';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import { NbSearchService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sample-layout',
    styleUrls: ['./base.layout.scss'],
    template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <app-header></app-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                  tag="menu-sidebar"
                  responsive
                  state="compacted">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnInit, OnDestroy {
    private alive = true;

    constructor(private searchService: NbSearchService,
                private router: Router) {

    }

    ngOnInit() {
        this.searchService.onSearchSubmit()
            .takeWhile(() => this.alive)
            .subscribe((s) =>
                this.router.navigate(['/portal/search'], { queryParams: { q: s.term } }).catch()
            );
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }
}
