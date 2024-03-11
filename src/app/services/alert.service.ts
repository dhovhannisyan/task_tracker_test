import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ALERT_STATUS } from '../models/enums/alert-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  private openSnackBar(message: string, status: ALERT_STATUS) {
    this.snackBar.open(message, status, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 4000,
      panelClass: `${status.toLowerCase()}-alert`
    });
  }

  showSuccess(message: string) {
    this.openSnackBar(message, ALERT_STATUS.SUCCESS);
  }

  showError(message: string) {
    this.openSnackBar(message, ALERT_STATUS.ERROR);
  }

  showWarning(message: string) {
    this.openSnackBar(message, ALERT_STATUS.WARNING);
  }

}
