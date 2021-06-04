import { Klijent } from "./klijent";
import { TipRacuna } from "./tip-racuna";

export class Racun {
    id: number; 
    tipRacuna: TipRacuna;
    naziv: string;
    oznaka: string;
    opis: string;
    klijent: Klijent;
}