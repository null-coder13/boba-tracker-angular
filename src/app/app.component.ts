import { Component, Injectable } from '@angular/core';
import { ConfigService, LastEntry } from "./config-service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
    // TODO: Calculate the number of hours since last time peed or pooed
    pee: boolean = false;
    poo: boolean = false;

    constructor(private http: ConfigService) {}

    ngOnInit() {
        this.http.getLastEntry().subscribe((data: LastEntry) => {
            this.pee = data.hasPeed;
            this.poo = data.hasPooped;
        })

    }
}
