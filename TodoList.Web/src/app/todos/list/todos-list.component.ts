// angular
import { Component, Input, Output, EventEmitter } from "@angular/core";
// models
import { Item } from "../models/item";

@Component({
    selector: 'todos-list',
    templateUrl: './todos-list.component.html',
    styleUrls: ['./todos-list.component.css']
})

export class TodosListComponent {
    @Input() thingsToDo: Item[];
    @Output() onItemClicked = new EventEmitter<Item>();

    click(thingToDo: Item) {
        this.onItemClicked.emit(thingToDo);
    }
}
