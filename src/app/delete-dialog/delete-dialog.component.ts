import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from '../config-service';
import { SuccessSnackBarComponent } from '../success-snack-bar/success-snack-bar.component';
import { ErrorSnackBarComponent } from '../error-snack-bar/error-snack-bar.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

    constructor(private http: ConfigService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

    deleteEntry() {
        this.http.deleteLastEntry().subscribe((data: boolean) => {
            //sucesss
            this._snackBar.openFromComponent(SuccessSnackBarComponent, { duration: 2500, panelClass: 'center' });
        }, (error) => {
            //error
            this._snackBar.openFromComponent(ErrorSnackBarComponent, { duration: 2500, panelClass: 'center' });
        });
    }
}
