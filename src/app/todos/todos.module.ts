import { NgModule } from "@angular/core";

import { TodosService } from "./todos.service";

@NgModule({
    providers: [
        TodosService
    ]
})

export class TodosModule {
    
}