import { Component } from "@angular/core";

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
    readonly title: string = 'TODOS';
    readonly subtitle: string = 'It\'s a place where you can write list your items to do';
}
