import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { status: number, message: string },
              private router: Router) {
  }

  onClickOK() {
    if (this.data.status === 401) {
      this.router.navigate(['/auth/login']);
    }
  }
}
