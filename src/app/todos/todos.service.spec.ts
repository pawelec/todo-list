// Straight Jasmine - no imports from Angular test libraries
import { TodosService } from "./todos.service";
import { Item } from "./models/item";

describe('Todos Service', () => {
    let service: TodosService;

    beforeEach(() => this.service = new TodosService());

    // get
    it('after init getItems() should return empty list', () => {
        // arrange
        let expectedItemsCount = 0;
        let actualItemsCount: number;

        // act
        actualItemsCount = this.service.getItems().length;

        // assert
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    // add
    it('add undefined item should return false', () => {
        // arrange
        let newItem: Item = undefined;
        let addItemResult: boolean;
        let expectedItemsCount = this.service.getItems().length;
        let actualItemsCount: number;        

        // act
        addItemResult = this.service.addItem(newItem);
        actualItemsCount = this.service.getItems().length;

        // assert
        expect(addItemResult).toBeFalsy();
        expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('add null item should return false', () => {
         // arrange
         let newItem: Item = null;
         let addItemResult: boolean;
         let expectedItemsCount = this.service.getItems().length;
         let actualItemsCount: number;
 
         // act
         addItemResult = this.service.addItem(newItem);
         actualItemsCount = this.service.getItems().length;
 
         // assert
         expect(addItemResult).toBeFalsy();
         expect(actualItemsCount).toBe(expectedItemsCount);
    });

    it('add valid item should return true', () => {
         // arrange
         let newItem: Item = { name: 'Test name' };
         let addItemResult: boolean;
         let expectedItemsCount = this.service.getItems().length;
         let actualItemsCount: number;
 
         // act
         addItemResult = this.service.addItem(newItem);
         actualItemsCount = this.service.getItems().length;

         // assert
         expect(addItemResult).toBeTruthy();
         expect(actualItemsCount).toBeGreaterThan(expectedItemsCount);
    });

    // remove

});