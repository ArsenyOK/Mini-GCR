import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedInputComponent } from './shared/components/shared-input/shared-input.component';
import { HeaderComponent } from './features/layout/header/app-header.component';
import { MainComponent } from './features/layout/main/app-main.component';
import { SidebarComponent } from './features/layout/sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  protected readonly title = signal('GRC');
}
