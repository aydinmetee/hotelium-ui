import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-validation-summary',
  templateUrl: './form-validation-summary.component.html',
  styleUrls: ['./form-validation-summary.component.scss'],
})
export class FormValidationSummaryComponent implements OnInit {
  @Input() public name: string;
  @Input() public form: FormGroup;
  @Input() public visable: true;
  constructor() {}

  public ngOnInit() {}

  public isInvalid(): boolean {
    if (!this.name) {
      return this.form.invalid && (this.form.dirty || this.form.touched);
    } else {
      if (this.form.get(this.name) == undefined) {
        return false;
      }
      return (
        this.control.invalid && (this.control.dirty || this.control.touched)
      );
    }
  }

  get control(): AbstractControl {
    if (this.name) {
      return this.form.get(this.name);
    } else {
      return this.form;
    }
  }
}
