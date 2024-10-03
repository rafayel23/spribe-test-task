import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MockBackendInterceptor} from "./shared/mock-backend/mock-backend.interceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CancelableSubmitComponent } from './shared/components/cancelable-submit/cancelable-submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorTooltipDirective } from './shared/directives/error-tooltip.directive';

@NgModule({
  declarations: [AppComponent, CancelableSubmitComponent, ErrorTooltipDirective],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
