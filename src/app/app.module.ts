// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modules
import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// other


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
