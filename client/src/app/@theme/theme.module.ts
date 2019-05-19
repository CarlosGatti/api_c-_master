import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    NbActionsModule,
    NbCardModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
} from '@nebular/theme';

import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CSA_THEME } from './styles/theme.csa';
import { HeaderComponent } from './components/header/header.component';
import { SampleLayoutComponent } from './layouts/base.layout';
import { DARK_THEME } from './styles/theme.dark';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { LoaderComponent } from './components/loader.component';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbCheckboxModule,
    NgbModule,
];

const COMPONENTS = [
    HeaderComponent,
    SampleLayoutComponent,
    ThemeSwitcherComponent,
    LoaderComponent
];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
        {
            name: 'csa',
        },
        [DEFAULT_THEME, COSMIC_THEME, CSA_THEME, DARK_THEME],
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
];

@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES],
    exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS],
    declarations: [...COMPONENTS],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        };
    }
}
