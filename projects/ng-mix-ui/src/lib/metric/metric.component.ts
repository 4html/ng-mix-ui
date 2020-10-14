import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'metric',
    styleUrls: ['./metric.component.scss'],
    templateUrl: './metric.component.html'
})
export class MetricComponent implements OnInit, AfterViewInit {

    @Input() caption: string;
    @Input('style-caption') captionStyle: {};
    @Input() value: string;
    @Input('style-value') valueStyle: {};

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        const element = this.element.nativeElement;
        if (this.valueStyle) {
            Object.keys(this.valueStyle).forEach(key => {
                this.renderer.setStyle(element.children[1], key, this.valueStyle[key]);
            });
        }
        if (this.caption && this.captionStyle) {
            Object.keys(this.captionStyle).forEach(key => {
                this.renderer.setStyle(element.children[1], key, this.captionStyle[key]);
            });
        }
    }

}
