import { useState } from "react";
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonToggle} from "@ionic/react";
import { RectangleElement, RectangleElementCut, RectangleElementCutRound, RectangleElementRound, PathCut, PathDotted, PathNarrowLine, PathVisible, Polyline, PolylineDotted, CircleMeasure, CircleView, Cut, TextMeasure, TextString, Arrow } from './drawingelements'

var radius = 75;
//var yOffset = 200;
var corner = 10;
var startingPoint = 200;
//var xOffsetPlus = 600;
var leg = 45;
var magnify = 4;
var indentation = 25;

var legSize = 45;
var crossLegsize = 21;
var xstartingPoint = 200;
var ystartingPoint = 200;
var crossLegThird = crossLegsize / 3;

//var viewValue = '0 0 2000 2000';

function ChairCharacterView({ width, height, length, thickness }) {
  const [visibility, setVisibility] = useState('all');

  function SVGPicture({ id, HeightValue, WidthValue, LengthValue, ThicknessValue }) {
    const [viewBoxValue, setViewBoxValue] = useState('0 0 0 0');

    function FrontViewCharacter({ widthValue, heightValue,  thicknessValue }) {
      var width = +(widthValue);
      var height = +(heightValue);
      var thickness = +(thicknessValue);
      setViewBoxValue('0 0 ' + (width + startingPoint + startingPoint) + ' ' + (height + startingPoint + startingPoint) + '');
      return (
        <g id="characterDrawing_front">

          <RectangleElement ID="plate_front_TD" x={startingPoint} y={startingPoint} width={width} height={thickness} />
          <PathCut ID="plate_front_cut_TD" path={'M' + (startingPoint + width / 2) + ', ' + (startingPoint) + ' h' + (width / 2) + ' v' + (thickness) + ' h' + (-width / 2) + ' '} />

          <PathNarrowLine ID="leg_height_measure_TD" path={'M' + (startingPoint + indentation) + ',' + (startingPoint + thickness) + ' h -60 v ' + (height - thickness) + ' h 60'} />
          <CircleMeasure ID="leg_height_measure_circle_top_TD" cx={(startingPoint + indentation - 60)} cy={(startingPoint + thickness)} />
          <CircleMeasure ID="leg_height_measure_circle_bottom_TD" cx={(startingPoint + indentation - 60)} cy={(startingPoint + thickness + (height - thickness))} />
          <TextMeasure ID="leg_height_measure_text_TD" x={(startingPoint + indentation - 60 - 10)} y={(startingPoint + thickness + (height - thickness) / 2)} value={(height - thickness)} deg={270} />

          <PathDotted type={3} ID="divider_line" path={'M' + (startingPoint + width / 2) + ' , ' + (startingPoint + height + 30) + ' v -' + (height + 30 + 30) + ' '} />

          <PathDotted type={3} ID="cut_A_line" path={'M' + (startingPoint + width / 2 - 30) + ' , ' + (startingPoint + height + 50) + ' v -' + (height + 50 + 50) + ' '} />
          <Arrow direction="right" ID="upper_arrow_A" x={(startingPoint + width / 2 - 30)} y={(startingPoint - 50)} />
          <Arrow direction="right" ID="lower_arrow_A" x={(startingPoint + width / 2 - 30)} y={(startingPoint + height + 50)} />
          <TextString ID="text_A" x={(startingPoint + width / 2)} y={(startingPoint - 50)} value="A" />

          <PathDotted type={3} ID="cut_B_line" path={'M' + (startingPoint + width) + ' , ' + (startingPoint + thickness) + ' h ' + (100) + ' '} />
          <Arrow direction="down" ID="arrow_B" x={(startingPoint + width + 100)} y={(startingPoint + thickness)} />
          <TextString ID="text_B" x={(startingPoint + width + 70)} y={(startingPoint + thickness + 20)} value="B" />

          <RectangleElement ID="leftleg_front_TD" x={startingPoint + indentation} y={startingPoint + thickness} width={legSize} height={height - thickness} />
          <RectangleElement ID="rightleg_front_TD" x={startingPoint + width - indentation - legSize} y={startingPoint + thickness} width={legSize} height={height - thickness} />
          <RectangleElement ID="drawer_front_TD" x={startingPoint + indentation + legSize} y={startingPoint + thickness} width={width - legSize * 2 - indentation * 2} height={100} />
          <RectangleElement ID="crossleg_front_TD" x={startingPoint + indentation + legSize} y={startingPoint + height - 130} width={width - legSize * 2 - indentation * 2} height={30} />
          <RectangleElement ID="crossleg_front_cut_TD" x={startingPoint + width - indentation - 5 - 21} y={startingPoint + height - 130} width={21} height={30} />
          <RectangleElement ID="rightleg_front_cut_TD" x={startingPoint + width - indentation - 5 - 21} y={startingPoint + thickness} width={21} height={80} />

          <TextMeasure ID="circle_2_text" x={(startingPoint + width - indentation - 17.5 - radius)} y={(startingPoint + thickness + 80 / 2 + radius * 2 / 3)} value={2} deg={0} />
          <CircleView ID="circle_2" cx={(startingPoint + width - indentation - 5 - 21 / 2)} cy={(startingPoint + thickness + 80 / 2)} onClick={() => setVisibility("second")} />

          <TextMeasure ID="circle_3_text" x={(startingPoint + width - indentation - 5 - 21 / 2 - radius)} y={(startingPoint + height - 130 + 15 - radius)} value={3} deg={0} />
          <CircleView ID="circle_3" cx={(startingPoint + width - indentation - 5 - 21 / 2)} cy={startingPoint + height - 130 + 15} onClick={() => setVisibility("third")} />
        </g>
      )
    }

    function SideViewCharacter({  heightValue, lengthValue, thicknessValue }) {
      var height = +(heightValue);
      var length = +(lengthValue);
      var thickness = +(thicknessValue);
      setViewBoxValue('0 0 ' + (length + startingPoint + startingPoint) + ' ' + (height + startingPoint + startingPoint) + '');
      return (
        <g id="characterDrawing_side">
          <RectangleElement ID="plate_side_TD" x={xstartingPoint} y={startingPoint} width={length} height={thickness} />

          <PathNarrowLine ID="height_measure_TD" path={'M' + xstartingPoint + ',' + startingPoint + ' h-' + (40) + ' v' + (height) + ' h ' + (40 + indentation) + ' '} />
          <CircleMeasure ID="height_measure_circle_top_TD" cx={xstartingPoint - 40} cy={startingPoint} />
          <CircleMeasure ID="height_measure_circle_bottom_TD" cx={xstartingPoint - 40} cy={startingPoint + height} />
          <TextMeasure ID="height_measure_text_TD" x={xstartingPoint - 40 - 10} y={startingPoint + (height) / 2} value={height} deg={270} />

          <PathNarrowLine ID="thickness_cut_measure_TD" path={'M' + (xstartingPoint + indentation + 5) + ',' + (startingPoint + thickness + 80) + ' h-' + (indentation + 20) + ' v-' + (80 + thickness + 20) + ' '} />
          <PathNarrowLine ID="thickness_cut_measure_2_TD" path={'M' + (xstartingPoint) + ',' + (startingPoint + thickness) + ' h-' + (15) + ''} />
          <CircleMeasure ID="thickness_measure_circle_top_TD" cx={xstartingPoint - 15} cy={startingPoint} />
          <CircleMeasure ID="thickness_measure_circle_bottom_TD" cx={xstartingPoint - 15} cy={startingPoint + thickness} />
          <CircleMeasure ID="cut_measure_circle_bottom_TD" cx={xstartingPoint - 15} cy={startingPoint + thickness + 80} />
          <TextMeasure ID="thickness_measure_text_TD" x={(xstartingPoint - 15 - 10)} y={(startingPoint - 10)} value={(thickness)} deg={270} />
          <TextMeasure ID="cut_measure_text_TD" x={(xstartingPoint - 15 - 10)} y={(startingPoint + thickness + 80 / 2)} value={(80)} deg={270} />

          <PathNarrowLine ID="cut_width_measure_TD" path={'M' + (xstartingPoint + indentation + 5) + ',' + (startingPoint + thickness + 80) + ' v' + (35) + ' h' + (21) + ' v' + (-35) + ' '} />
          <CircleMeasure ID="cut_width_measure_circle_left_TD" cx={xstartingPoint + indentation + 5} cy={startingPoint + thickness + 80 + 35} />
          <CircleMeasure ID="cut_width_measure_circle_right_TD" cx={xstartingPoint + indentation + 5 + 21} cy={startingPoint + thickness + 80 + 35} />
          <TextMeasure ID="cut_width_measure_text_TD" x={xstartingPoint + indentation + 5 + 21 / 2} y={startingPoint + thickness + 80 + 35 + 20} value={21} deg={0} />

          <PathNarrowLine ID="drawer_crossleg_measure_TD" path={'M' + (xstartingPoint + indentation + legSize + 30) + ',' + (startingPoint + thickness + 100) + ' v' + (height - thickness - 100 - 100 + 30) + ' '} />
          <CircleMeasure ID="drawer_crossleg_measure_circle_top_TD" cx={(xstartingPoint + indentation + legSize + 30)} cy={(startingPoint + thickness + 100)} />
          <CircleMeasure ID="drawer_crossleg_measure_circle_middle_TD" cx={(xstartingPoint + indentation + legSize + 30)} cy={(startingPoint + thickness + 100 + (height - thickness - 100 - 100) - 30)} />
          <CircleMeasure ID="drawer_crossleg_measure_circle_bottom_TD" cx={(xstartingPoint + indentation + legSize + 30)} cy={(startingPoint + thickness + 100 + (height - thickness - 100 - 100))} />
          <TextMeasure ID="drawer_measure_text_TD" x={(xstartingPoint + indentation + legSize + 30 - 10)} y={(startingPoint + thickness + 100 + (height - thickness - 100 - 30 - 100) / 2)} value={(height - thickness - 100 - 30 - 100)} deg={270} />
          <TextMeasure ID="crossleg_measure_text_TD" x={(xstartingPoint + indentation + legSize + 30 - 10)} y={(startingPoint + thickness + 100 + (height - thickness - 100 - 100 + 20))} value={(30)} deg={270} />

          <PathDotted type={3} ID="divider_line_side_TD" path={'M ' + (xstartingPoint + length / 2) + ' ' + (startingPoint - 30) + ' v' + (height + 30 + 30) + ' '} />

          <RectangleElement ID="leftleg_side_TD" x={xstartingPoint + indentation} y={startingPoint + thickness} width={legSize} height={height - thickness} />
          <RectangleElement ID="rightleg_side_TD" x={xstartingPoint + length - indentation - legSize} y={startingPoint + thickness} width={legSize} height={height - thickness} />
          <RectangleElement ID="drawer_side_TD" x={xstartingPoint + indentation + legSize} y={(startingPoint + thickness)} width={length - legSize * 2 - indentation * 2} height={100} />
          <RectangleElement ID="crossleg_side_TD" x={xstartingPoint + indentation + legSize} y={startingPoint + height - 130} width={length - legSize * 2 - indentation * 2} height={30} />
          <RectangleElement ID="crossleg_side_right_cut_TD" x={xstartingPoint + length - indentation - 5 - 21} y={startingPoint + height - 130} width={21} height={30} />
          <RectangleElement ID="crossleg_side_left_cut_TD" x={xstartingPoint + indentation + 5} y={startingPoint + height - 130} width={21} height={30} />
          <RectangleElement ID="rightleg_side_cut_TD" x={xstartingPoint + length - indentation - 5 - 21} y={startingPoint + thickness} width={21} height={80} />
          <RectangleElement ID="leftleg_side_cut_TD" x={xstartingPoint + indentation + 5} y={startingPoint + thickness} width={21} height={80} />
        </g>
      )
    }

    function TopViewCharacter({ widthValue,  lengthValue, }) {
      var width = +(widthValue);
      var length = +(lengthValue);
      setViewBoxValue('0 0 ' + (width + startingPoint + startingPoint) + ' ' + (length + startingPoint + startingPoint) + '');
      return (
        <g id="characterDrawing_top">
          <PathVisible ID="plate_part_visible" path={'M' + (startingPoint + width / 2) + ',' + (ystartingPoint) + ' h' + (-(width / 2 - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (-corner) + ' ' + (corner) + ' v' + ((length - corner - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (corner) + ' ' + (corner) + ' h' + (width / 2 - corner) + ''} />

          <PathDotted type={3} ID="divider_top_TD" path={'M' + (startingPoint + width / 2) + ',' + (ystartingPoint - 30) + ' v' + (length + 30 + 30) + ''} />
          <PathDotted type={3} ID="divider_top_2_TD" path={'M' + (startingPoint - 30) + ' ' + (ystartingPoint + length / 2) + ' h' + (width + 30 + 30) + ' '} />

          <PathDotted type={3} ID="cut_C_line" path={'M' + (startingPoint + width / 2) + ' , ' + (ystartingPoint + length * 3 / 5) + ' h' + (width / 2 + 100) + ' '} />
          <Arrow direction="up" ID="arrow_C" x={(startingPoint + width + 100)} y={(ystartingPoint + length * 3 / 5)} />
          <TextString ID="text_C" x={(startingPoint + width + 95)} y={(ystartingPoint + length * 3 / 5 - 30)} value="C" />

          <PathNarrowLine ID="length_top_measure_TD" path={'M' + (startingPoint + 20) + ',' + (ystartingPoint) + ' h-' + 40 + ' v' + length + ' h' + 40 + ''} />
          <CircleMeasure ID="length_top_measure_circle_top_TD" cx={(startingPoint + 20 - 40)} cy={ystartingPoint} />
          <CircleMeasure ID="length_top_measure_circle_bottom_TD" cx={startingPoint + 20 - 40} cy={(ystartingPoint + length)} />
          <TextMeasure ID="length_top_measure_text_TD" x={(startingPoint + 20 - 40 - 10)} y={(ystartingPoint + length / 2)} value={length} deg={270} />

          <PathDotted type={2} ID="plate_part_invisible" path={'M' + (startingPoint + width / 2) + ',' + (ystartingPoint) + ' h' + ((width / 2 - corner)) +
            ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (corner) + ' ' + (corner) + ' v' + ((length - corner - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (-corner) + ' ' + (corner) + ' h' + (-(width / 2 - corner)) + ''} />

          <PathNarrowLine ID="width_top_measure_TD" path={'M' + (startingPoint) + ',' + (ystartingPoint + 20) + ' v-' + 40 + ' h' + (width) + ' v' + (40) + ''} />
          <CircleMeasure ID="width_top_measure_circle_left_TD" cx={startingPoint} cy={(ystartingPoint + 20 - 40)} />
          <CircleMeasure ID="width_top_measure_circle_right_TD" cx={(startingPoint + width)} cy={(ystartingPoint + 20 - 40)} />
          <TextMeasure ID="width_top_measure_text_TD" x={(startingPoint + width / 2)} y={(ystartingPoint + 20 - 40 - 10)} value={width} deg={0} />

          <RectangleElementCut ID='upperleg_top' x={(startingPoint + width - indentation - legSize)} y={(ystartingPoint + indentation)} width={legSize} height={legSize} />
          <RectangleElementCut ID='lowerleg_top' x={(startingPoint + width - indentation - legSize)} y={(ystartingPoint + length - indentation - legSize)} width={legSize} height={legSize} />

          <PathNarrowLine ID="lower_leg_top_measure_TD" path={'M' + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation) + ' v' + (indentation + 50) + ' h' + (legSize) + ' v-' + (indentation + 50) + ''} />
          <CircleMeasure ID="lower_leg_top_measure_circle_left_TD" cx={(startingPoint + width - indentation - legSize)} cy={(ystartingPoint + length + 50)} />
          <CircleMeasure ID="lower_leg_top_measure_circle_right_TD" cx={(startingPoint + width - indentation - legSize + legSize)} cy={(ystartingPoint + length + 50)} />
          <TextMeasure ID="lower_leg_top_measure_text_TD" x={(startingPoint + width - indentation - legSize / 2)} y={(ystartingPoint + length + 50 + 20)} value={legSize} deg={0} />

          <PathNarrowLine ID="indentation_vertical_top_measure_TD" path={'M' + (startingPoint + width) + ',' + ((ystartingPoint + length - indentation)) + ' v' + (indentation + 50) + ' h-' + (40) + ''} />
          <CircleMeasure ID="indentation_vertical_top_measure_circle_TD" cx={(startingPoint + width)} cy={((ystartingPoint + length) + 50)} />
          <TextMeasure ID="indentation_vertical_top_measure_text_TD" x={(startingPoint + width) - indentation / 2} y={(ystartingPoint + length) + 50 + 20} value={indentation} deg={0} />

          <PathNarrowLine ID="lower_leg_top_measure_2_TD" path={'M' + (startingPoint + width - indentation) + ',' + (ystartingPoint + length - indentation) + ' h' + (indentation + 50) + ' v-' + (legSize) + ' h-' + (indentation + 50) + ' '} />
          <CircleMeasure ID="lower_leg_top_measure_2_circle_lower_TD" cx={(startingPoint + width + 50)} cy={(ystartingPoint + length - indentation)} />
          <CircleMeasure ID="lower_leg_top_measure_2_circle_upper_TD" cx={(startingPoint + width + 50)} cy={(ystartingPoint + length - indentation - legSize)} />
          <TextMeasure ID="lower_leg_top_measure_2_text_TD" x={(startingPoint + width + 50 + 10)} y={(ystartingPoint + length - indentation - legSize / 2)} value={legSize} deg={270} />

          <PathNarrowLine ID="indentation_horizontal_top_measure_TD" path={'M' + (startingPoint + width - indentation) + ', ' + (ystartingPoint + length) + ' h' + (indentation + 50) + ' v-' + (indentation + legSize + 40) + ' v' + (indentation + legSize + 40 + 40) + ' '} />
          <CircleMeasure ID="indentation_horizontal_top_measure_circle_TD" cx={(startingPoint + width + 50)} cy={(ystartingPoint + length)} />
          <TextMeasure ID="indentation_horizontal_top_measure_text_TD" x={(startingPoint + width + 50 + 10)} y={(ystartingPoint + length - indentation / 2)} value={indentation} deg={270} />

          <Polyline ID="upper_crossleg" path={'' + (startingPoint + width / 2) + ',' + (ystartingPoint + indentation + 5) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5 + 7) + ' '
            + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + indentation + 5 + 7) + ' '
            + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + indentation + 5 + 7 + 7) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5 + 7 + 7) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + indentation + 5 + 7 + 7 + 7) + ' '
            + (startingPoint + width / 2) + ',' + (ystartingPoint + indentation + 5 + 7 + 7 + 7) + ' '} />
          <Polyline ID="lower_crossleg" path={'' + (startingPoint + width / 2) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7) + ' '
            + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7) + ' '
            + (startingPoint + width - indentation - legSize + 10) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7) + ' '
            + (startingPoint + width - indentation - legSize) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7 + 7) + ' '
            + (startingPoint + width / 2) + ',' + (ystartingPoint + length - indentation - legSize + 19 - 5 + 7 + 7 + 7) + ' '} />
          <Polyline ID="middle_crossleg" path={'' + (startingPoint + width - indentation - 5) + ',' + (ystartingPoint + legSize + indentation) + ' '
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
            + (startingPoint + width - indentation - 5) + ',' + (ystartingPoint + legSize + indentation) + ' '} />

          <TextMeasure ID="circle_1_text" x={(startingPoint + width - indentation - legSize / 2 - radius)} y={(ystartingPoint + length - indentation - legSize / 2 + radius)} value={1} deg={0} />
          <CircleView ID="circle_1" cx={(startingPoint + width - indentation - legSize / 2)} cy={(ystartingPoint + length - indentation - legSize / 2)} onClick={() => setVisibility("first")} />
        </g>
      )
    }

    function FirstCircle() {
      /**Lábmetszet */
      var measureOffset = 120
      xstartingPoint = startingPoint/** + xOffsetPlus + width + 1000*/;
      ystartingPoint = startingPoint/**  + height + 1000*/;
      setViewBoxValue('' + (xstartingPoint - 200 - 50) + ' ' + (ystartingPoint - 200 - 50) + ' ' + (200 + 50 + legSize * magnify + measureOffset + 10 + 50) + ' ' + (200 + 50 + legSize * magnify + measureOffset + 10 + 50) + '');
      return (
        <g id='first_group'>

          <RectangleElementCutRound ID='leg_upper_view' x={(xstartingPoint)} y={(ystartingPoint)} width={(magnify * leg)} height={(magnify * leg)} rx={10} ry={10} />

          {/**Keresztelemek */}
          <Polyline ID='crossElement_1' path={'' + (xstartingPoint + 19 * magnify) + ',' + (ystartingPoint - 200) + ' '
            + (xstartingPoint + 19 * magnify) + ',' + (ystartingPoint) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint - 200) + ' '} />

          <Cut ID="horizontal_cut_1" path={'M ' + (xstartingPoint + 19 * magnify) + ',' + (ystartingPoint - 200) + ' h' + (crossLegsize * magnify + indentation * magnify)} />

          <PathDotted type={2} ID="plate" path={'M' + (xstartingPoint + legSize * magnify + indentation * magnify) + ',' + (ystartingPoint - 200) + ' v' + (200 + legSize * magnify + indentation * magnify - corner * magnify) + ' a' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (-corner * magnify) + ' ' + (corner * magnify) + ' h' + (-(200 + legSize * magnify + indentation * magnify - corner * magnify)) + ''} />

          <PathNarrowLine ID="crossElement_1_measure" path={"M" + (xstartingPoint + 19 * magnify) + "," + (ystartingPoint - 100) + " h" + (crossLegsize * magnify) + " h" + (5 * magnify) + " v" + (100 + 10) + " "} />
          <CircleMeasure ID="crossElement_1_measure_circle_1" cx={(xstartingPoint + 19 * magnify)} cy={(ystartingPoint - 100)} />
          <CircleMeasure ID="crossElement_1_measure_circle_2" cx={(xstartingPoint + 19 * magnify + crossLegsize * magnify)} cy={(ystartingPoint - 100)} />
          <TextMeasure ID="crossElement_1_measure_text_1" x={(xstartingPoint + 19 * magnify + crossLegsize * magnify / 2)} y={(ystartingPoint - 100 - 5)} value={crossLegsize} deg={0} />
          <CircleMeasure ID="crossElement_1_measure_circle_3" cx={xstartingPoint + 19 * magnify + crossLegsize * magnify + 5 * magnify} cy={(ystartingPoint - 100)} />
          <TextMeasure ID="crossElement_1_measure_text_2" x={(xstartingPoint + 19 * magnify + crossLegsize * magnify + 5 * magnify / 2)} y={(ystartingPoint - 100 - 5)} value={5} deg={0} />

          <PathNarrowLine ID="crossElement_1_third_measure" path={'M' + (xstartingPoint + 40 * magnify) + ',' + (ystartingPoint - 50) + ' h-' + (crossLegThird * magnify) + ' v' + (50) + ' v-' + (50) + ' h-' + (crossLegThird * magnify) + ' v' + (50) + ' '} />
          <CircleMeasure ID="crossElement_1_third_measure_circle_1" cx={(xstartingPoint + 40 * magnify)} cy={(ystartingPoint - 50)} />
          <CircleMeasure ID="crossElement_1_third_measure_circle_2" cx={(xstartingPoint + (40 - crossLegThird) * magnify)} cy={(ystartingPoint - 50)} />
          <CircleMeasure ID="crossElement_1_third_measure_circle_3" cx={(xstartingPoint + (40 - crossLegThird - crossLegThird) * magnify)} cy={(ystartingPoint - 50)} />
          <TextMeasure ID="crossElement_1_third_measure_text_1" x={(xstartingPoint + (40 - crossLegThird / 2) * magnify)} y={(ystartingPoint - 50 - 5)} value={crossLegThird} deg={0} />
          <TextMeasure ID="crossElement_1_third_measure_text_2" x={(xstartingPoint + (40 - crossLegThird - crossLegThird / 2) * magnify)} y={(ystartingPoint - 50 - 5)} value={crossLegThird} deg={0} />

          <PathNarrowLine ID="crossElement_1_indentation_measure" path={'M' + (xstartingPoint + leg * magnify - 10) + ',' + (ystartingPoint) + ' h' + (30) + ' v' + (10 * magnify) + ' h-' + (30) + ' '} />
          <CircleMeasure ID="crossElement_1_indentation_measure_circle_1" cx={(xstartingPoint + leg * magnify - 10 + 30)} cy={(ystartingPoint)} />
          <CircleMeasure ID="crossElement_1_indentation_measure_circle_2" cx={(xstartingPoint + leg * magnify - 10 + 30)} cy={(ystartingPoint + 10 * magnify)} />
          <TextMeasure ID="crossElement_1_indentation_measure_text" x={(xstartingPoint + leg * magnify - 10 + 30 - 10)} y={(ystartingPoint + 10 * magnify / 2)} value={10} deg={270} />

          <Polyline ID='crossElement_2' path={'' + (xstartingPoint - 200) + ',' + (ystartingPoint + 19 * magnify) + ' '
            + (xstartingPoint) + ',' + (ystartingPoint + 19 * magnify) + ' '
            + (xstartingPoint) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint + 9 * magnify) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint + 9 * magnify) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint - 200) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '} />

          <Cut ID="horizontal_cut_2" path={'M ' + (xstartingPoint - 200) + ',' + (ystartingPoint + 19 * magnify) + ' v' + (crossLegsize * magnify + indentation * magnify)} />

          <PathNarrowLine ID="crossElement_2_measure" path={"M" + (xstartingPoint - 100) + "," + (ystartingPoint + 19 * magnify) + " v" + (crossLegsize * magnify) + " v" + (5 * magnify) + " h" + (100 + 10) + " "} />
          <CircleMeasure ID="crossElement_2_measure_circle_1" cx={(xstartingPoint - 100)} cy={(ystartingPoint + 19 * magnify)} />
          <CircleMeasure ID="crossElement_2_measure_circle_2" cx={(xstartingPoint - 100)} cy={(ystartingPoint + 19 * magnify + crossLegsize * magnify)} />
          <TextMeasure ID="crossElement_2_measure_text_1" x={(xstartingPoint - 100 - 10)} y={(ystartingPoint + 19 * magnify + crossLegsize * magnify / 2)} value={crossLegsize} deg={270} />
          <CircleMeasure ID="crossElement_2_measure_circle_3" cx={(xstartingPoint - 100)} cy={(ystartingPoint + 19 * magnify + crossLegsize * magnify + 5 * magnify)} />
          <TextMeasure ID="crossElement_2_measure_text_2" x={(xstartingPoint - 100 - 10)} y={(ystartingPoint + 19 * magnify + crossLegsize * magnify + 5 * magnify / 2)} value={5} deg={270} />

          <PathNarrowLine ID="crossElement_2_third_measure" path={'M' + (xstartingPoint - 50) + ',' + (ystartingPoint + 40 * magnify) + ' v-' + (crossLegThird * magnify) + ' h' + (50) + ' h-' + (50) + ' v-' + (crossLegThird * magnify) + ' h' + (50) + ' '} />
          <CircleMeasure ID="crossElement_2_third_measure_circle_1" cx={(xstartingPoint - 50)} cy={(ystartingPoint + 40 * magnify)} />
          <CircleMeasure ID="crossElement_2_third_measure_circle_2" cx={(xstartingPoint - 50)} cy={(ystartingPoint + (40 - crossLegThird) * magnify)} />
          <CircleMeasure ID="crossElement_2_third_measure_circle_3" cx={(xstartingPoint - 50)} cy={(ystartingPoint + (40 - crossLegThird - crossLegThird) * magnify)} />
          <TextMeasure ID="crossElement_2_third_measure_text_1" x={(xstartingPoint - 50 - 10)} y={(ystartingPoint + (40 - crossLegThird / 2) * magnify)} value={crossLegThird} deg={270} />
          <TextMeasure ID="crossElement_2_third_measure_text_2" x={(xstartingPoint - 50 - 10)} y={(ystartingPoint + (40 - crossLegThird - crossLegThird / 2) * magnify)} value={crossLegThird} deg={270} />

          <PathNarrowLine ID="crossElement_2_indentation_measure" path={'M' + (xstartingPoint) + ',' + (ystartingPoint + leg * magnify - 10) + ' v' + (30) + ' h' + (10 * magnify) + ' v-' + (30 - 10) + ' '} />
          <CircleMeasure ID="crossElement_2_indentation_measure_circle_1" cx={(xstartingPoint)} cy={(ystartingPoint + leg * magnify - 10 + 30)} />
          <CircleMeasure ID="crossElement_2_indentation_measure_circle_2" cx={(xstartingPoint + 10 * magnify)} cy={(ystartingPoint + leg * magnify - 10 + 30)} />
          <TextMeasure ID="crossElement_2_indentation_measure_text" x={(xstartingPoint + 10 * magnify / 2)} y={(ystartingPoint + leg * magnify - 10 + 30 - 10)} value={10} deg={0} />

          <PathNarrowLine ID='leg_upper_view_vertical_measure' path={'M' + (xstartingPoint + magnify * leg - 10) + ',' + (ystartingPoint) + ' h' + (measureOffset + 10) + ' v' + (legSize * magnify) + ' h-' + (measureOffset + 10) + ' '} />
          <CircleMeasure ID='leg_upper_view_vertical_circle_1' cx={(xstartingPoint + magnify * leg - 10 + (measureOffset + 10))} cy={(ystartingPoint)} />
          <CircleMeasure ID='leg_upper_view_vertical_circle_2' cx={(xstartingPoint + magnify * leg - 10 + (measureOffset + 10))} cy={(ystartingPoint + (legSize * magnify))} />
          <TextMeasure ID='leg_upper_view_vertical_text' x={(xstartingPoint + magnify * leg - 10 + (measureOffset + 10) - 10)} y={(ystartingPoint + (legSize * magnify) / 2)} value={legSize} deg={270} />

          <PathNarrowLine ID='leg_upper_view_horizontal_measure' path={'M' + (xstartingPoint) + ',' + (ystartingPoint + magnify * leg - 10) + ' v' + (measureOffset + 10) + ' h' + (legSize * magnify) + ' v-' + (measureOffset + 10) + ' '} />
          <CircleMeasure ID='leg_upper_view_horizontal_circle_1' cx={(xstartingPoint)} cy={(ystartingPoint + magnify * leg - 10 + (measureOffset + 10))} />
          <CircleMeasure ID='leg_upper_view_horizontal_circle_2' cx={(xstartingPoint + (legSize * magnify))} cy={(ystartingPoint + magnify * leg - 10 + (measureOffset + 10))} />
          <TextMeasure ID='leg_upper_view_horizontal_text' x={(xstartingPoint + (legSize * magnify) / 2)} y={(ystartingPoint + magnify * leg - 10 + (measureOffset + 10) - 10)} value={legSize} deg={0} />

      {/**Belső elemek */}

          <RectangleElement ID="glue_1" x={(xstartingPoint + 19 * magnify + crossLegThird * magnify)} y={(ystartingPoint + 9 * magnify)} width={crossLegThird * magnify} height={1 * magnify} />
          <PathNarrowLine ID="glue_1_measure" path={'M' + (xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify) + ' h' + (12 * magnify + 15) + ' v' + (1 * magnify + 20) + ' v-' + (20) + ' h-' + (12 * magnify + 15) + ''} />
          <CircleMeasure ID="glue_1_measure_circle_1" cx={(xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + (12 * magnify + 15))} cy={(ystartingPoint + 9 * magnify)} />
          <CircleMeasure ID="glue_1_measure_circle_2" cx={(xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + (12 * magnify + 15))} cy={(ystartingPoint + 9 * magnify + 1 * magnify)} />
          <TextMeasure ID="glue_1_measure_text" x={(xstartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify + (12 * magnify + 15) - 5)} y={(ystartingPoint + 9 * magnify + 1 * magnify + 20 / 2)} value={1} deg={270} />

          <RectangleElement ID="glue_2" x={(xstartingPoint + 9 * magnify)} y={(ystartingPoint + 19 * magnify + crossLegThird * magnify)} width={1 * magnify} height={crossLegThird * magnify} />

          <PolylineDotted type={2} ID='gap_1' path={'' + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify + 1 * magnify) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 9 * magnify + 1 * magnify + 16 * magnify) + ' '
            + (xstartingPoint + 19 * magnify + crossLegThird * magnify - 16 * magnify) + ',' + (ystartingPoint + 9 * magnify + 1 * magnify + 16 * magnify) + ' '} />

          <PathNarrowLine ID="gap_1_measure" path={'M' + (xstartingPoint + leg * magnify - 10) + ',' + (ystartingPoint) + ' h' + (60) + ' v' + (32 * magnify) + ' h-' + (60 - 10) + ' '} />
          <CircleMeasure ID="gap_1_measure_circle_1" cx={(xstartingPoint + leg * magnify - 10 + 60)} cy={(ystartingPoint)} />
          <CircleMeasure ID="gap_1_measure_circle_2" cx={(xstartingPoint + leg * magnify - 10 + 60)} cy={(ystartingPoint + 32 * magnify)} />
          <TextMeasure ID="gap_1_measure_text" x={(xstartingPoint + leg * magnify - 10 + 60 - 10)} y={(ystartingPoint + 32 * magnify / 2)} value={32} deg={270} />

          <PolylineDotted type={2} ID="gap_2" path={'' + (xstartingPoint + 9 * magnify + 1 * magnify) + ',' + (ystartingPoint + + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint + 9 * magnify + 1 * magnify + 15 * magnify + crossLegThird * magnify) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint + 9 * magnify + 1 * magnify + 23 * magnify) + ',' + (ystartingPoint + 19 * magnify + crossLegThird * magnify + crossLegThird * magnify) + ' '
            + (xstartingPoint + 9 * magnify + 1 * magnify + 23 * magnify) + ',' + (ystartingPoint + 9 * magnify + 1 * magnify) + ' '} />

          <PathNarrowLine ID="gap_2_measure" path={'M' + (xstartingPoint) + ',' + (ystartingPoint + leg * magnify - 10) + ' v' + (60) + ' h' + (32 * magnify) + ' v-' + (60 - 10) + ' '} />
          <CircleMeasure ID="gap_2_measure_circle_1" cx={(xstartingPoint)} cy={(ystartingPoint + leg * magnify - 10 + 60)} />
          <CircleMeasure ID="gap_2_measure_circle_2" cx={(xstartingPoint + 32 * magnify)} cy={(ystartingPoint + leg * magnify - 10 + 60)} />
          <TextMeasure ID="gap_2_measure_text" x={(xstartingPoint + 32 * magnify / 2)} y={(ystartingPoint + leg * magnify - 10 + 60 - 10)} value={32} deg={0} />

          <PathDotted type={2} ID="line_1" path={'M' + (xstartingPoint + 19 * magnify + crossLegThird * magnify) + ' ' + (ystartingPoint + 9 * magnify + 1 * magnify + 16 * magnify - 1 * magnify) + ' l' + (crossLegThird * magnify) + ' ' + (crossLegThird * magnify) + ' Z'} />
          <PathDotted type={2} ID="line_2" path={'M' + (xstartingPoint + 19 * magnify + crossLegThird * magnify - 1 * magnify) + ' ' + (ystartingPoint + 9 * magnify + 1 * magnify + 16 * magnify) + ' l' + (crossLegThird * magnify) + ' ' + (crossLegThird * magnify) + ' Z'} />
        </g>
      )
    }

    function SecondCircle({ widthValue, heightValue,  thicknessValue }) {

      var width = +(widthValue);
      var height = +(heightValue);
      var thickness = +(thicknessValue);
      xstartingPoint = startingPoint/** + xOffsetPlus + width*/;
      ystartingPoint = startingPoint/**  + height + 200*/;
      magnify = 4;
      setViewBoxValue('' + (xstartingPoint - 100) + ',' + (ystartingPoint - 100) + ',' + (300 * magnify + 40 + 100 + 200) + ',' + (thickness * magnify + 150 * magnify + 200) + '');

      /*Láb és fedlap*/
      return (
        <g id='second_group'>
          <PathVisible ID="plate_part" path={'M' + (xstartingPoint) + ',' + (ystartingPoint) + ' h' + ((300 - 2) * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 ' + (2 * magnify) + ' ' + (2 * magnify) + ' v' + ((thickness - 2 - 2) * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 -' + (2 * magnify) + ' ' + (2 * magnify) + ' h-' + ((300 - 2) * magnify) + ''} />
          <PathVisible ID="leg_sideView" path={'M' + (xstartingPoint + (300 - indentation) * magnify) + ',' + (ystartingPoint + thickness * magnify + 150 * magnify) + 'v -' + (150 * magnify) + ' h -' + (legSize * magnify) + ' v' + (150 * magnify) + ''} />
          <Cut ID="vertical_cut" path={'M' + (xstartingPoint) + ',' + (ystartingPoint) + ' v' + (thickness * magnify + 80 * magnify) + ' '} />
          <Cut ID="horizontal_cut" path={'M' + (xstartingPoint + (300 - indentation - legSize) * magnify) + ',' + (ystartingPoint + thickness * magnify + 150 * magnify) + ' h' + (legSize * magnify) + ' '} />

          <PathNarrowLine ID="width_measure_sec" path={'M' + (xstartingPoint + 300 * magnify) + ',' + (ystartingPoint + 2 * magnify) + ' v-' + (20 + 2 * magnify) + ' h-' + (300 * magnify) + ''} />
          <CircleMeasure ID="width_measure_circle_sec" cx={(xstartingPoint + 300 * magnify)} cy={(ystartingPoint - 20)} />
          <TextMeasure ID="width_measure_text_sec" x={(xstartingPoint + 300 * magnify - 30 * magnify)} y={(ystartingPoint - 20 - 10)} value={(width)} deg={0} />

          <PathNarrowLine ID="thickness_measure_sec" path={'M' + (xstartingPoint + 298 * magnify) + ',' + (ystartingPoint) + ' h' + (40 + 2 * magnify) + ' v' + (thickness * magnify) + ' h-' + (40) + ''} />
          <CircleMeasure ID="thickness_measure_circle_top_sec" cx={(xstartingPoint + 300 * magnify + 40)} cy={(ystartingPoint)} />
          <CircleMeasure ID="thickness_measure_circle_bottom_sec" cx={(xstartingPoint + 300 * magnify + 40)} cy={(ystartingPoint + thickness * magnify)} />
          <TextMeasure ID="thickness_measure_text_sec" x={(xstartingPoint + 300 * magnify + 40 - 10)} y={(ystartingPoint + thickness * magnify / 2)} value={(thickness)} deg={270} />

          <PathNarrowLine ID="height_measure_sec" path={'M' + (xstartingPoint + 300 * magnify + 40) + ',' + (ystartingPoint) + ' h' + (100) + ' v' + (thickness * magnify + 100 * magnify)} />
          <CircleMeasure ID="height_measure_circle_sec" cx={(xstartingPoint + 300 * magnify + 40 + 100)} cy={(ystartingPoint)} />
          <TextMeasure ID="height_measure_text_sec" x={(xstartingPoint + 300 * magnify + 40 + 100 - 10)} y={(ystartingPoint + thickness * magnify / 2)} value={(height)} deg={270} />

          <PathNarrowLine ID="legSize_indentation_measure_sec" path={'M' + (xstartingPoint + 300 * magnify) + ',' + (ystartingPoint + thickness * magnify - 2 * magnify) + ' v' + (110 * magnify) + ' h-' + (indentation * magnify + legSize * magnify)} />
          <CircleMeasure ID="legSize_indentation_measure_circle_right_sec" cx={(xstartingPoint + 300 * magnify)} cy={(ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify)} />
          <CircleMeasure ID="legSize_indentation_measure_circle_middle_sec" cx={(xstartingPoint + 300 * magnify - indentation * magnify)} cy={(ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify)} />
          <CircleMeasure ID="legSize_indentation_measure_circle_left_sec" cx={(xstartingPoint + 300 * magnify - indentation * magnify - legSize * magnify)} cy={(ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify)} />
          <TextMeasure ID="indentation_measure_text_sec" x={(xstartingPoint + 300 * magnify - indentation * magnify / 2)} y={(ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify - 10)} value={indentation} deg={0} />
          <TextMeasure ID="legSize_measure_text_sec" x={(xstartingPoint + 300 * magnify - indentation * magnify - legSize * magnify / 2)} y={(ystartingPoint + thickness * magnify - 2 * magnify + 110 * magnify - 10)} value={legSize} deg={0} />

      {/*Illesztés */}
          <PathVisible ID="gap_3" path={'M' + (xstartingPoint + (300 - indentation - 5) * magnify) + ',' + (ystartingPoint + thickness * magnify) + ' v' + (78 * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 -' + (2 * magnify) + ' ' + (2 * magnify) + ' h-' + (17 * magnify) + ' a' + (2 * magnify) + ' ' + (2 * magnify) + ' 0 0 1 -' + (2 * magnify) + ' -' + (2 * magnify) + ' v-' + (78 * magnify) + ''} />

          <PathNarrowLine ID="gap_3_width_measure_sec" path={'M' + (xstartingPoint + (300 - indentation - 5) * magnify) + ',' + (ystartingPoint + thickness * magnify + 78 * magnify) + ' v' + (40 * magnify) + ' h' + (5 * magnify) + ' h-' + (26 * magnify) + ' v-' + (40 * magnify) + ''} />
          <CircleMeasure ID="gap_3_width_measure_circle_rigth_sec" cx={(xstartingPoint + (300 - indentation) * magnify)} cy={(ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify)} />
          <CircleMeasure ID="gap_3_width_measure_circle_middle_sec" cx={(xstartingPoint + (300 - indentation - 5) * magnify)} cy={(ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify)} />
          <CircleMeasure ID="gap_3_width_measure_circle_left_sec" cx={(xstartingPoint + (300 - indentation - 5 - 21) * magnify)} cy={(ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify)} />
          <TextMeasure ID="gap_3_width_measure_text_sec" x={(xstartingPoint + (300 - indentation - 5 - 10.5) * magnify)} y={(ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify - 20)} value={21} deg={0} />
          <TextMeasure ID="gap_3_width_measure_text_2_sec" x={(xstartingPoint + (300 - indentation - 2.5) * magnify)} y={(ystartingPoint + thickness * magnify + 78 * magnify + 40 * magnify - 20)} value={5} deg={0} />

          <PathNarrowLine ID="gap_3_length_measure_sec" path={'M' + (xstartingPoint + (300 - indentation - 5 - 2) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + ' h' + ((5 + indentation * 2 / 3) * magnify) + ' v-' + (80 * magnify) + ''} />
          <CircleMeasure ID="gap_3_length_measure_circle_bottom_sec" cx={(xstartingPoint + (300 - indentation - 5 - 2) * magnify + (5 + indentation * 2 / 3) * magnify)} cy={(ystartingPoint + thickness * magnify + 80 * magnify)} />
          <CircleMeasure ID="gap_3_length_measure_circle_top_sec" cx={(xstartingPoint + (300 - indentation - 5 - 2) * magnify + (5 + indentation * 2 / 3) * magnify)} cy={(ystartingPoint + thickness * magnify + 80 * magnify)} />
          <TextMeasure ID="gap_3_length_measure_text_sec" x={(xstartingPoint + (300 - indentation - 5 - 2) * magnify + (5 + indentation * 2 / 3) * magnify - 20)} y={(ystartingPoint + thickness * magnify + 80 * magnify / 2)} value={80} deg={270} />

          <PathDotted type={2} ID="gap_3_1" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify) + ' v' + (80 * magnify) + ''} />

          <PathNarrowLine ID="gap_3_1_width_measure_sec" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + ' v' + (20 * magnify) + ' h' + (7 * magnify) + ''} />
          <CircleMeasure ID="gap_3_1_width_measure_circle_left_sec" cx={(xstartingPoint + (300 - indentation - 5 - 7) * magnify)} cy={(ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify)} />
          <CircleMeasure ID="gap_3_1_width_measure_circle_right_sec" cx={(xstartingPoint + (300 - indentation - 5) * magnify)} cy={(ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify)} />
          <TextMeasure ID="gap_3_1_width_measure_text_sec" x={(xstartingPoint + (300 - indentation - 5 - 3.5) * magnify)} y={(ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify - 20)} value={7} deg={0} />

          <PathDotted type={2} ID="gap_3_2" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify) + ' v' + (80 * magnify) + ''} />

          <PathNarrowLine ID="gap_3_2_width_measure_sec" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + ' v' + (20 * magnify) + ' h' + (7 * magnify) + ''} />
          <CircleMeasure ID="gap_3_2_width_measure_circle_left_sec" cx={(xstartingPoint + (300 - indentation - 5 - 7 - 7) * magnify)} cy={(ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify)} />
          <TextMeasure ID="gap_3_2_width_measure_text_sec" x={(xstartingPoint + (300 - indentation - 5 - 7 - 3.5) * magnify)} y={(ystartingPoint + thickness * magnify + 80 * magnify + 20 * magnify - 20)} value={7} deg={0} />

          <PathDotted type={2} ID="gap_3_3" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 15 * magnify) + ' h -' + (24 * magnify) + ' v  -' + (15 * magnify) + ''} />

          <PathNarrowLine ID="gap_3_3_length_measure_sec" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7) * magnify) + ',' + (ystartingPoint + thickness * magnify + 15 * magnify) + ' h' + ((7 + 5 + indentation / 2) * magnify) + ' v-' + (15 * magnify) + ''} />
          <CircleMeasure ID="gap_3_3_length_measure_circle_bottom_sec" cx={(xstartingPoint + (300 - indentation - 5 - 7) * magnify + (7 + 5 + indentation / 2) * magnify)} cy={(ystartingPoint + thickness * magnify + 15 * magnify)} />
          <CircleMeasure ID="gap_3_3_length_measure_circle_top_sec" cx={(xstartingPoint + (300 - indentation - 5 - 7) * magnify + (7 + 5 + indentation / 2) * magnify)} cy={(ystartingPoint + thickness * magnify)} />
          <TextMeasure ID="gap_3_3_length_measure_text_sec" x={(xstartingPoint + (300 - indentation - 5 - 7) * magnify + (7 + 5 + indentation / 2) * magnify - 20)} y={(ystartingPoint + thickness * magnify + 15 * magnify / 2)} value={15} deg={270} />

          <PathDotted type={2} ID="gap_3_4" path={'M' + (xstartingPoint + (300 - indentation - 5 - 7 - 24 + 1) * magnify) + ',' + (ystartingPoint + thickness * magnify + 15 * magnify) + ' v -' + (15 * magnify) + ''} />
      {/*Keresztelem*/}
          <PathVisible ID="crossLower" path={'M' + (xstartingPoint) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + 'h' + (300 - indentation - 45) * magnify + ''} />
          <PathDotted type={2} ID="crossLower_dotted" path={'M' + (xstartingPoint + (300 - indentation - 45) * magnify) + ',' + (ystartingPoint + thickness * magnify + 80 * magnify) + 'h' + (21 * magnify) + ''} />
        </g>
      )
    }

    function ThirdCircle() {

      xstartingPoint = startingPoint/**  + xOffsetPlus + width*/;
      ystartingPoint = startingPoint/**  + height + 200*/;
      magnify = 4;
      setViewBoxValue('' + (xstartingPoint - 50) + ' ' + (ystartingPoint - 50) + ' ' + (60 * magnify + legSize * magnify + 50 * 2) + ' ' + (80 * magnify + 50 * 2) + '');
      return (
        <g id="third_group">
          <PathVisible ID="crossleg_side" path={'M' + (xstartingPoint) + ',' + (ystartingPoint + 20 * magnify) + ' h' + (60 * magnify) + ' v' + (30 * magnify) + ' h' + (-(60 * magnify)) + ''} />
          <Cut ID="crossleg_side_cut" path={'M' + (xstartingPoint) + ',' + (ystartingPoint + 20 * magnify) + ' v' + (30 * magnify) + ''} />
          <PathNarrowLine ID="crossleg_side_measure" path={'M' + (xstartingPoint + 30 * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' v' + (30 * magnify) + ' '} />
          <CircleMeasure ID="crossleg_side_measure_circle_1" cx={xstartingPoint + 30 * magnify} cy={ystartingPoint + 20 * magnify} />
          <CircleMeasure ID="crossleg_side_measure_circle_2" cx={xstartingPoint + 30 * magnify} cy={ystartingPoint + 20 * magnify + 30 * magnify} />
          <TextMeasure ID="crossleg_side_measure_text" x={xstartingPoint + 30 * magnify - 10} y={ystartingPoint + 20 * magnify + 30 * magnify / 2} value={30} deg={270} />

          <PathVisible ID="leg_left" path={'M' + (xstartingPoint + 60 * magnify) + ',' + (ystartingPoint) + ' v' + (80 * magnify) + ''} />
          <PathVisible ID="leg_right" path={'M' + (xstartingPoint + 60 * magnify + legSize * magnify) + ',' + (ystartingPoint) + ' v' + (80 * magnify) + ''} />
          <Cut ID="leg_top_cut" path={'M' + (xstartingPoint + 60 * magnify) + ',' + (ystartingPoint) + ' h' + (legSize * magnify) + ' '} />
          <Cut ID="leg_bottom_cut" path={'M' + ((xstartingPoint + 60 * magnify)) + ',' + (ystartingPoint + 80 * magnify) + ' h' + (legSize * magnify) + ' '} />

          <RectangleElement ID="crossleg_hole" x={(xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify)} y={(ystartingPoint + 20 * magnify)} width={21 * magnify} height={30 * magnify} />
          <PathNarrowLine ID="crossleg_hole_measure" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' v-' + (10 * magnify) + ' h' + (21 * magnify) + ' v' + (10 * magnify) + ' '} />
          <CircleMeasure ID="crossleg_hole_measure_circle_1" cx={xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify} cy={ystartingPoint + 20 * magnify - (10 * magnify)} />
          <CircleMeasure ID="crossleg_hole_measure_circle_2" cx={xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify + (21 * magnify)} cy={ystartingPoint + 20 * magnify - (10 * magnify)} />
          <TextMeasure ID="crossleg_hole_measure_text" x={xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify + (21 * magnify / 2)} y={ystartingPoint + 20 * magnify - (10 * magnify) - 10} value={21} deg={0} />

          <PathNarrowLine ID="crossleg_hole_measure_2" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 5) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' h' + (5 * magnify) + ''} />
          <CircleMeasure ID="crossleg_hole_measure_2_circle_1" cx={xstartingPoint + 60 * magnify + (legSize - 5) * magnify} cy={ystartingPoint + 20 * magnify} />
          <CircleMeasure ID="crossleg_hole_measure_2_circle_2" cx={xstartingPoint + 60 * magnify + (legSize - 5) * magnify + (5 * magnify)} cy={ystartingPoint + 20 * magnify} />
          <TextMeasure ID="crossleg_hole_measure_2_text" x={xstartingPoint + 60 * magnify + (legSize - 5) * magnify + (5 * magnify) / 2} y={ystartingPoint + 20 * magnify - 10} value={5} deg={0} />

          <PathDotted type={1} ID="gap1" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' v' + (30 * magnify) + ''} />
          <PathDotted type={1} ID="gap2" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7 + 7) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' v' + (30 * magnify) + ''} />
          <PathNarrowLine ID="gap1_measure" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify) + ' , ' + (ystartingPoint + 50 * magnify) + ' v' + (10 * magnify) + ' h' + (7 * magnify) + ' v-' + (10 * magnify) + ' '} />
          <CircleMeasure ID="gap1_measure_circle_1" cx={xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify} cy={ystartingPoint + 50 * magnify + (10 * magnify)} />
          <CircleMeasure ID="gap1_measure_circle_2" cx={xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify + (7 * magnify)} cy={ystartingPoint + 50 * magnify + (10 * magnify)} />
          <TextMeasure ID="gap1_measure_text" x={xstartingPoint + 60 * magnify + (legSize - 21 - 5 + 7) * magnify + (7 * magnify) / 2} y={ystartingPoint + 50 * magnify + (10 * magnify) - 10} value={7} deg={0} />

          <PathDotted type={1} ID="invisible1" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify) + ',' + (ystartingPoint + 20 * magnify) + ' h' + (-((legSize - 21 - 5) * magnify)) + ''} />
          <PathDotted type={1} ID="invisible2" path={'M' + (xstartingPoint + 60 * magnify + (legSize - 21 - 5) * magnify) + ',' + (ystartingPoint + (20 + 30) * magnify) + ' h' + (-((legSize - 21 - 5) * magnify)) + ''} />
        </g>
      )
    }
    var comp = () => {
      switch (id) {
        case "t_front":
          return <FrontViewCharacter heightValue={HeightValue} widthValue={WidthValue}  thicknessValue={ThicknessValue} />
        case "t_side":
          return <SideViewCharacter heightValue={HeightValue}  lengthValue={LengthValue} thicknessValue={ThicknessValue} />
        case "t_top":
          return <TopViewCharacter  widthValue={WidthValue} lengthValue={LengthValue}  />
        case "first_circle":
          return <FirstCircle/>
        case "second_circle":
          return <SecondCircle heightValue={HeightValue} widthValue={WidthValue}  thicknessValue={ThicknessValue} />
        case "third_circle":
          return <ThirdCircle/>
        default:
          return <h6>Invalid name!!</h6>
      }
    };
    return (
      <IonCol size="12" size-sm="4">
        <svg id={id} viewBox={viewBoxValue} preserveAspectRatio='xMidYMid meet'>
          <defs>
            <pattern id="cutPattern" x="0" y="0" width="10" height="10" patternContentUnits='Default' patternUnits='userSpaceOnUse'>
              <path d="M5,-5 l10,10
                           M0,0 l10,10
                           M-5,5 l10,10"
                stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          {comp()}
        </svg>
      </IonCol>
    )
  }
  var drawings = () => {
    switch (visibility) {
      case "front":
        return <SVGPicture id="t_front" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />;
      case "top":
        return <SVGPicture id="t_top" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />;
      case "side":
        return <SVGPicture id="t_side" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />;

      case "all":
        return <>
          <SVGPicture id="t_front" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
          <SVGPicture id="t_side" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
          <SVGPicture id="t_top" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
        </>;
      case "first":
        return <SVGPicture id="first_circle" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />;
      case "second":
        return <SVGPicture id="second_circle" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />;
      case "third":
        return <SVGPicture id="third_circle" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />;
    }
  }
  return (
    <>
    <IonRow hidden={false}>
      <IonCol id='frontDrawingbtn' size='auto'>
        <IonItem>
          <IonButton onClick={() => setVisibility("front")} >Elölnézet(Tervrajz)</IonButton>
        </IonItem>
      </IonCol>
      <IonCol id='sideDrawingbtn' size='auto'>
        <IonItem>
          <IonButton onClick={() => setVisibility("side")} >Oldalnézet(Tervrajz)</IonButton>
        </IonItem>
      </IonCol>
      <IonCol id='topDrawingbtn' size='auto'>
        <IonItem>
          <IonButton onClick={() => setVisibility("top")} >Felülnézet(Tervrajz)</IonButton>
        </IonItem>
      </IonCol>
    </IonRow>
      <IonRow>
        {drawings()}
      </IonRow>
    </>
  )
}

function ChairFormalView({ width, height, length, thickness }) {
  const [visibility, setVisibility] = useState('all');

  function SVGPicture({ id, HeightValue, WidthValue, LengthValue, ThicknessValue }) {
    const [viewBoxValue, setViewBoxValue] = useState('0 0 0 0');

    function TopViewFormal({ widthValue,  lengthValue,  }) {
      var width = +(widthValue);
      var length = +(lengthValue);
      setViewBoxValue('0 0 ' + (width + startingPoint + startingPoint) + ' ' + (length + startingPoint + startingPoint) + '');
      return (
        <g id="formalDrawing_top">
          <RectangleElementRound ID="rect" x={startingPoint} y={startingPoint} width={width} height={length} rx={10} ry={10} />
          <PathNarrowLine ID="measure_width_a" path={'M' + startingPoint + ',' + (startingPoint) + ' v-' + (50) + ''} />
          <PathNarrowLine ID="measure_width_b" path={'M' + (startingPoint + width) + ',' + (startingPoint) + ' v-' + (50) + ''} />
          <PathNarrowLine ID="measure_width_c" path={'M' + startingPoint + ',' + (startingPoint - 50) + ' h' + (width) + ''} />
          <CircleMeasure ID="measure_width_c_circle_1" cx={(startingPoint)} cy={(startingPoint - 50)} />
          <CircleMeasure ID="measure_width_c_circle_2" cx={(startingPoint + width)} cy={(startingPoint - 50)} />
          <TextMeasure ID="measure_width_c_text" x={(startingPoint + width / 2)} y={(startingPoint - 50 - 10)} value={width} deg={0} />

          <PathNarrowLine ID="measure_length_a" path={'M' + (startingPoint + width) + ',' + (startingPoint) + ' h' + (50) + ''} />
          <PathNarrowLine ID="measure_length_b" path={'M' + (startingPoint + width) + ',' + (startingPoint + length) + ' h' + (50) + ' '} />
          <PathNarrowLine ID="measure_length_c" path={'M' + (startingPoint + width + 50) + ',' + (startingPoint) + ' v' + (length) + ''} />
          <CircleMeasure ID="measure_length_c_circle_1" cx={(startingPoint + width + 50)} cy={startingPoint} />
          <CircleMeasure ID="measure_length_c_circle_2" cx={(startingPoint + width + 50)} cy={(startingPoint + length)} />
          <TextMeasure ID="measure_length_c_text" x={(startingPoint + width + 50 + 10)} y={(startingPoint + length / 2)} value={length} deg={90} />

          <PathDotted type={1} ID="measure_width_half" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint - 20) + ' v' + (length + 20 * 2) + ' '} />
          <PathDotted type={1} ID="measure_length_half" path={'M' + (startingPoint - 20) + ',' + (startingPoint + length / 2) + ' h' + (width + 20 * 2) + ' '} />
        </g>
      )
    }

    function FrontViewFormal({ widthValue, heightValue,  thicknessValue }) {
      var width = +(widthValue);
      var height = +(heightValue);
      var thickness = +(thicknessValue);
      ystartingPoint = startingPoint/**+length+yOffset*/;
      setViewBoxValue('0 0 ' + (width + startingPoint + startingPoint) + ' ' + (height + startingPoint + startingPoint) + '');
      return (
        <g id="formalDrawing_front">
          <RectangleElement ID="plate" x={startingPoint} y={ystartingPoint} width={width} height={thickness} />
          <RectangleElement ID="leftLeg" x={startingPoint + indentation} y={ystartingPoint + thickness} width={legSize} height={height - thickness} />
          <RectangleElement ID="rightLeg" x={(startingPoint + width - indentation - legSize)} y={(ystartingPoint + thickness)} width={legSize} height={height - thickness} />
          <RectangleElement ID="crossLeg" x={startingPoint + legSize + indentation} y={(ystartingPoint + height - 100 - 30)} width={(width - 2 * (legSize + indentation))} height={30} />
          <RectangleElement ID="drawer" x={startingPoint + legSize + indentation} y={(ystartingPoint + thickness)} width={(width - (2 * (indentation + legSize)))} height={100} />

          <PathNarrowLine ID="measure_height_a" path={'M' + (startingPoint) + ',' + (ystartingPoint) + ' h-' + (50) + ' '} />
          <PathNarrowLine ID="measure_height_b" path={'M' + (startingPoint + indentation) + ',' + (ystartingPoint + height) + ' h-' + (50 + indentation) + ''} />
          <PathNarrowLine ID="measure_height_c" path={'M' + (startingPoint - 50) + ',' + (ystartingPoint) + ' v ' + (height) + ' '} />
          <CircleMeasure ID="measure_height_c_circle_1" cx={(startingPoint - 50)} cy={(ystartingPoint)} />
          <CircleMeasure ID="measure_height_c_circle_2" cx={(startingPoint - 50)} cy={(ystartingPoint + height)} />
          <TextMeasure ID="measure_height_text" x={(startingPoint - 50 - 10)} y={(ystartingPoint + height / 2)} value={height} deg={270} />

          <PathNarrowLine ID="measure_thickness_a" path={'M' + (startingPoint + width) + ',' + (ystartingPoint) + ' h' + (30) + ''} />
          <PathNarrowLine ID="measure_thickness_b" path={'M' + (startingPoint + width) + ',' + (ystartingPoint + thickness) + ' h' + (30) + ''} />
          <PathNarrowLine ID="measure_thickness_c" path={'M' + (startingPoint + width + 30) + ' ' + (ystartingPoint) + ' v ' + thickness + ''} />
          <CircleMeasure ID="measure_thickness_c_circle_1" cx={(startingPoint + width + 30)} cy={(ystartingPoint)} />
          <CircleMeasure ID="measure_thickness_c_circle_2" cx={(startingPoint + width + 30)} cy={(ystartingPoint + thickness)} />
          <TextMeasure ID="measure_thickness_text" x={(startingPoint + width + 30 + 10)} y={(ystartingPoint + thickness / 2)} value={thickness} deg={270} />

          <PathNarrowLine ID="measure_crossLeg_a" path={'M ' + (startingPoint + legSize + indentation) + ' ' + (ystartingPoint + height) + ' h' + (20) + ''} />
          <PathNarrowLine ID="measure_crossLeg_b" path={'M ' + (startingPoint + legSize + indentation + 20) + ' ' + (ystartingPoint + height - 100 - 30 - 50) + ' v' + (100 + 30 + 50) + ''} />
          <CircleMeasure ID="measure_crossLeg_b_circle_1" cx={(startingPoint + legSize + indentation + 20)} cy={(ystartingPoint + height - 100 - 30)} />
          <CircleMeasure ID="measure_crossLeg_b_circle_2" cx={(startingPoint + legSize + indentation + 20)} cy={(ystartingPoint + height - 100)} />
          <CircleMeasure ID="measure_crossLeg_b_circle_3" cx={(startingPoint + legSize + indentation + 20)} cy={(ystartingPoint + height)} />
          <TextMeasure ID="measure_crossLeg_b_text_1" x={(startingPoint + legSize + indentation + 20 + 10)} y={(ystartingPoint + height - 100 - 30 - 50 / 2)} value={30} deg={270} />
          <TextMeasure ID="measure_crossLeg_b_text_2" x={(startingPoint + legSize + indentation + 20 + 10)} y={(ystartingPoint + height - 100 / 2)} value={100} deg={270} />

          <PathNarrowLine ID="measure_drawer_a" path={'M' + (startingPoint + width - legSize - indentation) + ' ' + (ystartingPoint + thickness + 100) + ' h' + (legSize + indentation) + ' '} />
          <PathNarrowLine ID="measure_drawer_b" path={'M' + (startingPoint + width) + ' ' + (ystartingPoint + thickness) + ' v' + (100) + ' '} />
          <CircleMeasure ID="measure_drawer_circle" cx={(startingPoint + width)} cy={(ystartingPoint + thickness + 100)} />
          <TextMeasure ID="measure_drawer_text" x={(startingPoint + width + 10)} y={(ystartingPoint + thickness + 100 / 2)} value={100} deg={270} />
        </g>
      )
    }

    var comp = () => {
      switch (id) {
        case "front":
          return <FrontViewFormal heightValue={HeightValue} widthValue={WidthValue}  thicknessValue={ThicknessValue} />
        case "top":
          return <TopViewFormal  widthValue={WidthValue} lengthValue={LengthValue}  />
        default:
          return <h6>Invalid name!!</h6>
      }
    };
    return (
      <IonCol size="12" size-sm="4">
        <svg id={id} viewBox={viewBoxValue} preserveAspectRatio='xMidYMid meet'>
          <defs>
            <pattern id="cutPattern" x="0" y="0" width="10" height="10" patternContentUnits='Default' patternUnits='userSpaceOnUse'>
              <path d="M5,-5 l10,10
                         M0,0 l10,10
                         M-5,5 l10,10"
                stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          {comp()}
        </svg>
      </IonCol>
    )
  }


  var drawings = () => {
    switch (visibility) {
      case "all":
        return <>
          <SVGPicture id="front" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
          <SVGPicture id="top" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
        </>;
      case "front":
        return<SVGPicture id="front" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
      case "top":
        return<SVGPicture id="top" HeightValue={height} WidthValue={width} LengthValue={length} ThicknessValue={thickness} />
    }
  }
  return (
    <>
    <IonRow hidden={false}>
      <IonCol id='frontDrawingbtn' size='auto'>
        <IonItem>
          <IonButton onClick={() => setVisibility("front")} >Elölnézet(Tervrajz)</IonButton>
        </IonItem>
      </IonCol>
      <IonCol id='topDrawingbtn' size='auto'>
        <IonItem>
          <IonButton onClick={() => setVisibility("top")} >Felülnézet(Tervrajz)</IonButton>
        </IonItem>
      </IonCol>
    </IonRow>
    
      <IonRow>
        {drawings()}
      </IonRow>
    </>
  )
}


export function ChairView() {
  const [heightValue, setHeightValue] = useState(0);
  const [widthValue, setWidthValue] = useState(0);
  const [lengthValue, setLengthValue] = useState(0);
  const [thicknessValue, setThicknessValue] = useState(0);
  const [visibility, setVisibility] = useState(true)
  const [toggle, setToggle] = useState(false);
  const [drawingsVisibility, setDrawingsVisibility]=useState("none")

  /**if ((+(heightValue) < 100) || (+(widthValue) < 100) || (+(lengthValue) < 100) || (+(thicknessValue) < 10))
    setVisibility(true);
  else
    setVisibility(false);*/

  let drawingType = () => {
    if (drawingsVisibility==="character")
      return <ChairCharacterView height={+heightValue} width={+widthValue} length={+lengthValue} thickness={+thicknessValue} />;
    else if(drawingsVisibility==="formal") 
      return <ChairFormalView height={+heightValue} width={+widthValue} length={+lengthValue} thickness={+thicknessValue} />;
    else
      return <></>
  }

  return (
    <IonGrid >
      <IonRow>
        <IonCol size='6' sizeMd="4" sizeLg="3">
          <IonItem>
            <IonLabel>Magasság(mm)</IonLabel>
            <IonInput onIonInput={(e: any) => setHeightValue(e.target.value)} id='height' name='height' inputMode="decimal" type="number" min={0} ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol size='6' sizeMd="4" sizeLg="3">
          <IonItem>
            <IonLabel>Szélesség(mm)</IonLabel>
            <IonInput onIonInput={(e: any) => setWidthValue(e.target.value)} id='width' name='width' type="number" min={0}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol size='6' sizeMd="4" sizeLg="3">
          <IonItem>
            <IonLabel>Hosszúság(mm)</IonLabel>
            <IonInput onIonInput={(e: any) => setLengthValue(e.target.value)} id='length' name='length' type="number" min={0}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol size='6' sizeMd="4" sizeLg="3">
          <IonItem>
            <IonLabel>Anyagvastagság(mm)</IonLabel>
            <IonInput onIonInput={(e: any) => setThicknessValue(e.target.value)} id='thickness' name='thickness' type="number" min={0}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol size='6' sizeMd="4" sizeLg="3" hidden={false}>
          <IonItem>
            <IonButton onClick={() => setDrawingsVisibility("formal")}>Formaterv</IonButton>
          </IonItem>
        </IonCol>
        <IonCol size='6' sizeMd="4" sizeLg="3" hidden={false}>
          <IonItem>
            <IonButton onClick={() => setDrawingsVisibility("character")}>Jellegrajz</IonButton>
          </IonItem>
        </IonCol>
        
      </IonRow>
      {drawingType()}
    </IonGrid>
  )
}