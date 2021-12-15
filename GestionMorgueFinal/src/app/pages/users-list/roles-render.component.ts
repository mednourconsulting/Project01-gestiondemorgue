import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  styleUrls: ['./users-list.component.scss'],
    template: `
        <ul ><li style="list-style: none;" *ngFor="let item of rowData.role">{{item.name}}</li></ul>
    `,
  })
  export class RolesRenderComponent implements ViewCell, OnInit {
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    ngOnInit() {
    }


  constructor() {
  }
}
