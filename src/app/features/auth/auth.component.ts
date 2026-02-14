import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly fb = new FormBuilder();

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  emailInvalid = computed(() => {
    const c = this.form.controls.email;
    return c.touched && c.invalid;
  });

  passwordInvalid = computed(() => {
    const c = this.form.controls.password;
    return c.touched && c.invalid;
  });

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.isSubmitting.set(true);
    this.auth.login(email, password).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigateByUrl('/risks');
      },
      error: (err: Error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err?.message ?? 'Login failed');
      },
    });
  }
}
