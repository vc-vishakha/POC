import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar  } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor( private router: Router, private formBuilder: FormBuilder , public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {

    const formDataVal = this.registerForm.value;

    if (this.registerForm.valid) {

      const loginObj: any = [];

      const signUpArr = {
        fullName: formDataVal.fullName,
        email: formDataVal.email,
        password : formDataVal.password,
      };
      let loginUser = signUpArr.email;
      if ( signUpArr.fullName.toLowerCase() === 'admin' ) {
        loginUser = 'admin';
      }

      if ( localStorage.getItem('pocLoginData') !== undefined &&
            localStorage.getItem('pocLoginData') !== 'undefined' &&
            localStorage.getItem('pocLoginData') !== '' &&
            localStorage.getItem('pocLoginData') !== null) {
        const existingOb = JSON.parse(localStorage.getItem('pocLoginData'));
        let emailExist = false;

        const adminExist = existingOb.find((x: any) => x.fullName.toLowerCase() === signUpArr.fullName.toLowerCase());
        if ( adminExist ) {
          this.openSnackBar('Admin is already registered.', 'Ok !');
          return false;
        }

        existingOb.forEach((record: any) => {
          if (record.email === signUpArr.email) {
            emailExist = true;
            return false;
          }
        });
        if (emailExist) {
          this.openSnackBar('This email already exist');
          return false;

        } else {
          existingOb.push(signUpArr);
          const jsonData: any = JSON.stringify(existingOb);
          localStorage.setItem('pocLoginData', jsonData);
          localStorage.setItem('pocLoggedUser', loginUser);
          this.router.navigate(['/users']);
        }

      } else {
        loginObj.push(signUpArr);
        const jsonData: any = JSON.stringify(loginObj);
        localStorage.setItem('pocLoginData', jsonData);
        localStorage.setItem('pocLoggedUser', loginUser);
        this.router.navigate(['/users']);
      }

    }

  }

  // OPENS SNACK BAR WITH DATA AND ACTION
  openSnackBar(msg: string , action ?: string ) {
    this.snackBar.open(msg, action,  {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

  }

}
