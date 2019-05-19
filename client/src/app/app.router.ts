import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'portal', loadChildren: './portal/portal.module#PortalModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: '', redirectTo: 'portal', pathMatch: 'full' },
    { path: '**', redirectTo: 'portal' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
