import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id', 'tipRacuna', 'naziv', 'oznaka', 'opis', 'klijent', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  @Input() selektovanKlijent: Klijent;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  constructor(private racunService: RacunService,
              private dialog: MatDialog) { }


  ngOnChanges(): void {
    if(this.selektovanKlijent.id) {
      this.loadData();
  }
}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
         }

  ngOnInit(): void {
 //   this.loadData();
  }

  loadData() {
    this.subscription = this.racunService.getRacuniZaKlijenta(this.selektovanKlijent.id).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);

        
                 // pretraga po nazivu ugnježdenog objekta
                 this.dataSource.filterPredicate = (data, filter: string) => {
                  const accumulator = (currentTerm, key) => {
                    return key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key];
                  };
                  const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                  const transformedFilter = filter.trim().toLowerCase();
                  return dataStr.indexOf(transformedFilter) !== -1;
                };
        
                // sortiranje po nazivu ugnježdenog objekta
                this.dataSource.sortingDataAccessor = (data, property) => {
                  switch (property) {
                    case 'tipRacuna': return data.tipRacuna.naziv.toLocaleLowerCase();
                    default: return data[property];
                  }
                };


        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

          }
        ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }



  openDialog(flag: number, id?: number, tipRacuna?: TipRacuna, naziv?: string, oznaka?: string, opis?: string, klijent?: Klijent) {
    const dialogRef = this.dialog.open(RacunDialogComponent, 
      { data: {id, tipRacuna, naziv, oznaka, opis, klijent}
    });
    dialogRef.componentInstance.flag = flag;
    if(flag === 1) {
      dialogRef.componentInstance.data.klijent = this.selektovanKlijent;
    }

    dialogRef.afterClosed().subscribe( res => {
      if(res === 1) {
        this.loadData();
      }
    }
    )

        }

        
  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }

}
