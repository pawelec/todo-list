import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TodosService } from "./todos.service";
import { Item } from "./models/item";

describe('Todos Service', () => {
    let service: TodosService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                TodosService
            ]
        });

        service = TestBed.get(TodosService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    // it('should create service', () => expect(this.service).toBeDefined());

    it('get - return array of todos',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            const mockResponse = [
                {
                    id: 1,
                    name: 'Test1',
                    isDone: false,
                    created: new Date()
                }
            ];

            service.get().subscribe(
                data => {
                    expect(data.length).toBe(1);
                    expect(data[0].name).toBe("Test1");
                }
            );

            const req = httpMock.expectOne('/api/todos');
            expect(req.request.method).toEqual('GET');

            req.flush(mockResponse);
        }));

    it('get - should throw with an error message when API returns an error',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service.get()
                .catch(actualError => {
                    expect(Observable.of(actualError)).toBeTruthy();
                    expect(actualError).toBeTruthy();
                    return Observable.of(actualError);
                })
                .subscribe();

            const req = httpMock.expectOne('/api/todos');
            expect(req.request.method).toEqual('GET');

            req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
        }));


    // // get
    // it('after init getItems() should return empty list', () => {
    //     // arrange
    //     let expectedItemsCount = 0;
    //     let actualItemsCount: number;

    //     // act
    //     actualItemsCount = this.service.get().length;

    //     // assert
    //     expect(actualItemsCount).toBe(expectedItemsCount);
    // });

    // it('get item by undefined id should return null', () => {
    //     // arrange
    //     let itemId = undefined;
    //     let item: Item;

    //     // act
    //     item = this.service.getById(itemId);

    //     // assert
    //     expect(item).toBeNull();
    // });

    // it('get item by null id should return null', () => {
    //     // arrange
    //     let itemId = null;
    //     let item: Item;

    //     // act
    //     item = this.service.getById(itemId);

    //     // assert
    //     expect(item).toBeNull();
    // });

    // it('get item by id if not exist should return null', () => {
    //     // arrange
    //     let itemId = 0;
    //     let item: Item;

    //     // act
    //     item = this.service.getById(itemId);

    //     // assert
    //     expect(item).toBeNull();
    // });

    // it('get item by id if exist should return item', () => {
    //     // arrange
    //     let name = 'Test 1';
    //     this.service.add(name);
    //     let item: Item;

    //     // act
    //     item = this.service.getById(0);

    //     // assert
    //     expect(item).toBeDefined();
    //     expect(item.id).toBe(0);
    // });

    // // add
    // it('add undefined should return false', () => {
    //     // arrange
    //     let newItem: string = undefined;
    //     let addItemResult: boolean;
    //     let expectedItemsCount = this.service.get().length;
    //     let actualItemsCount: number;        

    //     // act
    //     addItemResult = this.service.add(newItem);
    //     actualItemsCount = this.service.get().length;

    //     // assert
    //     expect(addItemResult).toBeFalsy();
    //     expect(actualItemsCount).toBe(expectedItemsCount);
    // });

    // it('add null item should return false', () => {
    //      // arrange
    //      let newItem: string = null;
    //      let addItemResult: boolean;
    //      let expectedItemsCount = this.service.get().length;
    //      let actualItemsCount: number;

    //      // act
    //      addItemResult = this.service.add(newItem);
    //      actualItemsCount = this.service.get().length;

    //      // assert
    //      expect(addItemResult).toBeFalsy();
    //      expect(actualItemsCount).toBe(expectedItemsCount);
    // });

    // it('add valid item should return true', () => {
    //      // arrange
    //      let newItem: string = 'Test 1'
    //      let addItemResult: boolean;
    //      let expectedItemsCount = this.service.get().length;
    //      let actualItemsCount: number;

    //      // act
    //      addItemResult = this.service.add(newItem);
    //      actualItemsCount = this.service.get().length;

    //      // assert
    //      expect(addItemResult).toBeTruthy();
    //      expect(actualItemsCount).toBeGreaterThan(expectedItemsCount);
    // });

    // // remove
    // it('remove undefined item should return false', () => {
    //     // arrange
    //     let itemToRemove: Item = undefined;
    //     let operationResult: boolean;
    //     this.service.add('Item to delete');
    //     let expectedItemsCount = this.service.get().length;
    //     let actualItemsCount: number;

    //     // act
    //     operationResult = this.service.remove(itemToRemove);
    //     actualItemsCount = this.service.get().length;

    //     // assert
    //     expect(operationResult).toBeFalsy();
    //     expect(actualItemsCount).toBe(expectedItemsCount);
    // });

    // it('remove null item should return false', () => {
    //     // arrange
    //     let itemToRemove: Item = null;
    //     let operationResult: boolean;
    //     this.service.add('Item to delete');
    //     let expectedItemsCount = this.service.get().length;
    //     let actualItemsCount: number;

    //     // act
    //     operationResult = this.service.remove(itemToRemove);
    //     actualItemsCount = this.service.get().length;

    //     // assert
    //     expect(operationResult).toBeFalsy();
    //     expect(actualItemsCount).toBe(expectedItemsCount);
    // });

    // it('remove item that is not in collection should return false', () => {
    //     // arrange
    //     this.service.add('Item1');
    //     let expectedItemsCount = this.service.get().length;
    //     let actualItemsCount: number;
    //     let operationResult: boolean;

    //     // act
    //     operationResult = this.service.remove({id: 5, name: 'false'});
    //     actualItemsCount = this.service.get().length;

    //     // assert
    //     expect(operationResult).toBeFalsy();
    //     expect(actualItemsCount).toBe(expectedItemsCount);
    // });

    // it('remove item that is in collection should return true', () => {
    //     // arrange
    //     this.service.add('Name 1');
    //     let startItemsCount = this.service.get().length;
    //     let operationResult: boolean;
    //     let actualItemsCount: number;

    //     // act
    //     let item = this.service.getById(0);
    //     operationResult = this.service.remove(item);
    //     actualItemsCount = this.service.get().length;

    //     // assert
    //     expect(operationResult).toBeTruthy();
    //     expect(actualItemsCount).toBeLessThan(startItemsCount);
    // });

    // // edit
    // it('mark as done if item not exist should return false', () => {
    //     // arrange
    //     let itemId = 0;
    //     let actualResult: boolean;

    //     // act
    //     this.actualResult = this.service.markAsDone(itemId);

    //     // assert
    //     expect(actualResult).toBeFalsy();
    // });

    // it('mark as done if item exist should return true', () => {
    //     // arrange
    //     let itemId = 0;
    //     let actualResult: boolean;
    //     this.service.add('Name 1');

    //     // act
    //     actualResult = this.service.markAsDone(itemId);
    //     let item = this.service.getById(itemId);

    //     // assert
    //     expect(actualResult).toBeTruthy();
    //     expect(item.isDone).toBeTruthy();
    // });

    // it('edit if item do not exist should return false', () => {
    //     // arrange
    //     this.service.add('Name 1');
    //     let actualResult: boolean;

    //     // act
    //     let item = this.service.getById(0);
    //     actualResult = this.service.edit({id: 1, name: 'Name 2'});

    //     // assert
    //     expect(actualResult).toBeFalsy();
    //     expect(item.name).toBe('Name 1');
    // });

    // it('edit if item do exist should update and return true', () => {
    //     // arrange
    //     this.service.add('Name 1');
    //     let actualResult: boolean;

    //     // act
    //     let item = this.service.getById(0);
    //     item.name = "Name 2";
    //     actualResult = this.service.edit(item);

    //     // assert
    //     expect(actualResult).toBeTruthy();
    //     expect(item.name).toBe('Name 2');
    // });

    // it('clear should remove all items', () => {
    //     // arrange
    //     this.service.add('Name 1');
    //     let expectedCount = 0;

    //     // act
    //     let actualCount = this.service.get().length;
    //     this.service.clear();
    //     actualCount = this.service.get().length;

    //     // assert
    //     expect(actualCount).toBe(expectedCount);
    // })
});