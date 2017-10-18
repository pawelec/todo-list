import { TodosComponent } from './todos.component';
import { TodosInputComponent } from './input/todos-input.component';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('TodosComponent', function () {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ TodosComponent, TodosInputComponent ], 
            providers: [ FormBuilder ],             
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());
});
