import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { inject } from '@angular/core';

export function keycloakFunctionalGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  return new Promise(async (resolve, reject) => {
    // Logged in?
	if (!await keycloak.isLoggedIn()) {
      await keycloak.login();
      return resolve(false);
    }
	
	// correct roles?
	const requiredRoles: string[] = route.data['roles'];
	const roles = await keycloak.getUserRoles(true);
	
	console.log("requiredRoles: " + requiredRoles);
	console.log("user roles: " + roles);
	
	var hasAnyRequiredRole = false;
	
	for (let role of requiredRoles) {
	    if (roles.includes(role)) {
		    hasAnyRequiredRole = true;
			break;
		}
	}
	
    resolve(hasAnyRequiredRole);
  });
}