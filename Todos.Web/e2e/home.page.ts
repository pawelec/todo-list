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

  getForm() {
    return element(by.id('todoForm'));
  }

  getTextInput() {
    return element(by.id('todoInputElement'));
  }

  getTodoList() {
    return element(by.id('todoList')).all(by.tagName('h5')).count();
  }

  getDoneTodos() {
    return element(by.id('todoList')).all(by.css('div.item-done')).count();
  }

  getItemToClick() {
    return element(by.id('todoList')).all(by.css('div.list-group-item-action')).last();
  }
}
