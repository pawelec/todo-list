import { HomePage } from './home.page'
import { debug } from 'util';
import { browser } from 'protractor';

describe('Todos app - home page', function () {
  let page;

  beforeAll(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should have a title', function () {
    expect(page.getTitle()).toEqual('Todo list');
  });

  it('should have a header title', function () {
    expect(page.getHeadingText()).toEqual('TODOS');
  });

  it('should have a header description', function () {
    expect(page.getHeadingDescription()).toEqual("It's a place where you can write list your items to do");
  });

  it('should have a footer link', function () {
    expect(page.getFooterLink()).toEqual('https://github.com/pawelec');
  });

  it('should have a footer link description', function () {
    expect(page.getFooterDescription()).toBe('© 2017 Paweł Pawelec');
  });
});
