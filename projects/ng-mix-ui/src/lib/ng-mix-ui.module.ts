import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from './cell/cell.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FlexButtonsComponent } from './flex-buttons/flex-buttons.component';
import { GridComponent } from './grid/grid.component';
import { MetricComponent } from './metric/metric.component';
import { StatementComponent } from './statement/statement.component';
import { TabComponent } from './tab/tab.component';
import { TileComponent } from './tile/tile.component';

@NgModule({
    declarations: [
        CellComponent,
        DataTableComponent,
        FlexButtonsComponent,
        GridComponent,
        MetricComponent,
        StatementComponent,
        TabComponent,
        TileComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CellComponent,
        DataTableComponent,
        FlexButtonsComponent,
        GridComponent,
        MetricComponent,
        StatementComponent,
        TabComponent,
        TileComponent
    ]
})
export class NgMixUiModule { }
