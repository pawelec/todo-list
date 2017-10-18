// angular
import { Component } from "@angular/core";

@Component({
  templateUrl: './todos.component.html'
})

export class TodosComponent {
  onThingAdded(thingToDo: string) {
    console.log(thingToDo);
  }
}
