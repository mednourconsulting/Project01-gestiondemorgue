import {Medecins} from './Medecins';
import {Decedes} from './Decedes';

export class CertificatTransfertCorps {
id: number;
medecins: Medecins ;
cercueilType: string;
declaration: Date;
remarque: string ;
defunt: Decedes ;
declarant: string;
tel: string;
destination: string ;
mortuaire: string;
inhumationSociete: string;
cin: string;
  constructor() {
  }

}
