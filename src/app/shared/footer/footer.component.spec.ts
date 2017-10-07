import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {

  let componentInstance:    FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let de:      DebugElement;
  let a, paragraph:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);

    componentInstance = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('a'));
    a = de.nativeElement;
    de = fixture.debugElement.query(By.css('p'));
    paragraph = de.nativeElement;
  });

  it('should create component', () => expect(componentInstance).toBeDefined());

  it("should display link with href to author github", () => {
    fixture.detectChanges();
    expect(a.href).toContain(componentInstance.linkUrl);
  });

  it('should display author name', () => {
    fixture.detectChanges();
    expect(paragraph.textContent).toContain(componentInstance.linkText);
  });
});