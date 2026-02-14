import { Component, signal } from '@angular/core';
import { HeaderComponent } from './features/layout/header/app-header.component';
import { MainComponent } from './features/layout/main/app-main.component';
import { SidebarComponent } from './features/layout/sidebar/sidebar.component';
import { ToastMessageComponent } from './shared/components/toast-message/toast-message.component';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainComponent,
    SidebarComponent,
    ToastMessageComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  protected readonly title = signal('GRC');
}
