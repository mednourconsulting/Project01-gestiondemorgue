import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss'],
})
export class ShowDialogComponent implements OnInit {

  @Input() title: string;
  @Input() list: { key: string; value: any; textarea?; language? }[];

  constructor(protected ref: NbDialogRef<ShowDialogComponent>) {}
  ngOnInit() {
  }

}
