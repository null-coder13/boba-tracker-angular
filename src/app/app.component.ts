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

    constructor(private http: ConfigService) {}

    ngOnInit() {
        this.http.getLastPee().subscribe((data: Date) => {
            this.pee = this.differenceInHours(new Date(data));
        })


        this.http.getLastPoo().subscribe((data: Date) => {
            this.poo = this.differenceInHours(new Date(data));
        })
    }

    differenceInHours(date: Date) {
        const today = new Date();
        return Math.floor(Math.abs(today.valueOf() - date.valueOf()) / 36e5);
    }

    submitEntry() {
        console.log(`Pee: ${this.hasPeed}`);
        console.log(`Poo: ${this.hasPooped}`);
        
        this.http.addEntry(this.hasPeed, this.hasPooped).subscribe((data: LastEntry) => {
            if (data.hasPeed) {
                this.pee = 0;
            }
            
            if (data.hasPooped) {
                this.poo = 0;
            }
            // start countdown to update pee and poo
        });
    }


}
