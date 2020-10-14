import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'tab',
    styleUrls: ['./tab.component.scss'],
    templateUrl: './tab.component.html'
})
export class TabComponent {

    @Input() title: string;

    constructor() { }

}
