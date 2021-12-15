import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';
import jsPDF from 'jspdf';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {base64Str} from '../base64';

@Injectable()
export class PdfService {

  today = new Date();
  jstoday = '';
  constructor(private logoBase64: LogoBase64Service) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+1');
  }


  public pdfDocumentArabe(list) {
    const doc = new jsPDF({
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',
    });
    const data = this.logoBase64.getLogoBase64();

    doc.addFileToVFS('unicodeMS.ttf', base64Str);
    doc.addFont('unicodeMS.ttf', 'unicodeMS', 'normal');
    /*doc.setTextColor(255, 0, 0);
    doc.setFillColor(135, 124, 45, 0);*/
    doc.setFont('unicodeMS');
    doc.addImage(data, 'PNG', 195, 0, 55, 55);
    doc.text('المملكة المغربية' + '\n' + 'وزارة الداخلية' + '\n' + 'ولاية جهة طنجة تطوان الحسيمة' + '\n' + 'جماعة طنجة'
      + '\n' + 'قسم حفظ الصحة و المحافظة على البيئة' +
      '\n' + 'مصلحة الطب الشرعي و حفظ الجثث و المقابر'
      + '\n' + 'مركز الطب الشرعي', 225, 70, { align: 'center' });
    doc.text('رخصة الدفن', 230, 177, {align: 'center'});
    doc.text(' يرخص في يوم', 400, 200, {align: 'right'});
    doc.text(' ' + formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+1'), 200, 200, {align: 'right'});
    doc.text('  بدفن جثة المرحوم', 400, 230, {align: 'right'});
    doc.text(' ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR, 200, 230, {align: 'right'});
    doc.text('  المتوفي بتاريخ', 400, 260, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateDeces, 'dd-MM-yyyy', 'en-US', '+1'), 200, 260, {align: 'right'});
    doc.text('  المزداد في', 400, 290, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateNaissance, 'dd-MM-yyyy', 'en-US', '+1'), 200, 290, {align: 'right'});
    doc.text('  الجنس', 400, 320, {align: 'right'});
    doc.text(' ' + this.getSexe(list.defunt.sexe), 200, 320, {align: 'right'});
    doc.text(' ملاحظة )1( : لا تقبل الجثة بالمقبرة إلا بتقديم رخصة الدفن', 350, 340, {align: 'right'});
    doc.text(' طنجة في' + this.jstoday, 150, 400, {align: 'right'});
    doc.text('إمضاء ', 100, 420);
    // doc.save('رخصة الدفن.pdf');
    doc.save('رخصة دفن المرحوم ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR + '.pdf');
  }
  public getDocumentFrancais(list) {

    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          alignment: 'center',
          width: 70,
          height: 70,
          margin: [0, -10, 0, 10],
          image: this.logoBase64.getLogoBase64(),
        },
        {
          text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN-ELHOUCIMA' +
            ' \n COMMUNE DE TANGER \n DIVISION D\'HYGIENE ET PROTECTION DE L\'ENVIRONNEMENT \n CENTRE MEDICO-LEGAL',
          style: 'header',
        },
        {
          text: 'CERTIFICAT DU TRANSFERT DU CORPS',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Médecin : ', style: 'style',
            },
            {
              text: list.medecins.nom + ' ' + list.medecins.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Défunt : ', style: 'style',
            },
            {
              text: list.defunt.nom + ' ' + list.defunt.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Déclarant : ', style: 'style',
            },
            {
              text: list.declarant, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date de déclaration : ', style: 'style',
            },
            {
              text: formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+1'), style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'CIN du déclarant : ', style: 'style',
            },
            {
              text: list.cin, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'N° de téléphone  : ', style: 'style',
            },
            {
              text: list.tel, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Le corps sera transporté en cercueil  : ', style: 'style',
            },
            {
              text: list.cercueilType, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Destination du corps  : ', style: 'style',
            },
            {
              text: list.destination, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Fourgon mortuaire Mle  : ', style: 'style',
            },
            {
              text: list.mortuaire, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Société ou l\'administration chargé de l\'inhumation ou du transfert: ', style: 'style',
            },
            {
              text: '\n' + list.inhumationSociete, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Remarques : ', style: 'style',
            },
            {
              text: list.remarque, style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 50, 5],
        },
      ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 10, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
  }

  getSexe(sexe) {
    if (sexe === 'Femme') {
      return 'أنثى';
    }
    if (sexe === 'Homme') {
      return 'ذكر';
    }
    if (sexe === 'Indeterminé') {
      return 'غير محدد';
    }
  }
}
