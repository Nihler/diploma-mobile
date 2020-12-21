import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { Subscription } from "rxjs";

import { UIService } from "./shared/ui.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    activeChallanges: string[] = [];
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        console.log("start");
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
                console.log("toggle");
            }
        });
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
    //setting up sidebar menu
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;

        this.changeDetectionRef.detectChanges();
    }

    onChallangeInput(challangeDescription: string) {
        this.activeChallanges.push(challangeDescription);
    }

    onLogout(){
        this.uiService.toggleDrawer();
    }
}
