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

  it('should have input element with placeholder', function () {
    expect(page.getTextInput().getAttribute('placeholder')).toBe('type thing to do and press enter to add');
  })

  it('should add new todo', function () {
    // Arrange
    let expectedTodosCount = 0;
    let actualTodosCount = 0;

    // Act
    page.getTodoList().then(function(count) {
      expectedTodosCount = count + 1;
    });

    var input = page.getTextInput();
    input.sendKeys('todo one');

    var form = page.getForm();
    form.submit();

    page.getTodoList().then(function(count) {
      actualTodosCount = count;
    });

    // Assert
    expect(actualTodosCount).toBe(expectedTodosCount);
  });
});
