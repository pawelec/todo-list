// angular
import { NgModule } from "@angular/core";
// components
import { TodosComponent } from "./todos.component";
// services
import { TodosService } from "./todos.service";

@NgModule({
  declarations: [
    TodosComponent
  ],
  providers: [
      TodosService
  ]
})

export class TodosModule {
}
