import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog-for-update',
  templateUrl: './confirmation-dialog-for-update.component.html'
})
export class ConfirmationDialogForUpdateAskComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogForUpdateAskComponent>) {}

  ngOnInit() {}
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
