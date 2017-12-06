// angular
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http/src/response";
// services
import { TodosService } from "./todos.service";
// models
import { Item } from "./models/item";

@Component({
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {
  thingsToDo: Item[];

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.get().subscribe(todos => this.thingsToDo = todos);
  }

  onThingAdded(thingToDo: string) {
    this.todosService.add(thingToDo).subscribe(
      data => {
        if (data !== null) {
          this.thingsToDo.push(data);
        }
      },
      (e: HttpErrorResponse) => {
        if (e.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', e.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${e.status}, body was: ${e.error}`);
        }
      });
  }

  onItemClicked(thingToDo: Item) {
    this.todosService.markAsDone(thingToDo.id).subscribe(
      data => { 
        thingToDo.isDone = data;
      },
      (e: HttpErrorResponse) => {
        if (e.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', e.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${e.status}, body was: ${e.error}`);
        }
      });
  }
}
