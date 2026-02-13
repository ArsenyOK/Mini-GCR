import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedButtonComponent } from './shared/components/shared-button/shared-button.component';
import { SharedInputComponent } from './shared/components/shared-input/shared-input.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedButtonComponent,
    SharedInputComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  protected readonly title = signal('GRC');
}
