import { Injectable } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
@Injectable({
  providedIn: 'root',
})
export class ToastrService {

  constructor(private toastrService: NbToastrService) { }


  showToast(type: NbComponentStatus, title: string, body: string) {

    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  toastOfEdit(action) {
    switch (action) {
      case 'success': this.showToast('success', 'Succès de modification',
        'Les données ont bien été modifiées'); break;
      case 'danger': this.showToast('danger', 'Erreur de modification',
        'Une erreur est survenu l\'ors de modification'); break;
        case 'warning': this.showToast('warning', 'Alert',
        'Vous ne disposez pas des droits de modification'); break;
    }
  }
  toastOfSave(action) {
    switch (action) {
      case 'success': this.showToast('success', 'Succès d\'ajout',
        'Les données ont bien été ajoutées'); break;
      case 'danger': this.showToast('danger', 'Erreur d\'ajout',
        'Une erreur est survenu l\'ors d\'ajout'); break;
        case 'warning': this.showToast('warning', 'Alert',
        'Vous ne disposez pas des droits d\'ajout'); break;
    }
  }
  toastOfDelete(action) {
    switch (action) {
      case 'success': this.showToast('success', 'Succès de suppression',
        'Les données ont bien été supprimées'); break;
      case 'danger': this.showToast('danger', 'Erreur de suppression',
        'Une erreur est survenu l\'ors de suppression'); break;
        case 'warning': this.showToast('warning', 'Alert',
        'Vous ne disposez pas des droits de suppression'); break;
    }
  }
}
