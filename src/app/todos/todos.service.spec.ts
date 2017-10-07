// Straight Jasmine - no imports from Angular test libraries
import { TodosService } from "./todos.service";
import { Item } from "./models/item";

describe('Todos Service', () => {
    let service: TodosService;

    beforeEach(() => this.service = new TodosService());

    it('should create service', () => expect(this.service).toBeDefined());

    // get
    it('after init getItems() should return empty list', () => {
        // arrange
        let expectedItemsCount = 0;
        let actualItemsCount: number;

        // act
        actualItemsCount = this.service.get().length;

        // assert
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('get item by undefined id should return null', () => {
        // arrange
        let itemId = undefined;
        let item: Item;

        // act
        item = this.service.getById(itemId);

        // assert
        expect(item).toBeNull();
    });

    it('get item by null id should return null', () => {
        // arrange
        let itemId = null;
        let item: Item;

        // act
        item = this.service.getById(itemId);

        // assert
        expect(item).toBeNull();
    });

    it('get item by id if not exist should return null', () => {
        // arrange
        let itemId = 0;
        let item: Item;

        // act
        item = this.service.getById(itemId);

        // assert
        expect(item).toBeNull();
    });

    it('get item by id if exist should return item', () => {
        // arrange
        let itemId = 0;
        this.service.add({id: 0, name: 'Test'});
        let item: Item;

        // act
        item = this.service.getById(itemId);

        // assert
        expect(item).toBeDefined();
        expect(item.id).toBe(itemId);
    });

    // add
    it('add undefined item should return false', () => {
        // arrange
        let newItem: Item = undefined;
        let addItemResult: boolean;
        let expectedItemsCount = this.service.get().length;
        let actualItemsCount: number;        

        // act
        addItemResult = this.service.add(newItem);
        actualItemsCount = this.service.get().length;

        // assert
        expect(addItemResult).toBeFalsy();
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('add null item should return false', () => {
         // arrange
         let newItem: Item = null;
         let addItemResult: boolean;
         let expectedItemsCount = this.service.get().length;
         let actualItemsCount: number;
 
         // act
         addItemResult = this.service.add(newItem);
         actualItemsCount = this.service.get().length;
 
         // assert
         expect(addItemResult).toBeFalsy();
         expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('add valid item should return true', () => {
         // arrange
         let newItem: Item = { id: 1, name: 'Test name' };
         let addItemResult: boolean;
         let expectedItemsCount = this.service.get().length;
         let actualItemsCount: number;
 
         // act
         addItemResult = this.service.add(newItem);
         actualItemsCount = this.service.get().length;

         // assert
         expect(addItemResult).toBeTruthy();
         expect(actualItemsCount).toBeGreaterThan(expectedItemsCount);
    });

    // remove
    it('remove undefined item should return false', () => {
        // arrange
        let itemToRemove: Item = undefined;
        let operationResult: boolean;
        this.service.add({name: 'Item to delete'});
        let expectedItemsCount = this.service.get().length;
        let actualItemsCount: number;

        // act
        operationResult = this.service.remove(itemToRemove);
        actualItemsCount = this.service.get().length;

        // assert
        expect(operationResult).toBeFalsy();
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('remove null item should return false', () => {
        // arrange
        let itemToRemove: Item = null;
        let operationResult: boolean;
        this.service.add({name: 'Item to delete'});
        let expectedItemsCount = this.service.get().length;
        let actualItemsCount: number;

        // act
        operationResult = this.service.remove(itemToRemove);
        actualItemsCount = this.service.get().length;

        // assert
        expect(operationResult).toBeFalsy();
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('remove item that is not in collection should return false', () => {
        // arrange
        let itemToRemove: Item = {id: 1, name: 'Item0'};
        let operationResult: boolean;
        this.service.add({name: 'Item1'});
        let expectedItemsCount = this.service.get().length;
        let actualItemsCount: number;

        // act
        operationResult = this.service.remove(itemToRemove);
        actualItemsCount = this.service.get().length;

        // assert
        expect(operationResult).toBeFalsy();
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('remove item that is in collection should return true', () => {
        // arrange
        let item: Item = {id: 1, name: 'Item'};
        this.service.add(item);
        let startItemsCount = this.service.get().length;
        let operationResult: boolean;
        let actualItemsCount: number;

        // act
        operationResult = this.service.remove(item);
        actualItemsCount = this.service.get().length;

        // assert
        expect(operationResult).toBeTruthy();
        expect(actualItemsCount).toBeLessThan(startItemsCount);
    });

    // edit
    it('mark as done if item not exist should return false', () => {
        // arrange
        let itemId = 0;
        let actualResult: boolean;

        // act
        this.actualResult = this.service.markAsDone(itemId);

        // assert
        expect(actualResult).toBeFalsy();
    });

    it('mark as done if item exist should return true', () => {
          // arrange
          let itemId = 0;
          let actualResult: boolean;
          this.service.add({id: 0, name: 'Test'});
  
          // act
          actualResult = this.service.markAsDone(itemId);

          // assert
          expect(actualResult).toBeTruthy();
    });

    it('edit if item do not exist should return false', () => {
        // arrange
        let item: Item = { id: 0, name: 'Name 1'};
        this.service.add(item);
        let actualResult: boolean;

        // act
        actualResult = this.service.edit({id: 1, name: 'Name 2'});

        // assert
        expect(actualResult).toBeFalsy();
        expect(item.name).toBe('Name 1');
    });

    it('edit if item do exist should update and return true', () => {
        // arrange
        let item: Item = { id: 0, name: 'Name 1'};
        this.service.add(item);
        let actualResult: boolean;

        // act
        actualResult = this.service.edit({id: 0, name: 'Name 2'});

        // assert
        expect(actualResult).toBeTruthy();
        expect(item.name).toBe('Name 2');
    });

    it('clear should remove all items', () => {
        // arrange
        this.service.add({id: 0, name: 'Name 1'});
        let actualCount = this.service.get().length;
        let expectedCount = 0;

        // act
        this.service.clear();
        actualCount = this.service.get().length;

        // assert
        expect(actualCount).toBe(expectedCount);
    })
});