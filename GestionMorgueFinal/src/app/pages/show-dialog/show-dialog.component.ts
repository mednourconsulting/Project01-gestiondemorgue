import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EMAIL_PATTERN} from '../../@auth/components';

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

  constructor(protected ref: NbDialogRef<ShowDialogComponent>,
              private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.editUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      role: ['', [Validators.required]],
    });
  }
  getControl(name: string): AbstractControl {
    return this.editUserForm.get(name);
  }
}
