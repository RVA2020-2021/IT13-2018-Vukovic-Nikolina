import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource: MatTableDataSource<TipRacuna>;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private tipRacunaService: TipRacunaService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //ovo se izvrsava
  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.tipRacunaService.getAllTipRacunas().subscribe (
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
      
     //vraca observable tj tok podataka i mi zelimo da se sub
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?:string): void {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data: {id,naziv,oznaka,opis}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1) {
        this.loadData();
      }
    }) 
  }

  
  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }
}
