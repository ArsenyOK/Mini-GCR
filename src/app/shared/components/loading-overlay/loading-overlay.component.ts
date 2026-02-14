import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  standalone: true,
  selector: 'app-loading-overlay',
  imports: [CommonModule],
  templateUrl: './loading-overlay.component.html',
})
export class LoadingOverlayComponent {
  private readonly loading = inject(LoadingService);
  loading$ = this.loading.loading$;
}
