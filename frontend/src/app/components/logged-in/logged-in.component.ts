import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { RecordService } from '../../services/record.service';
import { RecordItem } from '../../models/record.model';

@Component({
  selector: 'app-logged-in',
  imports: [
    CurrencyPipe, FormsModule, RouterLink,
    MatButtonModule, MatCardModule, MatFormFieldModule, MatProgressBarModule,
    MatSelectModule, MatTableModule, MatToolbarModule,
  ],
  templateUrl: './logged-in.component.html',
})
export class LoggedInComponent implements OnInit {
  auth = inject(AuthService);
  private recordService = inject(RecordService);

  records = signal<RecordItem[]>([]);
  loading = signal(false);
  error = signal('');
  delayMs = 3000;

  columns = computed(() => {
    const base = ['title', 'category', 'status', 'amount'];
    return this.auth.isAdmin() ? [...base, 'access'] : base;
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.recordService.list(this.delayMs).subscribe({
      next: (records) => {
        this.records.set(records);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Could not load records');
        this.loading.set(false);
      },
    });
  }
}