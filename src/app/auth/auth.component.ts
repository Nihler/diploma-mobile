import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { TextField } from '@nativescript/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLoading = false;
    @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl') emailEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions, private authService: AuthService) { }

  ngOnInit(): void {
      this.form = new FormGroup({
          email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
          password: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]})
      })
  }

  onSubmit() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();


    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(resData =>{
        console.log(resData)
        this.isLoading = false;
        this.router.navigate(['/challanges'], {clearHistory: true});
    }, err =>{
        console.log(err);
        this.isLoading = false;
    });
  }

}
