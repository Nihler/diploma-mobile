import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    NativeScriptFormsModule,
    NativeScriptModule,
    NativeScriptHttpClientModule,
} from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { HttpClientModule } from "@angular/common/http";
//import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";

import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from './shared/shared.module';
import { ChallangesModule } from './challanges/challanges.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        ChallangesModule
    ],
    declarations: [
        AppComponent,
        AuthComponent
        //DayModalComponent, //modal do wyswietlania sciezek z danego dnia TODO
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
    //entryComponents: [DayModalComponent],
})
export class AppModule {}
