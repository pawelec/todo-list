import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item';

@Injectable()
export class TodosService {
    private items: Item[];
    private lastItemId: number;

    constructor(private http: HttpClient) {
        this.items = new Array<Item>();
        this.lastItemId = -1;
    }

    public get(): Item[] {
        return this.items;
    }

    public getById(id: number): Item {
        let item = this.items.find(item => item.id === id);
        return item ? item : null;
    }

    public add(name: string): boolean {
        if(name) {
            this.http.post('/api/todos', { value: name }).subscribe(response => {
                if(response.value === name) {
                    this.items.push({
                        id: this.lastItemId,
                        name: name,
                        created: new Date(),
                        isDone: false
                    });
                    return true;
                }
            });
        }
        return false;
    }

    public remove(item: Item): boolean {
        if(item) {
            let itemIndex = this.items.findIndex(i => i.id === item.id);
            if(itemIndex !== -1) {
                this.items.splice(itemIndex, 1);
                return true;
            }
        }
        return false;
    }

    public markAsDone(id: number): boolean {
        let item = this.items.find(item => item.id === id);
        if(item) {
            item.isDone = true;
            return true;
        }
        return false;
    }

    public edit(item: Item): boolean {
        let itemToEdit = this.items.find(i => i.id === item.id);
        if(itemToEdit) {
            itemToEdit.name = item.name;
            return true;
        }
        return false;
    }

    public clear() {
        this.items = [];
        this.lastItemId = -1;
    }
}