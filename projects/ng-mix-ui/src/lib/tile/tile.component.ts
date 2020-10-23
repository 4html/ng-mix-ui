import {
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import {
    headerStyles,
    hostStyles,
    mainStyles,
    tabActiveStyles,
    tabHoverStyles,
    tabIdleStyles
} from './tile.constants';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'tile',
    styleUrls: ['./tile.component.scss'],
    templateUrl: './tile.component.html'
})
export class TileComponent implements OnInit {

    activeTab: number;
    fullScreenActive: boolean;
    hover = -1;
    mainElement: HTMLElement;
    marginActive = '';
    marginBreaks = [];
    paddingActive = '';
    paddingBreaks = [];
    positionStyles = {};
    tabElements: Element[];
    tabTitles: string[] = [];

    @Input('box-shadow') boxShadowInput: string = '';
    @Input('full-screen') fullScreen: boolean;
    @Input('margin') marginValue: string;
    @Input('padding') paddingValue: string;
    @Input('style-header') styleHeader: {};
    @Input('style-main') styleMain: {};
    @Input('style-tab-active') styleTabActive: {};
    @Input('style-tab-idle') styleTabIdle: {};
    @Input('style-tab-hover') styleTabHover: {};
    @Input() tab: number;
    @Input() title: string;

    @HostBinding('style.boxShadow') boxShadow = this.boxShadowInput || hostStyles.boxShadow;
    @HostBinding('style.height') height: string;
    @HostBinding('style.margin') margin: string;
    @HostBinding('style.width') width: string;

    @HostListener('window:resize', [])
    onResize(): void {
        this.updateView();
    }

    constructor(private element: ElementRef, private renderer: Renderer2) { }



    ngOnInit(): void {
        this.activeTab = +this.tab || 0;
        this.setContainerPositions();
        this.setStyles();
        this.marginBreaks = this.setBreaks(this.marginValue);
        this.paddingBreaks = this.setBreaks(this.paddingValue);
        this.updateView();
        this.setTabState();
        this.updateActiveTab(this.activeTab);
    }



    setContainerPositions(): void {
        this.positionStyles = {};
        if (!this.element.nativeElement.parentNode.attributes.getNamedItem('height')) {
            this.positionStyles = {
                position: 'relative',
                top: ''
            };
            this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
        }
    }



    setStyles(): void {
        this.styleMain = { ...mainStyles, ...this.positionStyles };
        this.styleHeader = { ...headerStyles, ...this.positionStyles };
        this.styleTabActive = { ...tabActiveStyles };
        this.styleTabHover = { ...tabHoverStyles };
        this.styleTabIdle = { ...tabIdleStyles };
    }



    setBreaks(value): [] {
        if (!value) {
            return [];
        }
        const pairs = value.split(' ');
        const breaks = pairs.map(pair => {
            if (pair.match(/:/)) {
                const pairSplit = pair.split(':');
                pairSplit[0] = isNaN(+pairSplit[0]) ? 0 : +pairSplit[0];
                return [pairSplit[0], pairSplit[1]];
            }
            return [0, pair];
        });
        return breaks.sort((a, b) => a[0] > b[0] ? 1 : -1);
    }



    updateView(): void {
        this.setMarginActive();
        this.setPaddingActive();
        this.setTileSize();
    }



    setMarginActive(): void {
        if (!this.marginValue) {
            return;
        }
        for (const pair of this.marginBreaks) {
            if (window.innerWidth < pair[0]) {
                break;
            }
            this.marginActive = pair[1];
        }
    }



    setPaddingActive(): void {
        if (!this.paddingValue) {
            return;
        }
        for (const pair of this.paddingBreaks) {
            if (window.innerWidth < pair[0]) {
                break;
            }
            this.paddingActive = pair[1];
        }
    }



    setTileSize(): void {
        this.marginActive = this.marginActive.replace('px', '') || '2';
        this.height = this.width = 'calc(100% - ' + (+this.marginActive * 2) + 'px)';
        this.margin = this.marginActive + 'px';
        if (this.paddingActive) {
            this.styleMain = {
                ...this.styleMain,
                padding: this.paddingActive
            };
        }
    }



    setTabState(): void {
        this.mainElement = this.element.nativeElement.children[0];
        if (this.mainElement) {
            const mainTabs = this.mainElement.children;
            const length = mainTabs.length;
            this.tabElements = [];
            for (let i = 0; i < length; i++) {
                const title = mainTabs[0].attributes['title'];
                if (title && title.value) {
                    this.tabTitles.push(title.value);
                }
                this.tabElements.push(mainTabs[0]);
                this.renderer.removeChild(this.mainElement, mainTabs[0]);
            }
        }
    }



    toggleFullScreen(): void {
        this.fullScreenActive = !this.fullScreenActive;
        this.fullScreenActive ? this.applyFullScreen() : this.cancelFullScreen();
    }



    applyFullScreen(): void {
        [
            ['margin', '2px'],
            ['position', 'fixed'],
            ['top', '0'],
            ['left', '0'],
            ['right', '0'],
            ['bottom', '0'],
            ['width', 'auto'],
            ['height', 'auto'],
            ['zIndex', '2']
        ].forEach(item => this.renderer.setStyle(this.element.nativeElement, item[0], item[1]));
    }



    cancelFullScreen(): void {
        [
            ['margin', this.margin],
            ['position', 'absolute'],
            ['top', '0'],
            ['left', ''],
            ['right', ''],
            ['bottom', ''],
            ['width', this.width],
            ['height', this.height],
            ['zIndex', '']
        ].forEach(item => this.renderer.setStyle(this.element.nativeElement, item[0], item[1]));
    }



    updateActiveTab(index): void {
        if (this.activeTab !== index && this.tabElements[this.activeTab]) {
            this.renderer.removeChild(this.mainElement, this.tabElements[this.activeTab]);
        }
        if (this.tabElements[index]) {
            this.renderer.appendChild(this.mainElement, this.tabElements[index]);
        }
        this.activeTab = index;
    }



}
