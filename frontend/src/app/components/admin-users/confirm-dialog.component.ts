import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Delete user</h2>
    <mat-dialog-content>Delete {{ data.name }}? This cannot be undone.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  data = inject<{ name: string }>(MAT_DIALOG_DATA);
}