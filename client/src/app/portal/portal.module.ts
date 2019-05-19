import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { UsersComponent } from './users/users.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { SearchComponent } from './search/search.component';
import { UsersTableComponent } from '../shared/users-table/users-table.component';
import { UserPhonesComponent } from './user-phones/user-phones.component';
import { PhoneComponent } from './phone/phone.component';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularEchartsModule } from 'ngx-echarts';
import { PhoneExpenseComponent } from './phone/phone-expense.component';
import { ExpenseComponent } from './expense/expense.component';
import { PhoneExpenseModalComponent } from './phone/phone-expense-modal.component';
import { StatusCardComponent } from './home/status-card/status-card.component';
import { ExpenseReportComponent } from './expense/expense-report/expense-report.component';
import { ProfileImgModalComponent } from './profile/profile-img-modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UsersSmartTableComponent } from './users/users-smart-table.component';
import { CompanyComponent } from './company/company.component';
import { EditCompanyComponent } from './company/edit-company.component';
import { CovenantComponent } from './covenant/covenant.component';
import { CovenantEditComponent } from './covenant/covenant-edit.component';
import { LinksComponent } from './quick-links/links.component';

const PAGES_COMPONENTS = [
    PortalComponent,
    UsersComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    UsersTableComponent,
    PhoneComponent,
    UserPhonesComponent,
    PhoneExpenseComponent,
    ExpenseComponent,
    StatusCardComponent,
    ExpenseReportComponent,
    UsersSmartTableComponent,
    CompanyComponent,
    EditCompanyComponent,
    CovenantComponent,
    CovenantEditComponent,
    LinksComponent
];

const MODALS_COMPONENTS = [
    PhoneExpenseModalComponent,
    ProfileImgModalComponent
];

@NgModule({
    imports: [
        PortalRoutingModule,
        ThemeModule,
        Ng2SmartTableModule,
        NgbModule,
        NgPipesModule,
        FormsModule,
        TextMaskModule,
        AngularEchartsModule,
        FileUploadModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
        ...MODALS_COMPONENTS,
    ],
    entryComponents: [
        ...MODALS_COMPONENTS,
    ]
})
export class PortalModule {
}
