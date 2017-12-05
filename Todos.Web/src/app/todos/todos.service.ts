import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class TodosService {
    private items: Item[];
    private lastItemId: number;

    constructor(private http: HttpClient) {
        this.items = new Array<Item>();
        this.lastItemId = -1;
    }

    public get(): Observable<Item[]> {
        return this.http.get('/api/todos').map(response => <Item[]>response);
    }

    public getById(id: number): Item {
        let item = this.items.find(item => item.id === id);
        return item ? item : null;
    }

    public add(name: string): Observable<boolean> {
        if(name) {
            return this.http.post('/api/todos', { value: name })
                .map(response => {
                    var item = <Item>response;
                    return item !== null;
                });
        }
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