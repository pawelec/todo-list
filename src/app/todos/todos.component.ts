// angular
import { Component } from "@angular/core";
// models
import { Item } from "./models/item";

@Component({
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent {
  thingsToDo: Item[];

  constructor() {
    this.thingsToDo = [];
  }

  onThingAdded(thingToDo: string) {
    console.log(thingToDo);
    this.thingsToDo.push({
      id: 0,
      name: thingToDo,
      created: new Date(),
      isDone: false
    });
  }
}
