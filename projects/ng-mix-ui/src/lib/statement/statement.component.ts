import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'statement',
    styleUrls: ['./statement.component.scss'],
    templateUrl: './statement.component.html'
})
export class StatementComponent {

    @Input() title: string;
    @Input('style-content') contentStyle: {};
    @Input('style-title') titleStyle: {};

    constructor() { }

}
