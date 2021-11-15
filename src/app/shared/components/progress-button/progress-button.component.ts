import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Output,
} from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { ProgressButtonService } from '../../services/progress-button.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sis-progress-btn',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss'],
})
export class ProgressButtonComponent implements OnInit {
  @Input() public label: string;
  @Input() public icon: string;
  @Input() public disabled = false;
  @Input() public class: string;
  @Output() public action: EventEmitter<any> = new EventEmitter();

  private _disable = false;
  private _icon: string;
  public isAnimate = false;

  @ViewChild(ButtonDirective, { static: true }) public pButton: ButtonDirective;

  constructor(private _progressButtonService: ProgressButtonService) {}

  public ngOnInit() {
    this._progressButtonService.stateChanges.subscribe((state) => {
      // trigger the animation and change the icon only on clicked component
      if (this.isAnimate) {
        if (state && this._icon) {
          this.icon = this._icon;
        } else {
          this._icon = this.icon;
          this.icon = 'fas fa-sync-alt';
        }
      }

      if (state) {
        this.isAnimate = !state;
      }

      this._disable = !state;
    });
  }

  get state() {
    if (this.disabled === true) {
      return true;
    }
    return this._disable;
  }

  @HostListener('click', ['$event']) public click(ev: MouseEvent) {
    if (!this.state) {
      this.isAnimate = true;
      this.action.emit();
    }
  }
}
