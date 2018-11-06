import {browser} from 'protractor';
import {AppPage} from './app.po';

describe('random test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should not log any errors', async () => {
    await page.navigateTo();

    for (let i = 0; i < 100; i++) {
      await page.clickRandomButton();
    }

    browser.manage().logs().get('browser').then(function (browserLog) {
      console.log(JSON.stringify(`broswer log: ${JSON.stringify(browserLog)}`));
      expect(browserLog.length).toBe(0);
    });
  });
});
