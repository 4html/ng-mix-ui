import { Injectable } from '@angular/core';

const DEFAULT_DENOMINATOR = 12;

@Injectable({
    providedIn: 'root'
})
export class GridService {

    breakHeights: [number, string|number][];
    breakHeightScales: [number, string|number][];
    breaks: { heights: [number, string|number][], widths: [number, string|number][] }[];
    breakWidths: [number, string|number][];
    cellElements: HTMLElement[];
    cellPropValues: { height: string, width: string }[];
    cellStyles: { height: string, width: string }[];
    cellRowIndexes: {};
    currentCellValues: { height: string, width: string }[];
    heightDenom: number = DEFAULT_DENOMINATOR;
    heightScale: string;
    heightScaleCurrent: number;
    rowFixedTotals: number[];
    widthDenom: number = DEFAULT_DENOMINATOR;

    constructor() { }



    initCells(cellElements: HTMLElement[], heightDenom: string, heightScale: string, widthDenom: string): void {

        this.heightDenom = heightDenom ? +heightDenom : DEFAULT_DENOMINATOR;
        this.heightScale = heightScale;
        this.widthDenom = widthDenom ? +widthDenom : DEFAULT_DENOMINATOR;
        this.cellElements = Array.from(cellElements) || [];

        this.readHeightScales();
        this.readCellProps();
        this.readBreaks();
        this.updateView();
    }



    readHeightScales(): void {
        if (!this.heightScale) {
            this.heightScaleCurrent = 1;
            return;
        }
        this.heightScale = this.trim(this.heightScale);
        this.breakHeightScales = this.splitBreaks(this.heightScale);
        this.breakHeightScales = this.breakHeightScales.sort((a, b) => a[0] > b[0] ? 1 : -1);
    }



    getCurrentHeightScaleBreak(): void {
        if (!this.heightScale) {
            this.heightScaleCurrent = 1;
            return;
        }
        let heightScale = 1;
        for (const pair of this.breakHeightScales) {
            if (window.innerHeight >= pair[0]) {
                heightScale = +pair[1];
            } else {
                break;
            }
        }
        this.heightScaleCurrent = heightScale;
    }



    readCellProps(): void {

        let strippedHeight;
        let strippedWidth;
        this.cellPropValues = [];

        this.cellElements.forEach(cell => {
            strippedHeight = cell.attributes['height'] ? cell.attributes['height'].value : '';
            strippedWidth = cell.attributes['width'] ? cell.attributes['width'].value : '';
            this.cellPropValues.push({
                height: this.trim(strippedHeight),
                width: this.trim(strippedWidth)
            });
        });
    }



    trim(value: string): string {
        while (value.match(/\s\s/)) {
            value = value.replace(/\s\s/, ' ');
        }
        value = value.replace(/^\s/, '');
        value = value.replace(/\s$/, '');
        return value;
    }



    readBreaks(): void {
        this.breaks = [];

        this.cellPropValues.forEach(({ height, width }) => {

            this.breakHeights = [];
            this.breakWidths = [[0, this.widthDenom]];

            if (height) {
                this.breakHeights = this.splitBreaks(height);
                this.breakHeights = this.breakHeights
                    .sort((a, b) => a[0] > b[0] ? 1 : -1);
            }

            if (width) {
                this.breakWidths = this.splitBreaks(width);
                this.breakWidths = this.breakWidths
                    .sort((a, b) => a[0] > b[0] ? 1 : -1);
            }

            this.breaks.push({
                heights: this.breakHeights,
                widths: this.breakWidths
            });
        });
    }



    splitBreaks(value: string): [number, string][] {
        const pairs = value.split(' ');
        let pairSplit;
        return pairs.map(pair => {
            if (pair.match(/:/)) {
                pairSplit = pair.split(':');
                pairSplit[0] = isNaN(+pairSplit[0]) ? 0 : +pairSplit[0];
                pairSplit[1] = !pairSplit[1] ? 0 : pairSplit[1];
                return [pairSplit[0], pairSplit[1]];
            }
            return [0, pair];
        });
    }



    updateView(): void {
        this.getCurrentBreakValues();
        this.getCurrentHeightScaleBreak();
        this.setCalcValues();
        this.applyStyles();
    }



    getCurrentBreakValues(): void {

        let endRow;
        let rowFixedRunner = 0;
        let rowFlexRunner = 0;
        let rowIndex = 0;

        this.cellRowIndexes = [];
        this.currentCellValues = [];
        this.rowFixedTotals = [];

        if (this.breaks) {
            this.breaks.forEach((cell, index) => {

                let height = this.processPairHeights(cell);
                let width = this.processPairWidths(cell);

                if (height && !height.match(/px/) && !height.match(/%/) && !height.match(/\//)) {
                    height = (+height / this.heightDenom * 100) + '%';
                }

                if (width.match(/!/)) {
                    endRow = true;
                    width = width.replace('!', '');
                }

                if (width.match(/px/)) {
                    rowFixedRunner += +width.replace('px', '');
                } else {
                    if (rowFlexRunner === 1) {
                        this.rowFixedTotals.push(rowFixedRunner);
                        rowIndex++;
                        rowFlexRunner = 0;
                        rowFixedRunner = 0;
                    }
                    rowFlexRunner += +width / this.widthDenom;
                    width = (+width / this.widthDenom * 100) + '%';
                }

                this.cellRowIndexes[index] = rowIndex;

                if (endRow) {
                    this.rowFixedTotals.push(rowFixedRunner);
                    rowIndex++;
                    endRow = false;
                    rowFlexRunner = 0;
                    rowFixedRunner = 0;
                }

                this.currentCellValues.push({ height, width });
            });
        }

        this.rowFixedTotals.push(rowFixedRunner);

    }



    processPairHeights(cell): string {
        const windowWidth = window.innerWidth;
        let height = '';
        for (const pair of cell.heights) {
            if (windowWidth >= pair[0]) {
                height = pair[1];
            } else {
                break;
            }
        }
        return height.toString();
    }



    processPairWidths(cell): string {
        const windowWidth = window.innerWidth;
        let width = DEFAULT_DENOMINATOR;
        for (const pair of cell.widths) {
            if (windowWidth >= pair[0]) {
                width = pair[1];
            } else {
                break;
            }
        }
        return width.toString();
    }



    setCalcValues(): void {
        this.cellStyles = [];
        this.currentCellValues.forEach(({ height, width }, index) => {
            if (!width.match('px')) {
                const decimal =  0.01 * +width.replace('%', '');
                width = `calc((100% - ${this.rowFixedTotals[this.cellRowIndexes[index]]}px) * ${decimal})`;
            }
            this.cellStyles.push({ height, width });
        });
    }



    applyStyles(): void {
        this.cellStyles.forEach(({ height, width }, index) => {
            this.setHeightStyle(height, index, width);
            this.cellElements[index].style.width = width;
        });
    }



    setHeightStyle(height: string, index: number, width: string): void {

        if (height.match('/')) {
            this.setHeightRatioStyles(height, index, width);
            return;
        }

        const pair = height.split('-');
        if (+pair[0]) {
            pair[0] = ((+pair[0] / this.heightDenom) * 100 * this.heightScaleCurrent) + 'vh';
        } else if (pair[0].match('%')) {
            const mainHeight = pair[0].split('%')[0];
            const heightWithScale = +mainHeight * this.heightScaleCurrent;
            pair[0] = heightWithScale + 'vh';
        }

        height = height.match('-') ? `calc(${pair[0]} - ${pair[1]})` : pair[0];
        this.cellElements[index].style.height = height;
    }



    setHeightRatioStyles(height: string, index: number, width: string): void {
        let percentage = width.split('* ')[1];
        percentage = percentage.split(')')[0];
        const fraction = height.split('/');
        // no height scaling for ratios because ratio would break
        const ratio = ((+fraction[1] / +fraction[0]) * (100 * +percentage)) + '%';
        this.cellElements[index].style.height = '0';
        this.cellElements[index].style.paddingTop = ratio;
    }



}
