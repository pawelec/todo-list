import { Component } from "@angular/core";

@Component({
    selector: 'footer-component',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})

export class FooterComponent {
    readonly linkText: string = '2017 Paweł Pawelec';
    readonly linkUrl: string = 'https://github.com/pawelec';
}