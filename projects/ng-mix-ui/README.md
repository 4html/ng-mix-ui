# Mix-UI

#### ng-mix-ui

https://mix-ui.com

---

UI gets complex fast, especially when you need **fixed sized areas to be mixed with percentages**.
Mix-UI lets you create very lean layouts using data-driven cell components that have the smarts to understand these different contexts.
You can set **unlimited breakpoints directly within the mark-up** instead of using cumbersome CSS.
Also, the grid is able to work **horizontally and vertically** making this a great option for creating SPAs and dashboards.
Make your apps work for all sizes of screens easily and instantly.

```
<grid>
    <cell> .. </cell>
```

* 12 units is the cell width default, which makes up 100% of the grid width.
* This cell would always make a full row.
* Any following cells would then wrap, making a grid.

```
    <cell width="425:8 1000:9"> .. </cell>
```

* Has a width of 100% (12/12) when window is 0-424px.
* Has a width of 66.6% (8/12) when window is 425-999px.
* Has a width of 75% (9/12) when window is 1000px+.

```
    <cell width="425:4 1000:3"> .. </cell>
</grid>
```

* Has a width of 100% (12/12) when window is 0-424px.
* Has a width of 33.3% (4/12) when window is 425-999px.
* Has a width of 25% (3/12) when window is 1000px+.



### Design Requirements

* Compatibility with all modern browsers.

* Lean markup designed for quickly creating dynamic layouts:

    - single cells that wrap, but behave like a grid
    - no extra dom to generate rows and columns
    - able to nest

* Intuitive maintainability:

    - less syntax means less to manage
    - data-driven within mark-up for responsive views
    - semantic



### Reference

| Directive                | Description                        | Default/Value |
| ------------------------ | ---------------------------------- |:-------------:|
| **\<grid>**              | placeholder for cells              |               |
| height-denom=""          | units per view height              | 12            |
| height-scale=""          | cell heights based on height       | 0:1           |
| width-denom=""           | units per row                      | 12            |
| ..                       | nest cells                         |               |
| **\<cell>**              | placeholder for content or a tile  |               |
| align=""                 | [ >= window width pixels]:[t,m,b], | 0:top         |
| height=""                | [ >= window width pixels]:[0-12],* | 0:auto        |
|                          | offset 0:12-10px                   |               |
|                          | offset 0:100%-10px                 |               |
| width=""                 | [ >= window width pixels]:[0-12],* | 0:12          |
| !                        | force new row after, width="6!"    |               |
| ..                       | nest content                       |               |
| **\<tile>**              | placeholder for content or tabs    |               |
| box-shadow=""            | css box shadow                     | 0 0 2px black |
| (full-screen-change)=""  | full screen changed $event         | in/active     |
| margin=""                | [ >= window width pixels]:[px],*   | 2px           |
| padding=""               | [ >= window width pixels]:[px/em]  | 1em           |
| \[style]="{}"            | style object                       | **            |
| \[style-header]="{}"     | style object                       | **            |
| \[style-tab-active]="{}" | style object                       | **            |
| \[style-tab-hover]="{}"  | style object                       | **            |
| \[style-tab-idle]="{}"   | style object                       | **            |
| tab=""                   | initial tab to open                | 0             |
| (tab-change)=""          | tab changed $event                 | new tab index |
| [tab-save]=""            | true remembers and loads last tab  | false         |
| title=""                 | default title (required for tabs)  /               |
| ..                       | nest content                       |               |
| **\<tab>**               | a tab within a tile                |               |
| title=""                 | title of the tab                   |               |
| ..                       | nest content                       |               |
| **\<metric>**            | widget that displays 1 or 2 values  |               |
| caption=""               | optional secondary value           |               |
| \[style-caption]="{}"    | style object                       | **            |
| \[style-value]="{}"      | style object                       | **            |
| value=""                 | the main value                     |               |
| **\<statement>**         | widget that displays 1 or 2 values  |               |
| \[style-content]="{}"    | style object                       | **            |
| \[style-title]="{}"      | style object                       | **            |
| title=""                 | optional bolded title              |               |
| ..                       | nest text                          |               |
| **\<flex-buttons>**      | nested buttons expand to fill      |               |
| size                     | add space between the buttons      | 1em           |
| ..                       | nest buttons                       |               |
| **\<data-table>**        | plug data into a table             |               |
| \[thead-rows]="[[{}]]"   | array of rows of arrays of cells   | **            |
| \[tbody-rows]="[[{}]]"   | array of rows of arrays of cells   | **            |
| \[tfoot-rows]="[[{}]]"   | array of rows of arrays of cells   | **            |
| { class: '',             | cell config                        |               |
| colspan: '',             | cell config                        |               |
| rowspan: '',             | cell config                        |               |
| value: '' }              | cell config                        |               |

\* There are additional size options for width and height shown below.\
\** See dev tools, styles include various colors and sizes.



### Width Percentages

* A full block, like columns in a row, is the sum of 12 (default) and that makes up 100% of the parent width.

* Each cell defaults as a full row.

* Each cell can be defined for different break points directly (no css required).

    - No limit to how many breakpoints you can use.



##### Mark-up

```
<grid>
    <cell width="0:6"> A </cell>
    <cell width="0:6"> B </cell>
    <cell width="400:6 750:3"> C </cell>
    <cell width="400:6 750:3"> D </cell>
    <cell width="750:6"> E </cell>
    <cell> F </cell>
</grid>
```



##### Size Results

| Window Size | Cell  | Width | Cell Width |
|:-----------:|:-----:|:-----:|:----------:|
| Any         | A     | 6     | 50%        |
| Any         | B     | 6     | 50%        |
| < 400       | C,D,E | 12    | 100%       |
| 400 - 749   | C,D   | 6     | 50%        |
| 750+        | C,D   | 3     | 25%        |
| < 750       | E     | 12    | 100%       |
| 750+        | E     | 6     | 50%        |
| Any         | F     | 12    | 100%       |



### Zero Defaults

Each break is for greater than or equal to the value used.
If no break is present, then all sizes will use the 0 setting, which means 12 (or 100%) when >= 0.


#### "0:12" Shortcut

You don't need to set 0 to 12 because it defaults as the denominator set (12 by default).
These 2 lines will do the same thing:

```
<cell width="0:12" height="0:12"></cell>
<cell></cell>
```


#### "0:" Shortcut

You can omit the "0:" in the attributes too. These 2 lines will do the same thing:

```
<cell width="0:6" height="0:3"></cell>
<cell width="6" height="3"></cell>
```


### Width Fixed

You can also use fixed widths for breakpoints. Simply add the measurement like you would with CSS.
Any cells nested within the remaining space will be split up within that context.

```
<grid>
    <cell width="100px"> A is always 100 pixels </cell>
    <cell width="150px"> B is always 150 pixels </cell>
    <cell width="6"> C is always 50% of the window width - 250px </cell>
    <cell width="6"> D is always 50% of the window width - 250px </cell>
</grid>
```

### Force Row Wrap

When combining fixed widths with percentages, the percentage cells fill out the rest of the space.
To force a break end the width value with a "!".
In the following example the third cell will always be on a new row. 
Without the "!" all of these cells would fit as one row.

```
<grid>
    <cell width="100px"> 100px </cell>
    <cell width="500px!"> 500px </cell>
    <cell width="12"> A new row. </cell>
</grid>
```


### Height Options

* ```height="12"``` - By fraction, using the height denominator. 
* ```height="50%"``` - By percentage, of the view height.
* ```height="200px"``` - By a fixed amount.
* ```height="50%-100px"``` - Offset a percentage.
* ```height="4/3"``` - Force a ratio. The height will force the ratio. For any content inside, be sure to use absolute positioning due to how the ratio is created.


### Align

When cells aren't the same height you can set where each cell should vertically align to its neighbor cells.
Top is the default.

---

```
<cell width="6"> A <br> A <br> A </cell>
<cell width="6" align="top"> B </cell>
```

| A | B |   
| A |  
| A |

---

```
<cell width="6"> A <br> A <br> A </cell>
<cell width="6" align="middle"> B </cell>
```

| A |  
| A | B |  
| A |

---

```
<cell width="0:6"> A <br> A <br> A </cell>
<cell width="0:6" align="bottom"> B </cell>
```

| A |  
| A |  
| A | B |

---


### Denominator

The denominator for a grid's rows is 12 by default, but you can change it with the height-denom and width-denom properties.

```
<grid width-denom="5">
    <cell width="2"> 2/5 of row </cell>
    <cell width="3"> 3/5 of row </cell>
</grid>
```


### Decimals

Decimals are ok to use too.
For example, if you wanted to create a 5 column grid using the default 12-denominator,
you could simply make your cell widths use multiples of 12 / 5, which is 2.4:

```
<grid>
    <cell width="2.4"> 1/5 of row </cell>
    <cell width="2.4"> 1/5 of row </cell>
    <cell width="2.4"> 1/5 of row </cell>
    <cell width="4.8"> 2/5 of row </cell>
</grid>
```


### Nesting

```
<grid>
    <cell width="6"> 50% wide (6/12 for 0px+) </cell>
    <cell width="6">
        <grid>
            <cell> Nested Row 1 </cell>
            <cell> Nested Row 2 </cell>
        </grid>
    </cell>
</grid>
```


### Absolute Positioning

If you place absolute items within a cell the cell itself is the parent for the position.

```
<grid>
    <cell> a full row </cell>
    <cell width="6"> half a row </cell>
    <cell width="6">
        <div style="position: absolute; top: 0; left: 0;">
            This will be placed at the top-left corner of this cell.
        </div>
    </cell>
</grid>
```


### Nesting Components in Cells

To abstract various parts of cells inside of custom components be sure to start your nested templates with a new grid.

*parent:*

```
<grid>
    <cell>
        <my-comp></my-comp>
    </cell>
</grid>
```

*my-comp:*
```
<grid>
    <cell>inside my-comp</cell>
</grid>
```


### Outside Styling

The library components do not use encapsulated styling.
This means that you can add or change styling to them with normal CSS anywhere after the library itself.
However, for the components that have styling attributes those will take priority.
Consider using non-encapsulated nested styling with a CSS preprocessor:

```
my-component {
    
    grid {
        
        cell {
        
        }
    }
}
```


### Passing in Style Objects

Certain components will merge any styling you pass to them. Remember to use braces for objects:

```
<grid>
    <cell>
        <tile [style]="{}" [style-header]="{ background: 'red', color: 'white' }">
            ..
        </tile>
    </cell>
</grid>
```


### Metric Component
```
<grid>
    <cell>
        <tile>
            <metric
                value="99.995%"
                caption="(5 in every 10,000)"
                caption-size="bottom"></metric>
        </tile>
    </cell>
</grid>
```



### Statement Component
```
<grid>
    <cell>
        <tile>
            <statement title="My Important Statement">
                And its content goes here.
            </statement>
        </tile>
    </cell>
</grid>
```



### Data-Table Component
```
<grid>
    <cell>
        <tile>
            <data-table
                [thead-rows]="[
                    [{ value: 'Head-1' }, { class: 'red-background', value: 'Head-2' }, { value: 'Head-3' }]
                ]"
                [tbody-rows]="[
                    [{ rowspan: 2, value: 'Body-1' }, { value: 'Body-2' }, { value: 'Body-3' }],
                    [{ value: 'Body-1' }, { class: 'red-background', value: 'Body-2' }],
                    [{ value: 'Body-1' }, { value: 'Body-2' }, { value: 'Body-3' }]
                ]"
                [tfoot-rows]="[
                    [{ value: 'Foot-1' }, { colspan: 2, value: 'Foot-2' }]
                ]"
            ></data-table>
        </tile>
    </cell>
</grid>
```



### Flex-Buttons Component

```
<tile [style-header]="{ background: 'red', color: 'white' }">
    <flex-buttons>
        <button> .. </button>
        <button> .. </button>
        <button> .. </button>
    </flex-buttons>
</tile>
```

---

* 1.1.24: cells can now be drawn with ngFor, refined metric so it's aligned true middle, removed border-top of tables
* 1.1.23: just minor note clean up
* 1.1.22: added semantic cell align values
* 1.1.21: save-tab as an option (remembers last tab state)
* 1.1.20: added a tile tab-change emitter to allow additional logic in response to tab changes

---

https://mix-ui.com
