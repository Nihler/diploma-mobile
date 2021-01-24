import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { alert } from '@nativescript/core/ui/dialogs';


@Injectable({ providedIn: "root" })
export class TodayService {
    constructor(private http: HttpClient) {}
    sendPath(locations: Array<any>, userId: string, accessToken: string, runStart: Date, runStop: Date, distance: number) {
        return this.http.post<any>("https://api-diploma.herokuapp.com/addRoute",{
            locations,
            userId,
            accessToken,
            runStart,
            runStop,
            distance
        }).pipe(catchError(err => {
            console.log(err);
            return throwError(err);
        }));
    }
 }
