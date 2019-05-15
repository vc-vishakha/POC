import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar  } from '@angular/material';
import { PushNotificationsService } from '../../common/services/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  editUserForm: FormGroup; userTitle = 'Add User';
  editUserId;

  constructor(
    private formBuilder: FormBuilder ,
    private router: Router ,
    private snackBar: MatSnackBar ,
    public pushNotificationsService: PushNotificationsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });
    this.editUserId = this.activatedRoute.snapshot.paramMap.get('id');
    if ( this.editUserId !== undefined && this.editUserId != null ) {
      this.userTitle = 'Edit User';
      this.setUserForm();
    }
  }

  validatePhNumber(event: any): void {
    const pattern = /[0-9\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  createUpdate(): void {

    if ( this.editUserForm.valid ) {
      const formDataVal = this.editUserForm.value;

      const tempArray = {
        firstName: formDataVal.firstName,
        lastName: formDataVal.lastName,
        email: formDataVal.email,
        mobile: formDataVal.mobile
      };

      let userListData = [];
      let successMsg = 'User Created Successfully';
      if ( localStorage.getItem('userListData') !== undefined && localStorage.getItem('userListData') !== null ) {
        userListData = JSON.parse(localStorage.getItem('userListData'));
      }
      if ( this.editUserId !== undefined && this.editUserId !== null ) {
        userListData[Number(this.editUserId)] = tempArray;
        successMsg = 'User Updated Successfully';
      } else {
        userListData.push( tempArray );
      }
      localStorage.setItem( 'userListData' , JSON.stringify(userListData) );
      this.openSnackBar(successMsg);

      if ( this.editUserId === undefined || this.editUserId === null ) {

        const notifArr = {
          title : 'Notification',
          content : 'Hello Admin , New User Named ' + formDataVal.firstName + ' Has Been Created !!!',
          updateFlag : 0
        };
        let notifData = [];
        if ( localStorage.getItem('notifications') !== undefined && localStorage.getItem('notifications') !== null ) {
          notifData = JSON.parse(localStorage.getItem('notifications'));
        }
        notifData.push(notifArr);
        localStorage.setItem('notifications', JSON.stringify(notifData));
        setTimeout( () => this.cancelSubmit() , 300);

      } else {
        this.cancelSubmit();
      }

    }


  }

  cancelSubmit(): void {
    this.router.navigate(['/users']);
  }

  /**
   * Opens snackbar with data and action
   * @param msg Notifier message
   * @param action Action while showing snackbar
   */
  openSnackBar(msg: string , action ?: string ): void {
    this.snackBar.open(msg, action,  {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

  }

  setUserForm(): void {

      let userData = [];
      if ( localStorage.getItem('userListData') !== undefined && localStorage.getItem('userListData') !== null ) {
        userData = JSON.parse(localStorage.getItem('userListData'));
        if ( userData.length > 0 ) {
          this.editUserForm.setValue(userData[this.editUserId]);
        }
      }

  }

}
