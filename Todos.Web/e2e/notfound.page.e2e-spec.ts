import { NotFoundPage } from './notfound.page';

describe('Todos app - not found page', function () {
  let page;

  beforeAll(() => {
    page = new NotFoundPage();
    page.navigateTo();
  });

  it('title should be set', function () {
    expect(page.getHeader()).toBe('Ups... 404!');
  });

  it('explanation should be set', function () {
    expect(page.getExplanation()).toBe('Requested page not found');
  });

});
