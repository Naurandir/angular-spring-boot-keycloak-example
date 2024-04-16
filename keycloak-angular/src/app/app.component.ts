import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Keycloak Home';
  
  public isLoggedIn = false;
  public username = 'unknown';

  constructor(private readonly keycloakService: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      const userRoles = this.keycloakService.getUserRoles();
	  await this.keycloakService.loadUserProfile();
	  this.username = this.keycloakService.getUsername();
    }
  }

  public login() {
    this.keycloakService.login();
  }
}
