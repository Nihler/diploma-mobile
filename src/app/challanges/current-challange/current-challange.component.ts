import { Component, Input } from '@angular/core';
import { ItemEventData } from '@nativescript/core';

@Component({
    selector: 'ns-current-chalange',
    templateUrl: './current-challange.component.html',
    styleUrls: ['./current-challange.component.css'],
    moduleId: module.id
})

export class CurrentChallangeComponent {
    @Input() challangesList: string[]= [];;


    onItemTap(args: ItemEventData){
        console.log(args);
    }
}
