import { browser, element, by } from 'protractor';

export class NotFoundPage {
  navigateTo() {
    return browser.get('/pageThatDoNotExist');
  }

  getHeader() {
    return element(by.css('div.jumbotron')).element(by.css('h1')).getText();
  }

  getExplanation() {
    return element(by.css('div.jumbotron')).element(by.css('p')).getText();
  }

}
