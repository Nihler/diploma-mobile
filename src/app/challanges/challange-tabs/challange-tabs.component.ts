import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { ActionBarComponent } from '../../shared/ui/action-bar/action-bar.component';

@Component({
    selector: "ns-challange-tabs",
    templateUrl: "./challange-tabs.component.html",
    styleUrls: ["./challange-tabs.component.css"],
    moduleId: module.id,
})
export class ChallangeTabsComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private active: ActivatedRoute,
        private page: Page
    ) {}

    ngOnInit(): void {
        this.router.navigate(
            [
                {
                    outlets: {
                        current: ["current"],
                        today: ["today"],
                    },
                },
            ],
            {
                relativeTo: this.active,
            }
        );
        this.page.actionBarHidden = true;
    }
}
