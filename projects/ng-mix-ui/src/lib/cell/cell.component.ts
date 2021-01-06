import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'cell',
    styleUrls: ['./cell.component.scss'],
    templateUrl: './cell.component.html'
})
export class CellComponent implements OnInit {

    alignActive = '';
    alignBreaks = [];

    @Input('align') alignValue: string;
    @Input() height: string;
    @Input() width: string;

    @HostBinding('style.align') align: string;
    @HostBinding('style.alignSelf') alignSelf: string;

    constructor() { }



    ngOnInit(): void {
        this.setAlignBreaks();
        this.setAlignActive();
        this.applyAlign();
    }



    setAlignBreaks(): void {
        if (!this.alignValue) return;
        const pairs = this.alignValue.split(' ');
        let pairSplit;
        this.alignBreaks = pairs.map(pair => {
            if (pair.match(/:/)) {
                pairSplit = pair.split(':');
                pairSplit[0] = isNaN(+pairSplit[0]) ? 0 : +pairSplit[0];
                return [pairSplit[0], pairSplit[1]];
            }
            return [0, pair];
        });
        this.alignBreaks = this.alignBreaks.sort((a, b) => a[0] > b[0] ? 1 : -1);
    }



    setAlignActive(): void {
        if (!this.alignValue) {
            return;
        }
        for (const pair of this.alignBreaks) {
            if (window.innerWidth < pair[0]) {
                break;
            }
            this.alignActive = pair[1];
        }
    }



    applyAlign(): void {
        switch (this.alignActive) {

            case 't':
            case 'top':
                this.alignSelf = 'flex-start';
                break;

            case 'm':
            case 'middle':
                this.alignSelf = 'center';
                break;

            case 'b':
            case 'bottom':
                this.alignSelf = 'flex-end';
                break;
        }
    }



}
