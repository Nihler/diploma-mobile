import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";


import { ChallangesRoutingModule } from "./challanges-routing.module";

import { ChallangeTabsComponent } from "./challange-tabs/challange-tabs.component";
import { TodayComponent } from "./today/today.component";
import { CurrentChallangeComponent } from "./current-challange/current-challange.component";
import { ChallangeEditComponent } from "./challange-edit/challange-edit.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ChallangeTabsComponent,
        TodayComponent,
        CurrentChallangeComponent,
        ChallangeEditComponent
    ],
    imports: [NativeScriptCommonModule, ChallangesRoutingModule, SharedModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallangesModule {}
