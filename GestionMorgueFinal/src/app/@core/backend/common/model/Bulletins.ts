import {Medecins} from './Medecins';
import {Decedes} from './Decedes';

export class Bulletins {

id: number;
typeBulletin: number;
declaration: Date;
cercle: string;
diagnostique: string;
lieuEntrement: string;
province: string;
residece: string;
cimetiere: string;
numTombe: number;
compostage: string;
medecin: Medecins;
decede: Decedes;
centre: string;
  constructor() {
  }
}
