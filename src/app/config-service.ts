import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        return this.http.get<LastEntry>(this.url + "GetLastEntry").pipe(catchError(this.handleError));
    }

    getLastPee() {
        return this.http.get<Date>(this.url + "GetLastPee").pipe(catchError(this.handleError));
    }

    getLastPoo() {
        return this.http.get<Date>(this.url + "GetLastPoo").pipe(catchError(this.handleError));
    }

    addEntry(hasPeed: boolean, hasPooped: boolean) {
        return this.http.post<LastEntry>(`${this.url}AddEntry?hasPooped=${hasPooped}&hasPeed=${hasPeed}`, null).pipe(catchError(this.handleError));
    }

    deleteLastEntry() {
        return this.http.delete<boolean>(`${this.url}DeleteLastEntry`).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Error submitting entry.'));
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
