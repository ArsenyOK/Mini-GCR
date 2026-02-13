import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-shared-button',
  template: `
    <button [ngClass]="buttonClasses">
      <ng-content></ng-content>
    </button>
  `,
  imports: [CommonModule],
})
export class SharedButtonComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';

  get buttonClasses(): string {
    const baseClasses = 'font-bold py-2 px-4 rounded';
    if (this.type === 'primary') {
      return `${baseClasses} bg-blue-500 hover:bg-blue-700 text-white`;
    } else if (this.type === 'secondary') {
      return `${baseClasses} bg-gray-500 hover:bg-gray-700 text-white`;
    }
    return baseClasses;
  }
}
