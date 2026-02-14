import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedButtonComponent } from '../../../shared/components/shared-button/shared-button.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  imports: [CommonModule, SharedButtonComponent],
})
export class HeaderComponent {}
