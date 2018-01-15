import { browser, element, by } from 'protractor';

export class NotFoundPage {
  navigateTo() {
    return browser.get('/blablabla');
  }
}
