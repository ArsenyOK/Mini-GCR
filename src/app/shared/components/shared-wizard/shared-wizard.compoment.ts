import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-shared-wizard',
  template: ` <div>wizard</div> `,
  imports: [CommonModule],
})
export class SharedWizardComponent {}
