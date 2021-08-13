import {Component, OnInit} from '@angular/core';

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

  ngOnInit(): void {
   fetch('http://localhost:4000/')
     .then(r => r.json())
     .then((drivers:Driver[]) => this.drivers = drivers.map(d => {
       console.log(d.location[0])
       d.lat = d.location[0];
       d.lon = d.location[1];
       return d;
     }));
  }


}
