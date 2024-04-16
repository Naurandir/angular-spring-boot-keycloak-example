import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  message = 'unknown';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get(environment.serverUrl + '/user').subscribe((data: any) => {
	    this.message = data.message;
		console.log(this.message);
	});
  }
}
