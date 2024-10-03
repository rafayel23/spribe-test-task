import { AfterContentInit, ContentChild, Directive, HostBinding } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[appErrorTooltip]',
})
export class ErrorTooltipDirective implements AfterContentInit {

  @ContentChild(NgControl)
  ngControl!: NgControl;

  @HostBinding('attr.data-message')
  errorMessage: string = '';

  @HostBinding('class.tooltip-host')
  isInvalid = false;

  ngAfterContentInit() {
    const control = this.ngControl.control as AbstractControl;

    control.statusChanges.subscribe(() => {
      this.isInvalid = control.status === 'INVALID'
      
      if (control.hasError('required')) {
        this.errorMessage = 'Required field'
      } else if(control.hasError('oneOfError')) {
        this.errorMessage = 'Pick from the list'
      } else if(control.hasError('isAvailableError')) {
        this.errorMessage = 'Username is not available'
      } else {
        this.errorMessage = '';
      }
    })
  }
}
