import {Medecins} from './Medecins';
import {Decedes} from './Decedes';

export class CertificatMedicoLegal {
id: number;
medecin: Medecins ;
declarant: string;
address: string;
cin: string;
declaration: Date;
defunt: Decedes ;
  constructor() {
  }
}
