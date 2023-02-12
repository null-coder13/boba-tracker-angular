import { Component, Injectable } from '@angular/core';
import { ConfigService, LastEntry } from "./config-service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
    pee: number = 0;
    poo: number = 0;
    hasPeed: boolean = false;
    hasPooped: boolean = false;
    peeTime: Date;
    pooTime: Date;

    constructor(private http: ConfigService) {}

    ngOnInit() {
        this.http.getLastPee().subscribe((data: Date) => {
            const dateTime = new Date(data);
            this.pee = this.differenceInHours(dateTime);
            this.peeTime = dateTime;
        })

        this.http.getLastPoo().subscribe((data: Date) => {
            const dateTime = new Date(data);
            this.poo = this.differenceInHours(dateTime);
            this.pooTime = dateTime;
        })
    }

    differenceInHours(date: Date) {
        const today = new Date();
        return Math.floor(Math.abs(today.valueOf() - date.valueOf()) / 36e5);
    }

    submitEntry() {
        this.http.addEntry(this.hasPeed, this.hasPooped).subscribe((data: LastEntry) => {
            const dateTime = new Date(data.dateTime);
            if (data.hasPeed) {
                this.pee = 0;
                this.peeTime = dateTime;
            }
            
            if (data.hasPooped) {
                this.poo = 0;
                this.pooTime = dateTime;
            }
            // start countdown to update pee and poo
        });
    }


}
