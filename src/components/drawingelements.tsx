import { waitFor } from "@testing-library/react";
import { useState } from "react";

var radius = 75;

export function PathCut({ ID, path }) {
    return (
        <path id={ID} fill="url(#cutPattern)" strokeWidth="0.75mmm" stroke="black" d={path} />
    )
}

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

export function PathVisible({ ID, path }) {
    return (
        <path id={ID} className="visibleLine" d={path} />
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

export function Polyline({ ID, path }) {
    return (
        <polyline id={ID} className="polyline" points={path} />
    )
}

export function PolylineDotted({ type, ID, path }) {
    var className: string = 'dottedLine_' + (type) + '';

    return (
        <polyline id={ID} className={className} points={path} />
    )
}

export function RectangleElement({ ID, x, y, width, height }) {
    return (
        <rect id={ID} className="visibleLine" x={x} y={y} width={width} height={height} />
    )
}

export function RectangleElementCut({ ID, x, y, width, height }) {
    return (
        <rect id={ID} fill="url(#cutPattern)" strokeWidth="0.75mm" stroke="black" x={x} y={y} width={width} height={height} />
    )
}

export function RectangleElementCutRound({ ID, x, y, width, height, rx, ry }) {
    return (
        <rect id={ID} fill="url(#cutPattern)" strokeWidth="0.75mm" stroke="black" x={x} y={y} width={width} height={height} rx={rx} ry={ry} />
    )
}


export function RectangleElementRound({ ID, x, y, width, height, rx, ry }) {
    return (
        <rect id={ID} className="visibleLine" x={x} y={y} width={width} height={height} rx={rx} ry={ry} />
    )
}

export function CircleView({ ID, cx, cy, onClick }) {

    var color="black";
    /*const [color, setColor]=useState("")
    function flash(){
        setColor("red");
        setTimeout(()=>this.setColor("black"),6000);
    }*/
    return (
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

export function TextString({ ID, x, y, value }) {
    return (
        <text id={ID} className="text" x={x} y={y} >{value}</text>
    )
}

export function CutPattern(){
    return (
        <defs>
            <pattern id="cutPattern" x="0" y="0" width="10" height="10" patternContentUnits='userSpaceOnUse' patternUnits='userSpaceOnUse'>
              <path d="M5,-5 l10,10
                         M0,0 l10,10
                         M-5,5 l10,10"
                stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
    )
}