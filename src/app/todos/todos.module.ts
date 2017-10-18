// angular
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// components
import { TodosComponent } from "./todos.component";
import { TodosInputComponent } from "./input/todos-input.component";
// services
import { TodosService } from "./todos.service";

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
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
