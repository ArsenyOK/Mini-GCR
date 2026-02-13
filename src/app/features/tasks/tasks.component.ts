import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  imports: [CommonModule],
})
export class TasksComponent {}
