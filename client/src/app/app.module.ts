import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { ServicesModule } from './services/services.module';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        BrowserAnimationsModule,
        AppRoutingModule,

        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        ServicesModule,
        ToasterModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
