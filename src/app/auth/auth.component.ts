import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { TextField } from '@nativescript/core';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl') emailEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions) { }

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
    this.router.navigate(['/challanges'], {clearHistory: true});


    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
  }

}
