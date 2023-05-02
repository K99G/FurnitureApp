import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow,  IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, { useEffect, useRef, useState } from 'react';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import './svg-lines.css';
import { Console } from 'console';



function Rectangle(id:string, x:number, y:number, width:number, height:number)
{
  document.getElementById(id).setAttribute('x', ''+x+'');
  document.getElementById(id).setAttribute('y', ''+y+'');
  document.getElementById(id).setAttribute('width', ''+width+'');
  document.getElementById(id).setAttribute('height', ''+height+'');
}

function Circle(id:string ,cx:number, cy:number)
{
  document.getElementById(id).setAttribute('cx',''+cx+'');
  document.getElementById(id).setAttribute('cy',''+cy+'');  
}

function Text(id:string, x:number,y:number,value:number)
{
  document.getElementById(id).setAttribute('x',''+x+'');
  document.getElementById(id).setAttribute('y',''+y+'');
  document.getElementById(id).textContent=''+value+'';
}

const Home: React.FC = () => {
  var xOffset=200;
  var yOffset=200;
  var corner=10;
  var startingPoint=200;
  var xOffsetPlus=600;
  var leg=45;
  var magnify=4;
  var indentation=25;
  var radius=75;
  var legSize=45;
  var xstartingPoint;
  var ystartingPoint;



  const heightInputRef=useRef(null);
  const widthInputRef=useRef(null);
  const lengthInputRef=useRef(null);
  const thicknessInputRef=useRef(null);
  //const cornerInputRef=useRef(null);

  /*const [heightMessage,setHeightMessage]=useState('');
  const [widthMessage,setWidthMessage]=useState('');
  const [lengthMessage,setLengthMessage]=useState('');
  const [thicknessMessage,setThicknessMessage]=useState('');
  const [cornerMessage,setCornerMessage]=useState('');*/

  const[heightUpdated, setHeightUpdated]=useState('');
  const[widthUpdated, setWidthUpdated]=useState('');
  const[lengthUpdated, setLengthUpdated]=useState('');
  const[thicknessUpdated, setThicknessUpdated]=useState('');
  const[viewBoxValue, setViewBoxValue]=useState('0 0 2000 2000');
  //const[cornerUpdated, setCornerUpdated]=useState('');

  //const handleChange=(event) 
  const showTopDrawing=()=>{
    setViewBoxValue('100 100 '+(startingPoint+parseInt(widthInputRef.current.value)+100)+' '+(+startingPoint+parseInt(lengthInputRef.current.value)+50)+'');
  }

  const showFrontDrawing=()=>{
    setViewBoxValue('100 '+(startingPoint+yOffset+parseInt(lengthInputRef.current.value)-100)+' '+(startingPoint+parseInt(widthInputRef.current.value)+100)+' '+(startingPoint+yOffset+parseInt(lengthInputRef.current.value)+parseInt(widthInputRef.current.value+50))+'');
  }

  const showFrontTechnicalDrawing=()=>{
    setViewBoxValue('100 100 '+(startingPoint+parseInt(widthInputRef.current.value)+100)+' '+(startingPoint+parseInt(heightInputRef.current.value)+100)+'');
  }
  const showSideTechnicalDrawing=()=>{
    setViewBoxValue(''+(startingPoint+parseInt(widthInputRef.current.value)+100)+' '+(100)+' '+(startingPoint+parseInt(widthInputRef.current.value)+100+parseInt(lengthInputRef.current.value)+100)+' '+(startingPoint+parseInt(heightInputRef.current.value)+100)+'');
  }
  const showTopTechnicalDrawing=()=>{
    setViewBoxValue('100 '+(startingPoint+parseInt(heightInputRef.current.value)+100)+' '+(startingPoint+parseInt(widthInputRef.current.value)+100)+' '+(startingPoint+parseInt(heightInputRef.current.value)+100+parseInt(lengthInputRef.current.value)+100)+'');
  }

  const handleClick2=()=>{
    document.getElementById("technicalDrawing_front").style.visibility="visible";
    document.getElementById("technicalDrawing_side").style.visibility="visible";
    document.getElementById("technicalDrawing_top").style.visibility="visible";
    document.getElementById("frontTDrawingbtn").style.visibility="visible";
    document.getElementById("sideTDrawingbtn").style.visibility="visible";
    document.getElementById("topTDrawingbtn").style.visibility="visible";
    document.getElementById("first_group").style.visibility="hidden";
    document.getElementById("second_group").style.visibility="hidden";
    document.getElementById("third_group").style.visibility="hidden";
    document.getElementById("drawing_top").style.visibility="hidden";
    document.getElementById("drawing_front").style.visibility="hidden";
    document.getElementById("topDrawingbtn").style.visibility="hidden";
    document.getElementById("frontDrawingbtn").style.visibility="hidden";
    setViewBoxValue('0 0 2000 2000');
    setHeightUpdated(heightInputRef.current.value);
    setWidthUpdated(widthInputRef.current.value);
    setLengthUpdated(lengthInputRef.current.value);
    setThicknessUpdated(thicknessInputRef.current.value);
    //setCornerUpdated(cornerInputRef.current.value);

    var widthS=widthInputRef.current.value;
    var lengthS=lengthInputRef.current.value;
    var heightS=heightInputRef.current.value;
    var thicknessS=thicknessInputRef.current.value;

    var width=parseInt(widthS);
    var length=parseInt(lengthS);
    var height=parseInt(heightS);
    var thickness=parseInt(thicknessS);

    
    
    /**Elölnézet */
    Rectangle("plate_front_TD",startingPoint,startingPoint,width,thickness);

    document.getElementById("leg_height_measure_TD").setAttribute('d','M'+(startingPoint+indentation)+','+(startingPoint+thickness)+' h -60 v '+(height-thickness)+' h 60');
    Circle("leg_height_measure_circle_top_TD",(startingPoint+indentation-60),(startingPoint+thickness));
    Circle("leg_height_measure_circle_bottom_TD",(startingPoint+indentation-60),(startingPoint+thickness+(height-thickness)));
    document.getElementById("leg_height_measure_text_TD").setAttribute('x',''+(startingPoint+indentation-60-10)+'');
    document.getElementById("leg_height_measure_text_TD").setAttribute('y',''+(startingPoint+thickness+(height-thickness)/2)+'');
    document.getElementById("leg_height_measure_text_TD").textContent=''+(height-thickness)+'';


    Rectangle("leftleg_front_TD",startingPoint+indentation,startingPoint+thickness,legSize,height-thickness);
    Rectangle("rightleg_front_TD",startingPoint+width-indentation-legSize,startingPoint+thickness,legSize,height-thickness);
    Rectangle("drawer_front_TD",startingPoint+indentation+legSize,startingPoint+thickness,width-legSize*2-indentation*2,100);
    Rectangle("crossleg_front_TD",startingPoint+indentation+legSize,startingPoint+height-130,width-legSize*2-indentation*2,30);
    Rectangle("crossleg_front_cut_TD", startingPoint+width-indentation-5-21,startingPoint+height-130,21,30);
    Rectangle("rightleg_front_cut_TD", startingPoint+width-indentation-5-21,startingPoint+thickness,21,80);


    Circle("circle_2",(startingPoint+width-indentation-5-21/2),(startingPoint+thickness+80/2));
    document.getElementById("circle_2").setAttribute('r', ''+radius+'');
    document.getElementById("circle_2_text").setAttribute('x',''+(200+width-25-17.5-radius)+'');
    document.getElementById("circle_2_text").setAttribute('y',''+(200+length+yOffset+thickness/2-radius)+'');
    document.getElementById("circle_2_text").textContent='2';
    document.getElementById("circle_2").addEventListener("click",function(){
      document.getElementById("first_group").style.visibility="hidden";
      document.getElementById("second_group").style.visibility="visible";
      document.getElementById("third_group").style.visibility="hidden";
      xstartingPoint=startingPoint+xOffsetPlus+width;
      ystartingPoint=startingPoint+height+200;
      magnify=4;
      document.getElementById("first").setAttribute('viewBox',''+(startingPoint+xOffsetPlus+width/2)+' '+(startingPoint)+' '+(2000)+' '+(2000)+'');
      setViewBoxValue(''+(startingPoint+xOffsetPlus+width/2)+' '+(startingPoint)+' '+(1500)+' '+(1500)+'');

      /*Láb és fedlap*/ 
      document.getElementById("plate_part").setAttribute('d','M'+(xstartingPoint)+','+(ystartingPoint)+' h'+((300-2)*magnify)+' a'+(2*magnify)+' '+(2*magnify)+' 0 0 1 '+(2*magnify)+' '+(2*magnify)+' v'+((thickness-2-2)*magnify)+' a'+(2*magnify)+' '+(2*magnify)+' 0 0 1 -'+(2*magnify)+' '+(2*magnify)+' h-'+((300-2)*magnify)+'');
      document.getElementById("leg_sideView").setAttribute('d', 'M'+(xstartingPoint+(300-indentation)*magnify)+','+(ystartingPoint+thickness*magnify+150*magnify)+'v -'+(150*magnify)+' h -'+(legSize*magnify)+' v'+(150*magnify)+'');

      document.getElementById("width_measure_sec").setAttribute('d','M'+(xstartingPoint+300*magnify)+','+(ystartingPoint)+' v-'+(20*magnify)+' h-'+(300*magnify)+'');
      Circle("width_measure_circle_sec",(xstartingPoint+width*magnify),(ystartingPoint-20*magnify));
      document.getElementById("width_measure_text_sec").setAttribute('x',''+(xstartingPoint+300*magnify-30*magnify)+'');
      document.getElementById("width_measure_text_sec").setAttribute('y',''+(ystartingPoint-20*magnify+20)+'');
      document.getElementById("width_measure_text_sec").textContent=''+(width)+'';

      document.getElementById("thickness_measure_sec").setAttribute('d','M'+(xstartingPoint+300*magnify)+','+(ystartingPoint)+' h'+(40*magnify)+' v'+(thickness*magnify)+' h-'+(40*magnify)+'');
      Circle("thickness_measure_circle_top_sec",(xstartingPoint+300*magnify+40*magnify),(ystartingPoint));
      Circle("thickness_measure_circle_bottom_sec",(xstartingPoint+300*magnify+40*magnify),(ystartingPoint+thickness*magnify));
      document.getElementById("thickness_measure_text_sec").setAttribute('x',''+(xstartingPoint+300*magnify+40*magnify+20)+'');
      document.getElementById("thickness_measure_text_sec").setAttribute('y',''+(ystartingPoint+thickness*magnify/2)+'');
      document.getElementById("thickness_measure_text_sec").textContent=''+(thickness)+'';

      document.getElementById("height_measure_sec").setAttribute('d','M'+(xstartingPoint+300*magnify+40*magnify+20+20*magnify)+','+(ystartingPoint)+' v'+(thickness*magnify+100*magnify));
      Circle("height_measure_circle_sec",(xstartingPoint+300*magnify+40*magnify+20+20*magnify),(ystartingPoint));
      document.getElementById("height_measure_text_sec").setAttribute('x',''+(xstartingPoint+300*magnify+40*magnify+20+20*magnify+20)+'');
      document.getElementById("height_measure_text_sec").setAttribute('y',''+(ystartingPoint+thickness*magnify/2)+'');
      document.getElementById("height_measure_text_sec").textContent=''+(height)+'';

      document.getElementById("legSize_indentation_measure_sec").setAttribute('d','M'+(xstartingPoint+300*magnify)+','+(ystartingPoint+thickness*magnify-2*magnify)+' v'+(110*magnify)+' h-'+(indentation*magnify+legSize*magnify));
      Circle("legSize_indentation_measure_circle_right_sec",(xstartingPoint+300*magnify),(ystartingPoint+thickness*magnify-2*magnify+110*magnify));
      Circle("legSize_indentation_measure_circle_middle_sec",(xstartingPoint+300*magnify-indentation*magnify),(ystartingPoint+thickness*magnify-2*magnify+110*magnify));
      Circle("legSize_indentation_measure_circle_left_sec",(xstartingPoint+300*magnify-indentation*magnify-legSize*magnify),(ystartingPoint+thickness*magnify-2*magnify+110*magnify));
      Text("indentation_measure_text_sec",(xstartingPoint+300*magnify-indentation*magnify/2),(ystartingPoint+thickness*magnify-2*magnify+110*magnify-20),indentation);
      Text("legSize_measure_text_sec",(xstartingPoint+300*magnify-indentation*magnify-legSize*magnify/2),(ystartingPoint+thickness*magnify-2*magnify+110*magnify-20),legSize);


      /*Illesztés */
      document.getElementById("gap_3").setAttribute('d','M'+(xstartingPoint+(300-indentation-5)*magnify)+','+(ystartingPoint+thickness*magnify)+' v'+(78*magnify)+' a'+(2*magnify)+' '+(2*magnify)+' 0 0 1 -'+(2*magnify)+' '+(2*magnify)+' h-'+(17*magnify)+' a'+(2*magnify)+' '+(2*magnify)+' 0 0 1 -'+(2*magnify)+' -'+(2*magnify)+' v-'+(78*magnify)+'');

      document.getElementById("gap_3_width_measure_sec").setAttribute('d','M'+(xstartingPoint+(300-indentation-5)*magnify)+','+(ystartingPoint+thickness*magnify+78*magnify)+' v'+(40*magnify)+' h'+(5*magnify)+' h-'+(26*magnify)+' v-'+(40*magnify)+'');
      Circle("gap_3_width_measure_circle_rigth_sec",(xstartingPoint+(300-indentation)*magnify),(ystartingPoint+thickness*magnify+78*magnify+40*magnify));
      Circle("gap_3_width_measure_circle_middle_sec",(xstartingPoint+(300-indentation-5)*magnify),(ystartingPoint+thickness*magnify+78*magnify+40*magnify));
      Circle("gap_3_width_measure_circle_left_sec",(xstartingPoint+(300-indentation-5-21)*magnify),(ystartingPoint+thickness*magnify+78*magnify+40*magnify));
      Text("gap_3_width_measure_text_sec",(xstartingPoint+(300-indentation-5-10.5)*magnify),(ystartingPoint+thickness*magnify+78*magnify+40*magnify-20),21);
      Text("gap_3_width_measure_text_2_sec",(xstartingPoint+(300-indentation-2.5)*magnify),(ystartingPoint+thickness*magnify+78*magnify+40*magnify-20),5);

      document.getElementById("gap_3_length_measure_sec").setAttribute('d','M'+(xstartingPoint+(300-indentation-5-2)*magnify)+','+(ystartingPoint+thickness*magnify+80*magnify)+' h'+((5+60)*magnify)+' v-'+(80*magnify)+'');
      Circle("gap_3_length_measure_circle_bottom_sec",(xstartingPoint+(300-indentation-5-2)*magnify+(5+60)*magnify),(ystartingPoint+thickness*magnify+80*magnify));
      Circle("gap_3_length_measure_circle_top_sec",(xstartingPoint+(300-indentation-5-2)*magnify+(5+60)*magnify),(ystartingPoint+thickness*magnify+80*magnify));
      Text("gap_3_length_measure_text_sec",(xstartingPoint+(300-indentation-5-2)*magnify+(5+60)*magnify-20),(ystartingPoint+thickness*magnify+80*magnify/2),80);

      document.getElementById("gap_3_1").setAttribute('d', 'M'+(xstartingPoint+(300-indentation-5-7)*magnify)+','+(ystartingPoint+thickness*magnify)+' v'+(80*magnify)+'');

      document.getElementById("gap_3_1_width_measure_sec").setAttribute('d','M'+(xstartingPoint+(300-indentation-5-7)*magnify)+','+(ystartingPoint+thickness*magnify+80*magnify)+' v'+(20*magnify)+' h'+(7*magnify)+'');
      Circle("gap_3_1_width_measure_circle_left_sec",(xstartingPoint+(300-indentation-5-7)*magnify),(ystartingPoint+thickness*magnify+80*magnify+20*magnify));
      Circle("gap_3_1_width_measure_circle_right_sec",(xstartingPoint+(300-indentation-5)*magnify),(ystartingPoint+thickness*magnify+80*magnify+20*magnify));
      Text("gap_3_1_width_measure_text_sec",(xstartingPoint+(300-indentation-5-3.5)*magnify),(ystartingPoint+thickness*magnify+80*magnify+20*magnify-20),7);

      document.getElementById("gap_3_2").setAttribute('d', 'M'+(xstartingPoint+(300-indentation-5-7-7)*magnify)+','+(ystartingPoint+thickness*magnify)+' v'+(80*magnify)+'');

      document.getElementById("gap_3_2_width_measure_sec").setAttribute('d','M'+(xstartingPoint+(300-indentation-5-7-7)*magnify)+','+(ystartingPoint+thickness*magnify+80*magnify)+' v'+(20*magnify)+' h'+(7*magnify)+'');
      Circle("gap_3_2_width_measure_circle_left_sec",(xstartingPoint+(300-indentation-5-7-7)*magnify),(ystartingPoint+thickness*magnify+80*magnify+20*magnify));
      Text("gap_3_2_width_measure_text_sec",(xstartingPoint+(300-indentation-5-7-3.5)*magnify),(ystartingPoint+thickness*magnify+80*magnify+20*magnify-20),7);

      document.getElementById("gap_3_3").setAttribute('d', 'M'+(xstartingPoint+(300-indentation-5-7)*magnify)+','+(ystartingPoint+thickness*magnify+15*magnify)+' h -'+(24*magnify)+' v  -'+(15*magnify)+'');

      document.getElementById("gap_3_3_length_measure_sec").setAttribute('d','M'+(xstartingPoint+(300-indentation-5-7)*magnify)+','+(ystartingPoint+thickness*magnify+15*magnify)+' h'+((7+5+30)*magnify)+' v-'+(15*magnify)+'');
      Circle("gap_3_3_length_measure_circle_bottom_sec",(xstartingPoint+(300-indentation-5-7)*magnify+(7+5+30)*magnify),(ystartingPoint+thickness*magnify+15*magnify));
      Circle("gap_3_3_length_measure_circle_top_sec",(xstartingPoint+(300-indentation-5-7)*magnify+(7+5+30)*magnify),(ystartingPoint+thickness*magnify));
      Text("gap_3_3_length_measure_text_sec",(xstartingPoint+(300-indentation-5-7)*magnify+(7+5+30)*magnify-20),(ystartingPoint+thickness*magnify+15*magnify/2),15);

      document.getElementById("gap_3_4").setAttribute('d', 'M'+(xstartingPoint+(300-indentation-5-7-24+1)*magnify)+','+(ystartingPoint+thickness*magnify+15*magnify)+' v -'+(15*magnify)+'');
      /*Keresztelem*/
      document.getElementById("crossLower").setAttribute('d', 'M'+(xstartingPoint)+','+(ystartingPoint+thickness*magnify+80*magnify)+'h'+(300-indentation-45)*magnify+'');
      document.getElementById("crossLower_dotted").setAttribute('d', 'M'+(xstartingPoint+(300-indentation-45)*magnify)+','+(ystartingPoint+thickness*magnify+80*magnify)+'h'+(21*magnify)+'');
    })

    document.getElementById("circle_3").setAttribute('cx',''+(200+width-25-17.5)+'');
    document.getElementById("circle_3").setAttribute('cy',''+(200+length+yOffset+height-100-15)+'');
    document.getElementById("circle_3").setAttribute('r', ''+radius+'');
    document.getElementById("circle_3_text").setAttribute('x',''+(200+width-25-17.5-radius)+'');
    document.getElementById("circle_3_text").setAttribute('y',''+(200+length+yOffset+height-100-15-radius)+'');
    document.getElementById("circle_3_text").textContent='3';
    document.getElementById("circle_3").addEventListener("click",function(){
      document.getElementById("first_group").style.visibility="hidden";
      document.getElementById("second_group").style.visibility="hidden";
      document.getElementById("third_group").style.visibility="visible";
      xstartingPoint=startingPoint+xOffsetPlus+width;
      ystartingPoint=startingPoint+height+200;
      magnify=2;
      setViewBoxValue(''+(startingPoint+xOffsetPlus+width/2)+' '+(startingPoint)+' '+(1500)+' '+(1500)+'');
      document.getElementById("crossleg_side").setAttribute('d','M'+(xstartingPoint)+','+(ystartingPoint+20*magnify)+' h'+(60*magnify)+' v'+(30*magnify)+' h'+(-(60*magnify))+'');
      document.getElementById("leg_left").setAttribute('d','M'+(xstartingPoint+60*magnify)+','+(ystartingPoint)+' v'+(80*magnify)+'');
      document.getElementById("leg_right").setAttribute('d','M'+(xstartingPoint+60*magnify+legSize*magnify)+','+(ystartingPoint)+' v'+(80*magnify)+'');
      Rectangle("crossleg_hole",(xstartingPoint+60*magnify+(legSize-21-5)*magnify),(ystartingPoint+20*magnify),21*magnify,30*magnify);
      document.getElementById("gap1").setAttribute('d','M'+(xstartingPoint+60*magnify+(legSize-21-5+7)*magnify)+','+(ystartingPoint+20*magnify)+' v'+(30*magnify)+'');
      document.getElementById("gap2").setAttribute('d','M'+(xstartingPoint+60*magnify+(legSize-21-5+7+7)*magnify)+','+(ystartingPoint+20*magnify)+' v'+(30*magnify)+'');
      document.getElementById("invisible1").setAttribute('d','M'+(xstartingPoint+60*magnify+(legSize-21-5)*magnify)+','+(ystartingPoint+20*magnify)+' h'+(-((legSize-21-5)*magnify))+'');
      document.getElementById("invisible2").setAttribute('d','M'+(xstartingPoint+60*magnify+(legSize-21-5)*magnify)+','+(ystartingPoint+(20+30)*magnify)+' h'+(-((legSize-21-5)*magnify))+'');

    })


    /**Oldalnézet */
    xstartingPoint=startingPoint+width+200;
    ystartingPoint=startingPoint+height+200;
    Rectangle("plate_side_TD",xstartingPoint,startingPoint,length,thickness);
    
    document.getElementById("height_measure_TD").setAttribute('d','M'+xstartingPoint+','+startingPoint+' h-'+(40)+' v'+(height)+' h '+(40+indentation)+' ');
    Circle("height_measure_circle_top_TD",xstartingPoint-40,startingPoint);
    Circle("height_measure_circle_bottom_TD",xstartingPoint-40,startingPoint+height);
    document.getElementById("height_measure_text_TD").setAttribute('x',''+(xstartingPoint-40-10)+'');
    document.getElementById("height_measure_text_TD").setAttribute('y',''+(startingPoint+(height)/2)+'');
    document.getElementById("height_measure_text_TD").textContent=''+(height)+'';

    document.getElementById("thickness_cut_measure_TD").setAttribute('d','M'+(xstartingPoint+indentation+5)+','+(startingPoint+thickness+80)+' h-'+(indentation+20)+' v-'+(80+thickness+20)+' ');
    document.getElementById("thickness_cut_measure_2_TD").setAttribute('d', 'M'+(xstartingPoint)+','+(startingPoint+thickness)+' h-'+(15)+'');
    Circle("thickness_measure_circle_top_TD",xstartingPoint-15,startingPoint);
    Circle("thickness_measure_circle_bottom_TD",xstartingPoint-15,startingPoint+thickness);
    Circle("cut_measure_circle_bottom_TD",xstartingPoint-15,startingPoint+thickness+80);
    document.getElementById("thickness_measure_text_TD").setAttribute('x',''+(xstartingPoint+5-10)+'');
    document.getElementById("thickness_measure_text_TD").setAttribute('y',''+(startingPoint-10)+'');
    document.getElementById("thickness_measure_text_TD").textContent=''+(thickness)+'';

    document.getElementById("cut_measure_text_TD").setAttribute('x',''+(xstartingPoint+5-10)+'');
    document.getElementById("cut_measure_text_TD").setAttribute('y',''+(startingPoint+thickness+80/2)+'');
    document.getElementById("cut_measure_text_TD").textContent=''+(80)+'';

    document.getElementById("drawer_crossleg_measure_TD").setAttribute('d','M'+(xstartingPoint+width/3)+','+(startingPoint+thickness+100)+' v'+(height-thickness-100-100)+' ');
    Circle("drawer_crossleg_measure_circle_top_TD",(xstartingPoint+width/3),(startingPoint+thickness+100));
    Circle("drawer_crossleg_measure_circle_middle_TD",(xstartingPoint+width/3),(startingPoint+thickness+100+(height-thickness-100-100)-30));
    Circle("drawer_crossleg_measure_circle_bottom_TD",(xstartingPoint+width/3),(startingPoint+thickness+100+(height-thickness-100-100)));
    document.getElementById("drawer_measure_text_TD").setAttribute('x',''+(xstartingPoint+width/3-10)+'');
    document.getElementById("drawer_measure_text_TD").setAttribute('y',''+(startingPoint+thickness+100+(height-thickness-100-30-100)/2)+'');
    document.getElementById("drawer_measure_text_TD").textContent=''+(height-thickness-100-30-100)+'';

    document.getElementById("crossleg_measure_text_TD").setAttribute('x',''+(xstartingPoint+width/3-10)+'');
    document.getElementById("crossleg_measure_text_TD").setAttribute('y',''+(startingPoint+thickness+100+(height-thickness-100-100+20))+'');
    document.getElementById("crossleg_measure_text_TD").textContent=''+(30)+'';

    



    Rectangle("leftleg_side_TD",xstartingPoint+indentation,startingPoint+thickness,legSize,height-thickness);
    Rectangle("rightleg_side_TD",xstartingPoint+length-indentation-legSize,startingPoint+thickness,legSize,height-thickness);
    Rectangle("drawer_side_TD",xstartingPoint+indentation+legSize,startingPoint+thickness,length-legSize*2-indentation*2,100);
    Rectangle("crossleg_side_TD",xstartingPoint+indentation+legSize,startingPoint+height-130,length-legSize*2-indentation*2,30);
    Rectangle("crossleg_side_right_cut_TD", xstartingPoint+length-indentation-5-21,startingPoint+height-130,21,30);
    Rectangle("crossleg_side_left_cut_TD", xstartingPoint+indentation+5,startingPoint+height-130,21,30);
    Rectangle("rightleg_side_cut_TD", xstartingPoint+length-indentation-5-21,startingPoint+thickness,21,80);
    Rectangle("leftleg_side_cut_TD", xstartingPoint+indentation+5,startingPoint+thickness,21,80);

    /**Felülnézet*/

    document.getElementById("plate_part_visible").setAttribute('d','M'+(startingPoint+width/2)+','+(ystartingPoint)+' h'+(-(width/2-10))+' a'+(10)+' '+(10)+' 0 0 0 '+(-10)+' '+(10)+' v'+((length-10-10))+' a'+(10)+' '+(10)+' 0 0 0 '+(10)+' '+(10)+' h'+(width/2-10)+'');
    document.getElementById("divider_top_TD").setAttribute('d', 'M'+(startingPoint+width/2)+','+(ystartingPoint-20)+' v'+(length+20+20)+'');

    document.getElementById("length_top_measure_TD").setAttribute('d','M'+(startingPoint+20)+','+(ystartingPoint)+' h-'+40+' v'+length+' h'+40+'');
    Circle("length_top_measure_circle_top_TD",(startingPoint+20-40),ystartingPoint);
    Circle("length_top_measure_circle_bottom_TD",(startingPoint+20-40),(ystartingPoint+length));
    document.getElementById("length_top_measure_text_TD").setAttribute('x',''+(startingPoint+20-indentation-10)+'');
    document.getElementById("length_top_measure_text_TD").setAttribute('y',''+(ystartingPoint+length/2)+'');
    document.getElementById("length_top_measure_text_TD").textContent=''+(length)+'';


    document.getElementById("plate_part_invisible").setAttribute('d','M'+(startingPoint+width/2)+','+(ystartingPoint)+' h'+((width/2-10))+' a'+(10)+' '+(10)+' 0 0 1 '+(10)+' '+(10)+' v'+((length-10-10))+' a'+(10)+' '+(10)+' 0 0 1 '+(-10)+' '+(10)+' h'+(-(width/2-10))+'');

    document.getElementById("width_top_measure_TD").setAttribute('d','M'+(startingPoint)+','+(ystartingPoint+20)+' v-'+40+' h'+(width)+' v'+(40)+'');
    Circle("width_top_measure_circle_left_TD",startingPoint,(ystartingPoint+20-40));
    Circle("width_top_measure_circle_right_TD",(startingPoint+width),(ystartingPoint+20-40));
    document.getElementById("width_top_measure_text_TD").setAttribute('x',''+(startingPoint+width/2)+'');
    document.getElementById("width_top_measure_text_TD").setAttribute('y',''+(ystartingPoint+20-40-10)+'');
    document.getElementById("width_top_measure_text_TD").textContent=''+(width)+'';


    Rectangle('upperleg_top',(startingPoint+width-indentation-legSize),(ystartingPoint+indentation),legSize,legSize);
    Rectangle('lowerleg_top',(startingPoint+width-indentation-legSize),(ystartingPoint+length-indentation-legSize),legSize,legSize);

    document.getElementById("lower_leg_top_measure_TD").setAttribute('d','M'+(startingPoint+width-indentation-legSize)+','+(ystartingPoint+length-indentation)+' v'+80+' h'+(legSize)+' v-'+80+'');
    Circle("lower_leg_top_measure_circle_left_TD",(startingPoint+width-indentation-legSize),(ystartingPoint+length-indentation+80));
    Circle("lower_leg_top_measure_circle_right_TD",(startingPoint+width-indentation-legSize+legSize),(ystartingPoint+length-indentation+80));
    document.getElementById("lower_leg_top_measure_text_TD").setAttribute('x',''+(startingPoint+width-indentation-legSize+legSize/2)+'');
    document.getElementById("lower_leg_top_measure_text_TD").setAttribute('y',''+(ystartingPoint+length-indentation-legSize+indentation+80+20)+'');
    document.getElementById("lower_leg_top_measure_text_TD").textContent=''+(legSize)+'';


    document.getElementById("indentation_vertical_top_measure_TD").setAttribute('d','M'+(startingPoint+width)+','+((ystartingPoint+length-indentation))+' v'+(80)+' h-'+(40)+'');
    Circle("indentation_vertical_top_measure_circle_TD",(startingPoint+width),((ystartingPoint+length-indentation)+80));
    document.getElementById("indentation_vertical_top_measure_text_TD").setAttribute('x',''+((startingPoint+width)+10)+'');
    document.getElementById("indentation_vertical_top_measure_text_TD").setAttribute('y',''+((ystartingPoint+length-indentation)+80+10)+'');
    document.getElementById("indentation_vertical_top_measure_text_TD").textContent=''+(indentation)+'';

    //document.getElementById("lowerleg_top_measure_TD").setAttribute('d','M'+(startingPoint+width-40-legSize)+','+(ystartingPoint+length-40-legSize)+'');

    //document.getElementById("indentation_horizontal_top_measure_TD").setAttribute('d','M'+(startingPoint+width)+','+((ystartingPoint+length-40-legSize)+legSize)+' v'+(80)+' h'+(indentation)+'');

    document.getElementById("upper_crossleg").setAttribute('points',''+(startingPoint+width/2)+','+(ystartingPoint+indentation+5)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+indentation+5)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+indentation+5+7)+' '
                                                                      +(startingPoint+width-indentation-legSize+10)+','+(ystartingPoint+indentation+5+7)+' '
                                                                      +(startingPoint+width-indentation-legSize+10)+','+(ystartingPoint+indentation+5+7+7)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+indentation+5+7+7)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+indentation+5+7+7+7)+' '
                                                                      +(startingPoint+width/2)+','+(ystartingPoint+indentation+5+7+7+7)+' ');
    document.getElementById("lower_crossleg").setAttribute('points',''+(startingPoint+width/2)+','+(ystartingPoint+length-indentation-legSize+19-5)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+length-indentation-legSize+19-5)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+length-indentation-legSize+19-5+7)+' '
                                                                      +(startingPoint+width-indentation-legSize+10)+','+(ystartingPoint+length-indentation-legSize+19-5+7)+' '
                                                                      +(startingPoint+width-indentation-legSize+10)+','+(ystartingPoint+length-indentation-legSize+19-5+7+7)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+length-indentation-legSize+19-5+7+7)+' '
                                                                      +(startingPoint+width-indentation-legSize)+','+(ystartingPoint+length-indentation-legSize+19-5+7+7+7)+' '
                                                                      +(startingPoint+width/2)+','+(ystartingPoint+length-indentation-legSize+19-5+7+7+7)+' ');
    document.getElementById("middle_crossleg").setAttribute('points',''+(startingPoint+width-indentation-5)+','+(ystartingPoint+legSize+indentation)+' '
                                                                       +(startingPoint+width-indentation-5-7)+','+(ystartingPoint+legSize+indentation)+' '
                                                                       +(startingPoint+width-indentation-5-7)+','+(ystartingPoint+legSize+indentation-10)+' '
                                                                       +(startingPoint+width-indentation-5-7-7)+','+(ystartingPoint+legSize+indentation-10)+' '
                                                                       +(startingPoint+width-indentation-5-7-7)+','+(ystartingPoint+legSize+indentation)+' '
                                                                       +(startingPoint+width-indentation-5-7-7-7)+','+(ystartingPoint+legSize+indentation)+' '
                                                                       +(startingPoint+width-indentation-5-7-7-7)+','+(ystartingPoint+length-indentation-legSize)+' '
                                                                       +(startingPoint+width-indentation-5-7-7)+','+(ystartingPoint+length-indentation-legSize)+' '
                                                                       +(startingPoint+width-indentation-5-7-7)+','+(ystartingPoint+length-indentation-legSize+10)+' '
                                                                       +(startingPoint+width-indentation-5-7)+','+(ystartingPoint+length-indentation-legSize+10)+' '
                                                                       +(startingPoint+width-indentation-5-7)+','+(ystartingPoint+length-indentation-legSize)+' '
                                                                       +(startingPoint+width-indentation-5)+','+(ystartingPoint+length-indentation-legSize)+' '
                                                                       +(startingPoint+width-indentation-5)+','+(ystartingPoint+legSize+indentation)+' ');
  
  document.getElementById("circle_1_text").setAttribute('x',''+(200+width-25-17.5-radius)+'');
  document.getElementById("circle_1_text").setAttribute('y',''+(200+length-25-17.5-radius)+'');
  document.getElementById("circle_1_text").textContent='1';
  Circle("circle_1",(startingPoint+width-indentation-legSize/2),(ystartingPoint+indentation+legSize/2));
  document.getElementById("circle_1").setAttribute('r', ''+radius+'');
  document.getElementById("circle_1").addEventListener("click",function(){
    document.getElementById("first_group").style.visibility="visible";
    document.getElementById("second_group").style.visibility="hidden";
    document.getElementById("third_group").style.visibility="hidden";
      /**Lábmetszet */
      xstartingPoint=startingPoint+xOffsetPlus+width;
      ystartingPoint=startingPoint+height+200;
      setViewBoxValue(''+(startingPoint+xOffsetPlus+width/2)+' '+(startingPoint)+' '+(1500)+' '+(1500)+'');
      Rectangle('leg_upper_view',(xstartingPoint),(ystartingPoint+length/4),(magnify*leg),(magnify*leg));
      document.getElementById('leg_upper_view').setAttribute('rx','10');
      document.getElementById('leg_upper_view').setAttribute('ry','10');
      /**Keresztelemek */
      document.getElementById('crossElement_1').setAttribute('points',''+(xstartingPoint+19*magnify)+','+(ystartingPoint-100)+' '
                                                                        +(xstartingPoint+19*magnify)+','+(ystartingPoint+length/magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify)+','+(ystartingPoint+length/magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify)+','+(ystartingPoint+length/4+9*magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify)+','+(ystartingPoint+length/4+9*magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify)+','+(ystartingPoint+length/4)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify+7*magnify)+','+(ystartingPoint+length/4)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify+7*magnify)+','+(ystartingPoint-100)+' ');

      document.getElementById('crossElement_2').setAttribute('points',''+(200+xOffsetPlus/2+width)+','+(ystartingPoint+length/4+19*magnify)+' '
                                                                        +(xstartingPoint)+','+(ystartingPoint+length/4+19*magnify)+' '
                                                                        +(xstartingPoint)+','+(ystartingPoint+length/4+19*magnify+7*magnify)+' '
                                                                        +(xstartingPoint+9*magnify)+','+(ystartingPoint+length/4+19*magnify+7*magnify)+' '
                                                                        +(xstartingPoint+9*magnify)+','+(ystartingPoint+length/4+19*magnify+7*magnify+7*magnify)+' '
                                                                        +(xstartingPoint)+','+(ystartingPoint+length/4+19*magnify+7*magnify+7*magnify)+' '
                                                                        +(xstartingPoint)+','+(ystartingPoint+length/4+19*magnify+7*magnify+7*magnify+7*magnify)+' '
                                                                        +(200+xOffsetPlus/2+width)+','+(ystartingPoint+length/4+19*magnify+7*magnify+7*magnify+7*magnify)+' ');
      Rectangle("glue_1",(xstartingPoint+19*magnify+7*magnify),(ystartingPoint+length/4+9*magnify),7*magnify,1*magnify);
      Rectangle("glue_2",(xstartingPoint+9*magnify),(ystartingPoint+length/4+19*magnify+7*magnify),1*magnify,7*magnify);
      
      document.getElementById('gap_1').setAttribute('points', ''+(xstartingPoint+19*magnify+7*magnify)+','+(ystartingPoint+length/4+9*magnify+1*magnify)+' '
                                                                +(xstartingPoint+19*magnify+7*magnify)+','+(ystartingPoint+length/4+9*4+1*4+16*4)+' '
                                                                +(xstartingPoint+19*magnify+7*magnify-16*magnify)+','+(ystartingPoint+length/4+9*magnify+1*magnify+16*magnify)+' ');

      document.getElementById("gap_2").setAttribute('points', ''+(xstartingPoint+9*magnify+1*magnify)+','+(ystartingPoint+length/4+19*magnify+7*magnify+7*magnify)+' '                                                                
                                                                +(xstartingPoint+9*4+1*4+15*4+7*4)+','+(ystartingPoint+length/4+19*4+7*4+7*4)+' '
                                                                +(xstartingPoint+9*magnify+1*magnify+23*magnify)+','+(ystartingPoint+length/4+19*magnify+7*magnify+7*magnify)+' '
                                                                +(xstartingPoint+9*magnify+1*magnify+23*magnify)+','+(ystartingPoint+length/4+9*magnify+1*magnify)+' ');

      document.getElementById("line_1").setAttribute('d','M'+(xstartingPoint+19*magnify+7*magnify)+' '+(ystartingPoint+length/4+9*magnify+1*magnify+16*magnify-1*magnify)+' l'+(7*magnify)+' '+(7*magnify)+' Z');
      document.getElementById("line_2").setAttribute('d','M'+(xstartingPoint+19*magnify+7*magnify-1*magnify)+' '+(ystartingPoint+length/4+9*magnify+1*magnify+16*magnify)+' l'+(7*magnify)+' '+(7*magnify)+' Z');                                                            
    })

    
  }

  const handleClick=()=>{
    document.getElementById("technicalDrawing_front").style.visibility="hidden";
    document.getElementById("technicalDrawing_side").style.visibility="hidden";
    document.getElementById("technicalDrawing_top").style.visibility="hidden";
    document.getElementById("frontTDrawingbtn").style.visibility="hidden";
    document.getElementById("sideTDrawingbtn").style.visibility="hidden";
    document.getElementById("topTDrawingbtn").style.visibility="hidden";
    document.getElementById("first_group").style.visibility="hidden";
    document.getElementById("second_group").style.visibility="hidden";
    document.getElementById("third_group").style.visibility="hidden";
    document.getElementById("drawing_top").style.visibility="visible";
    document.getElementById("drawing_front").style.visibility="visible";
    document.getElementById("topDrawingbtn").style.visibility="visible";
    document.getElementById("frontDrawingbtn").style.visibility="visible";

    setViewBoxValue('0 0 2000 2000');
    setHeightUpdated(heightInputRef.current.value);
    setWidthUpdated(widthInputRef.current.value);
    setLengthUpdated(lengthInputRef.current.value);
    setThicknessUpdated(thicknessInputRef.current.value);
    //setCornerUpdated(cornerInputRef.current.value);

    
    var widthS=widthInputRef.current.value;
    var lengthS=lengthInputRef.current.value;
    var heightS=heightInputRef.current.value;
    var thicknessS=thicknessInputRef.current.value;

    var width=parseInt(widthS);
    var length=parseInt(lengthS);
    var height=parseInt(heightS);
    var thickness=parseInt(thicknessS);
    /**Tervrajz */

    /**Felülnézet */
    Rectangle("rect",startingPoint,startingPoint,width,length);
    document.getElementById("rect").setAttribute('rx', '10');
    document.getElementById("rect").setAttribute('ry', '10');

    document.getElementById("measure_width_a").setAttribute('d','M'+startingPoint+' 250 l0 -100 Z');
    document.getElementById("measure_width_b").setAttribute('d','M'+(200+width)+' 250 L'+(200+width)+' 150 Z');
    document.getElementById("measure_width_c").setAttribute('d','M'+startingPoint+' 175 L'+(200+width)+' 175 Z');
    Circle("measure_width_c_circle_1",200,175);
    Circle("measure_width_c_circle_2",(200+width),175);
    document.getElementById("measure_width_c_text").setAttribute('x',''+(200+width/2)+'');
    document.getElementById("measure_width_c_text").setAttribute('y','170');

    document.getElementById("measure_length_a").setAttribute('d','M'+(200+corner)+' 200 L'+(200+corner+width*1.2)+' 200 Z');
    document.getElementById("measure_length_b").setAttribute('d','M'+(200+corner)+' '+(200+length)+' L'+(200+corner+width*1.2)+' '+(200+length)+' Z')

    document.getElementById("measure_length_c").setAttribute('d','M'+(200+corner+width*1.1)+' 200 L'+(200+corner+width*1.1)+' '+(200+length)+' Z');
    Circle("measure_length_c_circle_1",(200+corner+width*1.1),200);
    Circle("measure_length_c_circle_2",(200+corner+width*1.1),(200+length));
    document.getElementById("measure_length_c_text").setAttribute('y',''+(200+length/2)+'');
    document.getElementById("measure_length_c_text").setAttribute('x',''+(200+corner+width*1.2)+'');

    document.getElementById("measure_width_half").setAttribute('d','M'+(200+width/2)+' 180 L'+(200+width/2)+' '+(200+length+20)+' Z');
    document.getElementById("measure_length_half").setAttribute('d','M180 '+(200+length/2)+' L'+(220+width)+' '+(200+length/2)+' Z');


    /**Elölnézet */
    Rectangle("plate",200,200+length+yOffset,width,thickness);
    Rectangle("leftLeg",225,200+length+yOffset+thickness,35,height-thickness);
    Rectangle("rightLeg",(200+width-25-35),(200+length+yOffset+thickness),35,height-thickness);
    Rectangle("crossLeg",260,(200+length+yOffset+height-130),(width-2*(25+35)),30);
    Rectangle("drawer",260,(200+length+yOffset+thickness),(width-(2*(25+35))),100);
    
    
    document.getElementById("measure_height_a").setAttribute('d','M225 '+(200+length+yOffset)+' l-75 0 Z');
    document.getElementById("measure_height_b").setAttribute('d','M225 '+(200+length+yOffset+height)+' l-75 0 Z');
    document.getElementById("measure_height_c").setAttribute('d','M175 '+(200+length+yOffset)+' l0 '+(height)+' Z')
    Circle("measure_height_c_circle_1",175,(200+length+yOffset));
    Circle("measure_height_c_circle_2",175,(200+length+yOffset+height));
    document.getElementById("measure_height_text").setAttribute('x','145');
    document.getElementById("measure_height_text").setAttribute('y',''+(200+length+yOffset+height/2)+'');

    document.getElementById("measure_thickness_a").setAttribute('d','M'+(200+width)+' '+(200+length+yOffset)+' l75 0 Z');
    document.getElementById("measure_thickness_b").setAttribute('d','M'+(200+width)+' '+(200+length+yOffset+thickness)+' l75 0 Z');
    document.getElementById("measure_thickness_c").setAttribute('d','M'+(200+width+30)+' '+(200+length+yOffset)+' l0 '+thickness+' Z');
    Circle("measure_thickness_c_circle_1",(200+width+30),(200+length+yOffset));
    Circle("measure_thickness_c_circle_2",(200+width+30),(200+length+yOffset+thickness));
    document.getElementById("measure_thickness_text").setAttribute('x',''+(200+width+30)+'');
    document.getElementById("measure_thickness_text").setAttribute('y',''+(200+length+yOffset+thickness/2)+'');

    document.getElementById("measure_crossLeg_a").setAttribute('d','M 250 '+(200+length+yOffset+height)+' l50 0 Z');
    document.getElementById("measure_crossLeg_b").setAttribute('d','M 275 '+(200+length+yOffset+height-100-30-50)+'l0 180 Z');
    Circle("measure_crossLeg_b_circle_1",275,(200+length+yOffset+height-100-30));
    Circle("measure_crossLeg_b_circle_2",275,(200+length+yOffset+height-100));
    Circle("measure_crossLeg_b_circle_3",275,(200+length+yOffset+height));
    document.getElementById("measure_crossLeg_b_text_1").setAttribute('x','280');
    document.getElementById("measure_crossLeg_b_text_1").setAttribute('y',''+(200+length+yOffset+height-100-30-25)+'');
    document.getElementById("measure_crossLeg_b_text_1").textContent='30';
    document.getElementById("measure_crossLeg_b_text_2").setAttribute('x','280');
    document.getElementById("measure_crossLeg_b_text_2").setAttribute('y',''+(200+length+yOffset+height-50)+'');
    document.getElementById("measure_crossLeg_b_text_2").textContent='100';

    document.getElementById("measure_drawer_a").setAttribute('d','M'+(200+width-25-35)+' '+(200+length+yOffset+thickness+100)+' l100 0 Z');
    document.getElementById("measure_drawer_b").setAttribute('d','M'+(200+width)+' '+(200+length+yOffset+thickness)+' l0 100 Z');
    Circle("measure_drawer_circle",(200+width),(200+length+yOffset+thickness+100));
    document.getElementById("measure_drawer_text").setAttribute('x',''+(200+width+5)+'');
    document.getElementById("measure_drawer_text").setAttribute('y',''+(200+length+yOffset+thickness+50)+'');
    document.getElementById("measure_drawer_text").textContent="100";

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
    
    Circle("circle_1",(200+width-25-17.5),(200+length-25-17.5));
    document.getElementById("circle_1").setAttribute('r', ''+radius+'');
    document.getElementById("circle_1").addEventListener("click",function(){
      /**Lábmetszet */
      xstartingPoint=startingPoint+xOffsetPlus+width;
      Rectangle('leg_upper_view',(xstartingPoint),(200+length/4),(magnify*leg),(magnify*leg));
      document.getElementById('leg_upper_view').setAttribute('rx','10');
      document.getElementById('leg_upper_view').setAttribute('ry','10');
      /**Keresztelemek */
      document.getElementById('crossElement_1').setAttribute('points',''+(xstartingPoint+19*magnify)+',100 '
                                                                        +(xstartingPoint+19*magnify)+','+(200+length/magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify)+','+(200+length/magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify)+','+(200+length/4+9*magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify)+','+(200+length/4+9*magnify)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify)+','+(200+length/4)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify+7*magnify)+','+(200+length/4)+' '
                                                                        +(xstartingPoint+19*magnify+7*magnify+7*magnify+7*magnify)+',100 ');

      document.getElementById('crossElement_2').setAttribute('points',''+(200+xOffsetPlus/2+width)+','+(200+length/4+19*magnify)+' '
                                                                        +(xstartingPoint)+','+(200+length/4+19*magnify)+' '
                                                                        +(xstartingPoint)+','+(200+length/4+19*magnify+7*magnify)+' '
                                                                        +(xstartingPoint+9*magnify)+','+(200+length/4+19*magnify+7*magnify)+' '
                                                                        +(xstartingPoint+9*magnify)+','+(200+length/4+19*magnify+7*magnify+7*magnify)+' '
                                                                        +(xstartingPoint)+','+(200+length/4+19*magnify+7*magnify+7*magnify)+' '
                                                                        +(xstartingPoint)+','+(200+length/4+19*magnify+7*magnify+7*magnify+7*magnify)+' '
                                                                        +(200+xOffsetPlus/2+width)+','+(200+length/4+19*magnify+7*magnify+7*magnify+7*magnify)+' ');
      Rectangle("glue_1",(xstartingPoint+19*magnify+7*magnify),(200+length/4+9*magnify),7*magnify,1*magnify);
      Rectangle("glue_2",(xstartingPoint+9*magnify),(200+length/4+19*magnify+7*magnify),1*magnify,7*magnify);
      
      document.getElementById('gap_1').setAttribute('points', ''+(xstartingPoint+19*magnify+7*magnify)+','+(200+length/4+9*magnify+1*magnify)+' '
                                                                +(xstartingPoint+19*magnify+7*magnify)+','+(200+length/4+9*4+1*4+16*4)+' '
                                                                +(xstartingPoint+19*magnify+7*magnify-16*magnify)+','+(200+length/4+9*magnify+1*magnify+16*magnify)+' ');

      document.getElementById("gap_2").setAttribute('points', ''+(xstartingPoint+9*magnify+1*magnify)+','+(200+length/4+19*magnify+7*magnify+7*magnify)+' '                                                                
                                                                +(xstartingPoint+9*4+1*4+15*4+7*4)+','+(200+length/4+19*4+7*4+7*4)+' '
                                                                +(xstartingPoint+9*magnify+1*magnify+23*magnify)+','+(200+length/4+19*magnify+7*magnify+7*magnify)+' '
                                                                +(xstartingPoint+9*magnify+1*magnify+23*magnify)+','+(200+length/4+9*magnify+1*magnify)+' ');

      document.getElementById("line_1").setAttribute('d','M'+(xstartingPoint+19*magnify+7*magnify)+' '+(200+length/4+9*magnify+1*magnify+16*magnify-1*magnify)+' l'+(7*magnify)+' '+(7*magnify)+' Z');
      document.getElementById("line_2").setAttribute('d','M'+(xstartingPoint+19*magnify+7*magnify-1*magnify)+' '+(200+length/4+9*magnify+1*magnify+16*magnify)+' l'+(7*magnify)+' '+(7*magnify)+' Z');                                                            
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
                <IonInput ref={widthInputRef} id='width' name='width'type="number" min={0}></IonInput>
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
                <IonButton onClick={handleClick}>Jellegrajz</IonButton>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonButton onClick={handleClick2}>Tervrajz</IonButton>
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

        /**Tervrajz */
        <g id="technicalDrawing_front" visibility="hidden">
        <rect id="plate_front_TD" className="visibleLine"/>
        <rect id="leftleg_front_TD" className="visibleLine"/>
        <rect id="rightleg_front_TD" className="visibleLine"/>
        <rect id="drawer_front_TD" className="visibleLine"/>
        <rect id="crossleg_front_TD" className="visibleLine"/>
        <rect id="crossleg_front_cut_TD" className="visibleLine"/>
        <rect id="rightleg_front_cut_TD" className="visibleLine"/>

        <path id="leg_height_measure_TD" className='narrowLine'/>
        <circle r="3" id="leg_height_measure_circle_top_TD" className='circle'/>
        <circle r="3" id="leg_height_measure_circle_bottom_TD" className='circle'/>
        <text id="leg_height_measure_text_TD"></text>
        <circle id="circle_2" className='clickableCircle'/>
        <text id="circle_2_text"></text>
        <circle id="circle_3" className='clickableCircle'/>
        <text id="circle_3_text"></text>
        </g>

        <g id="technicalDrawing_side">
        <rect id="plate_side_TD" className="visibleLine"/>
        <rect id="leftleg_side_TD" className="visibleLine"/>
        <rect id="rightleg_side_TD" className="visibleLine"/>
        <rect id="drawer_side_TD" className="visibleLine"/>
        <rect id="crossleg_side_TD" className="visibleLine"/>
        <rect id="crossleg_side_right_cut_TD" className="visibleLine"/>
        <rect id="crossleg_side_left_cut_TD" className="visibleLine"/>
        <rect id="rightleg_side_cut_TD" className="visibleLine"/>
        <rect id="leftleg_side_cut_TD" className="visibleLine"/>

        <path id="height_measure_TD" className='narrowLine'/>
        <circle r="3" id="height_measure_circle_top_TD" className='circle'/>
        <circle r="3" id="height_measure_circle_bottom_TD" className='circle'/>
        <text id="height_measure_text_TD"></text>

        <path id="thickness_cut_measure_TD" className='narrowLine'/>
        <path id="thickness_cut_measure_2_TD" className='narrowLine'/>
        <circle r="3" id="thickness_measure_circle_top_TD" className='circle'/>
        <circle r="3" id="thickness_measure_circle_bottom_TD" className='circle'/>
        <circle r="3" id="cut_measure_circle_bottom_TD" className='circle'/>
        <text id="thickness_measure_text_TD"></text>
        <text id="cut_measure_text_TD"></text>

        <path id="drawer_crossleg_measure_TD" className='narrowLine'/>
        <circle r="3" id="drawer_crossleg_measure_circle_top_TD" className='circle'/>
        <circle r="3" id="drawer_crossleg_measure_circle_middle_TD" className='circle'/>
        <circle r="3" id="drawer_crossleg_measure_circle_bottom_TD" className='circle'/>
        <text id="drawer_measure_text_TD"></text>
        <text id="crossleg_measure_text_TD"></text>
        </g>

        <g id="technicalDrawing_top">
        <path id="plate_part_visible" className='visibleLine'/>
        <path id="divider_top_TD" className='dottedLine'/>
        <path id="plate_part_invisible" className='dottedLine_2'/>
        <rect id="upperleg_top" className='visibleLine'/>
        <rect id="lowerleg_top" className='visibleLine'/>
        <polyline id="upper_crossleg" className='visibleLine'/>
        <polyline id="lower_crossleg" className='visibleLine'/>
        <polyline id="middle_crossleg" className='visibleLine'/>

        <path id="length_top_measure_TD" className='narrowLine'/>
        <circle r="3" id="length_top_measure_circle_top_TD" className='circle'/>
        <circle r="3" id="length_top_measure_circle_bottom_TD" className='circle'/>
        <text id="length_top_measure_text_TD"></text>

        <path id="width_top_measure_TD" className='narrowLine'/>
        <circle r="3" id="width_top_measure_circle_left_TD" className='circle'/>
        <circle r="3" id="width_top_measure_circle_right_TD" className='circle'/>
        <text id="width_top_measure_text_TD"></text>

        <path id="lower_leg_top_measure_TD" className='narrowLine'/>
        <circle r="3" id="lower_leg_top_measure_circle_left_TD" className='circle'/>
        <circle r="3" id="lower_leg_top_measure_circle_right_TD" className='circle'/>
        <text id="lower_leg_top_measure_text_TD"></text>

        <path id="indentation_vertical_top_measure_TD" className='narrowLine'/>
        <circle r="3" id="indentation_vertical_top_measure_circle_TD" className='circle'/>
        <text id="indentation_vertical_top_measure_text_TD"></text>
        <circle id="circle_1" className='clickableCircle'/>
          <text id="circle_1_text"></text>
        </g>



          /**Felülnézet */
          <g id="drawing_top">
          <rect id="rect" className="visibleLine"/>
          <path id="measure_width_a" className="narrowLine"/>
          <path id="measure_width_b" className="narrowLine"/>
          <path id="measure_length_a" className='narrowLine'/>
          <path id="measure_length_b" className='narrowLine'/>
          <text id="measure_width_c_text">{widthUpdated}</text>
          <text id="measure_length_c_text">{lengthUpdated}</text>
          <circle r="3" id="measure_width_c_circle_1" className='circle'/>
          <circle r="3" id="measure_width_c_circle_2" className='circle'/>
          <circle r="3" id="measure_length_c_circle_1" className='circle'/>
          <circle r="3" id="measure_length_c_circle_2" className='circle'/>
          <path id="measure_width_c" className='narrowLine'/>
          <path id="measure_length_c" className='narrowLine'/>
          <path id="measure_width_half" className='dottedLine' stroke-dasharray="40,40"/>
          <path id="measure_length_half" className='dottedLine' stroke-dasharray="40,40"/>
          </g>
          /**Elölnézet */
          <g id="drawing_front">
          <rect id="plate" className="visibleLine"/>
          <rect id="leftLeg" className="visibleLine"/>
          <rect id="rightLeg" className="visibleLine"/>
          <rect id="crossLeg" className="visibleLine"/>
          <rect id="drawer" className="visibleLine"/>
          <path id="measure_height_a" className='narrowLine'/>
          <path id="measure_height_b" className='narrowLine'/>
          <path id="measure_height_c" className='narrowLine'/>
          <circle r="3" id="measure_height_c_circle_1" className='circle'/>
          <circle r="3" id="measure_height_c_circle_2" className='circle'/>
          <text id="measure_height_text">{heightUpdated}</text>
          <path id="measure_thickness_a" className='narrowLine'/>
          <path id="measure_thickness_b" className='narrowLine'/>
          <path id="measure_thickness_c" className='narrowLine'/>
          <circle r="3" id="measure_thickness_c_circle_1" className='circle'/>
          <circle r="3" id="measure_thickness_c_circle_2" className='circle'/>
          <text id="measure_thickness_text">{thicknessUpdated}</text>
          <path id="measure_crossLeg_a" className='narrowLine'/>
          <path id="measure_crossLeg_b" className='narrowLine'/>
          <circle r="3" id="measure_crossLeg_b_circle_1" className='circle'/>
          <circle r="3" id="measure_crossLeg_b_circle_2" className='circle'/>
          <circle r="3" id="measure_crossLeg_b_circle_3" className='circle'/>
          <text id="measure_crossLeg_b_text_1"></text>
          <text id="measure_crossLeg_b_text_2"></text>
          <path id="measure_drawer_a" className='narrowLine'/>
          <path id="measure_drawer_b" className='narrowLine'/>
          <circle r="3" id="measure_drawer_circle" className='circle'/>
          <text id="measure_drawer_text"></text>
          </g>
          /**Oldalnézet */
          <g id='drawing_side'>
          <rect id="plate_S" className='visibleLine'/>
          <rect id="frontLeg" className='visibleLine'/>
          <rect id="backLeg" className='visibleLine'/>
          <rect id="crossLeg_S" className='visibleLine'/>
          <rect id="drawer_S" className='visibleLine'/>
          </g>
          /**Körök */
          <g>
          
        
          
          <circle id="circle_4" className='clickableCircle'/>
          <text id="circle_4_text"></text>
          </g>
          /**Csomópont 1. */
          <g id='first_group'>
            <rect id="leg_upper_view" className='visibleLine'/>
            <polyline id="crossElement_1" className='visibleLine'/>
            <polyline id="crossElement_2" className='visibleLine'/>
            <rect id="glue_1" className='visibleLine'/>
            <rect id="glue_2" className='visibleLine'/>
            <polyline id="gap_1" className='dottedLine_2'/>
            <polyline id="gap_2" className='dottedLine_2'/>
            <path id="line_1" className='dottedLine_2'/>
            <path id="line_2" className='dottedLine_2'/>
          </g>
          /**Csomópont 2. */
          <g id='second_group'>
            <path id="plate_part" className='visibleLine'/>
            <path id="leg_sideView" className='visibleLine'/>

            <path id="width_measure_sec" className='narrowLine'/>
            <circle r="3" id="width_measure_circle_sec" className='circle'/>
            <text id="width_measure_text_sec"></text>

            <path id="thickness_measure_sec" className='narrowLine'/>
            <circle r="3" id="thickness_measure_circle_top_sec" className='circle'/>
            <circle r="3" id="thickness_measure_circle_bottom_sec" className='circle'/>
            <text id="thickness_measure_text_sec"></text>

            <path id="height_measure_sec" className='narrowLine'/>
            <circle r="3" id="height_measure_circle_sec" className='circle'/>
            <text id="height_measure_text_sec"></text>

            <path id="legSize_indentation_measure_sec" className='narrowLine'/>
            <circle r="3" id="legSize_indentation_measure_circle_right_sec" className='circle'/>
            <circle r="3" id="legSize_indentation_measure_circle_middle_sec" className='circle'/>
            <circle r="3" id="legSize_indentation_measure_circle_left_sec" className='circle'/>
            <text id="indentation_measure_text_sec"></text>
            <text id="legSize_measure_text_sec"></text>

            <path id="gap_3" className='visibleLine'/>

            <path id="gap_3_width_measure_sec" className='narrowLine'/>
            <circle r="3" id="gap_3_width_measure_circle_rigth_sec" className='circle'/>
            <circle r="3" id="gap_3_width_measure_circle_middle_sec" className='circle'/>
            <circle r="3" id="gap_3_width_measure_circle_left_sec" className='circle'/>
            <text id="gap_3_width_measure_text_sec"></text>
            <text id="gap_3_width_measure_text_2_sec"></text>

            <path id="gap_3_length_measure_sec" className='narrowLine'/>
            <circle r="3" id="gap_3_length_measure_circle_bottom_sec" className='circle'/>
            <circle r="3" id="gap_3_length_measure_circle_top_sec" className='circle'/>
            <text id="gap_3_length_measure_text_sec"></text>

            <path id="gap_3_1" className='dottedLine_2'/>

            <path id="gap_3_1_width_measure_sec" className='narrowLine'/>
            <circle r="3" id="gap_3_1_width_measure_circle_left_sec" className='circle'/>
            <circle r="3" id="gap_3_1_width_measure_circle_right_sec" className='circle'/>
            <text id="gap_3_1_width_measure_text_sec"></text>

            <path id="gap_3_2" className='dottedLine_2'/>

            <path id="gap_3_2_width_measure_sec" className='narrowLine'/>
            <circle r="3" id="gap_3_2_width_measure_circle_left_sec" className='circle'/>
            <text id="gap_3_2_width_measure_text_sec"></text>

            <path id="gap_3_3" className='dottedLine_2'/>

            <path id="gap_3_3_length_measure_sec" className='narrowLine'/>
            <circle r="3" id="gap_3_3_length_measure_circle_bottom_sec" className='circle'/>
            <circle r="3" id="gap_3_3_length_measure_circle_top_sec" className='circle'/>
            <text id="gap_3_3_length_measure_text_sec"></text>

            <path id="gap_3_4" className='dottedLine_2'/>
            <path id="crossLower" className='visibleLine'/>
            <path id="crossLower_dotted" className='dottedLine_2'/>
          </g>
          /**Csomópont 3. */
          <g id="third_group">
          <path id="crossleg_side" className='visibleLine'/>
          <path id="leg_left" className='visibleLine'/>
          <path id="leg_right" className='visibleLine'/>
          <rect id="crossleg_hole" className="visibleLine"/>
          <path id="gap1" className='dottedLine'/>
          <path id="gap2" className='dottedLine'/>
          <path id="invisible1" className='dottedLine'/>
          <path id="invisible2" className='dottedLine'/>
          </g>

        </svg>
        </div>
        </IonContent>
      
    </IonPage>
  );
};

export default Home;
