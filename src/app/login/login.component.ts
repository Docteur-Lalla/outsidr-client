import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model = { username: '', password: '' };
  registerModel = { name: '', password: '', mail: '' };
  error = '';
  loading = false;

  constructor(private http: Http, private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
          this.loading = false;
        }
      });
  }

  register() {
    console.log(this.registerModel);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:8090/user/save', this.registerModel, options)
      .subscribe(() => this.router.navigate(['/login']) );
  }
}
