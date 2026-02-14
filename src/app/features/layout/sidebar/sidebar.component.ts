import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedInputComponent } from '../../../shared/components/shared-input/shared-input.component';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [RouterLink, RouterLinkActive, SharedInputComponent, CommonModule],
})
export class SidebarComponent {}
