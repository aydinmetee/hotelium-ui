import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressButtonService {
  private _subject: Subject<boolean> = new Subject();

  public get stateChanges(): Observable<any> {
    return from(this._subject);
  }

  public disable() {
    this._subject.next(false);
  }

  public enable() {
    this._subject.next(true);
  }
}
