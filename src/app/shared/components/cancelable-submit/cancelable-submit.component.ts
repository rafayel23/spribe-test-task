import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Subscription, Observable, interval, take, map, startWith } from 'rxjs';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-cancelable-submit',
  templateUrl: './cancelable-submit.component.html',
  styleUrl: './cancelable-submit.component.scss'
})
export class CancelableSubmitComponent implements OnInit {

  form = inject(AppComponent).form;

  @Output()
  submitStart = new EventEmitter<void>();

  @Output()
  submitEnd = new EventEmitter<void>();

  @Output()
  cancel = new EventEmitter<void>();

  submitInProcess = false;
  invalidFormsCount = 0;
  countdownSubscription = new Subscription();

  countdown$ = interval(1000).pipe(
    take(5),
    map(n => 5 - ++n),
    startWith(5),
  );

  onCancel() {
    this.cancel.emit();
    this.submitInProcess = false;
    this.countdownSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitStart.emit();
    this.submitInProcess = true;
    this.countdownSubscription = this.countdown$.subscribe({complete: () => {
      this.submitEnd.emit();
      this.submitInProcess = false;
    }})
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      startWith(null)
    ).subscribe(() => {
      this.invalidFormsCount = this.form.controls.users.controls.filter(user => user.invalid || user.pending).length;
    })
  }
}
