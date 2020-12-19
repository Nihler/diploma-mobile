import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    activeChallanges: string[] =[];

    onChallangeInput(challangeDescription: string){
        this.activeChallanges.push(challangeDescription);
    }
}
