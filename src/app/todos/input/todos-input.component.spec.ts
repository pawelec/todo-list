import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { TodosInputComponent } from './todos-input.component';
import { FormBuilder } from '@angular/forms';

describe('TodosInputComponent', function () {
    let component: TodosInputComponent;
    let fixture: ComponentFixture<TodosInputComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ TodosInputComponent ],
            providers: [ FormBuilder ], 
            schemas: [ NO_ERRORS_SCHEMA ]
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
        expect(inputControl.placeholder).toBe('enter thing to do');        
    });
});
