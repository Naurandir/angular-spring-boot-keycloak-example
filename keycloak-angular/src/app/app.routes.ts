import { Routes } from '@angular/router';

import { keycloakFunctionalGuard } from './auth.guard';

import { AnonymComponent } from './anonym/anonym.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    {
	    path: 'anonym', 
		component: AnonymComponent, 
		title: 'Anonym Functionality',
		data: { roles: [] }
	},
    {
	    path: 'user', 
		component: UserComponent, 
		title: 'User Functionality',
		canActivate: [keycloakFunctionalGuard],
		data: { roles: ['demo-user', 'demo-admin'] }
	},
	{
	    path: 'admin', 
		component: AdminComponent, 
		title: 'Admin Functionality',
		canActivate: [keycloakFunctionalGuard],
		data: { roles: ['demo-admin'] }
	},
	{
	    path: 'logout', 
		component: LogoutComponent, 
		title: 'Logout Functionality',
		data: { roles: [] }
	}
];