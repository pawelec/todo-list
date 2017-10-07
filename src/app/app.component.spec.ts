import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";


describe('AppComponent', function () {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas:      [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });
    
    it('should create component', () => expect(component).toBeDefined());
});