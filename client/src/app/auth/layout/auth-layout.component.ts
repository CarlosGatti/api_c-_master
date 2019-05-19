import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
    selector: 'app-auth-layout',
    styleUrls: ['./auth-layout.component.scss'],
    template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
              <div style="text-align: center;">
                <img src="../../../assets/img/{{logo}}" alt="" style="max-height: 150px;margin-bottom: 10px;">
                <h2 class="title">CSA</h2>
              </div>
              <router-outlet></router-outlet>
            </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
    logo: string;
    private alive = true;

    constructor(private themeService: NbThemeService) {
    }

    ngOnInit() {
        this.themeService.getJsTheme().takeWhile(() => this.alive)
            .subscribe((theme: NbJSThemeOptions) => this.logo = theme.name === 'dark' ? 'csa-i.png' : 'csa.png');
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }
}
