import { TodosComponent } from './todos.component';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";


describe('TodosComponent', function () {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ TodosComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());
});
