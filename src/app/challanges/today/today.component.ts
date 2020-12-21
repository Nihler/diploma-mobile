import { Component, OnInit } from "@angular/core";
import * as Geolocation from "nativescript-geolocation";

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.css"],
    moduleId: module.id,
})
export class TodayComponent implements OnInit {
    constructor(
    ) {}

    ngOnInit(): void {
        // Geolocation.enableLocationRequest(true).then(() => {
        //     Geolocation.isEnabled().then((isLocationEnabled) => {
        //         console.log("result is " + isLocationEnabled);
        //         if (!isLocationEnabled) {
        //             this.needLocation = false;
        //             this.locationFailure = true;
        //             // potentially do more then just end here...
        //             return;
        //         }

        //         // MUST pass empty object!!
        //         Geolocation.getCurrentLocation({})
        //             .then((result) => {
        //                 console.log("loc result", result);
        //                 this.needLocation = false;
        //                 this.location = result;
        //             })
        //             .catch((e) => {
        //                 console.log("loc error", e);
        //             });
        //     });
        // });
    }
}
