// angular
import { Component } from "@angular/core";

@Component({
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent {
  onThingAdded(thingToDo: string) {
    console.log(thingToDo);
  }
}
