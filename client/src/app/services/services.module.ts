import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './user.service';
import { AddressService } from './address.service';
import { ConfigService } from './config.service';
import { PhoneService } from './phone.service';
import { ExpenseService } from './expense.service';
import { CovenantService } from './covenant.service';
import { CompanyService } from './company.service';
import { LinkService } from './link.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [],
    providers: [
        AuthService,
        AuthGuard,
        UserService,
        AddressService,
        ConfigService,
        PhoneService,
        ExpenseService,
        CovenantService,
        CompanyService,
        LinkService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class ServicesModule {
    constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
        if (parentModule) {
            throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
        }
    }
}
