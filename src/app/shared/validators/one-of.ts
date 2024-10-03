import { AbstractControl, ValidatorFn } from "@angular/forms";

export function oneOf(items: string[]): ValidatorFn {
  return function(control: AbstractControl) {
    return items.includes(control.value) ? null : {oneOfError: true}
  }
}