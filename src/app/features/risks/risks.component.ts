import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { RisksFacade } from './risks.facade';

@Component({
  standalone: true,
  selector: 'app-risks',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './risks.component.html',
})
export class RisksComponent implements OnInit {
  private facade = inject(RisksFacade);
  private fb = inject(FormBuilder);

  risks$ = this.facade.risks$;
  loading$ = this.facade.loading$;
  error$ = this.facade.error$;

  isSubmitting = signal(false);

  form = this.fb.nonNullable.group({
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

    this.isSubmitting.set(true);

    const payload: any = this.form.getRawValue();

    this.facade.createRisk(payload);

    this.form.reset({
      title: '',
      status: 'open',
    });

    this.isSubmitting.set(false);
  }

  delete(id: number) {
    this.facade.deleteRisk(id);
  }
}
