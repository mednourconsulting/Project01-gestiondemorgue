import {Injectable} from '@angular/core';
import jsPDF from 'jspdf';
import {formatDate} from '@angular/common';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {base64Str} from '../base64';

@Injectable()
export class  PdfService  {

  today = new Date();
  jstoday = '';
  constructor(private logoBase64: LogoBase64Service) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }
  public getNature(Mot) {
    if (Mot === 'Mort non naturelle') {
      return 'وفاة غير طبيعية';
    }
    if (Mot === 'Mort naturelle') {
      return 'وفاة طبيعية';
    }
  }
  public getDocumentpdfFrancais(list) {
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
          text: 'CERTIFICAT APERCU DU CORPS',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 60],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Défunt  : ', style: 'style',
            },
            {
              text: list.defunt.nom + ' ' + list.defunt.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Médecin/ Assistant de santé  : ', style: 'style',
            },
            {
              text: list.medecin.nom + ' ' + list.medecin.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Centre médico-légal : ', style: 'style',
            },
            {
              text: list.centerMedicoLegal, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date déclaration : ', style: 'style',
            },
            {
              text: formatDate(list.dateDeclaration, 'dd-MM-yyyy', 'en-US', '+0530'), style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 40, 20, 5],
        },
      ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
  }
  public getDocumentpdfArabic(list) {
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
    doc.text('معاينة الجثة', 230, 177, {align: 'center'});
    doc.text(' عاين الطبيب او المساعد الصحي', 400, 220, {align: 'right'});
    doc.text(' ' + list.medecin.nomAR + ' ' + list.medecin.prenomAR, 200, 220, {align: 'right'});
    doc.text(' التابع للمركز الطبي الشرعي', 400, 250, {align: 'right'});
    doc.text(' ' + list.centerMedicoLegal, 200, 250, {align: 'right'});
    doc.text('  جثة المرحوم', 400, 280, {align: 'right'});
    doc.text(' ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR, 200, 280, {align: 'right'});
    doc.text('  المزداد', 400, 310, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateNaissance,
      'dd-MM-yyyy', 'en-US', '+0530'), 200, 310, {align: 'right'});
    doc.text('  إثر وفاة', 400, 340, {align: 'right'});
    doc.text(' ' + this.getNature(list.defunt.natureMort), 200, 340, {align: 'right'});
    doc.text('   يوم', 400, 370, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530'), 200, 370, {
      align: 'right',
    });
    doc.text('وعليه فيمكن تحرير أمر الدفن', 350, 400, {align: 'right'});
    doc.text(' طنجة في' + this.jstoday, 150, 430, {align: 'right'});
    doc.text('إمضاء ', 100, 450);
    doc.save('pdfمعاينة الجثة.pdf');
  }
}

