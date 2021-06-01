/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbTokenService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import {UsersService} from "../@core/backend/common/services/users.service";

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[];
  alive: boolean = true;

  constructor(private pagesMenu: PagesMenu,
              private userService: UsersService,
    private tokenService: NbTokenService,
    protected initUserService: InitUserService,
  ) {
    this.initMenu();

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
  }

  initMenu() {
    this.userService.getCurrentUser().subscribe( data => {
      if ( data.role.includes('ADMIN')) {
        this.pagesMenu.getMenu()
          .pipe(takeWhile(() => this.alive))
          .subscribe(menu => {
            this.menu = menu;
          });
      } else {
        this.pagesMenu.getMenuUser()
          .pipe(takeWhile(() => this.alive))
          .subscribe(menu => {
            this.menu = menu;
          });
      }

    } );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
