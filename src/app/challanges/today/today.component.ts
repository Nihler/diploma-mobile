import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Accuracy } from "@nativescript/core/ui/enums";

import * as Geolocation from "nativescript-Geolocation";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";

registerElement("MapView", () => MapView);

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.css"],
    moduleId: module.id,
})
export class TodayComponent implements OnInit {
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

    lastCamera: String;

    constructor() {
        this.latitude=54.433862324712166;
        this.longitude=17.11982600390911;
    }

    ngOnInit(): void {
    }
    public enableLocationTap() {
        Geolocation.isEnabled().then(function (isEnabled) {
            if (!isEnabled) {
                Geolocation.enableLocationRequest(true, true).then(() => {
                    console.log("User Enabled Location Service");
                }, (e) => {
                    console.log("Error: " + (e.message || e));
                }).catch(ex => {
                    console.log("Unable to Enable Location", ex);
                });
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }

    public buttonGetLocationTap() {
        let that = this;
        Geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000
        }).then(function (loc) {
            if (loc) {
                that.latitude = loc.latitude;
                that.longitude = loc.longitude;
                that.locations.push(loc);
                console.log(that.locations);
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }

    public buttonStartTap() {
        try {
            let that = this;
            this.watchIds.push(Geolocation.watchLocation(
                function (loc) {
                    if (loc) {
                        that.locations.push(loc);
                    }
                },
                function (e) {
                    console.log("Error: " + e.message);
                },
                {
                    desiredAccuracy: Accuracy.high,
                    updateDistance: 1,
                    updateTime: 3000,
                    minimumUpdateTime: 100
                }));
        } catch (ex) {
            console.log("Error: " + ex.message);
        }
    }

    public buttonStopTap() {
        let watchId = this.watchIds.pop();
        while (watchId != null) {
            Geolocation.clearWatch(watchId);
            watchId = this.watchIds.pop();
        }
    }

    public buttonClearTap() {
        this.locations.splice(0, this.locations.length);
    }

    //Map events
    onMapReady(event) {
        console.log("Map Ready");

        this.mapView = event.object;



        //console.log("Setting a marker...");

        // var marker = new Marker();
        // marker.position = Position.positionFromLatLng(-33.86, 151.2);
        // marker.title = "Sydney";
        // marker.snippet = "Australia";
        // marker.userData = { index: 1 };
        // this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log(
            "Coordinate Tapped, Lat: " +
                args.position.latitude +
                ", Lon: " +
                args.position.longitude,
            args
        );
    }

    onMarkerEvent(args) {
        console.log(
            "Marker Event: '" +
                args.eventName +
                "' triggered on: " +
                args.marker.title +
                ", Lat: " +
                args.marker.position.latitude +
                ", Lon: " +
                args.marker.position.longitude,
            args
        );
    }

    onCameraChanged(args) {
        console.log(
            "Camera changed: " + JSON.stringify(args.camera),
            JSON.stringify(args.camera) === this.lastCamera
        );
        this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    }
}
