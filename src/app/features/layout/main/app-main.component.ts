import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  imports: [CommonModule, RouterOutlet],
})
export class MainComponent {}
