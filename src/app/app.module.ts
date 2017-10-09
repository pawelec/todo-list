// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { TodosModule } from "./todos/todos.module";
// components
import { AppComponent } from './app.component';
// other


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    TodosModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
