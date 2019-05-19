import { Component, OnDestroy, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    userMenu = [
        { title: 'Perfil', link: '/portal/profile/me' },
        { title: 'Sair', link: '/auth/logout' }
    ];
    logo: string;
    user: User;
    private alive = true;

    constructor(private sidebarService: NbSidebarService,
                private menuService: NbMenuService,
                private themeService: NbThemeService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.themeService.getJsTheme()
            .takeWhile(() => this.alive)
            .subscribe((theme: NbJSThemeOptions) => {
                this.logo = theme.name === 'dark' ? 'csa-i.png' : 'csa.png';
            });
        this.userService.get(localStorage.getItem('userId'))
            .takeWhile(() => this.alive)
            .subscribe(x => {
                this.user = x;
            });
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }
}
