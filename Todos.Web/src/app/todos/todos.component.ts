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

  constructor(private todosService: TodosService) {
    this.getTodos();
  }

  private getTodos() {
    this.todosService.get().subscribe(todos => this.thingsToDo = todos);
  }
  onThingAdded(thingToDo: string) {
    this.todosService.add(thingToDo).subscribe(success => {
      if (success) {
        this.getTodos();
      }
    });
  }

  onItemClicked(thingToDo: Item) {
    this.todosService.markAsDone(thingToDo.id);
  }
}
