import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
    selector: 'app-theme-switcher',
    styleUrls: ['./theme-switcher.component.scss'],
    template: `
    <label class="theme-switch">
      <span class="light">Claro</span>
      <div class="switch">
        <input type="checkbox" [checked]="currentBoolTheme()" (change)="toggleTheme(theme.checked)" #theme>
        <span class="slider"></span>
      </div>
      <span class="dark">Escuro</span>
    </label>
  `,
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
    theme: NbJSThemeOptions;
    private alive: boolean = true;

    constructor(private themeService: NbThemeService) {
    }

    ngOnInit() {
        this.themeService.getJsTheme()
            .takeWhile(() => this.alive)
            .subscribe((theme: NbJSThemeOptions) => this.theme = theme);
        if (localStorage.getItem('theme')) {
            const boolTheme = this.boolToTheme(localStorage.getItem('theme') === 'dark');
            this.themeService.changeTheme(boolTheme);
        }
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    toggleTheme(theme: boolean) {
        const boolTheme = this.boolToTheme(theme);
        localStorage.setItem('theme', theme ? 'dark' : 'csa');
        this.themeService.changeTheme(boolTheme);
    }

    currentBoolTheme() {
        return this.themeToBool(this.theme);
    }

    private themeToBool(theme: NbJSThemeOptions) {
        return theme.name === 'dark';
    }

    private boolToTheme(theme: boolean) {
        return theme ? 'dark' : 'csa';
    }
}
