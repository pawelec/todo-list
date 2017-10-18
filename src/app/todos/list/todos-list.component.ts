// angular
import { Component, Input } from "@angular/core";
// models
import { Item } from "../models/item";

@Component({
    selector: 'todos-list',
    templateUrl: './todos-list.component.html'
})

export class TodosListComponent {
    @Input() thingsToDo: Item[];
}