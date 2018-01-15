import { browser, element, by } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getHeadingText() {
    return element(by.css('div.header')).element(by.css('h1')).getText();
  }

  getHeadingDescription() {
    return element(by.css('div.header')).element(by.css('p')).getText();
  }

  getFooterLink() {
    return element(by.tagName('a')).getAttribute('href');
  }

  getFooterDescription() {
    return element(by.tagName('a')).getText();
  }
}
