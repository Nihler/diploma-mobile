import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Accuracy } from "@nativescript/core/ui/enums";

import * as Geolocation from "nativescript-Geolocation";
import { AuthService } from "../../auth/auth.service";
import { TodayService } from "./today.service";
import {
    MapView,
    Marker,
    Polyline,
    Position,
} from "nativescript-google-maps-sdk";
import { first } from "rxjs/operators";

registerElement("MapView", () => MapView);

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.css"],
    moduleId: module.id,
})
export class TodayComponent implements OnInit, AfterViewInit {
    locations = [];
    watchIds = [];
    public latitude: number;
    public longitude: number;
    zoom = 19;
    minZoom = 12;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    public watchId: number;
    polyline: Polyline;
    runStart = false;
    distance;
    currentSpeed;
    startMap=false;
    lastCamera: String;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private todayService: TodayService
    ) {
        this.distance = 0;
        this.currentSpeed = 0;
        this.latitude=0;
        this.longitude=0;
    }

    ngOnInit(): void {
        this.enableLocationTap();
        this.buttonGetLocationTap();
    }

    ngAfterViewInit(): void {
        this.startMap = true;
    }

    public enableLocationTap() {
        Geolocation.isEnabled().then(
            function (isEnabled) {
                if (!isEnabled) {
                    Geolocation.enableLocationRequest(true, true)
                        .then(
                            () => {
                                console.log("User Enabled Location Service");
                            },
                            (e) => {
                                console.log("Error: " + (e.message || e));
                            }
                        )
                        .catch((ex) => {
                            console.log("Unable to Enable Location", ex);
                        });
                }
            },
            function (e) {
                console.log("Error: " + (e.message || e));
            }
        );
    }

    public buttonGetLocationTap() {
        let that = this;
        Geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000,
        }).then(
            function (loc) {
                if (loc) {
                    that.updateLocations(loc).then((res) => {
                        if (res) {
                            let marker = new Marker();
                            marker.position = Position.positionFromLatLng(
                                that.latitude,
                                that.longitude
                            );
                            marker.userData = { index: 1 };
                            that.mapView.addMarker(marker);
                        }
                    });
                }
            },
            function (e) {
                console.log("Error: " + (e.message || e));
            }
        );
    }

    private async updateLocations(location: any): Promise<boolean> {
        try {
            this.longitude = location.longitude;
            this.latitude = location.latitude;
            if (this.locations.length > 1) {
                this.distance += Geolocation.distance(
                    location,
                    this.locations[this.locations.length - 1]
                );
                this.currentSpeed = location.speed;
            }
            this.locations.push(location);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public buttonStartTap() {
        try {
            let that = this;
            this.runStart=true;
            this.watchIds.push(
                Geolocation.watchLocation(
                    function (loc) {
                        if (loc) {
                            that.updateLocations(loc)
                                .then((result) => {
                                    if (result)
                                        that.polyline.addPoint(
                                            Position.positionFromLatLng(
                                                that.latitude,
                                                that.longitude
                                            )
                                        );
                                })
                                .then(() => {
                                    that.mapView.addPolyline(that.polyline);
                                });
                            // that.latitude    = loc.latitude;
                            // that.longitude = loc.longitude;
                            // that.locations.push(loc);
                            // console.log(that.locations);
                        }
                    },
                    function (e) {
                        console.log("Error: " + e.message);
                    },
                    {
                        desiredAccuracy: Accuracy.high,
                        updateDistance: 10,
                        updateTime: 3000,
                        minimumUpdateTime: 300,
                    }
                )
            );
        } catch (ex) {
            console.log("Error: " + ex.message);
        }
    }

    public buttonStopTap() {
        this.runStart=false;
        let watchId = this.watchIds.pop();
        while (watchId != null) {
            Geolocation.clearWatch(watchId);
            watchId = this.watchIds.pop();
        }
        // const options = this.createRequestOptions();
        //const locations = this.locations;
        console.log(this.locations);

        this.authService.user.subscribe((data) => {
            console.log(data);

            this.todayService.sendPath(
                this.locations,
                data.userId,
                data.token,
                this.locations[0].timestamp,
                this.locations[this.locations.length - 1].timestamp,
                this.distance
            ).subscribe(resData =>{
                console.log(resData);
            })

            // return this.http
            //     .post(
            //         url,
            //         {
            //             locations: this.locations,
            //             userId: data.userId,
            //             accessToken: data.token,
            //             runStart: this.locations[0].timestamp,
            //             runStop: this.locations[this.locations.length - 1]
            //                 .timestamp,
            //         },
            //         { headers: options }
            //     )
            //     .subscribe((result) => {
            //         console.log(result);
            //     });
        });
    }

    public buttonClearTap() {
        this.locations.splice(0, this.locations.length);
    }

    //Map events
    onMapReady(event) {
        console.log("Map Ready");

        this.mapView = event.object;
        this.polyline = new Polyline();

        //this.enableLocationTap();

        //console.log("Setting a marker...");

        // var marker = new Marker();
        // marker.position = Position.positionFromLatLng(-33.86, 151.2);
        // marker.title = "Sydney";
        // marker.snippet = "Australia";
        // marker.userData = { index: 1 };
        // this.mapView.addMarker(marker);
    }
}
