import { AppComponent } from "./app.component";

import { TestBed, ComponentFixture, async } from "@angular/core/testing";


describe('AppComponent', function () {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });
    
    it('should create component', () => expect(component).toBeDefined());
});