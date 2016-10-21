import { CliClockAppPage } from './app.po';

describe('cli-clock-app App', function() {
  let page: CliClockAppPage;

  beforeEach(() => {
    page = new CliClockAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
