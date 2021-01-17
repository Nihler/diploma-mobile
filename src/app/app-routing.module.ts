import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthComponent } from "./auth/auth.component";
import { ChallangesModule } from "../app/challanges/challanges.module";

const routes: Routes = [
    { path: "", component: AuthComponent },
    {
        path: "challanges",
        loadChildren: () => import("../app/challanges/challanges.module").then(m => m.ChallangesModule)
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
