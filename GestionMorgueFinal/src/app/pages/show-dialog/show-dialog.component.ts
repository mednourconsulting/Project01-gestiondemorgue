import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss'],
})
export class ShowDialogComponent implements OnInit {
  @Input() data;
  @Input() title: string;
  @Input() showInfo: boolean;
  @Input() editForm: boolean;
  @Input() list: { key: string; value: any; textarea?; language? }[];
  editUserForm: FormGroup;
  ADMIN = 'ADMIN';
  USER = 'USER';

  constructor(protected ref: NbDialogRef<ShowDialogComponent>) {}
  ngOnInit() {
  }

}
