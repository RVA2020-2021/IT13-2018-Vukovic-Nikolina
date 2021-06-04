import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: TipRacuna,
              public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.tipRacunaService.addTipRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat tip računa: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog tipa računa.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }

  public update(): void {
    this.tipRacunaService.updateTipRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan tipa računa: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene tipa računa.', 'Zatvori', {
        duration: 2500
      })     
    }
  }

  public delete(): void {
    this.tipRacunaService.deleteTipRacuna(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan tip računa: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja tipa računa.', 'Zatvori', {
        duration: 2500
      })      
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
      
  }

}
