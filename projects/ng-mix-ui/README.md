# Mix-UI

#### ng-mix-ui / react-mix-ui

http://mix-ui.com

---

UI gets complex fast, especially when you need **fixed sized areas to be mixed with percentages**.
Mix-UI lets you create very lean layouts using a data-driven cell components have the smarts to understand these different contexts.
You can set **unlimited breakpoints directly within the mark-up** instead of using cumbersome CSS.
Also, the grid is able to work **horizontally and vertically** making this a great option for creating SPAs and dashboards easily and instantly that will work for all sizes of screens.

```
<grid>
    <cell> .. </cell>
```

* 12 units is the widths' default, which makes 100% of the width.
* This cell would always make a full row.
* Any following cells then wrap making a grid.

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
    - data-driven within markup for responsive views
    - semantic



### Reference

| Directive                | Description                        | Default       |
| ------------------------ | ---------------------------------- |:-------------:|
| **\<grid>**              | placeholder for cells              |               |
| height-denom=""          | units per view height              | 12            |
| width-denom=""           | units per row                      | 12            |
| ..                       | nest cells                         |               |
| **\<cell>**              | placeholder for content or a tile  |               |
| align=""                 | [ >= window width pixels]:[t,m,b], | 0:t (top)     |
| height=""                | [ >= window width pixels]:[0-12],* | 0:auto        |
|                          | offset 0:12-10px                   |               |
|                          | offset 0:100%-10px                 |               |
| width=""                 | [ >= window width pixels]:[0-12],* | 0:12          |
| ..                       | nest content                       |               |
| **\<tile>**              | placeholder for content or tabs    |               |
| box-shadow=""            | css box shadow                     | 0 0 2px black |
| margin=""                | [ >= window width pixels]:[px],*   | 2px           |
| padding=""               | [ >= window width pixels]:[px/em]  | 1em           |
| \[style-header]="{}"     | style object                       | **            |
| \[style-tab-active]="{}" | style object                       | **            |
| \[style-tab-hover]="{}"  | style object                       | **            |
| \[style-tab-idle]="{}"   | style object                       | **            |
| tab=""                   | initial tab to open                | 0             |
| title=""                 | the header if no tabs              |               |
| ..                       | nest content                       |               |
| **\<tab>**               | a tab within a tile                |               |
| title=""                 | title of the tab                   |               |
| ..                       | nest content                       |               |
| **\<metric>**            | widget that display 1 or 2 values  |               |
| caption=""               | optional secondary value           |               |
| caption-side=""          | set to top or bottom               | bottom        |
| \[style-caption]="{}"    | style object                       | **            |
| \[style-value]="{}"      | style object                       | **            |
| value=""                 | the main value                     |               |
| **\<statement>**         | widget that display 1 or 2 values  |               |
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

Zero is used as a the base default for all view sizes until a break is set.
Each break is for greater than or equal to the value used.
If no break is set, then all sizes will use the 0 setting or its default.

####"0:12" Shortcut

You don't need to set 0 to 12 because it defaults as the denominator set (12 by default).
These 2 lines will do the same thing:

```
<cell width="0:12" height="0:12"></cell>
<cell></cell>
```

####"0:" Shortcut

You can omit the "0:" in the attributes. These 2 lines will do the same thing:

```
<cell width="0:6" height="0:3"></cell>
<cell width="6" height="3"></cell>
```



### Width Fixed

You can also use fixed widths for breakpoints. Simply add the suffice of the measurement like you would with CSS.
Any cells in the remaining space is then split up to use the rest of the percentage space.

```
<grid>
    <cell width="100px"> A is always 100 pixels </cell>
    <cell width="150px"> B is always 150 pixels </cell>
    <cell width="6"> C is always 50% of the window width - 250px </cell>
    <cell width="6"> D is always 50% of the window width - 250px </cell>
</grid>
```

### Height Options

* ```height="12"``` - By fraction, using the height denominator. 
* ```height="50%"``` - By percentage, of the view height.
* ```height="200px"``` - By a fixed amount.
* ```height="50%-100px"``` - Offset a percentage.
* ```height="4/3"``` - Force a ratio. The height will size to make the ratio.


### Align

When cells aren't the same height you can set where each cell should vertically align to its neighbor cells.
Top is the default.

---

```
<cell width="6"> A <br> A <br> A </cell>
<cell width="6"> B </cell>
```

| A | B |   
| A |  
| A |

---

```
<cell width="6"> A <br> A <br> A </cell>
<cell width="6" align="m"> B </cell>
```

| A |  
| A | B |  
| A |

---

```
<cell width="0:6"> A <br> A <br> A </cell>
<cell width="0:6" align="b"> B </cell>
```

| A |  
| A |  
| A | B |

---



### Denominator

The denominator for a grid's rows is 12 by default, but you can change it with the denominator property.

```
<grid denominator="5">
    <cell width="2"> 2/5 of row </cell>
    <cell width="3"> 3/5 of row </cell>
</grid>
```



### Decimals

Decimal numbers are allowed for the cell width setting.
For example, if you wanted to create a 5 column grid using the default 12 denominator, you could simply make your cell widths use multiples of 12 / 5, which is 2.4:

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

To abstract various parts of cells inside of custom components be sure to start your nested teplates with a new grid.

*parent:*

```
<grid>
    <cell>
        <my-comp></my-comp-1>
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

The library components' styles are not encapsulated.
This means that you can add or change styling to them with normal CSS anywhere after the library itself.
However, for the components that have styling attributes those will take priority.



### Passing in Style Objects

Certain component will merge any styling you pass to them, buut remember to use braces for objects:

```
<grid>
    <cell>
        <tile [style-header]="{ background: 'red', color: 'white' }">
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

http://mix-ui.com