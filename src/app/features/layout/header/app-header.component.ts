import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedButtonComponent } from '../../../shared/components/shared-button/shared-button.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  imports: [CommonModule, SharedButtonComponent],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user$ = this.authService.user$;

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
