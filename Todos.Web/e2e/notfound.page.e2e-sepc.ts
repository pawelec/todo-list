import { NotFoundPage } from './notfound.page';

describe('Todos app - home page', function () {
  let page;

  beforeEach(() => {
    page = new NotFoundPage();
    page.navigateTo();
  });
});
