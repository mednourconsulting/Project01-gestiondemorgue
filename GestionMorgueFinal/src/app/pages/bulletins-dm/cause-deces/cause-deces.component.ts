import { Component, OnInit } from '@angular/core';
import { Cause} from '../../../@core/backend/common/model/Cause';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'ngx-cause-deces',
  templateUrl: './cause-deces.component.html',
  styleUrls: ['./cause-deces.component.scss'],
  providers: [ CauseService, UsersService],
})
export class CauseDecesComponent implements OnInit {
  Cause: Cause = new Cause();
  id = null;
  source: Array<Cause>;
  lise: number;
  isAdmin: boolean;
  data: any;
  reactiveForm: FormGroup;
  arPattern = '[\u0621-\u064A0-9 ]*';
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
    this.reactiveForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      description: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      descriptionAR: ['', [ Validators.required, Validators.pattern(this.arPattern)]],
    });
  }
  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  initID() {
    this.service.getID().subscribe(data => {
      this.lise = data;
    });
  }
  constructor(private service: CauseService,
              private userservice: UsersService,
              private toastService: ToastrService,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
  ) {
  }
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fas fa-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash"  data-toggle="tooltip" data-placement="top" title="Supprimer" aria-hidden="true"></i>',
      confirmDelete: true,

    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'edit',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-edit"  data-toggle="tooltip" data-placement="top" title="Modifier" aria-hidden="true"></i>'),
        },
      ],
    },
    columns: {
      code: {
        title: 'Code',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      descriptionAR: {
        title: 'الوصف',
        type: 'string',
      },
    },
  };
  onEditConfirm(event) {
    if (this.isAdmin) {
      event.confirm.resolve(event.newData);
      this.service.update(event.newData).subscribe(obj => {
      });
      this.toastService.toastOfEdit('success');
      this.source.map(e => e);
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }
  onDeleteConfirm(event) {
    if (this.isAdmin) {
      if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
        event.confirm.resolve(event.data);
        this.toastService.toastOfDelete('success');
        this.service.delete(event.data.id).subscribe(data => {
          this.source = this.source.filter(item => item.id !== data.id);
        });
      } else {
        event.confirm.reject(event.data);
      }
    } else {
      this.toastService.toastOfDelete('warning');

    }
  }
  save(cause) {
    if ( cause.id == null) {
      this.service.create(cause).subscribe(obj => {
        this.source.push(obj);
        this.source = this.source.map(item => item);
      });
      this.toastService.toastOfSave('success');
      this.reactiveForm.reset();
    } else {
      if (this.isAdmin) {
      this.service.update(cause).subscribe(obj => {
        this.source.map(e => e);
        this.init();
        this.reactiveForm.reset();
      });
      this.toastService.toastOfEdit('success');
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }
  }
  createCauseFromForm(): Cause {
    const formValues = this.reactiveForm.value;
    const cause = new Cause();
    cause.id = this.id;
    cause.code = formValues.code;
    cause.description = formValues.description;
    cause.descriptionAR = formValues.descriptionAR;
    return cause;
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const cause: Cause = this.createCauseFromForm();
     this.save(cause);
      this.id = null ;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
  onCustomConfirm(event) {
    switch (event.action) {
      case 'edit':
        if (this.isAdmin) {
          this.reactiveForm.setValue({
            code: event.data.code,
            description: event.data.description,
            descriptionAR: event.data.descriptionAR,
          });
          this.id = event.data.id;
        } else {
          this.toastService.toastOfEdit('warning');
        }
        break;
    }
  }
}
