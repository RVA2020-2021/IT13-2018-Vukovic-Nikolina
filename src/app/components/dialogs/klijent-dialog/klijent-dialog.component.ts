import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {

  public flag: number;
  krediti: Kredit[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KlijentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Klijent,
              public klijentService: KlijentService,
              public kreditService: KreditService) { }

  ngOnInit(): void {
    this.kreditService.getAllKredits().subscribe( data => 
      {
        this.krediti = data;
      });   
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.klijentService.addKlijent(this.data).subscribe(() => {
      this.snackBar.open('Klijent uspešno dodat: ' + this.data.id, 'OK', { //sredi,izlazi nula, tj vrv tako i njoj
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name);
      this.snackBar.open('Došlo je do greške prilikom dodavanja klijenta. ' , 'Zatvori', {
        duration: 2500
      });
    }

  }

  public update(): void {
    this.klijentService.updateKlijent(this.data).subscribe(() => {
      this.snackBar.open('Klijent uspešno izmenjen: ' + this.data.id, 'OK', { 
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name);
      this.snackBar.open('Došlo je do greške prilikom izmene klijenta. ' , 'Zatvori', {
        duration: 2500
      });
    }
  }

  
  public delete(): void {
    this.klijentService.deleteKlijent(this.data.id).subscribe(() => {
      this.snackBar.open('Klijent uspešno obrisan: ' + this.data.id, 'OK', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name);
      this.snackBar.open('Došlo je do greške prilikom brisanja klijenta. ' , 'Zatvori', {
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
