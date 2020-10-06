import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'flex-buttons',
    styleUrls: ['./flex-buttons.component.scss'],
    templateUrl: './flex-buttons.component.html'
})
export class FlexButtonsComponent implements AfterViewInit {

    @Input() space: number;

    constructor(private element: ElementRef, private renderer: Renderer2) { }



    ngAfterViewInit(): void {
        this.applySpace();
    }



    applySpace(): void {
        if (this.space) {
            for (const child of this.element.nativeElement.children) {
                this.renderer.setStyle(child, 'margin', this.space);
            }
        }
    }



}
