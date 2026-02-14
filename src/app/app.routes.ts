import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RisksComponent } from './features/risks/risks.component';
import { TasksComponent } from './features/tasks/tasks.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },

  { path: 'login', component: AuthComponent },
  { path: 'admin', canActivate: [adminGuard], component: AdminComponent },
  { path: 'risks', canActivate: [authGuard], component: RisksComponent },
  { path: 'tasks', canActivate: [authGuard], component: TasksComponent },

  { path: '**', redirectTo: '' },
];
