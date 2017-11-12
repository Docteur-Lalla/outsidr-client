import {Component, OnInit} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  activities: any;
  cities: any;
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
    city: '',
    level: ''
  };

  constructor(private http: Http) {
    this.getAllCities();
    this.getAllUsers();
    this.getAllMeteos();

    const userId = localStorage.getItem('currentUser');
    if (userId) {
      this.getActivitiesByUserId(userId);
    }
  }

  getAllMeteos() {
    const data = this.http.get(this.apiUrl + '/meteo/all')
      .map((res: Response) => res.json());

    data.subscribe((meteo => {
      this.meteos = meteo;
    }));
  }

  getAllCities() {
    const data = this.http.get(this.apiUrl + '/city/all')
      .map((res: Response) => res.json());

    data.subscribe((city => {
      this.cities = city;
    }));
  }

  getAllUsers() {
    const data = this.http.get(this.apiUrl + '/user/all')
      .map((res: Response) => res.json());

    data.subscribe((user => {
      this.users = user;
    }));
  }

  getActivitiesByUserId(id) {
    const data = this.http.get(this.apiUrl + '/registration/user=' + id)
      .map((res: Response) => res.json());

    data.subscribe(activities => {
      console.log(activities);
      this.activities = activities.map(reg => reg.activity);
    });
  }

  onUserSubmit(e) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.apiUrl + '/user/save', e.value, options)
      .subscribe(() => {
        this.getAllUsers();
      });
  }

  onActivitySubmit(e) {
    this.http.get(this.apiUrl + '/city/' + e.value.city)
      .map((res: Response) => res.json()).subscribe(city => {
      this.http.get(this.apiUrl + '/user/' + localStorage.getItem('currentUser'))
        .map((res: Response) => res.json()).subscribe(user => {

        const activity = {
          name: e.value.name,
          city: city
        };

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        this.http.post(this.apiUrl + '/activity/save', activity, options)
          .subscribe(res => {
            const body = res.json();

            this.http.get(this.apiUrl + '/activity/' + body.id)
              .map((response: Response) => response.json()).subscribe(newActivity => {
              const reg = {
                user: user,
                activity: newActivity,
                level: e.value.level
              };
              this.http.post(this.apiUrl + '/registration/save', reg, options)
                .subscribe(() => {
                  this.getActivitiesByUserId(localStorage.getItem('currentUser'));
                });
            });
          });
      });
    });
  }
}
