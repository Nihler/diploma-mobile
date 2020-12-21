import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "ns-challange-tabs",
    templateUrl: "./challange-tabs.component.html",
    styleUrls: ["./challange-tabs.component.css"],
    moduleId: module.id,
})
export class ChallangeTabsComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private active: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.router.navigate(
            [
                {
                    outlets: {
                        currentChallange: ["current-challange"],
                        today: ["today"],
                    },
                },
            ],
            {
                relativeTo: this.active,
            }
        );


        
    }
}
