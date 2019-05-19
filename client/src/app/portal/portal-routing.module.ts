import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortalComponent } from './portal.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { UserPhonesComponent } from './user-phones/user-phones.component';
import { PhoneComponent } from './phone/phone.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseReportComponent } from './expense/expense-report/expense-report.component';
import { CompanyComponent } from './company/company.component';
import { CovenantComponent } from './covenant/covenant.component';
import { CovenantEditComponent } from './covenant/covenant-edit.component';
import { LinksComponent } from './quick-links/links.component';

const routes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: PortalComponent,
    children: [
        { path: 'home', component: HomeComponent },
        { path: 'users', component: UsersComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'profile/:me', component: ProfileComponent },
        { path: 'search', component: SearchComponent },
        { path: 'user-phones', component: UserPhonesComponent },
        { path: 'phone', component: PhoneComponent },
        { path: 'expense', component: ExpenseComponent },
        { path: 'report', component: ExpenseReportComponent },
        { path: 'companies', component: CompanyComponent },
        { path: 'covenant', component: CovenantComponent },
        { path: 'editcovenant', component: CovenantEditComponent },
        { path: 'editlinks', component: LinksComponent },
        { path: '**', redirectTo: 'home', }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortalRoutingModule {
}
