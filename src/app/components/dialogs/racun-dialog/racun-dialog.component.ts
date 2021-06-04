import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  tipoviRacuna: TipRacuna[];
  tipRacunaSunscription: Subscription;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: Racun,
    public tipRacunaService: TipRacunaService,
    public racunService: RacunService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>
  ) { }

  ngOnDestroy(): void {
    this.tipRacunaSunscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tipRacunaSunscription = this.tipRacunaService.getAllTipRacunas().subscribe(
        data => {
        this.tipoviRacuna = data
        }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message)
    }
  }

  compareTo(a,b) {
    return a.id==b.id
  }

  public add(): void {
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Racun uspešno dodat.',  'OK', { 
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name);
      this.snackBar.open('Došlo je do greške prilikom dodavanja računa. ' , 'Zatvori', {
        duration: 2500
      });
    }

  }

  public update(): void {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackBar.open('Račun uspešno izmenjen: ' + this.data.id, 'OK', { 
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name);
      this.snackBar.open('Došlo je do greške prilikom izmene računa. ' , 'Zatvori', {
        duration: 2500
      });
    }
  }

  
  public delete(): void {
    this.racunService.deleteRacun(this.data.id).subscribe(() => {
      this.snackBar.open('Račun uspešno obrisan: ' + this.data.id, 'OK', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name);
      this.snackBar.open('Došlo je do greške prilikom brisanja računa. ' , 'Zatvori', {
        duration: 2500
      });
    }

  }

  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste. ' , 'Zatvori', {
      duration: 1000
    });
  }
}
