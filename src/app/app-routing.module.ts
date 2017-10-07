// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// other

const routes: Routes = [
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
