import { Component } from "@angular/core";

@Component({
    templateUrl: './page-not-found.component.html'
})

export class PageNotFoundComponent {
    readonly title: string = 'Ups... 404!';
    readonly explanation: string = 'Requested page not found';
}