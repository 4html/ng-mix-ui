import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'statement',
    styleUrls: ['./statement.component.scss'],
    templateUrl: './statement.component.html'
})
export class StatementComponent implements AfterViewInit {

    @Input() title: string;
    @Input('style-content') contentStyle: {};
    @Input('style-title') titleStyle: {};

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        const element = this.element.nativeElement;
        if (this.titleStyle) {
            Object.keys(this.titleStyle).forEach(key => {
                this.renderer.setStyle(element.children[0], key, this.titleStyle[key]);
            });
        }
        if (this.contentStyle) {
            Object.keys(this.contentStyle).forEach(key => {
                this.renderer.setStyle(element.children[1], key, this.contentStyle[key]);
            });
        }
    }

}
