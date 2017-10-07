import { Injectable } from '@angular/core';
import { Item } from './models/item';

@Injectable()
export class TodosService {
    private items: Item[];

    constructor() {
        this.items = new Array<Item>();
    }

    public getItems(): Item[] {
        return this.items;
    }

    public addItem(newItem: Item): boolean {
        if(newItem) {
            this.items.push(newItem);
            return true;
        }
        return false;
    }
}