import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersListComponent} from './users-list.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {RolesRenderComponent} from './roles-render.component';
import {RouterModule, Routes} from '@angular/router';
import { path } from '@angular-devkit/core/src/virtual-fs';
import { DialogEmitterService } from './services/dialog-emitter.service';
import {AdminGuard} from '../../@auth/admin.guard';


const routes: Routes = [{
  path: '',
  component: UsersListComponent,
}];
@NgModule({
  declarations: [UsersListComponent, RolesRenderComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    RolesRenderComponent,
  ],
})
export class UsersListModule {
}
