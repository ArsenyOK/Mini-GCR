import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { RisksFacade } from './risks.facade';
import { Risk } from '../../core/models/risk.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-risks',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './risks.component.html',
})
export class RisksComponent implements OnInit {
  private readonly facade = inject(RisksFacade);
  private readonly fb = inject(FormBuilder);

  readonly risks$ = this.facade.risks$;
  readonly loading$ = this.facade.loading$;
  readonly error$ = this.facade.error$;

  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    status: ['open'],
  });

  readonly editingRisk = signal<Risk | null>(null);
  readonly editForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    status: ['open'],
  });

  ngOnInit() {
    this.facade.loadRisks();
  }

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: any = this.form.getRawValue();
    this.isSubmitting.set(true);
    this.facade.createRisk(payload);
    this.form.reset({ title: '', status: 'open' });
    this.isSubmitting.set(false);
  }

  openEdit(r: Risk) {
    this.editingRisk.set(r);
    this.editForm.reset({ title: r.title, status: r.status });
  }

  closeEdit() {
    this.editingRisk.set(null);
    this.editForm.reset({ title: '', status: 'open' });
  }

  submitEdit() {
    if (!this.editingRisk() || this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const id = this.editingRisk()!.id;
    const payload: any = this.editForm.getRawValue();

    this.isSubmitting.set(true);
    this.facade.updateRisk(id, payload);
    this.isSubmitting.set(false);
    this.closeEdit();
  }

  delete(id: number | string) {
    this.facade.deleteRisk(id);
  }
}
