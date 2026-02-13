import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RisksComponent } from './features/risks/risks.component';
import { TasksComponent } from './features/tasks/tasks.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },

  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'risks', component: RisksComponent },
  { path: 'tasks', component: TasksComponent },

  { path: '**', redirectTo: '' },
];
