import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Accuracy } from "@nativescript/core/ui/enums";
import { request, getFile, getImage, getJSON, getString } from "@nativescript/core/http";

import * as Geolocation from "nativescript-Geolocation";
import { MapView, Marker, Polyline, Position } from "nativescript-google-maps-sdk";

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
    polyline: Polyline;
    private serverUrl = "https://api-diploma.herokuapp.com";

    lastCamera: String;

    constructor(private http: HttpClient) {
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
                that.updateLocations(loc).then(res =>{
                    if(res){
                    let marker = new Marker();
                    marker.position = Position.positionFromLatLng(that.latitude, that.longitude);
                    marker.userData = { index: 1 };
                    that.mapView.addMarker(marker);
                    }
                })
            }
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }


    private async updateLocations(location: any): Promise<boolean>{
        try {
            this.longitude = location.longitude;
            this.latitude = location.latitude;
            this.locations.push(location);
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    public buttonStartTap() {
        try {
            let that = this;
            this.watchIds.push(Geolocation.watchLocation(
                function (loc) {
                    if (loc) {
                        that.updateLocations(loc).then(result =>{
                            if(result) that.polyline.addPoint(Position.positionFromLatLng(that.latitude, that.longitude));
                        }).then(()=>{
                            that.mapView.addPolyline(that.polyline);
                        })
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
        let options = this.createRequestOptions();
        //const locations = this.locations;
        let temp = this.serverUrl+"/addRoute";
        console.log(this.locations);
        request({
            url: temp,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                locations: this.locations
            })
        }).then((response) => {
            const result = response.content.toJSON();
        }, (e) => {
        });





        //return this.http.post(temp,  {locations} , { headers: options });
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
        this.mapView.addPolyline(this.polyline);
    }

    onCameraMove(args) {
        //console.log("Camera moving: " + JSON.stringify(args.camera));
    }


    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
}
