import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {

  }

  login(username: string, passwd: string): Observable<boolean> {
    return this.http.get('http://localhost:8090/user/name=' + username + '/passwd=' + passwd)
      .map((res: Response) => res.json())
      .map(user => {
        if (user && user.id) {
          localStorage.setItem('currentUser', user.id);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
