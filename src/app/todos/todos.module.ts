// angular
import { NgModule } from "@angular/core";
// components
import { TodosComponent } from "./todos.component";
import { TodosInputComponent } from "./input/todos-input.component";
// services
import { TodosService } from "./todos.service";

@NgModule({
  declarations: [
    TodosComponent,
    TodosInputComponent
  ],
  providers: [
      TodosService
  ]
})

export class TodosModule {
}
