import { Component } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locations: any;
  meteos: any;
  users: any;
  title = 'Outsidr';
  apiUrl = 'http://localhost:8090'; // outsidr's URL

  createUser = {
    name: '',
    password: '',
    mail: ''
  };

  createActivity = {
    name: '',
    location: '',
  };

  constructor(private http: Http) {
    this.getAllLocations();
    this.getAllUsers();
    this.getAllMeteos();
  }

  getAllLocations() {
    const data = this.http.get(this.apiUrl + '/location/all')
      .map((res: Response) => res.json() );

    data.subscribe((locations => {
      this.locations = locations;
    }));
  }

  getAllMeteos() {
    const data = this.http.get(this.apiUrl + '/meteo/all')
      .map((res: Response) => res.json() );

    data.subscribe((meteo => {
      this.meteos = meteo;
    }));
  }

  getAllUsers() {
    const data = this.http.get(this.apiUrl + '/user/all')
      .map((res: Response) => res.json() );

    data.subscribe((user => {
      this.users = user;
    }));
  }

  onUserSubmit(e) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/user/save', e.value,  options)
      .subscribe(() => { this.getAllUsers(); });
  }

  onActivitySubmit(e) {
    console.log(e.value);
  }
}
