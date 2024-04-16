import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private readonly keycloakService: KeycloakService, private readonly router: Router) {}
	
  public async ngOnInit() {
    let isLoggedIn = await this.keycloakService.isLoggedIn();

    if (isLoggedIn) {
      this.keycloakService.logout();
    }
	
	this.router.navigate(['/']);
  }
}
