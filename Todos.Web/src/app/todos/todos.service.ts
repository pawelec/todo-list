import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class TodosService {
    constructor(private http: HttpClient) {
    }

    public get(): Observable<Item[]> {
        return this.http.get<Item[]>('/api/todos')
            .catch(error => {
                return Observable.throw('An error occurred');
            });
    }

    public add(name: string): Observable<Item> {
        if (name) {
            return this.http.post<Item>('/api/todos', { value: name })
                .catch(error => {
                    return Observable.throw('An error occurred');
                });;
        } else {
            return null;
        }
    }

    public markAsDone(id: number): Observable<boolean> {
        return this.http.put<boolean>('/api/todos/' + id, "")
            .catch(error => {
                return Observable.throw('An error occurred');
            });
    }
}