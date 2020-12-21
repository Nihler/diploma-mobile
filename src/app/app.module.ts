import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppComponent } from "./app.component";
import { CurrentChallangeComponent } from './challanges/current-challange/current-challange.component';
import { ChallangeEditComponent } from './challanges/challange-edit/challange-edit.component';
import { AuthComponent } from './auth/auth.component';
import { TodayComponent } from './challanges/today/today.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { ChallangeTabsComponent } from './challanges/challange-tabs/challange-tabs.component'

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        CurrentChallangeComponent,
        ChallangeEditComponent,
        AuthComponent,
        TodayComponent,
        ActionBarComponent,
        ChallangeTabsComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
