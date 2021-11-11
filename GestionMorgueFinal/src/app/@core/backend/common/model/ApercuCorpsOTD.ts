import {Medecins} from './Medecins';

export class ApercuCorpsOTD {
  id: number;
  defunt: string;
  centerMedicoLegal: string;
  dateDeclaration: Date;
  medecin:  string ;


  constructor(id: number, defunt: string, CenterMedicoLegal: string, dateDeclaration: Date, Medecin: string) {
    this.id = id;
    this.defunt = defunt;
    this.centerMedicoLegal = CenterMedicoLegal;
    this.dateDeclaration = dateDeclaration;
    this.medecin = Medecin;
  }
}
