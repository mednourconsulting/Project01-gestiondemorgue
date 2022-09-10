/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>
      <nb-sidebar class="menu-sidebar" tag="menu-sidebar"
                  style="font-size: 25px; background: #f7f9fc">
        <nb-sidebar-header style="font-size: 25px;
                                margin-bottom: 60px;
                                position: relative;
                                height: 100px;
                                padding: 0px;
                                display: flex;
                                align-items: center;
                                flex-direction: column;
                                justify-content: center;">
          <img class="logo" src="assets/images/LogovilleTANGER.png" >
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>
      <nb-layout-column tag="menu-sidebar" style="  background-color: #ffffff">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
    <!--<nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-container  class="logo-container" >
          <img class="logo" src="assets/images/LogovilleTANGER.png">
        </ng-container>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>-->`,
})
export class OneColumnLayoutComponent {}
