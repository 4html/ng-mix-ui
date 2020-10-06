import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

interface Cell {
    class?: string;
    colspan?: number|string;
    rowspan?: number|string;
    value: number|string;
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'data-table',
    styleUrls: ['./data-table.component.scss'],
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {

    @Input('thead-rows') tHeadRows: [Cell][] = [];
    @Input('tbody-rows') tBodyRows: [Cell][] = [];
    @Input('tfoot-rows') tFootRows: [Cell][] = [];

    constructor() { }

    ngOnInit(): void { }

}
