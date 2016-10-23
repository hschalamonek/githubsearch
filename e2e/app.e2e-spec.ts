import { GithubsearchCliPage } from './app.po';

describe('githubsearch-cli App', function() {
  let page: GithubsearchCliPage;

  beforeEach(() => {
    page = new GithubsearchCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
