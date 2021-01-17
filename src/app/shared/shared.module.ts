import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { ActionBarComponent } from './ui/action-bar/action-bar.component';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

@NgModule({
    imports: [NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptUISideDrawerModule],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent],
    schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule {}
