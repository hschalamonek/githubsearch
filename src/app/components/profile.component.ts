import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: any;
  repos: Observable<any[]>;

  private usernames = new Subject<string>();
  private subscription: Subscription;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    const filteredUsernames = this.usernames
      .debounceTime(300)
      .distinctUntilChanged();

    this.subscription = filteredUsernames.switchMap(user => user ? this.githubService.getUser(user) : Observable.of({}))
      .subscribe(user => this.user = user);

    this.repos = filteredUsernames.switchMap(user => user ? this.githubService.getRepos(user) : Observable.of([]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchUser(username: string) {
    this.usernames.next(username);
  }
}
