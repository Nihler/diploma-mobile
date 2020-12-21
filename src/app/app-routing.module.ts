import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthComponent } from "./auth/auth.component";
import { ChallangeEditComponent } from "./challanges/challange-edit/challange-edit.component";
import { ChallangeTabsComponent } from "./challanges/challange-tabs/challange-tabs.component";
import { CurrentChallangeComponent } from "./challanges/current-challange/current-challange.component";
import { TodayComponent } from "./challanges/today/today.component";

const routes: Routes = [
    { path: "", component: AuthComponent },
    { path: "edit", component: ChallangeEditComponent },
    {
        path: "challanges",
        component: ChallangeTabsComponent,
        children: [
            { path: "today", component: TodayComponent, outlet: 'today' },
            { path: "current", component: CurrentChallangeComponent, outlet: 'current' },
        ],
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
