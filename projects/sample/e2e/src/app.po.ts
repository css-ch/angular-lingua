import {browser, by, element, protractor} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  async clickRandomButton() {
    const elements = element.all(by.css('a, button:not(.sidenav-toggle)'));
    const count = await elements.count();

    const button = elements.get(Math.floor(Math.random() * count));

    await browser.wait(protractor.ExpectedConditions.elementToBeClickable(button), 1000);

    await button.click();
  }
}
