import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { TodosListComponent } from "./todos-list.component";

describe('TodosListComponent', function () {
    let component: TodosListComponent;
    let fixture: ComponentFixture<TodosListComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ TodosListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosListComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => expect(component).toBeDefined());
});
