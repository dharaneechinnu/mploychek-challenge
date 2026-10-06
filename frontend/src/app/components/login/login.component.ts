import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
    role: ['user' as 'admin' | 'user', Validators.required],
  });
  showPassword = signal(false);
  loading = signal(false);
  error = signal('');

  submit(): void {
    if (this.form.invalid) return;
    const { userId, password, role } = this.form.getRawValue();
    this.loading.set(true);
    this.error.set('');
    this.auth.login(userId.trim(), password, role).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error.set(err.error?.message ?? 'Cannot reach the server');
        this.loading.set(false);
      },
    });
  }
}