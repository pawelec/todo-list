import { NgModule } from "@angular/core";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      PageNotFoundComponent
    ],
    exports: [
      HeaderComponent,
      FooterComponent,
      PageNotFoundComponent
    ]
})

export class SharedModule {
}
