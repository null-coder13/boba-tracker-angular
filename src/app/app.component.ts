import { Component, Injectable, OnInit } from '@angular/core';
import { ConfigService, LastEntry } from "./config-service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from './error-snack-bar/error-snack-bar.component';
import { SuccessSnackBarComponent } from './success-snack-bar/success-snack-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { interval } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
    pee: number = 0;
    poo: number = 0;
    hasPeed: boolean = false;
    hasPooped: boolean = false;
    peeTime: Date;
    pooTime: Date;
    loading: boolean = false;

    constructor(private http: ConfigService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

    ngOnInit() {
        this.getLastPeeAndPoo();

        // Execute every hour to update navbar data
        interval(1000*60*60).subscribe(() => {
            this.poo = this.differenceInHours(this.pooTime);
            this.pee = this.differenceInHours(this.peeTime);
        });
    }

    getLastPeeAndPoo() {
        this.http.getLastPee().subscribe((data: string) => {
            const dateTime = new Date(data + 'Z');
            this.pee = this.differenceInHours(dateTime);
            this.peeTime = dateTime;
        });

        this.http.getLastPoo().subscribe((data: string) => {
            const dateTime = new Date(data + 'Z');
            this.poo = this.differenceInHours(dateTime);
            this.pooTime = dateTime;
        });

    }

    differenceInHours(date: Date) {
        const today = new Date();
        return Math.floor(Math.abs(today.valueOf() - date.valueOf()) / 36e5);
    }

    submitEntry() {
        if (!this.hasPeed && !this.hasPooped) {
            return;
        }
        this.loading = true;
        this.http.addEntry(this.hasPeed, this.hasPooped).subscribe((data: LastEntry) => {

            const dateTime = new Date();

            if (data.hasPeed) {
                this.pee = 0;
                this.peeTime = dateTime;
                // Reset chip
                this.hasPeed = false;
            }

            if (data.hasPooped) {
                this.poo = 0;
                this.pooTime = dateTime;
                // Reset chip
                this.hasPooped = false;
            }
            this._snackBar.openFromComponent(SuccessSnackBarComponent, { duration: 2500, panelClass: 'center' });
        }, () => {
            this._snackBar.openFromComponent(ErrorSnackBarComponent, { duration: 2500, panelClass: 'center' });
        });

        this.loading = false;
    }

    deleteLastEntry() {
        this.dialog.open(DeleteDialogComponent, { width: '250px' });
        this.getLastPeeAndPoo();
    }

    viewPeeTime() {
        this._snackBar.open("Peed at: " + this.peeTime.toLocaleString('en-US'), "", { duration: 4000, panelClass: 'center' });
    }

    viewPooTime() {
        this._snackBar.open("Pooped at: " + this.pooTime.toLocaleString('en-US'), "", { duration: 4000, panelClass: 'center' });
    }

}
