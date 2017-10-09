import { NgModule } from "@angular/core";

import { FooterComponent } from "./footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
    declarations: [
        FooterComponent,
        PageNotFoundComponent
    ], 
    exports: [
        FooterComponent, 
        PageNotFoundComponent
    ]
})

export class SharedModule {
}