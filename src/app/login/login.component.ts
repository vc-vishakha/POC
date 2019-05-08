import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar  } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor( private router: Router, private formBuilder: FormBuilder , public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {

    if (this.loginForm.valid) {

      const formDataVal = this.loginForm.value;

      const signUpArr = {
        email: formDataVal.email,
        password : formDataVal.password,
      };
      let loginFlag = false; let pswdFlag = false; let stopFlag = false; let loginUser = signUpArr.email;

      if ( localStorage.getItem('pocLoginData') !== undefined &&
            localStorage.getItem('pocLoginData') !== 'undefined' &&
            localStorage.getItem('pocLoginData') !== ''
            && localStorage.getItem('pocLoginData') != null ) {

        const existingOb = JSON.parse(localStorage.getItem('pocLoginData'));
        existingOb.forEach((record: any, index: number) => {
          if ( !stopFlag ) {
            if ( record.email !== signUpArr.email ) {
              loginFlag = true;
              return false;
            } else if ( record.email === signUpArr.email && record.password !== signUpArr.password ) {
              loginFlag = false;
              pswdFlag = true;
              stopFlag = true;
              return false;
            } else if ( record.email === signUpArr.email && record.password === signUpArr.password ) {
              loginFlag = false;
              pswdFlag = false;
              stopFlag = true;
              if ( record.fullName.toLowerCase() === 'admin' ) {
                loginUser = 'admin';
              }
              const loginDetails = JSON.stringify(record);
              localStorage.setItem('loginDetails', loginDetails);
              return false;
            }
          }
        });
      } else {
        this.openSnackBar('This user doesn\'t exists');
        loginFlag = true;
        return false;
      }
      if ( loginFlag ) {
        this.openSnackBar('This user doesn\'t exists');
        console.log('Login Unuccessfull');
        return false;

      } else if ( pswdFlag ) {
        this.openSnackBar('Incorrect password');
        console.log('Login Unuccessfull');
        return false;

      } else {
        console.log('Login Successfull');
        localStorage.setItem('pocLoggedUser', loginUser );
        this.router.navigate(['/users']);
      }
    }

  }

  /**
   * OPENS SNACK BAR WITH DATA AND ACTION
   * @param msg Message to be displayed
   * @param action Action following the message
   */
  openSnackBar(msg: string , action ?: string ) {
    this.snackBar.open(msg, action,  {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

  }

}
