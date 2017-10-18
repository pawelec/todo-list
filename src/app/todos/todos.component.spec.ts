import { TodosComponent } from './todos.component';
import { TodosInputComponent } from './input/todos-input.component';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";


describe('TodosComponent', function () {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ TodosComponent, TodosInputComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());
});
