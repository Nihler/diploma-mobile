import {NgModule} from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { ChallangeTabsComponent } from './challange-tabs/challange-tabs.component';
import { TodayComponent } from './today/today.component';
import { CurrentChallangeComponent } from './current-challange/current-challange.component';
import { ChallangeEditComponent } from './challange-edit/challange-edit.component';

const routes: Routes = [ {
    path: "tabs",
    component: ChallangeTabsComponent,
    children: [
        {
            path: "today",
            component: TodayComponent,
            outlet: "today",
        },
        {
            path: "current",
            component: CurrentChallangeComponent,
            outlet: "current",
        }
    ]
},
{ path: ":mode", component: ChallangeEditComponent },
{ path: "", redirectTo: "/challanges/tabs", pathMatch: "full" },];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})

export class ChallangesRoutingModule{}
