import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

interface Driver {
  driverName: string,
  driverCityOrigin:string,
  driverLanguage: string,
  driverPhone:string,
  driverGender: 'male'|'female',
  driverInfo: string,
  carMake: string,
  kmDriven: number,
  location: string,
  lat: string,
  lon: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  drivers!: Driver[];
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<Driver>;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
   fetch('http://localhost:4000/')
     .then(r => r.json())
     .then((drivers:Driver[]) => {
       this.drivers = drivers.map(d => {
         d.lat = d.location[0];
         d.lon = d.location[1];
         return d;
       });
       this.displayedColumns =  ['driverName', 'driverCityOrigin', 'driverPhone', 'driverGender', 'driverLanguage', 'location'];
       this.dataSource = new MatTableDataSource(this.drivers);
       this.dataSource.sort = this.sort;
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
