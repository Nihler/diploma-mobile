import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { alert } from '@nativescript/core/ui/dialogs'
import { User } from './user.model';


interface AuthResponseData {
    userId: string,
    accessToken: string,
    email: string,
    username: string,
    expiresIn: string
}

@Injectable({ providedIn: "root" })
export class AuthService {

    private _user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {}

    get user(){
        return  this._user.asObservable();
    }

    login(email: string, password: string) {
        console.log(email, password);
        return this.http.post<AuthResponseData>("https://api-diploma.herokuapp.com/login", {
            email: email,
            password: password,
        }).pipe(catchError(err => {
            this.handleError(err.error.message);
            return throwError(err);
        }),tap(resData =>{
            console.log(resData);
            if(resData && resData.accessToken){
                this.handleLogin(resData.email, resData.userId, resData.accessToken, parseInt(resData.expiresIn), resData.username);
            }
        }));
    }

    private handleLogin(email: string, userId: string, accessToken: string, expiresIn: number, username: string){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, accessToken, expirationDate, username);
        console.log("user:");
        console.log(user);
        this._user.next(user);
    }


    private handleError(errorMessage: string){
        switch(errorMessage){
        case 'INCORRECT_CREDENTIALS':
            alert("Niepoprawne dane logowania");
            break;
        default:
            alert("Nieznany błąd");
        }
    }
}
