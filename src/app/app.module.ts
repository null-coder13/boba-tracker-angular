import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips'
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from './error-snack-bar/error-snack-bar.component';
import { SuccessSnackBarComponent } from './success-snack-bar/success-snack-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        ErrorSnackBarComponent,
        SuccessSnackBarComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSnackBarModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
