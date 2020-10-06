import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'metric',
    styleUrls: ['./metric.component.scss'],
    templateUrl: './metric.component.html'
})
export class MetricComponent implements OnInit, AfterViewInit {

    @Input() caption: string;
    @Input('caption-side') captionSide: string;
    @Input('style-caption') captionStyle: {};
    @Input() value: string;
    @Input('style-value') valueStyle: {};

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.captionSide = this.captionSide === 'top' ? 'top' : 'bottom';
    }

    ngAfterViewInit(): void {
        const element = this.element.nativeElement;
        if (this.valueStyle) {
            const index = this.caption && this.captionSide === 'top' ? 1 : 0;
            Object.keys(this.valueStyle).forEach(key => {
                this.renderer.setStyle(element.children[index], key, this.valueStyle[key]);
            });
        }
        if (this.caption && this.captionStyle) {
            const index = this.captionSide === 'top' ? 0 : 1;
            Object.keys(this.captionStyle).forEach(key => {
                this.renderer.setStyle(element.children[index], key, this.captionStyle[key]);
            });
        }
    }

}
