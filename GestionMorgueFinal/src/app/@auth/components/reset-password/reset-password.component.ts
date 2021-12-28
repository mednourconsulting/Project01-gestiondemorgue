/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidationErrors} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import {Observable, of, Subject} from 'rxjs';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import { getDeepFromObject } from '../../helpers';
import {Location} from '@angular/common';
import {flatMap} from 'rxjs/operators';
import {User} from '../../../@core/backend/common/model/User';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResetPasswordComponent implements OnInit {
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.resetPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.resetPassword.showMessages');
  strategy: string = this.getConfigValue('forms.resetPassword.strategy');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  isTokenSet: boolean = false;
  resetPasswordForm: FormGroup;
  activeRouteParam$: Observable<Params> = of();
  result$: Observable<any> = of();
  errors$: Subject<string> = new Subject<string>();
  constructor(protected service: NbAuthService,
              protected location: Location,
              private userService: UsersService,

              @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected router: Router,
              private route: ActivatedRoute) {
    this.activeRouteParam$ = this.route.queryParams.pipe(tap((param) => {
      console.warn('param:', param );
      if (param['token']) {
        this.isTokenSet = true;
      }
    } ));
  }

  ngOnInit(): void {
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.resetPasswordForm = this.fb.group({
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
    });
  }

  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  /*resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.user = this.resetPasswordForm.value;

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        console.warn('here success' + this.messages[0]);
      } else {
        this.errors = result.getErrors();
        console.warn('here error' + this.errors[0]);

      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }*/
  resetPass(): void {
    this.result$ = this.activeRouteParam$.pipe(
      concatMap(param => {
        if (param['token']) {
          if (this.resetPasswordForm.valid) {
            if (this.password.value === this.confirmPassword.value) {
              return this.userService.restorePassword({token: param['token'],
                newPassword: this.password.value, confirmPassword: this.confirmPassword.value}).pipe(
                map(() => {
                  setTimeout(() => {
                     this.router.navigateByUrl('/auth/login');
                  }, 1000);
                  this.resetPasswordForm.reset();
                  return 'Votre mot de passe a bien été modifié';
                }),
                catchError((error: HttpErrorResponse) => {
                  this.errors$.next(error.statusText);
                  return of();
                }),
              );
            }
          }
        } else {
          if (this.resetPasswordForm.valid) {
            if (this.password.value === this.confirmPassword.value) {
              return this.userService.getCurrentUser()
                .pipe(
                  flatMap((user: User) => {
                    console.warn('user', user );
                    const tmpUser = new User();
                    tmpUser.passwordHash = this.password.value;
                    tmpUser.id = user.id;
                    return this.userService.updateUser(tmpUser);
                  }),
                  map((user) => {
                    console.warn('user', user);
                    // setInterval(() => {
                    //  this.router.navigateByUrl('/pages/dashboard');
                    // }, 1000);
                    this.resetPasswordForm.reset();
                    return 'Votre mot de passe a bien été modifié';
                  }),
                  catchError((error: HttpErrorResponse) => {
                    this.errors$.next(error.statusText);
                    return of();
                  }),
                );
            }
          }
        }
      }),
    );
  }
  back() {
    this.location.back();
    return false;
  }
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
  showPassword = true;

  getInputType() {
    if (this.showPassword) {
      return 'password';
    }
    return 'text';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
