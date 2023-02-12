import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    url: string = 'https://localhost:5001/api/Entry/';

    constructor(private http: HttpClient) { }

    getLastEntry() {
        return this.http.get<LastEntry>(this.url + "GetLastEntry");
    }

    getLastPee() {
        return this.http.get<Date>(this.url + "GetLastPee");
    }

    getLastPoo() {
        return this.http.get<Date>(this.url + "GetLastPoo");
    }

    addEntry(hasPeed: boolean, hasPooped: boolean) {
        return this.http.post<LastEntry>(`${this.url}AddEntry?hasPooped=${hasPooped}&hasPeed=${hasPeed}`, null);
    }
}

export interface LastEntry {
    dateTime: Date,
    hasPooped: boolean,
    hasPeed: boolean
}

export interface Entry {
    hasPooped: boolean,
    hasPeed: boolean
}
