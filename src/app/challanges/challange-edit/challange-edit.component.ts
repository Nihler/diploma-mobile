import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute } from '@nativescript/angular';

@Component({
  selector: 'ns-challange-edit',
  templateUrl: './challange-edit.component.html',
  styleUrls: ['./challange-edit.component.css'],
  moduleId: module.id
})
export class ChallangeEditComponent implements OnInit{

  isCreating = true;

  constructor(private activatedRoute: ActivatedRoute, private pageRoute: PageRoute) {}

  ngOnInit(){
    // this.activatedRoute.paramMap.subscribe(paramMap =>{
    //   console.log(paramMap.get('mode'));
    // });
    this.pageRoute.activatedRoute.subscribe(activatedRoute =>{
      activatedRoute.paramMap.subscribe(paramMap =>{
        console.log(paramMap.get('mode'));
        if(!paramMap.get('mode')){
          this.isCreating=true;
        } else {
          this.isCreating = paramMap.get('mode') !== 'edit';
        }
      })
    }); //check cashed pages
  }

}
