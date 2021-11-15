import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type alertType = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private messageService: MessageService) {}

  public success(summery, detail): void {
    this.alert('success', summery, detail);
  }

  public error(summery, detail): void {
    this.alert('error', summery, detail);
  }

  public info(summery, detail): void {
    this.alert('info', summery, detail);
  }

  public warn(summery, detail): void {
    this.alert('warn', summery, detail);
  }
  private alert(severity: alertType, summary: string, detail: string): void {
    if (!summary) {
      summary = 'Error!';
    }

    this.messageService.add({ severity, summary, detail, life: 5000 });
  }
}
