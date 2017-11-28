// angular
import { Component } from "@angular/core";
// services
import { TodosService } from "./todos.service"; 
// models
import { Item } from "./models/item";

@Component({
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent {
  thingsToDo: Item[];

  constructor(private  todosService: TodosService) {
    this.thingsToDo = this.todosService.get();
  }

  onThingAdded(thingToDo: string) {
    this.todosService.add(thingToDo);
  }

  onItemClicked(thingToDo: Item) {
    this.todosService.markAsDone(thingToDo.id);
  }
}
