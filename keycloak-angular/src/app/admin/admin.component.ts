import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  message = 'unknown';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get(environment.serverUrl + '/admin').subscribe(
	(data: any) => {
	    this.message = data.message;
		console.log(this.message);
	},
	(error: HttpErrorResponse) => {
	    this.handleError(error);
	});
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
	  this.message = 'An error occurred: ' + error.error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
	  let errorMessage = `Backend returned code ${error.status}, body was: ` + + error.error;
      console.error(errorMessage, error);
	  this.message = errorMessage;
    }
    // Return an observable with a user-facing error message.
    return new Error('Something bad happened; please try again later.');
}
}
