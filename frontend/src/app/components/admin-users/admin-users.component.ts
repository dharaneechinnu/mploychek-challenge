import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-admin-users',
  imports: [
    ReactiveFormsModule, RouterLink,
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatTableModule, MatToolbarModule,
  ],
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  auth = inject(AuthService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder).nonNullable;

  users = signal<User[]>([]);
  editingId = signal<string | null>(null);
  columns = ['userId', 'name', 'role', 'actions'];

  form = this.fb.group({
    userId: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    role: ['user' as 'admin' | 'user'],
  });

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.userService.list().subscribe({
      next: (users) => this.users.set(users),
      error: (err) => this.fail(err),
    });
  }

  edit(user: User): void {
    this.editingId.set(user.id);
    this.form.reset({ userId: user.userId, name: user.name, password: '', role: user.role });
    this.form.controls.userId.disable();
    this.form.controls.password.removeValidators(Validators.required);
    this.form.controls.password.updateValueAndValidity();
  }

  reset(): void {
    this.editingId.set(null);
    this.form.reset({ userId: '', name: '', password: '', role: 'user' });
    this.form.controls.userId.enable();
    this.form.controls.password.addValidators(Validators.required);
    this.form.controls.password.updateValueAndValidity();
  }

  save(): void {
    if (this.form.invalid) return;
    const id = this.editingId();
    const { userId, name, password, role } = this.form.getRawValue();
    const request = id
      ? this.userService.update(id, { name, role, ...(password && { password }) })
      : this.userService.create({ userId, name, password, role });

    request.subscribe({
      next: () => {
        this.snackBar.open(id ? 'User updated' : 'User added', 'OK', { duration: 3000 });
        this.reset();
        this.refresh();
      },
      error: (err) => this.fail(err),
    });
  }

  remove(user: User): void {
    this.dialog
      .open(ConfirmDialogComponent, { data: { name: user.name } })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) return;
        this.userService.remove(user.id).subscribe({
          next: () => {
            this.snackBar.open('User deleted', 'OK', { duration: 3000 });
            this.refresh();
          },
          error: (err) => this.fail(err),
        });
      });
  }

  private fail(err: { error?: { message?: string } }): void {
    this.snackBar.open(err.error?.message ?? 'Request failed', 'Close', { duration: 5000 });
  }
}