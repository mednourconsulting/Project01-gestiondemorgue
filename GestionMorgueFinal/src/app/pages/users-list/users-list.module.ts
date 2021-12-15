import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersListComponent} from './users-list.component';
import {NbCardModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {RolesRenderComponent} from './roles-render.component';



@NgModule({
  declarations: [UsersListComponent, RolesRenderComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    RolesRenderComponent,
  ],
})
export class UsersListModule {
}
