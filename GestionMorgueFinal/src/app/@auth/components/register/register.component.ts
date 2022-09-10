/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';
import {Location} from '@angular/common';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  // isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;
  constructor(protected service: NbAuthService,
              protected location: Location,
    protected userService: UsersService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router,
              private toastService: ToastrService) { }

  // get fullName() { return this.registerForm.get('fullName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }
  get role() { return this.registerForm.get('role'); }

  ngOnInit(): void {
   /* const fullNameValidators = [
    ];
    this.isFullNameRequired && fullNameValidators.push(Validators.required);*/

    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
    //  fullName: this.fb.control('', [...fullNameValidators]),
      lastName: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      terms: this.fb.control(''),
      role: this.fb.control('', [Validators.required]),
    });
  }
  back() {
    this.location.back();
    return false;
  }
  register(): void {
    this.user = this.registerForm.value;
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.registerForm.reset();
        this.toastService.showToast('success', 'Ajout d\'un nouveau utilisateur',
          'L\'utilisateur ' + this.user.fullName + ' est ajouté avec  succès');
      } else {
        this.errors = result.getErrors();
        this.toastService.showToast('danger', 'Email déjà utilisé',
          'Veillez changer l\'email s\'il vous plait !!');
      }
      /* const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges(); */
    });
  }
  createUser(): void {
    this.user = this.registerForm.value;
    this.errors = this.messages = [];
    this.submitted = true;

    this.userService.addUser(this.user).subscribe((result) => {
      this.submitted = false;
      this.registerForm.reset();
      this.toastService.showToast('success', 'Ajout d\'un nouveau utilisateur',
        'L\'utilisateur ' + this.user.lastName + ' ' + this.user.firstName + ' est ajouté avec  succès');
    }, error => {

        this.toastService.showToast('danger', 'Email déjà utilisé',
          'Veillez changer l\'email s\'il vous plait !!');
      });
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
