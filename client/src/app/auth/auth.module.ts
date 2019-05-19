import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { LogoutComponent } from './logout.component';

const PAGES_COMPONENTS = [
    LoginComponent,
    AuthLayoutComponent,
    PasswordRecoverComponent,
    LogoutComponent
];

@NgModule({
    imports: [
        LoginRoutingModule,
        ThemeModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
})
export class AuthModule {
}
