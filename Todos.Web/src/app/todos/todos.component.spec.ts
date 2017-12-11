import { TodosListComponent } from './list/todos-list.component';
import { TodosComponent } from './todos.component';
import { TodosInputComponent } from './input/todos-input.component';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodosService } from "./todos.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TodosComponent', function () {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let todosService: TodosService;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
            declarations: [ TodosComponent, TodosInputComponent, TodosListComponent ],
            providers: [ FormBuilder, TodosService ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());
});
