import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { CheckUserResponseData } from "../interface/responses";
import { map } from "rxjs";

export function isAvailable(http: HttpClient): AsyncValidatorFn {
  return function(control: AbstractControl) {
    return http.post<CheckUserResponseData>('/api/checkUsername', {username: control.value}).pipe(
      map(res => res.isAvailable ? null : {isAvailableError: true})
    );
  }
}