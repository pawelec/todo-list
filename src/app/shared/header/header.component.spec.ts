import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  let componentInstance:    HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de:      DebugElement;
  let title, subtitle:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);

    componentInstance = fixture.componentInstance;
  });

  it('should create component', () => expect(componentInstance).toBeDefined());

  it('title should be name of app', () => {
    // arrange
    de = fixture.debugElement.query(By.css('h1'));
    title = de.nativeElement;
    // act
    fixture.detectChanges();
    // assert
    expect(title.innerText).toBe(componentInstance.title);
  });

  it('subtitle should be from component', () => {
    // arrange
    de = fixture.debugElement.query(By.css('p'));
    subtitle = de.nativeElement;
    // act
    fixture.detectChanges();
    // assert
    expect(subtitle.textContent).toBe(componentInstance.subtitle);
  });
});
