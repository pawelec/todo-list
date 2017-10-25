import { TodosListComponent } from './list/todos-list.component';
import { TodosComponent } from './todos.component';
import { TodosInputComponent } from './input/todos-input.component';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('TodosComponent', function () {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [ TodosComponent, TodosInputComponent, TodosListComponent ],
            providers: [ FormBuilder ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());
});
