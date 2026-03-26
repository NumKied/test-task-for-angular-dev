import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@ng-x-rocket/core';
import { AuthenticationService, CredentialsService } from '@ng-x-rocket/auth';
import { MockAuthenticationService } from '@ng-x-rocket/auth/authentication.service.mock';
import { MockCredentialsService } from '@ng-x-rocket/auth/credentials.service.mock';
import { I18nModule } from '@ng-x-rocket/i18n';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, RouterTestingModule, TranslateModule.forRoot(), I18nModule, ReactiveFormsModule, CoreModule],
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
