import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {

  let componentInstance:    PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let de:      DebugElement;
  let header, paragraph:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);

    componentInstance = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    header = de.nativeElement;
    de = fixture.debugElement.query(By.css('p'));
    paragraph = de.nativeElement;
  });

  it('should create component', () => expect(componentInstance).toBeDefined());
  
  it("should display title", () => {
    fixture.detectChanges();
    expect(header.textContent).toContain(componentInstance.title);
  });

  it('should display explanation', () => {
    fixture.detectChanges();
    expect(paragraph.textContent).toContain(componentInstance.explanation);
  });
});