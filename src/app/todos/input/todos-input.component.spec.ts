import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { TodosInputComponent } from './todos-input.component';

describe('TodosInputComponent', function () {
    let component: TodosInputComponent;
    let fixture: ComponentFixture<TodosInputComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ TodosInputComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosInputComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());

    it('input value should be empty at start', () => {
        let inputControl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputControl.value).toBe('');
    });

    it('input placeholder should be "enter thing to do"', () => {
        let inputControl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputControl.placeholder).toBe(component.inputPlaceholder);        
    });
});
