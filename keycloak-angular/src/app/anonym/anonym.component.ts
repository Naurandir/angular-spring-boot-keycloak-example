import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-anonym',
  standalone: true,
  imports: [],
  templateUrl: './anonym.component.html',
  styleUrl: './anonym.component.css'
})
export class AnonymComponent implements OnInit {

  message = 'not yet done';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get(environment.serverUrl + '/anonym').subscribe((data: any) => {
	    this.message = data.message;
		console.log(this.message);
	});
  }
}
