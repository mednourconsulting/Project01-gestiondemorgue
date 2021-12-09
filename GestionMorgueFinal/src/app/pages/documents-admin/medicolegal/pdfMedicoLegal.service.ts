import {formatDate} from '@angular/common';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {CertificatMedicoLegal} from '../../../@core/backend/common/model/CertificatMedicoLegal';
import jsPDF from 'jspdf';
import {base64Str} from '../../certificat/base64';


export class PdfMedicoLegalService {
  jstoday = '';
  today = new Date();
  i = 0;
  dd = '';
  e: string;
  constructor(private logoBase64: LogoBase64Service) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-Us', '+1');
  }

  getDocumentDefinition1(list) {
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
          text: 'CERTIFICAT MEDICAL',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Je soussigné Docteur  : ' , style: 'style',
            },
            {
              text: list.medecin.nom + ' ' + list.medecin.prenom , style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Demeurant à  : ' , style: 'style',
            },
            {
              text: list.address, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Certifie que le corps du  : ', style: 'style',
            },
            {
              text: list.defunt.nom + ' ' + list.defunt.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Décédé le  : ', style: 'style',
            },
            {
              text: formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+0530'), style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'De : ', style: 'style',
            },
            {
              text: list.defunt.natureMort, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Pourra être transporté sans danger pour la salubrité publique, le corps étant placé dans une bière hermetique, suivant les réglements et prescriptions en vigeur' ,  style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 70, 5],
        },
        {
          text: 'Signature:',
          alignment: 'right',
          fontSize: 12,
          margin: [25, 15, 70, 5],
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
  getDocumentDefinition(DecedeHumain: Decedes , MedecinHumain: Medecins, Medicolegal: CertificatMedicoLegal) {
    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          alignment: 'center',
          width: 70,
          height: 70,
          margin: [0, -10, 0, 0],
          image: this.logoBase64.getLogoBase64(),
        },
        {
          text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN-ELHOUCIMA' +
            ' \n COMMUNE DE TANGER \n DIVISION D\'HYGIENE ET PROTECTION DE L\'ENVIRONNEMENT \n CENTRE MEDICO-LEGAL',
          style: 'header',
        },
        {
          text: 'CERTIFICAT MEDICAL',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Je soussigné Docteur  : ' , style: 'style',
            },
            {
              text: MedecinHumain.nom + ' ' + MedecinHumain.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Demeurant à  : ' , style: 'style',
            },
            {
              text: Medicolegal.address, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Certifie que le corps du  : ', style: 'style',
            },
            {
              text: DecedeHumain.nom + ' ' + DecedeHumain.prenom , style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Décédé le  : ', style: 'style',
            },
            {
              text: this.dd, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'De : ', style: 'style',
            },
            {
              text: DecedeHumain.natureMort, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Pourra être transporter sans danger pour la salubrité publique, le corps étant placé dans une bière hermetique, suivant les réglements et prescriptions en vigeur' ,  style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 70, 5],
        },
        {
          text: 'Signature:',
          alignment: 'right',
          fontSize: 12,
          margin: [25, 15, 70, 5],
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

  pdff(list) {
    const doc = new jsPDF({
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      /*margins: {
        top: 40,
        bottom: 60,
        left: 40,
        width: 522,
      },*/
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
    doc.text('شهادة طبية', 230, 177, { align: 'center'});
    doc.text( ' انا الواضع إسمه عقد تاريخه الدكتور' , 400, 200, { align: 'right' });
    doc.text(' '  + list.medecin.nomAR + ' ' + list.medecin.prenomAR, 200, 200, { align: 'right' });
    doc.text('الساكن ب' , 400, 230, { align: 'right' });
    doc.text(' ' + list.defunt.adresseAR, 200, 230, { align: 'right' });
    doc.text(' اشهد ان جثة المرحوم', 400, 260, { align: 'right' });
    doc.text(' ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR, 200, 260, { align: 'right' });
    doc.text(' الذي توفي بتاريخ', 400, 290, { align: 'right' });
    doc.text(' '  + formatDate(list.defunt.dateDeces, 'dd-MM-yyyy', 'en-Us', '+1'), 200, 290, { align: 'right' });
    doc.text('  إثر وفاة' ,  400, 320, { align: 'right' });
    doc.text(''  + this.getNatureMort(list.defunt.natureMort),  200, 320, { align: 'right' });
    doc.text('بعد وضع جثة المرحوم في صندوق من الزنك وآخر من الخشب حسب القوانين\n الجاري بها  العمل، يمكن نقلها بدون ان يكون في ذلك خطر على الصحة العمومية' , 400, 360, { align: 'right' });
    doc.text( ' طنجة في' + this.jstoday, 150, 400, { align: 'right' });
    doc.text('إمضاء ', 100, 420);
    doc.save('شهادة طبية' + '.pdf');
  }

  getNatureMort(mot) {
    if (mot === 'Mort non naturelle') {
      return 'وفاة غير طبيعية';
    }
    if (mot === 'Mort naturelle') {
      return 'وفاة طبيعية';
    }
  }
}
