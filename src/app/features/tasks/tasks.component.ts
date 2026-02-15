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

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    riskId: [null as number | null, Validators.required],
    status: ['open'],
  });

  ngOnInit() {
    this.risksFacade.loadRisks();

    this.route.queryParamMap.subscribe((qm) => {
      const val = qm.get('riskId');
      const id = val ? Number(val) : null;
      this.filterRiskId.set(id);

      if (id) {
        this.form.patchValue({ riskId: id });
        this.facade.loadByRisk(id);
      } else {
        this.form.patchValue({ riskId: null });
        this.facade.loadAll();
      }
    });
  }

  onFilterChange(value: string) {
    console.info(value, 'value');
    const id = value ? String(value) : null;
    this.filterRiskId.set(id);

    console.info(id, ' id');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { riskId: id ?? null },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });

    if (id) this.facade.loadByRisk(id);
    else this.facade.loadAll();
  }

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: any = this.form.getRawValue();
    this.facade.createTask(payload);
    this.form.reset({ title: '', riskId: null, status: 'open' });
  }

  delete(id: number) {
    this.facade.deleteTask(id);
  }
}
