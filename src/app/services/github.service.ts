import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GithubService {

  private baseUri = 'https://api.github.com';
  private clientId = 'ffb3b7cd7d6e420a510a';
  private clientSecret = '65e67b76403e78b57be7d230ecab48b449e9bc0f';

  constructor(private http: Http) { }

  getUser(username: string): Observable<any> {
    return this.get(`users/${username}`).catch(error => Observable.of({}));
  }

  getRepos(username: string): Observable<any[]> {
    return this.get(`users/${username}/repos`).catch(error => Observable.of([]));
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUri}/${url}`
      + `?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
      .map(res => res.json());
  }
}
