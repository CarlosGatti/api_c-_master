import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { LogoutComponent } from './logout.component';

const routes: Routes = [{
    path: '',
    component: AuthLayoutComponent,
    children: [
        { path: '', component: LoginComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'password-recover', component: PasswordRecoverComponent },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {
}
