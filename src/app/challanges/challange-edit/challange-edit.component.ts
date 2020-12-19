import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ns-challange-edit',
  templateUrl: './challange-edit.component.html',
  styleUrls: ['./challange-edit.component.css']
})
export class ChallangeEditComponent {
    @Output() input = new EventEmitter<string>();

    challangeDescription='';

    onSetChallange() {
        // this.currentChallange = this.challangeDescription;
        this.input.emit(this.challangeDescription);
     }

}
