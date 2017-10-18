import { TestBed, ComponentFixture, async } from "@angular/core/testing";
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
});
