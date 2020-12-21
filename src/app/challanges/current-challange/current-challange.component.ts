import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: 'ns-current-chalange',
    templateUrl: './current-challange.component.html',
    styleUrls: ['./current-challange.component.css'],
    moduleId: module.id
})

export class CurrentChallangeComponent {

    constructor(private router: RouterExtensions){}

    onButtonTap(): void{
        this.router.navigate(['/edit']);
    }
}
