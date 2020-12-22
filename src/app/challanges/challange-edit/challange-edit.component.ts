import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-challange-edit',
  templateUrl: './challange-edit.component.html',
  styleUrls: ['./challange-edit.component.css'],
  moduleId: module.id
})
export class ChallangeEditComponent implements OnInit{
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      console.log(paramMap.get('mode'));
    });
  }

}
