import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { CurrentChallangeComponent } from './challanges/current-challange/current-challange.component';
import { ChallangeEditComponent } from './challanges/challange-edit/challange-edit.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        CurrentChallangeComponent,
        ChallangeEditComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
