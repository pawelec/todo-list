// angular
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
// components
import { TodosComponent } from "./todos.component";
import { TodosInputComponent } from "./input/todos-input.component";
import { TodosListComponent } from "./list/todos-list.component";
// services
import { TodosService } from "./todos.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    TodosComponent,
    TodosInputComponent,
    TodosListComponent
  ],
  providers: [
      TodosService
  ]
})

export class TodosModule {
}
