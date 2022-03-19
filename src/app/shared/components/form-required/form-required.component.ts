import { Component, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-required',
  templateUrl: './form-required.component.html',
  styleUrls: ['./form-required.component.scss'],
})
export class FormRequiredComponent {
  @Input()
  public controlName: string;

  constructor(@Optional() private controlContainer: ControlContainer) {}

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  get isRequired(): boolean {
    if (
      this.control &&
      this.control.validator &&
      this.control.validator({} as any)
    ) {
      return !!this.control.validator({} as any).required;
    } else {
      return false;
    }
  }
}
