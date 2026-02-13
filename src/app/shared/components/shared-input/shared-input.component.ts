import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-shared-input',
  template: `
    <input
      type="text"
      placeholder="Enter text..."
      class="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out w-full"
    />
  `,
  imports: [CommonModule],
})
export class SharedInputComponent {}
