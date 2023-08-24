import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, { useEffect, useRef, useState } from 'react';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import './svg-lines.css';
import { Console } from 'console';
import { sign } from 'crypto';

var radius = 75;

function Cut(parent: string,ID: string, path: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var cut=document.createElementNS("http://www.w3.org/2000/svg","path");
    cut.setAttribute('id',ID);
    cut.setAttribute('class', 'cut');
    document.getElementById(parent).appendChild(cut);
  }
  document.getElementById(ID).setAttribute('d', ' ' +path+ ' ');
}

function Arrow(direction:string, parent: string,ID: string, x: number, y:number) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var pathVisible=document.createElementNS("http://www.w3.org/2000/svg","path");
    pathVisible.setAttribute('id',ID);
    pathVisible.setAttribute('class', 'arrow');
    document.getElementById(parent).appendChild(pathVisible);
  }
  var dimensions:number[]=[4,7,10];
  var signs:string[];
  switch(direction)
  {
    case "up":
      signs=["-", "-","+", "+","-", "+","+", "-","-"];
      break;
    case "down":
      signs=["+", "-","-", "+","+", "+","-", "-","+"];
      break;
    case "right":
      signs=["+", "-","-", "+","+", "-","+", "+","-"];
      break;
    case "left":
      signs=["-", "+","-", "-","+", "+","+", "-","-"];
      break;              
    default:
      signs=["-", "-","-", "-","-", "-","-", "-","-"];
      break;
    }
  if(direction=="up" || direction=="down"){
    document.getElementById(ID).setAttribute('d', ' ' +'M' + (x) + ',' + (y) + 
                                                  ' v ' +(signs[0])+''+(+dimensions[2]) + 
                                                  ' l ' +(signs[1])+''+(+dimensions[0]) +' '+(signs[2])+''+(+dimensions[1])+
                                                  ' l ' +(signs[3])+''+(+dimensions[0]) +' '+(signs[4])+''+(+dimensions[1]+dimensions[2])+
                                                  ' l ' +(signs[5])+''+(+dimensions[0]) +' '+(signs[6])+''+(+dimensions[1]+dimensions[2])+
                                                  ' l ' +(signs[7])+''+(+dimensions[0]) +' '+(signs[8])+''+(+dimensions[1])+' Z'+ ' ');
  } else if(direction=="right" || direction=="left"){
    document.getElementById(ID).setAttribute('d', ' ' +'M' + (x) + ',' + (y) + 
                                                  ' h ' +(signs[0])+''+(+dimensions[2]) + 
                                                  ' l ' +(signs[1])+''+(+dimensions[1]) +' '+(signs[2])+''+(+dimensions[0])+
                                                  ' l ' +(signs[3])+''+(+dimensions[1]+dimensions[2]) +' '+(signs[4])+''+(+dimensions[0])+
                                                  ' l ' +(signs[5])+''+(+dimensions[1]+dimensions[2]) +' '+(signs[6])+''+(+dimensions[0])+
                                                  ' l ' +(signs[7])+''+(+dimensions[1]) +' '+(signs[8])+''+(+dimensions[0])+' Z'+ ' ');
  } else{
    document.getElementById(ID).setAttribute('d', ' ' +'M' + (x) + ',' + (y) + 
                                                  ' v ' +(signs[0])+''+(+dimensions[2]) + 
                                                  ' l ' +(signs[1])+''+(+dimensions[0]) +' '+(signs[2])+''+(+dimensions[1])+
                                                  ' l ' +(signs[3])+''+(+dimensions[0]) +' '+(signs[4])+''+(+dimensions[1]+dimensions[2])+
                                                  ' l ' +(signs[5])+''+(+dimensions[0]) +' '+(signs[6])+''+(+dimensions[1]+dimensions[2])+
                                                  ' l ' +(signs[7])+''+(+dimensions[0]) +' '+(signs[8])+''+(+dimensions[1])+' Z'+ ' ');
  }
}

function PathVisible(parent: string,ID: string, path: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var pathVisible=document.createElementNS("http://www.w3.org/2000/svg","path");
    pathVisible.setAttribute('id',ID);
    pathVisible.setAttribute('class', 'visibleLine');
    document.getElementById(parent).appendChild(pathVisible);
  }
  document.getElementById(ID).setAttribute('d', ' ' +path+ ' ');
}

function PathDotted(type: number,parent: string,ID: string, path: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var pathDotted=document.createElementNS("http://www.w3.org/2000/svg","path");
    pathDotted.setAttribute('id',ID);
    pathDotted.setAttribute('class', 'dottedLine_'+(type)+'');
    document.getElementById(parent).appendChild(pathDotted);
  }
  document.getElementById(ID).setAttribute('d', ' ' +path+ ' ');
}

function PathNarrowLine(parent: string,ID: string, path: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var pathNarrowLine=document.createElementNS("http://www.w3.org/2000/svg","path");
    pathNarrowLine.setAttribute('id',ID);
    pathNarrowLine.setAttribute('class', 'narrowLine');
    document.getElementById(parent).appendChild(pathNarrowLine);
  }
  document.getElementById(ID).setAttribute('d', ' ' +path+ ' ');
}

function PathCut(parent: string,ID: string, path: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var cut=document.createElementNS("http://www.w3.org/2000/svg","path");
    cut.setAttribute('id',ID);
    cut.setAttribute('fill', "url(#cutPattern)");
    cut.setAttribute('stroke-width',"0.75mm");
    cut.setAttribute('stroke', 'black');
    document.getElementById(parent).appendChild(cut);
  }
  document.getElementById(ID).setAttribute('d', ' ' +path+ ' ');
}

function Polyline(parent: string,ID: string, path: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var poly=document.createElementNS("http://www.w3.org/2000/svg","polyline");
    poly.setAttribute('id',ID);
    poly.setAttribute('class', 'polyline');
    document.getElementById(parent).appendChild(poly);
  }
  document.getElementById(ID).setAttribute('points', ' ' +path+ ' ');
}


function Rectangle(id: string, x: number, y: number, width: number, height: number) {
  document.getElementById(id).setAttribute('x', '' + x + '');
  document.getElementById(id).setAttribute('y', '' + y + '');
  document.getElementById(id).setAttribute('width', '' + width + '');
  document.getElementById(id).setAttribute('height', '' + height + '');
}

function RectangleElement(parent: string, ID: string, x: number, y: number, width: number, height: number) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var rect=document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect.setAttribute('id',ID);
    rect.setAttribute('class', 'visibleLine');
    document.getElementById(parent).appendChild(rect);
  }
  document.getElementById(ID).setAttribute('x', '' + x + '');
  document.getElementById(ID).setAttribute('y', '' + y + '');
  document.getElementById(ID).setAttribute('width', '' + width + '');
  document.getElementById(ID).setAttribute('height', '' + height + '');
}

function RectangleElementCut(parent: string, ID: string, x: number, y: number, width: number, height: number) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var rect=document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect.setAttribute('id',ID);
    rect.setAttribute('fill', "url(#cutPattern)");
    rect.setAttribute('stroke-width',"0.75mm");
    rect.setAttribute('stroke', 'black');
    document.getElementById(parent).appendChild(rect);
  }
  document.getElementById(ID).setAttribute('x', '' + x + '');
  document.getElementById(ID).setAttribute('y', '' + y + '');
  document.getElementById(ID).setAttribute('width', '' + width + '');
  document.getElementById(ID).setAttribute('height', '' + height + '');
}

function Circle(ID: string, cx: number, cy: number) {
  document.getElementById(ID).setAttribute('cx', '' + cx + '');
  document.getElementById(ID).setAttribute('cy', '' + cy + '');
}

function CircleView(parent: string,ID: string, cx: number, cy: number) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var circle=document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute('id',ID);
    circle.setAttribute('class', 'clickableCircle');
    circle.setAttribute('r',''+radius+'');
    document.getElementById(parent).appendChild(circle);
  }
  document.getElementById(ID).setAttribute('cx', '' + cx + '');
  document.getElementById(ID).setAttribute('cy', '' + cy + '');
}

function CircleMeasure(parent: string,ID: string, cx: number, cy: number) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var circle=document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute('id',ID);
    circle.setAttribute('class', 'circle');
    circle.setAttribute('r',''+3+'');
    document.getElementById(parent).appendChild(circle);
  }
  document.getElementById(ID).setAttribute('cx', '' + cx + '');
  document.getElementById(ID).setAttribute('cy', '' + cy + '');
}



function TextMeasure(parent: string,ID: string, x: number, y: number, value: number, deg:number) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var text=document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute('id',ID);
    text.setAttribute('class', 'text');
    //text.setAttribute('alignment-baseline','center');
    
    document.getElementById(parent).appendChild(text);
  }
  document.getElementById(ID).setAttribute('transform','rotate('+(deg)+','+(x)+','+(y)+')')
  document.getElementById(ID).setAttribute('x', '' + x + '');
  document.getElementById(ID).setAttribute('y', '' + y + '');
  document.getElementById(ID).textContent = '' + value + '';
}

function TextString(parent: string,ID: string, x: number, y: number, value: string) {
  if(document.getElementById(parent).contains(document.getElementById(ID))==false)
  {
    var text=document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute('id',ID);
    text.setAttribute('class', 'text');
    document.getElementById(parent).appendChild(text);
  }
  document.getElementById(ID).setAttribute('x', '' + x + '');
  document.getElementById(ID).setAttribute('y', '' + y + '');
  document.getElementById(ID).textContent = '' + value + '';
}

const Home: React.FC = () => {
  var xOffset = 200;
  var yOffset = 200;
  var corner = 10;
  var startingPoint = 200;
  var xOffsetPlus = 600;
  var leg = 45;
  var magnify = 4;
  var indentation = 25;
  
  var legSize = 45;
  var crossLegsize=21;
  var xstartingPoint;
  var ystartingPoint;



  const heightInputRef = useRef(null);
  const widthInputRef = useRef(null);
  const lengthInputRef = useRef(null);
  const thicknessInputRef = useRef(null);
  //const cornerInputRef=useRef(null);

  /*const [heightMessage,setHeightMessage]=useState('');
  const [widthMessage,setWidthMessage]=useState('');
  const [lengthMessage,setLengthMessage]=useState('');
  const [thicknessMessage,setThicknessMessage]=useState('');
  const [cornerMessage,setCornerMessage]=useState('');*/

  const [heightUpdated, setHeightUpdated] = useState('');
  const [widthUpdated, setWidthUpdated] = useState('');
  const [lengthUpdated, setLengthUpdated] = useState('');
  const [thicknessUpdated, setThicknessUpdated] = useState('');
  const [viewBoxValue, setViewBoxValue] = useState('0 0 2000 2000');
  //const[cornerUpdated, setCornerUpdated]=useState('');

  //const handleChange=(event) 
  const showTopDrawing = () => {
    setViewBoxValue('100 100 ' + (startingPoint + parseInt(widthInputRef.current.value) + 100) + ' ' + (+startingPoint + parseInt(lengthInputRef.current.value) + 50) + '');
  }

  const showFrontDrawing = () => {
    setViewBoxValue('100 ' + (startingPoint + yOffset + parseInt(lengthInputRef.current.value) - 100) + ' ' + (startingPoint + parseInt(widthInputRef.current.value) + 100) + ' ' + (startingPoint + yOffset + parseInt(lengthInputRef.current.value) + parseInt(widthInputRef.current.value + 50)) + '');
  }

  const showFrontTechnicalDrawing = () => {
    setViewBoxValue('100 100 ' + (startingPoint + parseInt(widthInputRef.current.value) + 100) + ' ' + (startingPoint + parseInt(heightInputRef.current.value) + 100) + '');
  }
  const showSideTechnicalDrawing = () => {
    setViewBoxValue('' + (startingPoint + parseInt(widthInputRef.current.value) + 100) + ' ' + (100) + ' '
      + (startingPoint + parseInt(widthInputRef.current.value) + 100 + parseInt(lengthInputRef.current.value) + 100) + ' ' + (startingPoint + parseInt(heightInputRef.current.value) + 100) + '');
  }
  const showTopTechnicalDrawing = () => {
    setViewBoxValue('100 ' + (startingPoint + parseInt(heightInputRef.current.value) + 100) + ' ' + (startingPoint + parseInt(widthInputRef.current.value) + 100) + ' ' + (startingPoint + parseInt(heightInputRef.current.value) + 100 + parseInt(lengthInputRef.current.value) + 100) + '');
  }

  const handleClick = () => {
    document.getElementById("technicalDrawing_front").style.visibility = "visible";
    document.getElementById("technicalDrawing_side").style.visibility = "visible";
    document.getElementById("technicalDrawing_top").style.visibility = "visible";
    document.getElementById("frontTDrawingbtn").style.visibility = "visible";
    document.getElementById("sideTDrawingbtn").style.visibility = "visible";
    document.getElementById("topTDrawingbtn").style.visibility = "visible";
    document.getElementById("first_group").style.visibility = "hidden";
    document.getElementById("second_group").style.visibility = "hidden";
    document.getElementById("third_group").style.visibility = "hidden";
    document.getElementById("drawing_top").style.visibility = "hidden";
    document.getElementById("drawing_front").style.visibility = "hidden";
    document.getElementById("topDrawingbtn").style.visibility = "hidden";
    document.getElementById("frontDrawingbtn").style.visibility = "hidden";
    setViewBoxValue('0 0 2000 2000');
    setHeightUpdated(heightInputRef.current.value);
    setWidthUpdated(widthInputRef.current.value);
    setLengthUpdated(lengthInputRef.current.value);
    setThicknessUpdated(thicknessInputRef.current.value);
    //setCornerUpdated(cornerInputRef.current.value);

    var widthS = widthInputRef.current.value;
    var lengthS = lengthInputRef.current.value;
    var heightS = heightInputRef.current.value;
    var thicknessS = thicknessInputRef.current.value;

    var width = parseInt(widthS);
    var length = parseInt(lengthS);
    var height = parseInt(heightS);
    var thickness = parseInt(thicknessS);



    /**Elölnézet */
    RectangleElement("technicalDrawing_front","plate_front_TD", startingPoint, startingPoint, width, thickness);
    PathCut("technicalDrawing_front","plate_front_cut_TD",'M' + (startingPoint + width / 2) + ', ' + (startingPoint) + ' h' + (width / 2) + ' v' + (thickness) + ' h' + (-width / 2) + ' ');


    PathNarrowLine("technicalDrawing_front","leg_height_measure_TD", 'M' + (startingPoint + indentation) + ',' + (startingPoint + thickness) + ' h -60 v ' + (height - thickness) + ' h 60');
    CircleMeasure("technicalDrawing_front","leg_height_measure_circle_top_TD", (startingPoint + indentation - 60), (startingPoint + thickness));
    CircleMeasure("technicalDrawing_front","leg_height_measure_circle_bottom_TD", (startingPoint + indentation - 60), (startingPoint + thickness + (height - thickness)));
    TextMeasure("technicalDrawing_front","leg_height_measure_text_TD", (startingPoint + indentation - 60 - 10), (startingPoint + thickness + (height - thickness) / 2), (height - thickness),270);

    PathDotted(3,"technicalDrawing_front","divider_line", 'M' + (startingPoint + width / 2) + ' , ' + (startingPoint + height + 30) + ' v -' + (height + 30 + 30) + ' ');

    PathDotted(3,"technicalDrawing_front","cut_A_line", 'M' + (startingPoint + width / 2 - 30) + ' , ' + (startingPoint + height + 50) + ' v -' + (height + 50 + 50) + ' ');
    Arrow("right","technicalDrawing_front","upper_arrow_A",(startingPoint + width / 2 - 30),(startingPoint - 50));
    Arrow("right","technicalDrawing_front","lower_arrow_A",(startingPoint + width / 2 - 30),(startingPoint + height + 50));
    TextString("technicalDrawing_front","text_A", (startingPoint + width / 2), (startingPoint - 50), "A");

    PathDotted(3,"technicalDrawing_front","cut_B_line", 'M' + (startingPoint + width) + ' , ' + (startingPoint + thickness) + ' h ' + (100) + ' ');
    Arrow("down","technicalDrawing_front","arrow_B",(startingPoint + width + 100),(startingPoint + thickness));
    TextString("technicalDrawing_front","text_B", (startingPoint + width + 70), (startingPoint + thickness + 20), "B");

    RectangleElement("technicalDrawing_front","leftleg_front_TD", startingPoint + indentation, startingPoint + thickness, legSize, height - thickness);
    RectangleElement("technicalDrawing_front","rightleg_front_TD", startingPoint + width - indentation - legSize, startingPoint + thickness, legSize, height - thickness);
    RectangleElement("technicalDrawing_front","drawer_front_TD", startingPoint + indentation + legSize, startingPoint + thickness, width - legSize * 2 - indentation * 2, 100);
    RectangleElement("technicalDrawing_front","crossleg_front_TD", startingPoint + indentation + legSize, startingPoint + height - 130, width - legSize * 2 - indentation * 2, 30);
    RectangleElement("technicalDrawing_front","crossleg_front_cut_TD", startingPoint + width - indentation - 5 - 21, startingPoint + height - 130, 21, 30);
    RectangleElement("technicalDrawing_front","rightleg_front_cut_TD", startingPoint + width - indentation - 5 - 21, startingPoint + thickness, 21, 80);


    CircleView("technicalDrawing_front","circle_2", (startingPoint + width - indentation - 5 - 21 / 2), (startingPoint + thickness + 80 / 2));

    TextMeasure("technicalDrawing_front","circle_2_text", (startingPoint + width - indentation - 17.5 - radius), (startingPoint + thickness + 80 / 2 + radius * 2 / 3), 2,0);
    document.getElementById("circle_2").addEventListener("click", function () {
      document.getElementById("first_group").style.visibility = "hidden";
      document.getElementById("second_group").style.visibility = "visible";
      document.getElementById("third_group").style.visibility = "hidden";
      xstartingPoint = startingPoint + xOffsetPlus + width;
      ystartingPoint = startingPoint + height + 200;
      magnify = 4;
      setViewBoxValue('' + (xstartingPoint-100) + ',' + (ystartingPoint-100) + ',' + (300*magnify+40+100+200) + ',' + (thickness*magnify+150*magnify+200) + '');

      /*Láb és fedlap*/
      PathVisible("second_group","plate_part", 'M' + (xstartingPoint) + ',' + (ystartingPoint) + ' h' + ((300 - 2) * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 ' + (2 * magnify) + ' ' + (2 * magnify) + ' v' + ((thickness - 2 - 2) * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 -' + (2 * magnify) + ' ' + (2 * magnify) + ' h-' + ((300 - 2) * magnify) + '');
      PathVisible("second_group","leg_sideView", 'M' + (xstartingPoint + (300 - indentation) * magnify) + ',' + (ystartingPoint + thickness * magnify + 150 * magnify) + 'v -' + (150 * magnify) + ' h -' + (legSize * magnify) + ' v' + (150 * magnify) + '');
      Cut("second_group", "vertical_cut", 'M'+(xstartingPoint)+','+(ystartingPoint)+' v'+(thickness*magnify+80*magnify)+' ');
      Cut("second_group", "horizontal_cut",'M'+(xstartingPoint + (300 - indentation-legSize) * magnify)+','+(ystartingPoint+thickness*magnify+150*magnify)+' h'+(legSize*magnify)+' ');

      PathNarrowLine("second_group","width_measure_sec", 'M' + (xstartingPoint + 300 * magnify) + ',' + (ystartingPoint+2*magnify) + ' v-' + (20+2 * magnify) + ' h-' + (300 * magnify) + '');
      CircleMeasure("second_group","width_measure_circle_sec", (xstartingPoint + 300 * magnify), (ystartingPoint - 20));
      TextMeasure("second_group","width_measure_text_sec", (xstartingPoint + 300 * magnify - 30 * magnify), (ystartingPoint - 20- 10), (width),0);

      PathNarrowLine("second_group","thickness_measure_sec", 'M' + (xstartingPoint + 298 * magnify) + ',' + (ystartingPoint) + ' h' + (40+2 * magnify) + ' v' + (thickness * magnify) + ' h-' + (40) + '');
      CircleMeasure("second_group","thickness_measure_circle_top_sec", (xstartingPoint + 300 * magnify + 40 ), (ystartingPoint));
      CircleMeasure("second_group","thickness_measure_circle_bottom_sec", (xstartingPoint + 300 * magnify + 40 ), (ystartingPoint + thickness * magnify));
      TextMeasure("second_group","thickness_measure_text_sec", (xstartingPoint + 300 * magnify + 40  -10), (ystartingPoint + thickness * magnify / 2), (thickness),270);

      PathNarrowLine("second_group","height_measure_sec", 'M' + (xstartingPoint + 300 * magnify + 40 ) + ',' + (ystartingPoint) + ' h'+(100)+' v' + (thickness * magnify + 100 * magnify));
      CircleMeasure("second_group","height_measure_circle_sec", (xstartingPoint + 300 * magnify + 40  + 100), (ystartingPoint));
      TextMeasure("second_group","height_measure_text_sec", (xstartingPoint + 300 * magnify + 40  + 100 -10), (ystartingPoint + thickness * magnify / 2), (height),270);

      PathNarrowLine("second_group","legSize_indentation_measure_sec", 'M' + (xstartingPoint + 300 * magnify) + ',' + (ystartingPoint + thickness * magnify - 2 * magnify) + ' v' + (110 * magnify) + ' h-' + (indentation * magnify + legSize * magnify));
      CircleMeasure("second_group","legSize_indentation_measure_circle_right_sec", (xstartingPoint + 300 * magnify), (ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify));
      CircleMeasure("second_group","legSize_indentation_measure_circle_middle_sec", (xstartingPoint + 300 * magnify - indentation * magnify), (ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify));
      CircleMeasure("second_group","legSize_indentation_measure_circle_left_sec", (xstartingPoint + 300 * magnify - indentation * magnify - legSize * magnify), (ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify));
      TextMeasure("second_group","indentation_measure_text_sec", (xstartingPoint + 300 * magnify - indentation * magnify / 2), (ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify - 10), indentation,0);
      TextMeasure("second_group","legSize_measure_text_sec", (xstartingPoint + 300 * magnify - indentation * magnify - legSize * magnify / 2), (ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify - 10), legSize,0);


      /*Illesztés */
      PathVisible("second_group","gap_3", 'M' + (xstartingPoint + (300 - indentation - 5) * magnify) + ',' + (ystartingPoint + thickness * magnify) + ' v' + (78 * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 -' + (2 * magnify) + ' ' + (2 * magnify) + ' h-' + (17 * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 -' + (2 * magnify) + ' -' + (2 * magnify) + ' v-' + (78 * magnify) + '');

      PathNarrowLine("second_group","gap_3_width_measure_sec", 'M' + (xstartingPoint + (300 - indentation - 5) * magnify) + ',' + (ystartingPoint + thickness * magnify + 78 * magnify) + ' v' + (40 * magnify) + ' h' + (5 * magnify) + ' h-' + (26 * magnify) + ' v-' + (40 * magnify) + '');
      CircleMeasure("second_group","gap_3_width_measure_circle_rigth_sec", (xstartingPoint + (300 - indentation) * magnify), (ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify));
      CircleMeasure("second_group","gap_3_width_measure_circle_middle_sec", (xstartingPoint + (300 - indentation - 5) * magnify), (ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify));
      CircleMeasure("second_group","gap_3_width_measure_circle_left_sec", (xstartingPoint + (300 - indentation - 5 - 21) * magnify), (ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify));
      TextMeasure("second_group","gap_3_width_measure_text_sec", (xstartingPoint + (300 - indentation - 5 - 10.5) * magnify), (ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify - 20), 21,0);
      TextMeasure("second_group","gap_3_width_measure_text_2_sec", (xstartingPoint + (300 - indentation - 2.5) * magnify), (ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify - 20), 5,0);

      PathNarrowLine("second_group","gap_3_length_measure_sec", 'M' + (xstartingPoint + (300 - indentation - 5 - 2) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + ' h' + ((5 + indentation*2/3) * magnify) + ' v-' + (80 * magnify) + '');
      CircleMeasure("second_group","gap_3_length_measure_circle_bottom_sec", (xstartingPoint + (300 - indentation - 5 - 2) * magnify + (5 + indentation*2/3) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify));
      CircleMeasure("second_group","gap_3_length_measure_circle_top_sec", (xstartingPoint + (300 - indentation - 5 - 2) * magnify + (5 + indentation*2/3) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify));
      TextMeasure("second_group","gap_3_length_measure_text_sec", (xstartingPoint + (300 - indentation - 5 - 2) * magnify + (5 + indentation*2/3) * magnify - 20), (ystartingPoint + thickness * magnify + 80 * magnify / 2), 80,270);

      PathDotted(2,"second_group","gap_3_1", 'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify) + ' v' + (80 * magnify) + '');

      PathNarrowLine("second_group","gap_3_1_width_measure_sec", 'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + ' v' + (20 * magnify) + ' h' + (7 * magnify) + '');
      CircleMeasure("second_group","gap_3_1_width_measure_circle_left_sec", (xstartingPoint + (300 - indentation - 5 - 7) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify));
      CircleMeasure("second_group","gap_3_1_width_measure_circle_right_sec", (xstartingPoint + (300 - indentation - 5) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify));
      TextMeasure("second_group","gap_3_1_width_measure_text_sec", (xstartingPoint + (300 - indentation - 5 - 3.5) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify - 20), 7,0);

      PathDotted(2,"second_group","gap_3_2", 'M' + (xstartingPoint + (300 - indentation - 5 - 7 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify) + ' v' + (80 * magnify) + '');

      PathNarrowLine("second_group","gap_3_2_width_measure_sec", 'M' + (xstartingPoint + (300 - indentation - 5 - 7 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + ' v' + (20 * magnify) + ' h' + (7 * magnify) + '');
      CircleMeasure("second_group","gap_3_2_width_measure_circle_left_sec", (xstartingPoint + (300 - indentation - 5 - 7 - 7) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify));
      TextMeasure("second_group","gap_3_2_width_measure_text_sec", (xstartingPoint + (300 - indentation - 5 - 7 - 3.5) * magnify), (ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify - 20), 7,0);

      PathDotted(2,"second_group","gap_3_3", 'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 15 * magnify) + ' h -' + (24 * magnify) + ' v  -' + (15 * magnify) + '');

      PathNarrowLine("second_group","gap_3_3_length_measure_sec", 'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 15 * magnify) + ' h' + ((7 + 5 + indentation/2) * magnify) + ' v-' + (15 * magnify) + '');
      CircleMeasure("second_group","gap_3_3_length_measure_circle_bottom_sec", (xstartingPoint + (300 - indentation - 5 - 7) * magnify + (7 + 5 + indentation/2) * magnify), (ystartingPoint + thickness * magnify + 15 * magnify));
      CircleMeasure("second_group","gap_3_3_length_measure_circle_top_sec", (xstartingPoint + (300 - indentation - 5 - 7) * magnify + (7 + 5 + indentation/2) * magnify), (ystartingPoint + thickness * magnify));
      TextMeasure("second_group","gap_3_3_length_measure_text_sec", (xstartingPoint + (300 - indentation - 5 - 7) * magnify + (7 + 5 + indentation/2) * magnify - 20), (ystartingPoint + thickness * magnify + 15 * magnify / 2), 15,270);

      PathDotted(2,"second_group","gap_3_4", 'M' + (xstartingPoint + (300 - indentation - 5 - 7 - 24 + 1) * magnify) + ',' + (ystartingPoint + thickness * magnify + 15 * magnify) + ' v -' + (15 * magnify) + '');
      /*Keresztelem*/
      PathVisible("second_group","crossLower", 'M' + (xstartingPoint) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + 'h' + (300 - indentation - 45) * magnify + '');
      PathDotted(2,"second_group","crossLower_dotted", 'M' + (xstartingPoint + (300 - indentation - 45) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + 'h' + (21 * magnify) + '');
    })

    CircleView("technicalDrawing_front","circle_3", (startingPoint + width - indentation - 5 - 21 / 2), startingPoint + height - 130 + 15);
    
    TextMeasure("technicalDrawing_front","circle_3_text", (startingPoint + width - indentation - 5 - 21 / 2 - radius), (startingPoint + height - 130 + 15 - radius), 3,0);
    document.getElementById("circle_3").addEventListener("click", function () {
      document.getElementById("first_group").style.visibility = "hidden";
      document.getElementById("second_group").style.visibility = "hidden";
      document.getElementById("third_group").style.visibility = "visible";
      xstartingPoint = startingPoint + xOffsetPlus + width;
      ystartingPoint = startingPoint + height + 200;
      magnify = 4;
      setViewBoxValue('' + (xstartingPoint-50) + ' ' + (ystartingPoint-50) + ' ' + (60*magnify+legSize*magnify+50*2) + ' ' + (80*magnify+50*2) + '');

      PathVisible("third_group","crossleg_side", 'M' + (xstartingPoint) + ',' + (ystartingPoint + 20 * magnify) + ' h' + (60 * magnify) + ' v' + (30 * magnify) + ' h' + (-(60 * magnify)) + '');
      Cut("third_group","crossleg_side_cut",'M'+(xstartingPoint)+','+(ystartingPoint + 20 * magnify)+' v'+(30*magnify)+'');
      PathNarrowLine("third_group","crossleg_side_measure",'M'+(xstartingPoint+30*magnify)+','+(ystartingPoint+20*magnify)+' v'+(30*magnify)+' ');
      CircleMeasure("third_group","crossleg_side_measure_circle_1",(xstartingPoint+30*magnify),(ystartingPoint+20*magnify));
      CircleMeasure("third_group","crossleg_side_measure_circle_2",(xstartingPoint+30*magnify),(ystartingPoint+20*magnify+30*magnify));
      TextMeasure("third_group","crossleg_side_measure_text",(xstartingPoint+30*magnify-10),(ystartingPoint+20*magnify+30*magnify/2),30,270);

      PathVisible("third_group","leg_left", 'M' + (xstartingPoint + 60 * magnify) + ',' + (ystartingPoint) + ' v' + (80 * magnify) + '');
      PathVisible("third_group","leg_right", 'M' + (xstartingPoint + 60 * magnify + legSize * magnify) + ',' + (ystartingPoint) + ' v' + (80 * magnify) + '');
      Cut("third_group","leg_top_cut",'M'+(xstartingPoint + 60 * magnify)+','+(ystartingPoint)+' h'+(legSize*magnify)+' ');
      Cut("third_group","leg_bottom_cut",'M'+((xstartingPoint + 60 * magnify))+','+(ystartingPoint+80*magnify)+' h'+(legSize*magnify)+' ');

      RectangleElement("third_group","crossleg_hole", (xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify), (ystartingPoint + 20 * magnify), 21 * magnify, 30 * magnify);
      PathNarrowLine("third_group","crossleg_hole_measure",'M'+(xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify)+','+(ystartingPoint + 20 * magnify)+' v-'+(10*magnify)+' h'+(21*magnify)+' v'+(10*magnify)+' ');
      CircleMeasure("third_group","crossleg_hole_measure_circle_1",(xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify) , (ystartingPoint + 20 * magnify-(10*magnify)));
      CircleMeasure("third_group","crossleg_hole_measure_circle_2",(xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify+(21*magnify)) , (ystartingPoint + 20 * magnify-(10*magnify)));
      TextMeasure("third_group","crossleg_hole_measure_text",(xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify+(21*magnify/2)),(ystartingPoint + 20 * magnify-(10*magnify)-10),21,0);
      
      PathNarrowLine("third_group","crossleg_hole_measure_2",'M'+(xstartingPoint + 60 * magnify + (legSize - 5) * magnify)+','+(ystartingPoint + 20 * magnify)+' h'+(5*magnify)+'');
      CircleMeasure("third_group","crossleg_hole_measure_2_circle_1",(xstartingPoint + 60 * magnify + (legSize - 5) * magnify),(ystartingPoint + 20 * magnify));
      CircleMeasure("third_group","crossleg_hole_measure_2_circle_2",(xstartingPoint + 60 * magnify + (legSize - 5) * magnify+(5*magnify)),(ystartingPoint + 20 * magnify));
      TextMeasure("third_group","crossleg_hole_measure_2_text",(xstartingPoint + 60 * magnify + (legSize - 5) * magnify+(5*magnify)/2),(ystartingPoint + 20 * magnify-10),5,0);

      PathDotted(1,"third_group","gap1", 'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' v' + (30 * magnify) + '');
      PathDotted(1,"third_group","gap2", 'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7 + 7) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' v' + (30 * magnify) + '');
      PathNarrowLine("third_group","gap1_measure",'M'+(xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify)+' , '+(ystartingPoint + 50 * magnify)+' v'+(10*magnify)+' h'+(7*magnify)+' v-'+(10*magnify)+' ');
      CircleMeasure("third_group","gap1_measure_circle_1",(xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify),(ystartingPoint + 50 * magnify+(10*magnify)));
      CircleMeasure("third_group","gap1_measure_circle_2",(xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify+(7*magnify)),(ystartingPoint + 50 * magnify+(10*magnify)));
      TextMeasure("third_group","gap1_measure_text",(xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify+(7*magnify)/2),(ystartingPoint + 50 * magnify+(10*magnify)-10),7,0);
      
      PathDotted(1,"third_group","invisible1", 'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' h' + (-((legSize - 21 - 5) * magnify)) + '');
      PathDotted(1,"third_group","invisible2", 'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify) + ',' + (ystartingPoint + (20 + 30) * magnify) + ' h' + (-((legSize - 21 - 5) * magnify)) + '');

    })


    /**Oldalnézet */
    xstartingPoint = startingPoint + width + 200;
    ystartingPoint = startingPoint + height + 200;
    RectangleElement("technicalDrawing_side","plate_side_TD", xstartingPoint, startingPoint, length, thickness);

    PathNarrowLine("technicalDrawing_side","height_measure_TD", 'M' + xstartingPoint + ',' + startingPoint + ' h-' + (40) + ' v' + (height) + ' h ' + (40 + indentation) + ' ');
    CircleMeasure("technicalDrawing_side","height_measure_circle_top_TD", xstartingPoint - 40, startingPoint);
    CircleMeasure("technicalDrawing_side","height_measure_circle_bottom_TD", xstartingPoint - 40, startingPoint + height);
    TextMeasure("technicalDrawing_side","height_measure_text_TD", (xstartingPoint - 40 - 10), (startingPoint + (height) / 2), (height),270);

    PathNarrowLine("technicalDrawing_side","thickness_cut_measure_TD", 'M' + (xstartingPoint + indentation + 5) + ',' + (startingPoint + thickness + 80) + ' h-' + (indentation + 20) + ' v-' + (80 + thickness + 20) + ' ');
    PathNarrowLine("technicalDrawing_side","thickness_cut_measure_2_TD", 'M' + (xstartingPoint) + ',' + (startingPoint + thickness) + ' h-' + (15) + '');
    CircleMeasure("technicalDrawing_side","thickness_measure_circle_top_TD", xstartingPoint - 15, startingPoint);
    CircleMeasure("technicalDrawing_side","thickness_measure_circle_bottom_TD", xstartingPoint - 15, startingPoint + thickness);
    CircleMeasure("technicalDrawing_side","cut_measure_circle_bottom_TD", xstartingPoint - 15, startingPoint + thickness + 80);
    TextMeasure("technicalDrawing_side","thickness_measure_text_TD", (xstartingPoint -15- 10), (startingPoint - 10), (thickness),270);
    TextMeasure("technicalDrawing_side","cut_measure_text_TD", (xstartingPoint - 15-10), (startingPoint + thickness + 80 / 2), (80),270);

    PathNarrowLine("technicalDrawing_side","cut_width_measure_TD", 'M' + (xstartingPoint + indentation + 5) + ',' + (startingPoint + thickness + 80) + ' v' + (35) + ' h' + (21) + ' v' + (-35) + ' ');
    CircleMeasure("technicalDrawing_side","cut_width_measure_circle_left_TD", xstartingPoint + indentation + 5, startingPoint + thickness + 80 + 35);
    CircleMeasure("technicalDrawing_side","cut_width_measure_circle_right_TD", xstartingPoint + indentation + 5 + 21, startingPoint + thickness + 80 + 35);
    TextMeasure("technicalDrawing_side","cut_width_measure_text_TD", xstartingPoint + indentation + 5 + 21 / 2, startingPoint + thickness + 80 + 35 + 20, 21,0);

    PathNarrowLine("technicalDrawing_side","drawer_crossleg_measure_TD", 'M' + (xstartingPoint + indentation + legSize + 30) + ',' + (startingPoint + thickness + 100) + ' v' + (height - thickness - 100 - 100+30) + ' ');
    CircleMeasure("technicalDrawing_side","drawer_crossleg_measure_circle_top_TD", (xstartingPoint + indentation + legSize + 30), (startingPoint + thickness + 100));
    CircleMeasure("technicalDrawing_side","drawer_crossleg_measure_circle_middle_TD", (xstartingPoint + indentation + legSize + 30), (startingPoint + thickness + 100 + (height - thickness - 100 - 100) - 30));
    CircleMeasure("technicalDrawing_side","drawer_crossleg_measure_circle_bottom_TD", (xstartingPoint + indentation + legSize + 30), (startingPoint + thickness + 100 + (height - thickness - 100 - 100)));
    TextMeasure("technicalDrawing_side","drawer_measure_text_TD", (xstartingPoint + indentation + legSize + 30 - 10), (startingPoint + thickness + 100 + (height - thickness - 100 - 30 - 100) / 2), (height - thickness - 100 - 30 - 100),270);
    TextMeasure("technicalDrawing_side","crossleg_measure_text_TD", (xstartingPoint + indentation + legSize + 30 - 10), (startingPoint + thickness + 100 + (height - thickness - 100 - 100 + 20)), (30),270);

    PathDotted(3,"technicalDrawing_side","divider_line_side_TD", 'M ' + (xstartingPoint + length / 2) + ' ' + (startingPoint - 30) + ' v' + (height + 30 + 30) + ' ');

    RectangleElement("technicalDrawing_side","leftleg_side_TD", xstartingPoint + indentation, startingPoint + thickness, legSize, height - thickness);
    RectangleElement("technicalDrawing_side","rightleg_side_TD", xstartingPoint + length - indentation - legSize, startingPoint + thickness, legSize, height - thickness);
    RectangleElement("technicalDrawing_side","drawer_side_TD", xstartingPoint + indentation + legSize, startingPoint + thickness, length - legSize * 2 - indentation * 2, 100);
    RectangleElement("technicalDrawing_side","crossleg_side_TD", xstartingPoint + indentation + legSize, startingPoint + height - 130, length - legSize * 2 - indentation * 2, 30);
    RectangleElement("technicalDrawing_side","crossleg_side_right_cut_TD", xstartingPoint + length - indentation - 5 - 21, startingPoint + height - 130, 21, 30);
    RectangleElement("technicalDrawing_side","crossleg_side_left_cut_TD", xstartingPoint + indentation + 5, startingPoint + height - 130, 21, 30);
    RectangleElement("technicalDrawing_side","rightleg_side_cut_TD", xstartingPoint + length - indentation - 5 - 21, startingPoint + thickness, 21, 80);
    RectangleElement("technicalDrawing_side","leftleg_side_cut_TD", xstartingPoint + indentation + 5, startingPoint + thickness, 21, 80);

    /**Felülnézet*/

    PathVisible("technicalDrawing_top","plate_part_visible", 'M' + (startingPoint + width / 2) + ',' + (ystartingPoint) + ' h' + (-(width / 2 - corner)) +
      ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (-corner) + ' ' + (corner) + ' v' + ((length - corner - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (corner) + ' ' + (corner) + ' h' + (width / 2 - corner) + '');

    PathDotted(3,"technicalDrawing_top","divider_top_TD", 'M' + (startingPoint + width / 2) + ',' + (ystartingPoint - 30) + ' v' + (length + 30 + 30) + '');
    PathDotted(3,"technicalDrawing_top","divider_top_2_TD", 'M' + (startingPoint - 30) + ' ' + (ystartingPoint + length / 2) + ' h' + (width + 30 + 30) + ' ');

    PathDotted(3,"technicalDrawing_top","cut_C_line", 'M' + (startingPoint + width / 2) + ' , ' + (ystartingPoint + width * 3 / 5) + ' h' + (width / 2 + 100) + ' ');
    Arrow("up","technicalDrawing_top","arrow_C",(startingPoint + width + 100),(ystartingPoint + width * 3 / 5));
    TextString("technicalDrawing_top","text_C", (startingPoint + width + 95), (ystartingPoint + width * 3 / 5 - 30), "C");

    PathNarrowLine("technicalDrawing_top","length_top_measure_TD", 'M' + (startingPoint + 20) + ',' + (ystartingPoint) + ' h-' + 40 + ' v' + length + ' h' + 40 + '');
    CircleMeasure("technicalDrawing_top","length_top_measure_circle_top_TD", (startingPoint + 20 - 40), ystartingPoint);
    CircleMeasure("technicalDrawing_top","length_top_measure_circle_bottom_TD", (startingPoint + 20 - 40), (ystartingPoint + length));
    TextMeasure("technicalDrawing_top","length_top_measure_text_TD", (startingPoint + 20 -40-10), (ystartingPoint + length / 2), (length),270);

    PathDotted(2,"technicalDrawing_top","plate_part_invisible", 'M' + (startingPoint + width / 2) + ',' + (ystartingPoint) + ' h' + ((width / 2 - corner)) +
      ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (corner) + ' ' + (corner) + ' v' + ((length - corner - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (-corner) + ' ' + (corner) + ' h' + (-(width / 2 - corner)) + '');

    PathNarrowLine("technicalDrawing_top","width_top_measure_TD", 'M' + (startingPoint) + ',' + (ystartingPoint + 20) + ' v-' + 40 + ' h' + (width) + ' v' + (40) + '');
    CircleMeasure("technicalDrawing_top","width_top_measure_circle_left_TD", startingPoint, (ystartingPoint + 20 - 40));
    CircleMeasure("technicalDrawing_top","width_top_measure_circle_right_TD", (startingPoint + width), (ystartingPoint + 20 - 40));
    TextMeasure("technicalDrawing_top","width_top_measure_text_TD", (startingPoint + width / 2), (ystartingPoint + 20 - 40 - 10), (width),0);

    RectangleElementCut("technicalDrawing_top",'upperleg_top', (startingPoint + width - indentation - legSize), (ystartingPoint + indentation), legSize, legSize);
    RectangleElementCut("technicalDrawing_top",'lowerleg_top', (startingPoint + width - indentation - legSize), (ystartingPoint + length - indentation - legSize), legSize, legSize);
    

    PathNarrowLine("technicalDrawing_top","lower_leg_top_measure_TD", 'M' + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation) + ' v' + (indentation + 50) + ' h' + (legSize) + ' v-' + (indentation + 50) + '');
    CircleMeasure("technicalDrawing_top","lower_leg_top_measure_circle_left_TD", (startingPoint + width - indentation - legSize), (ystartingPoint + length + 50));
    CircleMeasure("technicalDrawing_top","lower_leg_top_measure_circle_right_TD", (startingPoint + width - indentation - legSize + legSize), (ystartingPoint + length + 50));
    TextMeasure("technicalDrawing_top","lower_leg_top_measure_text_TD", (startingPoint + width - indentation - legSize / 2), (ystartingPoint + length + 50 + 20), (legSize),0);

    PathNarrowLine("technicalDrawing_top","indentation_vertical_top_measure_TD", 'M' + (startingPoint + width) + ',' + ((ystartingPoint + length - indentation)) + ' v' + (indentation + 50) + ' h-' + (40) + '');
    CircleMeasure("technicalDrawing_top","indentation_vertical_top_measure_circle_TD", (startingPoint + width), ((ystartingPoint + length) + 50));
    TextMeasure("technicalDrawing_top","indentation_vertical_top_measure_text_TD", ((startingPoint + width) - indentation/2), ((ystartingPoint + length) + 50 + 20), (indentation),0);

    PathNarrowLine("technicalDrawing_top","lower_leg_top_measure_2_TD", 'M' + (startingPoint + width - indentation) + ',' + (ystartingPoint + length - indentation) + ' h' + (indentation + 50) + ' v-' + (legSize) + ' h-' + (indentation + 50) + ' ');
    CircleMeasure("technicalDrawing_top","lower_leg_top_measure_2_circle_lower_TD", (startingPoint + width + 50), (ystartingPoint + length - indentation));
    CircleMeasure("technicalDrawing_top","lower_leg_top_measure_2_circle_upper_TD", (startingPoint + width + 50), (ystartingPoint + length - indentation - legSize));
    TextMeasure("technicalDrawing_top","lower_leg_top_measure_2_text_TD", (startingPoint + width + 50 + 10), (ystartingPoint + length - indentation - legSize / 2), legSize,270);

    PathNarrowLine("technicalDrawing_top","indentation_horizontal_top_measure_TD", 'M' + (startingPoint + width - indentation) + ', ' + (ystartingPoint + length) + ' h' + (indentation + 50) + ' v-' + (indentation + legSize + 40) + ' v' + (indentation + legSize + 40 + 40) + ' ');
    CircleMeasure("technicalDrawing_top","indentation_horizontal_top_measure_circle_TD", (startingPoint + width + 50), (ystartingPoint + length));
    TextMeasure("technicalDrawing_top","indentation_horizontal_top_measure_text_TD", (startingPoint + width + 50 + 10), (ystartingPoint + length - indentation / 2), indentation,270);

    //document.getElementById("lowerleg_top_measure_TD").setAttribute('d','M'+(startingPoint+width-40-legSize)+','+(ystartingPoint+length-40-legSize)+'');

    //document.getElementById("indentation_horizontal_top_measure_TD").setAttribute('d','M'+(startingPoint+width)+','+((ystartingPoint+length-40-legSize)+legSize)+' v'+(80)+' h'+(indentation)+'');

    Polyline("technicalDrawing_top","upper_crossleg", '' + (startingPoint + width / 2) + ',' + (ystartingPoint + indentation + 5) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5 + 7) + ' '
      + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + indentation + 5 + 7) + ' '
      + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + indentation + 5 + 7 + 7) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5 + 7 + 7) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5 + 7 + 7 + 7) + ' '
      + (startingPoint + width / 2) + ',' + (ystartingPoint + indentation + 5 + 7 + 7 + 7) + ' ');
     Polyline("technicalDrawing_top","lower_crossleg", '' + (startingPoint + width / 2) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7) + ' '
      + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7) + ' '
      + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7) + ' '
      + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7 + 7) + ' '
      + (startingPoint + width / 2) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7 + 7) + ' ');
    Polyline("technicalDrawing_top","middle_crossleg", '' + (startingPoint + width - indentation - 5) + ',' + (ystartingPoint + legSize + indentation) + ' '
      + (startingPoint + width - indentation - 5 - 7) + ',' + (ystartingPoint + legSize + indentation) + ' '
      + (startingPoint + width - indentation - 5 - 7) + ',' + (ystartingPoint + legSize + indentation - 10) + ' '
      + (startingPoint + width - indentation - 5 - 7 - 7) + ',' + (ystartingPoint + legSize + indentation - 10) + ' '
      + (startingPoint + width - indentation - 5 - 7 - 7) + ',' + (ystartingPoint + legSize + indentation) + ' '
      + (startingPoint + width - indentation - 5 - 7 - 7 - 7) + ',' + (ystartingPoint + legSize + indentation) + ' '
      + (startingPoint + width - indentation - 5 - 7 - 7 - 7) + ',' + (ystartingPoint + length - indentation - legSize) + ' '
      + (startingPoint + width - indentation - 5 - 7 - 7) + ',' + (ystartingPoint + length - indentation - legSize) + ' '
      + (startingPoint + width - indentation - 5 - 7 - 7) + ',' + (ystartingPoint + length - indentation - legSize + 10) + ' '
      + (startingPoint + width - indentation - 5 - 7) + ',' + (ystartingPoint + length - indentation - legSize + 10) + ' '
      + (startingPoint + width - indentation - 5 - 7) + ',' + (ystartingPoint + length - indentation - legSize) + ' '
      + (startingPoint + width - indentation - 5) + ',' + (ystartingPoint + length - indentation - legSize) + ' '
      + (startingPoint + width - indentation - 5) + ',' + (ystartingPoint + legSize + indentation) + ' ');

    TextMeasure("technicalDrawing_top","circle_1_text", (startingPoint + width - indentation - legSize / 2 - radius), (ystartingPoint + length - indentation - legSize / 2 + radius), 1,0);
    CircleView("technicalDrawing_top","circle_1", (startingPoint + width - indentation - legSize / 2), (ystartingPoint + length - indentation - legSize / 2));
    
    document.getElementById("circle_1").addEventListener("click", function () {
      document.getElementById("first_group").style.visibility = "visible";
      document.getElementById("second_group").style.visibility = "hidden";
      document.getElementById("third_group").style.visibility = "hidden";
      /**Lábmetszet */
      var measureOffset=120
      xstartingPoint = startingPoint + xOffsetPlus + width+1000;
      ystartingPoint = startingPoint + height + 1000;
      setViewBoxValue('' + (xstartingPoint-200-50) + ' ' + (ystartingPoint-200-50) + ' ' + (200+50+legSize*magnify+measureOffset+10+50) + ' ' + (200+50+legSize*magnify+measureOffset+10+50) + '');
      RectangleElementCut("first_group",'leg_upper_view', (xstartingPoint), (ystartingPoint), (magnify * leg), (magnify * leg));
      document.getElementById('leg_upper_view').setAttribute('rx', '10');
      document.getElementById('leg_upper_view').setAttribute('ry', '10');

      

      /**Keresztelemek */
      var crossLegThird=crossLegsize/3;
      Polyline("first_group",'crossElement_1', '' + (xstartingPoint + 19 * magnify) + ',' + (ystartingPoint - 200) + ' '
        + (xstartingPoint + 19 * magnify) + ',' + (ystartingPoint) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint - 200) + ' ');

      Cut("first_group","horizontal_cut_1", 'M '+(xstartingPoint+19*magnify)+','+(ystartingPoint-200)+' h'+(crossLegsize*magnify+indentation*magnify));

      PathDotted(2,"first_group","plate",'M'+(xstartingPoint+legSize*magnify+indentation*magnify)+','+(ystartingPoint-200)+' v'+(200+legSize*magnify+indentation*magnify-corner*magnify)+' a' + (corner*magnify) + ' ' + (corner*magnify) + ' 0 0 1 ' + (-corner*magnify) + ' ' + (corner*magnify) + ' h' + (-(200+legSize*magnify+indentation*magnify - corner*magnify)) + '');

      PathNarrowLine("first_group","crossElement_1_measure","M"+(xstartingPoint + 19 * magnify)+","+(ystartingPoint - 100)+" h"+(crossLegsize*magnify)+" h"+(5*magnify)+" v"+(100+10)+" ");
      CircleMeasure("first_group","crossElement_1_measure_circle_1",(xstartingPoint + 19 * magnify),(ystartingPoint - 100));
      CircleMeasure("first_group","crossElement_1_measure_circle_2",(xstartingPoint + 19 * magnify+crossLegsize*magnify),(ystartingPoint - 100));
      TextMeasure("first_group","crossElement_1_measure_text_1",(xstartingPoint + 19 * magnify+crossLegsize*magnify/2),(ystartingPoint - 100-5),crossLegsize,0);
      CircleMeasure("first_group","crossElement_1_measure_circle_3",(xstartingPoint + 19 * magnify+crossLegsize*magnify+5*magnify),(ystartingPoint - 100));
      TextMeasure("first_group","crossElement_1_measure_text_2",(xstartingPoint + 19 * magnify+crossLegsize*magnify+5*magnify/2),(ystartingPoint - 100-5),5,0);

      PathNarrowLine("first_group","crossElement_1_third_measure",'M'+(xstartingPoint+40*magnify)+','+(ystartingPoint-50)+' h-'+(crossLegThird*magnify)+' v'+(50)+' v-'+(50)+' h-'+(crossLegThird*magnify)+' v'+(50)+' ');
      CircleMeasure("first_group","crossElement_1_third_measure_circle_1",(xstartingPoint+40*magnify),(ystartingPoint-50));
      CircleMeasure("first_group","crossElement_1_third_measure_circle_2",(xstartingPoint+(40-crossLegThird)*magnify),(ystartingPoint-50));
      CircleMeasure("first_group","crossElement_1_third_measure_circle_3",(xstartingPoint+(40-crossLegThird-crossLegThird)*magnify),(ystartingPoint-50));
      TextMeasure("first_group","crossElement_1_third_measure_text_1",(xstartingPoint+(40-crossLegThird/2)*magnify),(ystartingPoint-50-5),crossLegThird,0);
      TextMeasure("first_group","crossElement_1_third_measure_text_2",(xstartingPoint+(40-crossLegThird-crossLegThird/2)*magnify),(ystartingPoint-50-5),crossLegThird,0);

      PathNarrowLine("first_group","crossElement_1_indentation_measure",'M'+(xstartingPoint+leg*magnify-10)+','+(ystartingPoint)+' h'+(30)+' v'+(10*magnify)+' h-'+(30)+' ');
      CircleMeasure("first_group","crossElement_1_indentation_measure_circle_1",(xstartingPoint+leg*magnify-10+30),(ystartingPoint));
      CircleMeasure("first_group","crossElement_1_indentation_measure_circle_2",(xstartingPoint+leg*magnify-10+30),(ystartingPoint+10*magnify));
      TextMeasure("first_group","crossElement_1_indentation_measure_text",(xstartingPoint+leg*magnify-10+30-10),(ystartingPoint+10*magnify/2),10,270);

      Polyline("first_group",'crossElement_2', '' + (xstartingPoint-200) + ',' + (ystartingPoint  + 19 * magnify) + ' '
        + (xstartingPoint) + ',' + (ystartingPoint  + 19 * magnify) + ' '
        + (xstartingPoint) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint + 9 * magnify) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint + 9 * magnify) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint-200) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' ');
      
      Cut("first_group","horizontal_cut_2", 'M '+(xstartingPoint-200)+','+(ystartingPoint+19*magnify)+' v'+(crossLegsize*magnify+indentation*magnify));

      PathNarrowLine("first_group","crossElement_2_measure","M"+(xstartingPoint-100)+","+(ystartingPoint  + 19 * magnify)+" v"+(crossLegsize*magnify)+" v"+(5*magnify)+" h"+(100+10)+" ");
      CircleMeasure("first_group","crossElement_2_measure_circle_1",(xstartingPoint-100),(ystartingPoint  + 19 * magnify));
      CircleMeasure("first_group","crossElement_2_measure_circle_2",(xstartingPoint-100),(ystartingPoint  + 19 * magnify+crossLegsize*magnify));
      TextMeasure("first_group","crossElement_2_measure_text_1",(xstartingPoint-100-10),(ystartingPoint  + 19 * magnify+crossLegsize*magnify/2),crossLegsize,270);
      CircleMeasure("first_group","crossElement_2_measure_circle_3",(xstartingPoint-100),(ystartingPoint  + 19 * magnify+crossLegsize*magnify+5*magnify));
      TextMeasure("first_group","crossElement_2_measure_text_2",(xstartingPoint-100-10),(ystartingPoint  + 19 * magnify+crossLegsize*magnify+5*magnify/2),5,270);

      PathNarrowLine("first_group","crossElement_2_third_measure",'M'+(xstartingPoint-50)+','+(ystartingPoint+40*magnify)+' v-'+(crossLegThird*magnify)+' h'+(50)+' h-'+(50)+' v-'+(crossLegThird*magnify)+' h'+(50)+' ');
      CircleMeasure("first_group","crossElement_2_third_measure_circle_1",(xstartingPoint-50),(ystartingPoint+40*magnify));
      CircleMeasure("first_group","crossElement_2_third_measure_circle_2",(xstartingPoint-50),(ystartingPoint+(40-crossLegThird)*magnify));
      CircleMeasure("first_group","crossElement_2_third_measure_circle_3",(xstartingPoint-50),(ystartingPoint+(40-crossLegThird-crossLegThird)*magnify));
      TextMeasure("first_group","crossElement_2_third_measure_text_1",(xstartingPoint-50-10),(ystartingPoint+(40-crossLegThird/2)*magnify),crossLegThird,270);
      TextMeasure("first_group","crossElement_2_third_measure_text_2",(xstartingPoint-50-10),(ystartingPoint+(40-crossLegThird-crossLegThird/2)*magnify),crossLegThird,270);

      PathNarrowLine("first_group","crossElement_2_indentation_measure",'M'+(xstartingPoint)+','+(ystartingPoint+leg*magnify-10)+' v'+(30)+' h'+(10*magnify)+' v-'+(30-10)+' ');
      CircleMeasure("first_group","crossElement_2_indentation_measure_circle_1",(xstartingPoint),(ystartingPoint+leg*magnify-10+30));
      CircleMeasure("first_group","crossElement_2_indentation_measure_circle_2",(xstartingPoint+10*magnify),(ystartingPoint+leg*magnify-10+30));
      TextMeasure("first_group","crossElement_2_indentation_measure_text",(xstartingPoint+10*magnify/2),(ystartingPoint+leg*magnify-10+30-10),10,0);

      
      PathNarrowLine("first_group",'leg_upper_view_vertical_measure','M'+(xstartingPoint+magnify*leg-10)+','+(ystartingPoint)+' h'+(measureOffset+10)+' v'+(legSize*magnify)+' h-'+(measureOffset+10)+' ');
      CircleMeasure("first_group",'leg_upper_view_vertical_circle_1',(xstartingPoint+magnify*leg-10+(measureOffset+10)),(ystartingPoint));
      CircleMeasure("first_group",'leg_upper_view_vertical_circle_2',(xstartingPoint+magnify*leg-10+(measureOffset+10)),(ystartingPoint+(legSize*magnify)));
      TextMeasure("first_group",'leg_upper_view_vertical_text',(xstartingPoint+magnify*leg-10+(measureOffset+10)-10),(ystartingPoint+(legSize*magnify)/2),legSize,270);

      PathNarrowLine("first_group",'leg_upper_view_horizontal_measure','M'+(xstartingPoint)+','+(ystartingPoint+magnify*leg-10)+' v'+(measureOffset+10)+' h'+(legSize*magnify)+' v-'+(measureOffset+10)+' ');
      CircleMeasure("first_group",'leg_upper_view_horizontal_circle_1',(xstartingPoint),(ystartingPoint+magnify*leg-10+(measureOffset+10)));
      CircleMeasure("first_group",'leg_upper_view_horizontal_circle_2',(xstartingPoint+(legSize*magnify)),(ystartingPoint+magnify*leg-10+(measureOffset+10)));
      TextMeasure("first_group",'leg_upper_view_horizontal_text',(xstartingPoint+(legSize*magnify)/2),(ystartingPoint+magnify*leg-10+(measureOffset+10)-10),legSize,0);


      /**Belső elemek */

      RectangleElement("first_group","glue_1", (xstartingPoint + 19 * magnify + crossLegThird * magnify), (ystartingPoint  + 9 * magnify), crossLegThird * magnify, 1 * magnify);
      PathNarrowLine("first_group","glue_1_measure",'M'+(xstartingPoint + 19 * magnify + crossLegThird * magnify+crossLegThird*magnify)+','+(ystartingPoint  + 9 * magnify)+' h'+(12*magnify+15)+' v'+(1*magnify+20)+' v-'+(20)+' h-'+(12*magnify+15)+'');
      CircleMeasure("first_group","glue_1_measure_circle_1",(xstartingPoint + 19 * magnify + crossLegThird * magnify+crossLegThird*magnify+(12*magnify+15)),(ystartingPoint  + 9 * magnify));
      CircleMeasure("first_group","glue_1_measure_circle_2",(xstartingPoint + 19 * magnify + crossLegThird * magnify+crossLegThird*magnify+(12*magnify+15)),(ystartingPoint  + 9 * magnify+1*magnify));
      TextMeasure("first_group","glue_1_measure_text",(xstartingPoint + 19 * magnify + crossLegThird * magnify+crossLegThird*magnify+(12*magnify+15)-5),(ystartingPoint  + 9 * magnify+1*magnify+20/2),1,270);

      RectangleElement("first_group","glue_2", (xstartingPoint + 9 * magnify), (ystartingPoint  + 19 * magnify + crossLegThird * magnify), 1 * magnify, crossLegThird * magnify);
      
      Polyline("first_group",'gap_1', '' + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint  + 9 * magnify + 1 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint  + 9 * magnify + 1 * magnify + 16 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + crossLegThird * magnify - 16 * magnify) + ',' + (ystartingPoint  + 9 * magnify + 1 * magnify + 16 * magnify) + ' ');
        document.getElementById('gap_1').setAttribute("class","dottedLine_2");
      
      PathNarrowLine("first_group","gap_1_measure",'M'+(xstartingPoint+leg*magnify-10)+','+(ystartingPoint)+' h'+(60)+' v'+(32*magnify)+' h-'+(60-10)+' ');
      CircleMeasure("first_group","gap_1_measure_circle_1",(xstartingPoint+leg*magnify-10+60),(ystartingPoint));
      CircleMeasure("first_group","gap_1_measure_circle_2",(xstartingPoint+leg*magnify-10+60),(ystartingPoint+32*magnify));
      TextMeasure("first_group","gap_1_measure_text",(xstartingPoint+leg*magnify-10+60-10),(ystartingPoint+32*magnify/2),32,270);

      Polyline("first_group","gap_2", '' + (xstartingPoint + 9 * magnify + 1 * magnify) + ',' + (ystartingPoint +  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint + 9 * magnify + 1 * magnify + 15 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint + 9 * magnify + 1 * magnify + 23 * magnify) + ',' + (ystartingPoint  + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
        + (xstartingPoint + 9 * magnify + 1 * magnify + 23 * magnify) + ',' + (ystartingPoint  + 9 * magnify + 1 * magnify) + ' ');
        document.getElementById('gap_2').setAttribute("class","dottedLine_2");

      PathNarrowLine("first_group","gap_2_measure",'M'+(xstartingPoint)+','+(ystartingPoint+leg*magnify-10)+' v'+(60)+' h'+(32*magnify)+' v-'+(60-10)+' ');
      CircleMeasure("first_group","gap_2_measure_circle_1",(xstartingPoint),(ystartingPoint+leg*magnify-10+60));
      CircleMeasure("first_group","gap_2_measure_circle_2",(xstartingPoint+32*magnify),(ystartingPoint+leg*magnify-10+60));
      TextMeasure("first_group","gap_2_measure_text",(xstartingPoint+32*magnify/2),(ystartingPoint+leg*magnify-10+60-10),32,0);
      
      PathDotted(2,"first_group","line_1", 'M' + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ' ' + (ystartingPoint + 9 * magnify + 1 * magnify + 16 * magnify - 1 * magnify) + ' l' + (crossLegThird * magnify) + ' ' + (crossLegThird * magnify) + ' Z');
      PathDotted(2,"first_group","line_2", 'M' + (xstartingPoint + 19 * magnify + crossLegThird * magnify - 1 * magnify) + ' ' + (ystartingPoint  + 9 * magnify + 1 * magnify + 16 * magnify) + ' l' + (crossLegThird * magnify) + ' ' + (crossLegThird * magnify) + ' Z');
    })


  }

  const handleClick2 = () => {
    document.getElementById("technicalDrawing_front").style.visibility = "hidden";
    document.getElementById("technicalDrawing_side").style.visibility = "hidden";
    document.getElementById("technicalDrawing_top").style.visibility = "hidden";
    document.getElementById("frontTDrawingbtn").style.visibility = "hidden";
    document.getElementById("sideTDrawingbtn").style.visibility = "hidden";
    document.getElementById("topTDrawingbtn").style.visibility = "hidden";
    document.getElementById("first_group").style.visibility = "hidden";
    document.getElementById("second_group").style.visibility = "hidden";
    document.getElementById("third_group").style.visibility = "hidden";
    document.getElementById("drawing_top").style.visibility = "visible";
    document.getElementById("drawing_front").style.visibility = "visible";
    document.getElementById("topDrawingbtn").style.visibility = "visible";
    document.getElementById("frontDrawingbtn").style.visibility = "visible";

    setViewBoxValue('0 0 2000 2000');
    setHeightUpdated(heightInputRef.current.value);
    setWidthUpdated(widthInputRef.current.value);
    setLengthUpdated(lengthInputRef.current.value);
    setThicknessUpdated(thicknessInputRef.current.value);
    //setCornerUpdated(cornerInputRef.current.value);


    var widthS = widthInputRef.current.value;
    var lengthS = lengthInputRef.current.value;
    var heightS = heightInputRef.current.value;
    var thicknessS = thicknessInputRef.current.value;

    var width = parseInt(widthS);
    var length = parseInt(lengthS);
    var height = parseInt(heightS);
    var thickness = parseInt(thicknessS);
    /**Tervrajz */

    /**Felülnézet */
    RectangleElement("drawing_top","rect", startingPoint, startingPoint, width, length);
    document.getElementById("rect").setAttribute('rx', '10');
    document.getElementById("rect").setAttribute('ry', '10');

    PathNarrowLine("drawing_top","measure_width_a", 'M' + startingPoint + ','+(startingPoint)+' v-'+(50)+'');
    PathNarrowLine("drawing_top","measure_width_b", 'M' + (startingPoint + width) +','+(startingPoint)+' v-'+(50)+'');
    PathNarrowLine("drawing_top","measure_width_c", 'M' + startingPoint + ','+(startingPoint-50)+' h'+(width)+'');
    CircleMeasure("drawing_top","measure_width_c_circle_1", (startingPoint),(startingPoint-50));
    CircleMeasure("drawing_top","measure_width_c_circle_2", (startingPoint + width), (startingPoint-50));
    TextMeasure("drawing_top","measure_width_c_text", (startingPoint + width / 2), (startingPoint-50-5),width,0);

    PathNarrowLine("drawing_top","measure_length_a", 'M' + (startingPoint+width) + ','+(startingPoint)+' h' + (50) + '');
    PathNarrowLine("drawing_top","measure_length_b", 'M' + (startingPoint + width) + ',' + (startingPoint + length) + ' h' + (50) + ' ');
    PathNarrowLine("drawing_top","measure_length_c", 'M' + (startingPoint  + width +50) + ',' + (startingPoint) + ' v' + (length) + '');
    CircleMeasure("drawing_top","measure_length_c_circle_1", (startingPoint  + width +50), startingPoint);
    CircleMeasure("drawing_top","measure_length_c_circle_2", (startingPoint  + width +50), (startingPoint + length));
    TextMeasure("drawing_top","measure_length_c_text",(startingPoint + width +50+5),(startingPoint + length / 2),length,90);
    
    PathDotted(1,"drawing_top","measure_width_half", 'M' + (startingPoint + width / 2) + ','+(startingPoint-20)+' v' + (length+20*2) + ' ');
    PathDotted(1,"drawing_top","measure_length_half", 'M'+(startingPoint-20)+',' + (startingPoint + length / 2) + ' h' + (width+20*2) + ' ');


    /**Elölnézet */
    ystartingPoint=startingPoint+length+yOffset
    RectangleElement("drawing_front","plate", startingPoint, ystartingPoint, width, thickness);
    RectangleElement("drawing_front","leftLeg", startingPoint+indentation, ystartingPoint + thickness, legSize, height - thickness);
    RectangleElement("drawing_front","rightLeg", (startingPoint + width - indentation - legSize), (ystartingPoint + thickness), legSize, height - thickness);
    RectangleElement("drawing_front","crossLeg", startingPoint+legSize+indentation, (ystartingPoint + height - 100-30), (width - 2 * (legSize + indentation)), 30);
    RectangleElement("drawing_front","drawer", startingPoint+legSize+indentation, (ystartingPoint + thickness), (width - (2 * (indentation + legSize))), 100);


    PathNarrowLine("drawing_front","measure_height_a", 'M'+(startingPoint)+',' + (ystartingPoint) + ' h-'+(50)+' ');
    PathNarrowLine("drawing_front","measure_height_b", 'M'+(startingPoint+indentation)+',' + (ystartingPoint + height) + ' h-'+(50+indentation)+'');
    PathNarrowLine("drawing_front","measure_height_c", 'M'+(startingPoint-50)+',' + (ystartingPoint) + ' v ' + (height) + ' ');
    CircleMeasure("drawing_front","measure_height_c_circle_1", (startingPoint-50), (ystartingPoint));
    CircleMeasure("drawing_front","measure_height_c_circle_2", (startingPoint-50), (ystartingPoint + height));
    TextMeasure("drawing_front","measure_height_text",(startingPoint-50-5),(ystartingPoint + height / 2),height,270);

    PathNarrowLine("drawing_front","measure_thickness_a", 'M' + (startingPoint + width) + ',' + (ystartingPoint) + ' h'+(30)+'');
    PathNarrowLine("drawing_front","measure_thickness_b", 'M' + (startingPoint + width) + ',' + (ystartingPoint + thickness) + ' h'+(30)+'');
    PathNarrowLine("drawing_front","measure_thickness_c", 'M' + (startingPoint + width + 30) + ' ' + (ystartingPoint) + ' v ' + thickness + '');
    CircleMeasure("drawing_front","measure_thickness_c_circle_1", (startingPoint + width + 30), (ystartingPoint));
    CircleMeasure("drawing_front","measure_thickness_c_circle_2", (startingPoint + width + 30), (ystartingPoint + thickness));
    TextMeasure("drawing_front","measure_thickness_text",(startingPoint + width + 30+5),(ystartingPoint  + thickness / 2),thickness,270);

    PathNarrowLine("drawing_front","measure_crossLeg_a", 'M '+(startingPoint+legSize+indentation)+' ' + (ystartingPoint + height) + ' h'+(20)+'');
    PathNarrowLine("drawing_front","measure_crossLeg_b", 'M '+(startingPoint+legSize+indentation+20)+' ' + (ystartingPoint + height - 100 - 30 - 50) + ' v'+(100+30+50)+'');
    CircleMeasure("drawing_front","measure_crossLeg_b_circle_1", (startingPoint+legSize+indentation+20), (ystartingPoint + height - 100 - 30));
    CircleMeasure("drawing_front","measure_crossLeg_b_circle_2", (startingPoint+legSize+indentation+20), (ystartingPoint + height - 100));
    CircleMeasure("drawing_front","measure_crossLeg_b_circle_3", (startingPoint+legSize+indentation+20), (ystartingPoint + height));
    TextMeasure("drawing_front","measure_crossLeg_b_text_1", (startingPoint+legSize+indentation+20+5), (ystartingPoint + height - 100 - 30 - 50/2), 30,270);
    TextMeasure("drawing_front","measure_crossLeg_b_text_2", (startingPoint+legSize+indentation+20+5), (ystartingPoint + height - 100/2), 100,270);

    PathNarrowLine("drawing_front","measure_drawer_a", 'M' + (startingPoint + width - legSize - indentation) + ' ' + (ystartingPoint + thickness + 100) + ' h'+(legSize+indentation)+' ');
    PathNarrowLine("drawing_front","measure_drawer_b", 'M' + (startingPoint + width) + ' ' + (ystartingPoint + thickness) + ' v'+(100)+' ');
    CircleMeasure("drawing_front","measure_drawer_circle", (startingPoint + width), (ystartingPoint + thickness + 100));
    TextMeasure("drawing_front","measure_drawer_text", (startingPoint + width + 5), (ystartingPoint + thickness + 100/2), 100,270);

    /**Oldalnézet 
    //Rectangle("plate_S",(200+width+xOffset),(200+length+yOffset),length,thickness);
    document.getElementById("plate_S").setAttribute('x', ''+(200+width+xOffset)+'');
    document.getElementById("plate_S").setAttribute('y', ''+(200+length+yOffset)+'');
    document.getElementById("plate_S").setAttribute('width', length);
    document.getElementById("plate_S").setAttribute('height', thickness);

    //Rectangle();
    document.getElementById("frontLeg").setAttribute('x', ''+(200+width+xOffset+25)+'');
    document.getElementById("frontLeg").setAttribute('y', ''+(200+length+yOffset+thickness)+'');
    document.getElementById("frontLeg").setAttribute('width','35');
    document.getElementById("frontLeg").setAttribute('height',''+(height-thickness)+'');

    //Rectangle();
    document.getElementById("backLeg").setAttribute('x',''+(200+width+xOffset+length-25-35)+'');
    document.getElementById("backLeg").setAttribute('y', ''+(200+length+yOffset+thickness)+'');
    document.getElementById("backLeg").setAttribute('width','35');
    document.getElementById("backLeg").setAttribute('height',''+(height-thickness)+'');

    //Rectangle();
    document.getElementById("crossLeg_S").setAttribute('x',''+(200+width+xOffset+25+35)+'');
    document.getElementById("crossLeg_S").setAttribute('y',''+(200+length+yOffset+height-130)+'');
    document.getElementById("crossLeg_S").setAttribute('width',''+(length-2*(25+35))+'');
    document.getElementById("crossLeg_S").setAttribute('height','30');

    //Rectangle();
    document.getElementById("drawer_S").setAttribute('x',''+(200+width+xOffset+25+35)+'');
    document.getElementById("drawer_S").setAttribute('y',''+(200+length+yOffset+thickness)+'');
    document.getElementById("drawer_S").setAttribute('width',''+(length-(2*(25+35)))+'');
    document.getElementById("drawer_S").setAttribute('height','100');*/

    /**Csomópont 1. */

    Circle("circle_1", (200 + width - 25 - 17.5), (200 + length - 25 - 17.5));
    document.getElementById("circle_1").setAttribute('r', '' + radius + '');
    document.getElementById("circle_1").addEventListener("click", function () {
      /**Lábmetszet */
      xstartingPoint = startingPoint + xOffsetPlus + width;
      Rectangle('leg_upper_view', (xstartingPoint), (200 + length / 4), (magnify * leg), (magnify * leg));
      document.getElementById('leg_upper_view').setAttribute('rx', '10');
      document.getElementById('leg_upper_view').setAttribute('ry', '10');
      /**Keresztelemek */
      document.getElementById('crossElement_1').setAttribute('points', '' + (xstartingPoint + 19 * magnify) + ',100 '
        + (xstartingPoint + 19 * magnify) + ',' + (200 + length / magnify) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify) + ',' + (200 + length / magnify) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify) + ',' + (200 + length / 4 + 9 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify + 7 * magnify) + ',' + (200 + length / 4 + 9 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify + 7 * magnify) + ',' + (200 + length / 4) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify + 7 * magnify + 7 * magnify) + ',' + (200 + length / 4) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify + 7 * magnify + 7 * magnify) + ',100 ');

      document.getElementById('crossElement_2').setAttribute('points', '' + (200 + xOffsetPlus / 2 + width) + ',' + (200 + length / 4 + 19 * magnify) + ' '
        + (xstartingPoint) + ',' + (200 + length / 4 + 19 * magnify) + ' '
        + (xstartingPoint) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify) + ' '
        + (xstartingPoint + 9 * magnify) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify) + ' '
        + (xstartingPoint + 9 * magnify) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify + 7 * magnify) + ' '
        + (xstartingPoint) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify + 7 * magnify) + ' '
        + (xstartingPoint) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify + 7 * magnify + 7 * magnify) + ' '
        + (200 + xOffsetPlus / 2 + width) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify + 7 * magnify + 7 * magnify) + ' ');
      Rectangle("glue_1", (xstartingPoint + 19 * magnify + 7 * magnify), (200 + length / 4 + 9 * magnify), 7 * magnify, 1 * magnify);
      Rectangle("glue_2", (xstartingPoint + 9 * magnify), (200 + length / 4 + 19 * magnify + 7 * magnify), 1 * magnify, 7 * magnify);

      document.getElementById('gap_1').setAttribute('points', '' + (xstartingPoint + 19 * magnify + 7 * magnify) + ',' + (200 + length / 4 + 9 * magnify + 1 * magnify) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify) + ',' + (200 + length / 4 + 9 * 4 + 1 * 4 + 16 * 4) + ' '
        + (xstartingPoint + 19 * magnify + 7 * magnify - 16 * magnify) + ',' + (200 + length / 4 + 9 * magnify + 1 * magnify + 16 * magnify) + ' ');

      document.getElementById("gap_2").setAttribute('points', '' + (xstartingPoint + 9 * magnify + 1 * magnify) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify + 7 * magnify) + ' '
        + (xstartingPoint + 9 * 4 + 1 * 4 + 15 * 4 + 7 * 4) + ',' + (200 + length / 4 + 19 * 4 + 7 * 4 + 7 * 4) + ' '
        + (xstartingPoint + 9 * magnify + 1 * magnify + 23 * magnify) + ',' + (200 + length / 4 + 19 * magnify + 7 * magnify + 7 * magnify) + ' '
        + (xstartingPoint + 9 * magnify + 1 * magnify + 23 * magnify) + ',' + (200 + length / 4 + 9 * magnify + 1 * magnify) + ' ');

      document.getElementById("line_1").setAttribute('d', 'M' + (xstartingPoint + 19 * magnify + 7 * magnify) + ' ' + (200 + length / 4 + 9 * magnify + 1 * magnify + 16 * magnify - 1 * magnify) + ' l' + (7 * magnify) + ' ' + (7 * magnify) + ' Z');
      document.getElementById("line_2").setAttribute('d', 'M' + (xstartingPoint + 19 * magnify + 7 * magnify - 1 * magnify) + ' ' + (200 + length / 4 + 9 * magnify + 1 * magnify + 16 * magnify) + ' l' + (7 * magnify) + ' ' + (7 * magnify) + ' Z');
    })

    /*Csomópont 2.*/




    /*
    document.getElementById("circle_4").setAttribute('cx',''+(200+width+length+xOffset-25-17.5)+'');
    document.getElementById("circle_4").setAttribute('cy',''+(200+length+yOffset+thickness/2)+'');
    document.getElementById("circle_4").setAttribute('r', ''+radius+'');
    document.getElementById("circle_4_text").setAttribute('x',''+(200+width+length+xOffset-25-17.5-radius)+'');
    document.getElementById("circle_4_text").setAttribute('y',''+(200+length+yOffset+thickness/2-radius)+'');
    document.getElementById("circle_4_text").textContent='4';
    document.getElementById("circle_4").addEventListener("click",function(){
      alert('click4');
    })*/



  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tervrajz készítő</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={true} scrollX={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid >
          <IonRow>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Magasság(mm)</IonLabel>
                <IonInput ref={heightInputRef} id='height' name='height' type="number" min={0}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Szélesség(mm)</IonLabel>
                <IonInput ref={widthInputRef} id='width' name='width' type="number" min={0}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Hosszúság(mm)</IonLabel>
                <IonInput ref={lengthInputRef} id='length' name='length' type="number" min={0}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Anyagvastagság(mm)</IonLabel>
                <IonInput ref={thicknessInputRef} id='thickness' name='thickness' type="number" min={0}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonButton onClick={handleClick2}>Jellegrajz</IonButton>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonButton onClick={handleClick}>Tervrajz</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol id='topDrawingbtn' size='auto'>
              <IonItem>
                <IonButton onClick={showTopDrawing}>Felülnézet(Jellegrajz)</IonButton>
              </IonItem>
            </IonCol>
            <IonCol id='frontDrawingbtn' size='auto'>
              <IonItem>
                <IonButton onClick={showFrontDrawing}>Elölnézet(Jellegrajz)</IonButton>
              </IonItem>
            </IonCol>
            <IonCol id='frontTDrawingbtn' size='auto'>
              <IonItem>
                <IonButton onClick={showFrontTechnicalDrawing}>Elölnézet(Tervrajz)</IonButton>
              </IonItem>
            </IonCol>
            <IonCol id='sideTDrawingbtn' size='auto'>
              <IonItem>
                <IonButton onClick={showSideTechnicalDrawing}>Oldalnézet(Tervrajz)</IonButton>
              </IonItem>
            </IonCol>
            <IonCol id='topTDrawingbtn' size='auto'>
              <IonItem>
                <IonButton onClick={showTopTechnicalDrawing}>Felülnézet(Tervrajz)</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>

        </IonGrid>
        <div id='svg_container'>
          <svg id='first' viewBox={viewBoxValue} preserveAspectRatio='xMidYMid meet'>
            <defs>
              <pattern id="cutPattern" x="0" y="0" width="10" height="10" patternContentUnits='Default' patternUnits='userSpaceOnUse'>
                <path d="M5,-5 l10,10
                         M0,0 l10,10
                         M-5,5 l10,10" 
                 stroke="black" strokeWidth="1"/>
              </pattern>
            </defs>

        /**Tervrajz */
            /**Elölnézet */
            <g id="technicalDrawing_front" visibility="hidden"></g>
          /**Oldalnézet */
            <g id="technicalDrawing_side"></g>
            /**Felülnézet */
            <g id="technicalDrawing_top"></g>
          /**Jellegrajz*/
            /**Felülnézet */
            <g id="drawing_top"></g>
          /**Elölnézet */
            <g id="drawing_front"></g>
          /**Oldalnézet */
            <g id='drawing_side'></g>
          /**Csomópontok */
          /**Csomópont 1. */
            <g id='first_group'></g>
          /**Csomópont 2. */
            <g id='second_group'></g>
          /**Csomópont 3. */
            <g id="third_group"></g>

          </svg>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;
