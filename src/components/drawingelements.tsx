/**import { waitFor } from "@testing-library/react";*/
/**import { useState } from "react";*/

var radius = 75;



export function Cut({ ID, path }) {
    return (
        <path id={ID} className="cut" d={path} />
    )
}

export function Arrow({ direction, ID, x, y }) {
    var dimensions: number[] = [4, 7, 10];
    var signs: string[];
    var path: string;
    switch (direction) {
        case "up":
            signs = ["-", "-", "+", "+", "-", "+", "+", "-", "-"];
            break;
        case "down":
            signs = ["+", "-", "-", "+", "+", "+", "-", "-", "+"];
            break;
        case "right":
            signs = ["+", "-", "-", "+", "+", "-", "+", "+", "-"];
            break;
        case "left":
            signs = ["-", "+", "-", "-", "+", "+", "+", "-", "-"];
            break;
        default:
            signs = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
            break;
    }
    if (direction === "up" || direction === "down") {
        path = 'M' + (x) + ',' + (y) +
            ' v ' + (signs[0]) + '' + (+dimensions[2]) +
            ' l ' + (signs[1]) + '' + (+dimensions[0]) + ' ' + (signs[2]) + '' + (+dimensions[1]) +
            ' l ' + (signs[3]) + '' + (+dimensions[0]) + ' ' + (signs[4]) + '' + (+dimensions[1] + dimensions[2]) +
            ' l ' + (signs[5]) + '' + (+dimensions[0]) + ' ' + (signs[6]) + '' + (+dimensions[1] + dimensions[2]) +
            ' l ' + (signs[7]) + '' + (+dimensions[0]) + ' ' + (signs[8]) + '' + (+dimensions[1]) + ' Z';
    } else if (direction === "right" || direction === "left") {
        path = 'M' + (x) + ',' + (y) +
            ' h ' + (signs[0]) + '' + (+dimensions[2]) +
            ' l ' + (signs[1]) + '' + (+dimensions[1]) + ' ' + (signs[2]) + '' + (+dimensions[0]) +
            ' l ' + (signs[3]) + '' + (+dimensions[1] + dimensions[2]) + ' ' + (signs[4]) + '' + (+dimensions[0]) +
            ' l ' + (signs[5]) + '' + (+dimensions[1] + dimensions[2]) + ' ' + (signs[6]) + '' + (+dimensions[0]) +
            ' l ' + (signs[7]) + '' + (+dimensions[1]) + ' ' + (signs[8]) + '' + (+dimensions[0]) + ' Z';
    } else {
        path = 'M' + (x) + ',' + (y) +
            ' v ' + (signs[0]) + '' + (+dimensions[2]) +
            ' l ' + (signs[1]) + '' + (+dimensions[0]) + ' ' + (signs[2]) + '' + (+dimensions[1]) +
            ' l ' + (signs[3]) + '' + (+dimensions[0]) + ' ' + (signs[4]) + '' + (+dimensions[1] + dimensions[2]) +
            ' l ' + (signs[5]) + '' + (+dimensions[0]) + ' ' + (signs[6]) + '' + (+dimensions[1] + dimensions[2]) +
            ' l ' + (signs[7]) + '' + (+dimensions[0]) + ' ' + (signs[8]) + '' + (+dimensions[1]) + ' Z';
    }
    return (
        <path id={ID} className="arrow" d={path} />
    )
}

export function Rounding({ ID, x, y, R, deg }) {
    var dimensions: number[] = [6, 2, 20];
    var arrowID: string = ID + "_arrow";
    var textID: string = ID + "_text";
    var path: string;

    var transformArrow: string = "rotate(" + deg + " " + x + " " + y + ")";
    var transformText: string = "rotate(" + (deg + 90) + " " + (x) + " " + (y) + ")";

    var textRotate: number = deg + 90;
    var textOffsetX: number = dimensions[0] / 3 * 2 + dimensions[2] / 2;
    var textOffsetY: number = 5;
    if (deg < 180) {
        textRotate = deg - 90;
        textOffsetX = textOffsetX * (-1);
    }
    var textX = x - textOffsetX;
    var textY = y - textOffsetY;
    var transformText: string = "rotate(" + (textRotate) + " " + (x) + " " + (y) + ")";

    path = 'M' + (x) + ',' + (y) +
        ' v ' + (-dimensions[0] / 3 * 2) +
        ' h ' + (dimensions[1] / 2) +
        ' l ' + (-dimensions[1] / 2) + ' ' + (dimensions[0]) +
        ' l ' + (-dimensions[1] / 2) + ' ' + (-dimensions[0]) +
        ' h ' + (dimensions[1] / 2) +
        ' v ' + (-dimensions[2]);
    return (
        <>
            <path id={arrowID} className="arrow" d={path} transform={transformArrow} />
            <text id={textID} className="roundingText" x={textX} y={textY} transform={transformText}>{'R' + R}</text>
        </>
    )
}

export function PathVisible({ ID, path }) {
    return (
        <path id={ID} className="visibleLine" d={path} />
    )
}

export function PathCut({ ID, path }) {
    return (
        <path id={ID} fill="url(#cutPattern)" className="visibleLineCut" d={path} />
    )
}

export function PathCutPlate({ orientation, ID, path }) {
    var fillPattern = "url(#platePattern" + (orientation) + ")";
    return (
        <path id={ID} fill={fillPattern} className="visibleLineCut" d={path} />
    )
}

export function PathDotted({ type, ID, path }) {
    var className: string = 'dottedLine_' + (type) + '';
    return (
        <path id={ID} className={className} d={path} />
    )
}

export function PathNarrowLine({ ID, path }) {
    return (
        <path id={ID} className="narrowLine" d={path} />
    )
}

export function RectangleElement({ ID, x, y, width, height }) {
    return (
        <rect id={ID} className="visibleLine" x={x} y={y} width={width} height={height} />
    )
}

export function RectangleElementDotted({ type, ID, x, y, width, height }) {
    var className: string = 'dottedLine_' + (type) + '';
    return (
        <rect id={ID} className={className} x={x} y={y} width={width} height={height} />
    )
}


export function RectangleElementCut({ ID, x, y, width, height }) {
    return (
        <rect id={ID} fill="url(#cutPattern)" className="visibleLineCut" x={x} y={y} width={width} height={height} />
    )
}

export function RectangleElementCutRound({ ID, x, y, width, height, rx, ry }) {
    return (
        <rect id={ID} fill="url(#cutPattern)" className="visibleLineCut" x={x} y={y} width={width} height={height} rx={rx} ry={ry} />
    )
}


export function RectangleElementRound({ ID, x, y, width, height, rx, ry }) {
    return (
        <rect id={ID} className="visibleLine" x={x} y={y} width={width} height={height} rx={rx} ry={ry} />
    )
}

export function CircleView({ number, ID, cx, cy, onClick }) {

    var color = "black";
    /*const [color, setColor]=useState("")
    function flash(){
        setColor("red");
        setTimeout(()=>this.setColor("black"),6000);
    }*/
    return (
        <>
            <TextString ID="circle_1_text"
                x={(cx - radius)}
                y={(cy + radius)}
                value={number} />
            <circle id={ID} r={radius} cx={cx} cy={cy}
                stroke={color}
                strokeWidth='7'
                fill="transparent"
                fillOpacity="0.4"
                onClick={onClick}
                onMouseOver={() => (document.getElementById(ID).setAttribute("fill", "gray"))}
                onMouseLeave={() => (document.getElementById(ID).setAttribute("fill", "transparent"))}
            /*onLoad={flash}*/
            />
        </>
    )
}

export function CircleMeasure({ ID, cx, cy }) {
    return (
        <circle id={ID} className="circle" r={3} cx={cx} cy={cy} />
    )
}

export function TextMeasure({ ID, x, y, value, deg }) {
    var transform: string = 'rotate(' + (deg) + ',' + (x) + ',' + (y) + ')';
    return (
        <text id={ID} className="text" transform={transform} x={x} y={y} >{value}</text>
    )
}

function VerticalLineMeasure({ ID, x, y }) {
    var lineLength = 8;
    return (
        <path id={ID} className="narrowLine" d={'M' + x + ',' + y + ' h ' + (-lineLength) + ' h ' + (lineLength * 2) + ' m ' + (-lineLength / 3) + ' ' + (2) + ' l ' + (-lineLength / 3 * 4) + ' ' + (-4)} />
    )
}

export function VerticalMeasureL({ ID, x, y, value, magnify }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (x) + ',' + (y) + ' v' + (value * magnify)} />
            <VerticalLineMeasure ID={ID + "_measure_line_top"}
                x={x}
                y={y} />
            <VerticalLineMeasure ID={ID + "_measure_line_bottom"}
                x={x}
                y={y + value * magnify} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x - measureTextOffset}
                y={y + value * magnify / 2}
                value={value}
                deg={270} />
        </>
    )
}

export function VerticalMeasureLHalf({ ID, x, y, displayValue, startValue }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (x) + ',' + (startValue) + ' L' + (x) + ' ' + (y) + ' '} />
            <VerticalLineMeasure ID={ID + "_measure_circle"}
                x={x}
                y={y} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x - measureTextOffset}
                y={y / 2 + startValue / 2}
                value={displayValue}
                deg={270} />
        </>
    )
}

export function VerticalMeasureC({ ID, x, y, value, magnify }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (x) + ',' + (y) + ' v' + (value * magnify)} />
            <CircleMeasure ID={ID + "_measure_line_top"}
                cx={x}
                cy={y} />
            <CircleMeasure ID={ID + "_measure_line_bottom"}
                cx={x}
                cy={y + value * magnify} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x - measureTextOffset}
                y={y + value * magnify / 2}
                value={value}
                deg={270} />
        </>
    )
}

export function VerticalMeasureCHalf({ ID, x, y, displayValue, startValue }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (x) + ',' + (startValue) + ' L' + (x) + ' ' + (y) + ' '} />
            <CircleMeasure ID={ID + "_measure_circle"}
                cx={x}
                cy={y} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x - measureTextOffset}
                y={y / 2 + startValue / 2}
                value={displayValue}
                deg={270} />
        </>
    )
}

function HorizontalLineMeasure({ ID, x, y }) {
    var lineLength = 8;
    return (
        <path id={ID} className="narrowLine" d={'M' + x + ',' + y + ' v ' + (-lineLength) + ' v ' + (lineLength * 2) + ' m ' + (-2) + ' ' + (-lineLength / 3) + ' l ' + (4) + ' ' + (-lineLength / 3 * 4)} />
    )
}

export function HorizontalMeasureL({ ID, x, y, value, magnify }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (x) + ',' + (y) + ' h' + (value * magnify)} />
            <HorizontalLineMeasure ID={ID + "_measure_line_left"}
                x={x}
                y={y} />
            <HorizontalLineMeasure ID={ID + "_measure_line_right"}
                x={x + value * magnify}
                y={y} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x + value * magnify / 2}
                y={y - measureTextOffset}
                value={value}
                deg={0} />
        </>
    )
}

export function HorizontalMeasureLHalf({ ID, x, y, displayValue, startValue }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (startValue) + ',' + (y) + ' L' + (x) + ' ' + (y) + ' '} />
            <HorizontalLineMeasure ID={ID + "_measure_circle"}
                x={x}
                y={y} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x / 2 + startValue / 2}
                y={y - measureTextOffset}
                value={displayValue}
                deg={0} />
        </>
    )
}

export function HorizontalMeasureC({ ID, x, y, value, magnify }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (x) + ',' + (y) + ' h' + (value * magnify)} />
            <CircleMeasure ID={ID + "_measure_line_left"}
                cx={x}
                cy={y} />
            <CircleMeasure ID={ID + "_measure_line_right"}
                cx={x + value * magnify}
                cy={y} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x + value * magnify / 2}
                y={y - measureTextOffset}
                value={value}
                deg={0} />
        </>
    )
}

export function HorizontalMeasureCHalf({ ID, x, y, displayValue, startValue }) {
    const measureTextOffset = 10;
    return (
        <>
            <PathNarrowLine ID={ID + "_measure"}
                path={'M' + (startValue) + ',' + (y) + ' L' + (x) + ' ' + (y) + ' '} />
            <CircleMeasure ID={ID + "_measure_circle"}
                cx={x}
                cy={y} />
            <TextMeasure ID={ID + "_measure_text"}
                x={x / 2 + startValue / 2}
                y={y - measureTextOffset}
                value={displayValue}
                deg={0} />
        </>
    )
}

export function TextString({ ID, x, y, value }) {
    return (
        <text id={ID} className="text" x={x} y={y} >{value}</text>
    )
}

export function TextLabel({ ID, x, y, value }) {
    return (
        <text id={ID} className="label" x={x} y={y} >{value}</text>
    )
}

export function Dowel({ ID, cx, cy, diameter, magnify
}) {
    var dividerOffset = 5;
    return (<>
        <PathDotted type={1} ID={ID + "_dividers"}
            path={'M' + (cx - (diameter / 2 + dividerOffset) * magnify) + ',' + (cy) +
                ' h ' + (diameter + dividerOffset * 2) * magnify +
                ' m ' + (-(diameter / 2 + dividerOffset) * magnify) + ' ' + (-(diameter / 2 + dividerOffset) * magnify) +
                ' v ' + (diameter + dividerOffset * 2) * magnify} />
        <circle id={ID + "_circle"}
            r={(diameter / 2 * magnify)}
            fill="transparent"
            strokeWidth={2}
            stroke="black"
            cx={cx}
            cy={cy} />
    </>

    )
}

export function CutPattern() {
    return (
        <defs>
            <pattern id="cutPattern" x="0" y="0" width="10" height="10" patternContentUnits='userSpaceOnUse' patternUnits='userSpaceOnUse'>
                <path d="M5,-5 l10,10
                         M0,0 l10,10
                         M-5,5 l10,10"
                    stroke="black" strokeWidth="1" />
            </pattern>
            <pattern id="platePattern1" x="0" y="0" width="20" height="20" patternContentUnits='userSpaceOnUse' patternUnits='userSpaceOnUse'>
                <path d="M10,-10 l20,20
                         M0,0 l20,20
                         M-10,10 l20,20"
                    stroke="black" strokeWidth="1" />
            </pattern>
            <pattern id="platePattern2" x="0" y="0" width="20" height="20" patternContentUnits='userSpaceOnUse' patternUnits='userSpaceOnUse'>
                <path d="M10,-10 l-20,20
                         M20,0 l-20,20
                         M30,10 l-20,20"
                    stroke="black" strokeWidth="1" />
            </pattern>
        </defs>
    )
}