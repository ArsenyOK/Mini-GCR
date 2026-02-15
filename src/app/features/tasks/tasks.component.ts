import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { TasksFacade } from './tasks.facade';
import { RisksFacade } from '../risks/risks.facade';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  private readonly facade = inject(TasksFacade);
  private readonly risksFacade = inject(RisksFacade);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly tasks$ = this.facade.tasks$;
  readonly loading$ = this.facade.loading$;
  readonly error$ = this.facade.error$;

  readonly risks$ = this.risksFacade.risks$;

  readonly filterRiskId = signal<number | string | null>(null);

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    riskId: [null as string | null, Validators.required],
    status: ['open'],
  });

  ngOnInit() {
    this.risksFacade.loadRisks();

    this.route.queryParamMap.subscribe((qm) => {
      const val = qm.get('riskId');
      this.filterRiskId.set(val);

      if (val !== null && val !== '') {
        this.form.patchValue({ riskId: val });
        this.facade.loadByRisk(val);
      } else {
        this.form.patchValue({ riskId: null });
        this.facade.loadAll();
      }
    });
  }

  onFilterChange(value: string) {
    const id = value ? String(value) : null;
    this.filterRiskId.set(id);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { riskId: id ?? null },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });

    if (id) {
      this.facade.loadByRisk(id);
    } else {
      this.facade.loadAll();
    }
  }

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: any = {
      ...raw,
      riskId: raw.riskId ? (isNaN(Number(raw.riskId)) ? raw.riskId : Number(raw.riskId)) : null,
    };

    this.facade.createTask(payload);
    this.form.reset({ title: '', riskId: null, status: 'open' });
  }

  delete(id: number) {
    this.facade.deleteTask(id);
  }
}
