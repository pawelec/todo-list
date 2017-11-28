import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TodosInputComponent } from './todos-input.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('TodosInputComponent', function () {
    let component: TodosInputComponent;
    let fixture: ComponentFixture<TodosInputComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [ TodosInputComponent ],
            providers: [ FormBuilder ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosInputComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create component', () => expect(component).toBeDefined());

    it('input value should be empty at start', () => {
        const inputControl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputControl.value).toBe('');
    });

    it('input field should be invalid at start', () => {
        const inputControl = component.form.controls['thingToDo'];
        expect(inputControl.valid).toBeFalsy();
    });

    it('email field validity', () => {
        let errors = {};
        const inputControl = component.form.controls['thingToDo'];
        errors = inputControl.errors || {};
        expect(errors['required']).toBeTruthy();
      });

    it('form should be invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('input placeholder should be "enter thing to do"', () => {
        const inputControl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputControl.placeholder).toBe('enter thing to do');
    });

    it('submit invalid form should return false', () => {
        expect(component.onSubmit()).toBeFalsy();
    });

   it('submit valid form should emit string and return true', () => {
        const inputControl = component.form.controls['thingToDo'];
        inputControl.setValue('Some test value');

        expect(component.form.valid).toBeTruthy();
        let emitedItem: string;
        component.onInputSubmit.subscribe((value) => emitedItem = value);

        expect(component.onSubmit()).toBeTruthy();
        expect(emitedItem).toBe('Some test value');
        expect(inputControl.value).toBeNull();
   });
});
