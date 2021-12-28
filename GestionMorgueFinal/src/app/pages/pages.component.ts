/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbTokenService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { InitUserService } from '../@theme/services/init-user.service';
import {UsersService} from '../@core/backend/common/services/users.service';
import {MENU_ITEMS_ADMIN, MENU_ITEMS_USERS} from './pages-menuList';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu  [items]="(isAdmin) ? menu_admin : menu_user "></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy, OnInit {
  menu: NbMenuItem[];
  menu_user = MENU_ITEMS_USERS;
  menu_admin = MENU_ITEMS_ADMIN;
  isAdmin: boolean = true;
  alive: boolean = true;

  constructor(
              private userService: UsersService,
    private tokenService: NbTokenService,
    protected initUserService: InitUserService,
  ) {

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
  }

  initMenu() {
    this.userService.getCurrentUser().subscribe( data => {
      this.isAdmin = data.role.includes('ADMIN');
    } );
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
  ngOnInit(): void {
    this.initMenu();
  }
}
