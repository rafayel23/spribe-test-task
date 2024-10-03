import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { debounceTime, distinctUntilChanged, map, Observable } from "rxjs";
import { FormBuilder, Validators } from '@angular/forms';
import { oneOf } from './shared/validators/one-of';
import { isAvailable } from './shared/validators/is-available';
import { COUNTRIES, TODAY } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);

  today = TODAY;
  submitInProcess = false;

  form = this.fb.group({
    users: this.fb.array([this.createUser()])
  })

  get users() {
    return this.form.controls.users;
  }

  submit() {
    this.http.post('/api/submitForm', this.form.value).subscribe(() => {
      this.users.clear();
      this.users.push(this.createUser());
    })
  }

  createUser() {
    return this.fb.group({
      country: ['', [Validators.required, oneOf(COUNTRIES)]],
      username: ['', Validators.required, isAvailable(this.http)],
      birthday: ['', Validators.required],
    })
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map(term => term.length ? COUNTRIES.filter(country => country.toLowerCase().includes(term.toLowerCase())) : []),
		)
  }
}
