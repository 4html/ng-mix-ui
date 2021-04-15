import { Component, ElementRef, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GridService } from '../grid.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [GridService],
    selector: 'grid',
    styleUrls: ['./grid.component.scss'],
    templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {

    @Input('height-denom') heightDenom: string;
    @Input('height-scale') heightScale : string;
    @Input('width-denom') widthDenom: string;

    @HostListener('window:resize', [])
    onResize(): void {
        this.gridService.updateView();
    }

    constructor(private element: ElementRef,
                private gridService: GridService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.gridService.initCells(
            this.element.nativeElement.children,
            this.heightDenom,
            this.heightScale,
            this.widthDenom
        );
    }

}
