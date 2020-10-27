import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'metric',
    styleUrls: ['./metric.component.scss'],
    templateUrl: './metric.component.html'
})
export class MetricComponent {

    @Input() caption: string;
    @Input('style-caption') captionStyle: {};
    @Input() value: string;
    @Input('style-value') valueStyle: {};

    constructor() { }

}
