import { useState, useContext, useEffect, createContext } from "react";
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonToggle } from "@ionic/react";
import { RectangleElement, RectangleElementCut, RectangleElementRound, PathCut, PathDotted, PathNarrowLine, PathVisible, CircleMeasure, CircleView, Cut, TextMeasure, TextString, Arrow, CutPattern, HorizontalMeasureC, VerticalMeasureC, VerticalMeasureCHalf, HorizontalMeasureCHalf, TextLabel } from './drawingelements'
import { downloadDrawing } from "./converter";

var corner = 10;
var magnify = 4;
var indentation = 25;
var legSize = 45;

var arrowOffset = 50;
var labelOffset = 100;
var measureTextOffset = 10;
var dividerOffset = 30;

var R2 = 2;
var frameSide = 10;
var stretcherWidth = 21;
var stretcherHeight = 30;
var stretcherDstGround = 100;
var stretcherDstSide = 5;

var panelWidth = 21;
var panelHeight = 80;
var panelDstSide = 5;
var panelUpperJointLength = 9;
var panelUpperJointHeight = 15;
var panelLowerJointL = 32;
var panelLowerJointS = panelLowerJointL - panelWidth / 3;
var panelJointGap = 1;
var measureOffset = 25;

const HeightContext = createContext(0);
const WidthContext = createContext(0);
const LengthContext = createContext(0);
const ThicknessContext = createContext(0);

function downloadDrawingCharacter() {
  downloadDrawing(document.getElementById("front"));
  downloadDrawing(document.getElementById("side"));
  downloadDrawing(document.getElementById("top"));
}
function downloadDrawingFormal() {
  downloadDrawing(document.getElementById("front"));
  downloadDrawing(document.getElementById("top"));
}

export function ChairView() {
  var fColor: string, cColor: string;
  const [heightValue, setHeightValue] = useState(0);
  const [widthValue, setWidthValue] = useState(0);
  const [lengthValue, setLengthValue] = useState(0);
  const [thicknessValue, setThicknessValue] = useState(0);

  const [visibility, setVisibility] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if ((+(heightValue) < 100) || (+(widthValue) < 100) || (+(lengthValue) < 100) || (+(thicknessValue) < 10))
      setVisibility(false);
    else
      setVisibility(true);
  },
    [heightValue, widthValue, lengthValue, thicknessValue])

  let drawingType = () => {
    if (toggle && visibility) {
      return (
        <HeightContext.Provider value={heightValue}>
          <WidthContext.Provider value={widthValue}>
            <LengthContext.Provider value={lengthValue}>
              <ThicknessContext.Provider value={thicknessValue}>
                <ChairCharacterView />
              </ThicknessContext.Provider>
            </LengthContext.Provider>
          </WidthContext.Provider>
        </HeightContext.Provider>
      )
    }
    else if (visibility && !toggle)
      return (

        <HeightContext.Provider value={heightValue}>
          <WidthContext.Provider value={widthValue}>
            <LengthContext.Provider value={lengthValue}>
              <ThicknessContext.Provider value={thicknessValue}>
                <ChairFormalView />
              </ThicknessContext.Provider>
            </LengthContext.Provider>
          </WidthContext.Provider>
        </HeightContext.Provider>
      )
    else if (!visibility)
      return <></>

  }

  if (toggle) {
    cColor = "primary";
    fColor = "default";
  }
  else {
    fColor = "primary";
    cColor = "default";
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
      </IonRow>
      <IonRow>
        <IonCol size="auto">
          <div style={{ width: '250px' }}>
            <IonItem>
              <IonLabel color={fColor}>Formaterv</IonLabel>
              <IonToggle onIonChange={(e) => setToggle(e.detail.checked)}></IonToggle>
              <IonLabel color={cColor}>Jellegrajz</IonLabel>
            </IonItem>
          </div>
        </IonCol>
      </IonRow>
      {drawingType()}
    </IonGrid>
  )
}

function ChairCharacterView() {
  const [type, setType] = useState("all");
  const [size, setSize] = useState(4);

  function Circles({ circleID }: { circleID: string }) {
    return <>
      <IonRow>
        <IonCol size="auto">
          <IonItem>
            <IonButton onClick={() => downloadDrawing(document.getElementById("" + circleID + "_circle"))}>Exportálás</IonButton>
          </IonItem>
        </IonCol>
        <IonCol size="auto">
          <IonItem>
            <IonButton onClick={() => setType("all")}>Vissza</IonButton>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <SVGPicture id={"" + circleID + "_circle"} />
      </IonRow>
    </>
  }

  function SVGPicture({ id }) {
    const [viewBoxValue, setViewBoxValue] = useState('0 0 0 0');

    function FrontViewCharacter() {
      const width = +(useContext(WidthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));
      const ALineOffset = 30;
      const BLineWidth = 100;
      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide + measureOffset + measureTextOffset)) +
          ' ' + (- (labelOffset + frameSide)) +
          ' ' + ((frameSide + measureOffset + measureTextOffset) + width + BLineWidth + frameSide) +
          ' ' + ((labelOffset + frameSide) + height + (arrowOffset + frameSide)) + ' ');
      },
        [width, height, thickness]);
      return (
        <g id="characterDrawing_front">

          {/** Visible parts */}

          <RectangleElement ID="plate_front_TD"
            x={0}
            y={0}
            width={width}
            height={thickness} />
          <RectangleElement ID="leftleg_front_TD"
            x={indentation}
            y={thickness}
            width={legSize}
            height={height - thickness} />
          <RectangleElement ID="rightleg_front_TD"
            x={width - indentation - legSize}
            y={thickness}
            width={legSize}
            height={height - thickness} />
          <RectangleElement ID="front_panel_front_TD"
            x={indentation + legSize}
            y={thickness}
            width={width - legSize * 2 - indentation * 2}
            height={panelHeight} />
          <RectangleElement ID="front_stretcher_front_TD"
            x={indentation + legSize}
            y={height - stretcherDstGround - stretcherHeight}
            width={width - legSize * 2 - indentation * 2}
            height={stretcherHeight} />
          <RectangleElement ID="side_stretcher_front_TD"
            x={width - indentation - stretcherWidth - stretcherDstSide}
            y={height - stretcherDstGround - stretcherHeight}
            width={stretcherWidth}
            height={stretcherHeight} />
          <RectangleElement ID="right_panel_front_TD"
            x={width - indentation - panelDstSide - panelWidth}
            y={thickness}
            width={panelWidth}
            height={panelHeight} />
          <PathCut ID="plate_cut_front_TD"
            path={'M' + (width / 2) + ', ' + (0) +
              ' h' + (width / 2) +
              ' v' + (thickness) +
              ' h' + (-width / 2) + ' '} />

          {/** Cuts and text*/}

          <PathDotted type={3} ID="divider_line_front_TD"
            path={'M' + (width / 2) + ' , ' + (height + dividerOffset) +
              ' v ' + (-(height + dividerOffset * 2)) + ' '} />

          <PathDotted type={3} ID="cut_A_line_front_TD" path={'M' + (+ width / 2 - ALineOffset) + ' , ' + (+ height + arrowOffset) +
            ' v ' + (-(height + arrowOffset * 2)) + ' '} />
          <Arrow direction="right" ID="upper_arrow_A_front_TD"
            x={(width / 2 - ALineOffset)}
            y={(- arrowOffset)} />
          <Arrow direction="right" ID="lower_arrow_A_front_TD"
            x={(width / 2 - ALineOffset)}
            y={(height + arrowOffset)} />
          <TextString ID="text_A_front_TD"
            x={(width / 2)}
            y={(- arrowOffset)}
            value="A" />
          <TextString ID="text_A_front_TD"
            x={(width / 2)}
            y={(height + arrowOffset)}
            value="A" />

          <PathDotted type={3} ID="cut_B_line"
            path={'M' + (width) + ' , ' + (thickness) +
              ' h ' + (BLineWidth) + ' '} />
          <Arrow direction="down" ID="arrow_B"
            x={(+ width + BLineWidth)}
            y={(+ thickness)} />
          <TextString ID="text_B"
            x={(+ width + 70)}
            y={(+ thickness + 20)}
            value="B" />

          {/** Measures */}

          <VerticalMeasureC ID="leg_height_front_TD"
            x={- measureOffset}
            y={+ thickness}
            value={height - thickness}
            magnify={1} />
          <PathNarrowLine ID="leg_height_front_TD_measure_line"
            path={'M' + (0) + ',' + (+ thickness) +
              ' h ' + (-measureOffset) +
              ' v ' + (height - thickness) +
              ' h ' + (measureOffset + indentation)} />

          {/** Circles */}

          <CircleView ID="circle_2"
            cx={(+ width - indentation - panelDstSide - panelWidth / 2)}
            cy={(+ thickness + panelHeight / 2)}
            number={2}
            onClick={() => setType("second")} />

          <CircleView ID="circle_3"
            cx={(+ width - indentation - stretcherDstSide - stretcherWidth / 2)}
            cy={+ height - stretcherDstGround - stretcherHeight / 2}
            number={3}
            onClick={() => setType("third")} />

          {/** Labels */}

          <TextLabel ID="label_C_front_TD"
            x={width / 3 * 2}
            y={-labelOffset}
            value={"C-metszet"} />
        </g>
      )
    }

    function SideViewCharacter() {
      const height = +(useContext(HeightContext));
      const length = +(useContext(LengthContext));
      const thickness = +(useContext(ThicknessContext));
      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide + measureOffset * 2 + measureTextOffset)) +
          ' ' + (- (+ frameSide + labelOffset)) +
          ' ' + ((frameSide + measureOffset * 2 + measureTextOffset) + length + frameSide) +
          ' ' + ((+ frameSide + labelOffset) + height + (frameSide)) + ' ');
      },
        [height, length, thickness]);
      return (
        <g id="characterDrawing_side">

          <RectangleElement ID="plate_side_TD"
            x={0}
            y={0}
            width={length}
            height={thickness} />

          <RectangleElement ID="rear_leg_side_TD"
            x={+ indentation}
            y={+ thickness}
            width={legSize}
            height={height - thickness} />
          <RectangleElement ID="front_leg_side_TD"
            x={+ length - indentation - legSize}
            y={+ thickness}
            width={legSize}
            height={height - thickness} />
          <RectangleElement ID="side_panel_side_TD"
            x={+ indentation + legSize}
            y={(+ thickness)}
            width={length - legSize * 2 - indentation * 2}
            height={panelHeight} />
          <RectangleElement ID="stretcher_side_TD"
            x={+ indentation + legSize}
            y={+ height - stretcherDstGround - stretcherHeight}
            width={length - legSize * 2 - indentation * 2}
            height={stretcherHeight} />
          <RectangleElement ID="stretcher_rear_cut_TD"
            x={+ length - indentation - stretcherDstSide - stretcherWidth}
            y={+ height - stretcherDstGround - stretcherHeight}
            width={stretcherWidth}
            height={stretcherHeight} />
          <RectangleElement ID="stretcher_front_cut_TD"
            x={+ indentation + stretcherDstSide}
            y={+ height - stretcherDstGround - stretcherHeight}
            width={stretcherWidth}
            height={stretcherHeight} />
          <RectangleElement ID="rightleg_side_cut_TD"
            x={+ length - indentation - panelDstSide - panelWidth}
            y={+ thickness}
            width={panelWidth}
            height={panelHeight} />
          <RectangleElement ID="leftleg_side_cut_TD"
            x={+ indentation + panelDstSide}
            y={+ thickness}
            width={panelWidth}
            height={panelHeight} />

          {/** Cuts */}

          <PathDotted type={3} ID="divider_line_side_TD"
            path={'M ' + (+ length / 2) + ' ' + (- dividerOffset) +
              ' v' + (height + dividerOffset * 2) + ' '} />

          {/** Horizontal measures */}

          <HorizontalMeasureC ID="rear_panel_widh_side_TD"
            x={+ indentation + panelDstSide}
            y={+ thickness + panelHeight + measureOffset}
            value={panelWidth}
            magnify={1} />

          <PathNarrowLine ID="rear_panel_widh_side_TD_measure_line"
            path={'M' + (+ indentation + panelDstSide) + ',' + (+ thickness + panelHeight) +
              ' v ' + (measureOffset) +
              ' h ' + (panelWidth) +
              ' v ' + (-measureOffset)} />

          {/** Vertical measures */}

          <VerticalMeasureC ID="thickness_side_TD"
            x={- measureOffset}
            y={0}
            value={thickness}
            magnify={1} />
          <PathNarrowLine ID="thickness_side_TD_measure_line"
            path={'M' + (0) + ',' + (0) +
              ' h ' + (-measureOffset) +
              ' v ' + (thickness) +
              ' h ' + (measureOffset)} />
          <VerticalMeasureC ID="rear_panel_height_side_TD"
            x={- measureOffset}
            y={+ thickness}
            value={panelHeight}
            magnify={1} />
          <PathNarrowLine ID="rear_panel_height_side_TD_measure_line"
            path={'M' + (0) + ',' + (+ thickness) +
              ' h ' + (-measureOffset) +
              ' v ' + (panelHeight) +
              ' h ' + (measureOffset + indentation + panelDstSide)} />
          <VerticalMeasureC ID="height_side_TD"
            x={- measureOffset * 2}
            y={0}
            value={height}
            magnify={1} />
          <PathNarrowLine ID="height_side_TD_measure_line"
            path={'M' + (0) + ',' + (0) +
              ' h ' + (-measureOffset * 2) +
              ' v ' + (height) +
              ' h ' + (measureOffset * 2 + indentation)} />
          <VerticalMeasureC ID="panel_stretchere_dst_side_TD"
            x={+ indentation + legSize + measureOffset}
            y={+ thickness + panelHeight}
            value={height - thickness - panelHeight - stretcherDstGround - stretcherHeight}
            magnify={1} />
          <VerticalMeasureC ID="stretchere_height_side_TD"
            x={+ indentation + legSize + measureOffset}
            y={+ height - stretcherDstGround - stretcherHeight}
            value={stretcherHeight}
            magnify={1} />

          {/** Label */}

          <TextLabel ID="label_A-A_side_TD"
            x={length / 3 * 2}
            y={-labelOffset}
            value={"A-A metszet"} />

        </g>
      )
    }

    function TopViewCharacter() {
      const width = +(useContext(WidthContext));
      const length = +(useContext(LengthContext));
      const CLineWidth = 100;
      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide + measureOffset + measureTextOffset)) +
          ' ' + (- (+ frameSide + labelOffset)) +
          ' ' + ((frameSide + measureOffset + measureTextOffset) + width + frameSide + measureOffset * 2) +
          ' ' + ((+ frameSide + labelOffset) + length + (frameSide + measureOffset * 2)) + ' ');
      },
        [width, length]);
      return (
        <g id="characterDrawing_top">

          {/** Visible parts */}

          <PathVisible ID="plate_part_visible_top_TD"
            path={'M' + (+ width / 2) + ',' + (0) +
              ' h' + (-(width / 2 - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (-corner) + ' ' + (corner) +
              ' v' + ((length - corner - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (corner) + ' ' + (corner) +
              ' h' + (width / 2 - corner) + ''} />
          <PathCut ID="upper_leg_top_TD"
            path={'M' + (+ width - indentation - legSize / 2) + ',' + (+ indentation) +
              ' h ' + (legSize / 2 - R2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v ' + (legSize - R2 * 2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h ' + (-(panelDstSide - R2 + panelWidth / 3)) +
              ' v ' + (-panelUpperJointLength - panelJointGap) +
              ' h ' + (-panelWidth / 3) +
              ' v ' + (panelUpperJointLength + panelJointGap) +
              ' h ' + (-(legSize - R2 - panelWidth / 3 * 2 - panelDstSide)) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (-R2) +
              ' v ' + (-(legSize - R2 - panelWidth / 3 * 2 - panelDstSide)) +
              ' h ' + (panelUpperJointLength + panelJointGap) +
              ' v ' + (-panelWidth / 3) +
              ' h ' + (-panelUpperJointLength - panelJointGap) +
              ' v ' + (-(panelDstSide - R2 + panelWidth / 3)) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (-R2) +
              ' Z'} />
          <PathCut ID="lower_leg_top_TD"
            path={'M' + (+ width - indentation - legSize / 2) + ',' + (+ length - indentation) +
              ' h ' + (legSize / 2 - R2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v ' + (-(legSize - R2 * 2)) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) +
              ' h ' + (-(panelDstSide - R2 + panelWidth / 3)) +
              ' v ' + (panelUpperJointLength + panelJointGap) +
              ' h ' + (-panelWidth / 3) +
              ' v ' + (-panelUpperJointLength - panelJointGap) +
              ' h ' + (-(legSize - R2 - panelWidth / 3 * 2 - panelDstSide)) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v ' + ((legSize - R2 - panelWidth / 3 * 2 - panelDstSide)) +
              ' h ' + (panelUpperJointLength + panelJointGap) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (-panelUpperJointLength - panelJointGap) +
              ' v ' + ((panelDstSide - R2 + panelWidth / 3)) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' Z'} />
          <PathVisible ID="upper_stretcher_top_TD"
            path={'M' + (+ width / 2) + ',' + (+ indentation + 5) +
              ' h ' + (width / 2 - indentation - legSize) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (panelUpperJointLength) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (-panelUpperJointLength) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (-(width / 2 - indentation - legSize)) + ''} />
          <PathVisible ID="lower_stretcher_top_TD"
            path={'M' + (+ width / 2) + ',' + (+ length - indentation - panelDstSide - panelWidth) +
              ' h ' + (width / 2 - indentation - legSize) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (panelUpperJointLength) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (-panelUpperJointLength) +
              ' v ' + (panelWidth / 3) +
              ' h ' + (-(width / 2 - indentation - legSize)) + ''} />
          <PathVisible ID="middle_stretcher_top_TD"
            path={'M' + (+ width - indentation - panelDstSide) + ',' + (+ legSize + indentation) +
              ' h ' + (-panelWidth / 3) +
              ' v ' + (-panelUpperJointLength) +
              ' h ' + (-panelWidth / 3) +
              ' v ' + (panelUpperJointLength) +
              ' h ' + (-panelWidth / 3) +
              ' v ' + (length - (indentation + legSize) * 2) +
              ' h ' + (panelWidth / 3) +
              ' v ' + (panelUpperJointLength) +
              ' h ' + (panelWidth / 3) +
              ' v ' + (-panelUpperJointLength) +
              ' h ' + (panelWidth / 3) +
              ' v ' + (-(length - (indentation + legSize) * 2)) + ' '} />

          {/** Cuts and dividers */}

          <PathDotted type={3} ID="vertical_divider_top_TD"
            path={'M' + (+ width / 2) + ',' + (- dividerOffset) +
              ' v' + (length + dividerOffset) + ''} />
          <PathDotted type={3} ID="horizontal_divider_top_TD"
            path={'M' + (- dividerOffset) + ' ' + (+ length / 2) +
              ' h' + (width + dividerOffset * 2) + ' '} />

          <PathDotted type={3} ID="cut_C_line_top_TD"
            path={'M' + (+ width / 2) + ' , ' + (+ length * 3 / 5) +
              ' h' + (width / 2 + CLineWidth) + ' '} />
          <Arrow direction="up" ID="arrow_C_top_TD"
            x={(+ width + CLineWidth)}
            y={(+ length * 3 / 5)} />
          <TextString ID="text_C_top_TD"
            x={(+ width + 95)}
            y={(+ length * 3 / 5 - 30)}
            value="C" />

          {/** Non-visible parts */}

          <PathDotted type={2} ID="plate_part_invisible_top_TD"
            path={'M' + (+ width / 2) + ',' + (0) +
              ' h' + ((width / 2 - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (corner) + ' ' + (corner) +
              ' v' + ((length - corner - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (-corner) + ' ' + (corner) +
              ' h' + (-(width / 2 - corner)) + ''} />

          {/** Horizontal measures */}

          <HorizontalMeasureC ID="width_top_TD"
            x={0}
            y={- measureOffset}
            value={width}
            magnify={1} />
          <PathNarrowLine ID="width_top_TD_measure_line"
            path={'M' + (0) + ',' + (+ corner) +
              ' v ' + (-measureOffset - corner) +
              ' h ' + (width) +
              ' v ' + (measureOffset + corner)} />
          <HorizontalMeasureC ID="legsize_horizontal_top_TD"
            x={+ width - indentation - legSize}
            y={+ length + measureOffset * 2}
            value={legSize}
            magnify={1} />
          <PathNarrowLine ID="legsize_horizontal_top_TD_measure_line"
            path={'M' + (+ width - indentation - legSize) + ',' + (+ length - indentation - R2) +
              ' v ' + (indentation + R2 + measureOffset * 2) +
              ' h ' + (legSize) +
              ' v ' + (-(indentation + R2 + measureOffset * 2))} />
          <HorizontalMeasureC ID="indentation_horizontal_top_TD"
            x={+ width - indentation}
            y={+ length + measureOffset * 2}
            value={indentation}
            magnify={1} />
          <PathNarrowLine ID="indentation_horizontal_TD_measure_line"
            path={'M' + (+ width - indentation) + ',' + (+ length - indentation - R2) +
              ' v ' + (indentation + R2 + measureOffset * 2) +
              ' h ' + (indentation) +
              ' v ' + (-(indentation + R2 + measureOffset * 2))} />

          {/** Vertical measures */}

          <VerticalMeasureC ID="length_top_TD"
            x={- measureOffset}
            y={0}
            value={length}
            magnify={1} />
          <PathNarrowLine ID="length_top_TD_measure_line"
            path={'M' + (+ corner) + ',' + (0) +
              ' h ' + (-measureOffset - corner) +
              ' v ' + (length) +
              ' h ' + (measureOffset + corner)} />
          <VerticalMeasureC ID="legsize_vertical_top_TD"
            x={+ width + measureOffset * 2}
            y={+ length - indentation - legSize}
            value={legSize}
            magnify={1} />
          <PathNarrowLine ID="legsize_vertical_top_TD_measure_line"
            path={'M' + (+ width - indentation - R2) + ',' + (+ length - indentation - legSize) +
              ' h ' + (indentation + R2 + measureOffset * 2) +
              ' v ' + (legSize) +
              ' h ' + (-(indentation + R2 + measureOffset * 2)) + ''} />
          <VerticalMeasureC ID="indentation_vertical_top_TD"
            x={+ width + measureOffset * 2}
            y={+ length - indentation}
            value={indentation}
            magnify={1} />
          <PathNarrowLine ID="indentation_vertical_top_TD_measure_line"
            path={'M' + (+ width - indentation - R2) + ',' + (+ length - indentation) +
              ' h ' + (indentation + R2 + measureOffset * 2) +
              ' v ' + (indentation) +
              ' h ' + (-(indentation + R2 + measureOffset * 2)) + ''} />

          {/** Labels */}
          <TextLabel ID="label_B_top_TD"
            x={width / 3 * 2}
            y={-labelOffset}
            value={"B lap nélküli felülnézet"} />

          {/** Circles */}

          <CircleView ID="circle_1"
            cx={(+ width - indentation - legSize / 2)}
            cy={(+ length - indentation - legSize / 2)}
            number={1}
            onClick={() => setType("first")} />
        </g>
      )
    }

    function FirstCircle() {
      var length = +useContext(LengthContext);
      var sectionWidth = 100;
      var sectionLength = 100;
      useEffect(() => {
        setViewBoxValue('' + (- frameSide) +
          ' ' + (- frameSide) +
          ' ' + (sectionWidth * magnify + measureOffset + frameSide * 2) +
          ' ' + (sectionLength * magnify + measureOffset + frameSide * 2) + '')
      },
        [length]);
      return (
        <g id='first_group'>

          {/** Visible elements */}

          <PathCut ID="lower_leg_first"
            path={'M' + (+ (sectionWidth - indentation - legSize / 2) * magnify) + ',' + (+ (sectionLength - indentation) * magnify) +
              ' h ' + (legSize / 2 - R2) * magnify +
              ' a ' + (R2) * magnify + ' ' + (R2) * magnify + ' 0 0 0 ' + (R2) * magnify + ' ' + (-R2) * magnify +
              ' v ' + (-(legSize - R2 * 2) * magnify) +
              ' a ' + (R2) * magnify + ' ' + (R2) * magnify + ' 0 0 0 ' + (-R2) * magnify + ' ' + (-R2) * magnify +
              ' h ' + (-(panelDstSide - R2 + panelWidth / 3) * magnify) +
              ' v ' + (panelUpperJointLength + panelJointGap) * magnify +
              ' h ' + (-panelWidth / 3) * magnify +
              ' v ' + (-panelUpperJointLength - panelJointGap) * magnify +
              ' h ' + (-(legSize - R2 - panelWidth / 3 * 2 - panelDstSide) * magnify) +
              ' a ' + (R2) * magnify + ' ' + (R2) * magnify + ' 0 0 0 ' + (-R2) * magnify + ' ' + (R2) * magnify +
              ' v ' + ((legSize - R2 - panelWidth / 3 * 2 - panelDstSide) * magnify) +
              ' h ' + (panelUpperJointLength + panelJointGap) * magnify +
              ' v ' + (panelWidth / 3) * magnify +
              ' h ' + (-panelUpperJointLength - panelJointGap) * magnify +
              ' v ' + ((panelDstSide - R2 + panelWidth / 3) * magnify) +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' Z'} />
          <PathVisible ID='right_panel_first'
            path={'M' + (+ (sectionWidth - indentation - panelDstSide - panelWidth) * magnify) + ',' + (0) +
              ' v ' + (sectionWidth - legSize - indentation) * magnify +
              ' h ' + (panelWidth / 3) * magnify +
              ' v ' + (panelUpperJointLength) * magnify +
              ' h ' + (panelWidth / 3) * magnify +
              ' v ' + (-panelUpperJointLength) * magnify +
              ' h ' + (panelWidth / 3) * magnify +
              ' v ' + (-(sectionWidth - legSize - indentation) * magnify) + ''} />
          <PathVisible ID='front_panel_first'
            path={'M' + (0) + ',' + (+ (sectionLength - indentation - panelDstSide - panelWidth) * magnify) +
              ' h ' + (sectionWidth - legSize - indentation) * magnify +
              ' v ' + (panelWidth / 3) * magnify +
              ' h ' + (panelUpperJointLength) * magnify +
              ' v ' + (panelWidth / 3) * magnify +
              ' h ' + (-panelUpperJointLength) * magnify +
              ' v ' + (panelWidth / 3) * magnify +
              ' h ' + (-(sectionWidth - legSize - indentation)) * magnify + ''} />
          <RectangleElement ID="right_panel_gap_first"
            x={(+ (sectionWidth - indentation - panelDstSide - panelWidth / 3 * 2) * magnify)}
            y={(+ (sectionLength - indentation - legSize + panelUpperJointLength) * magnify)}
            width={panelWidth / 3 * magnify}
            height={panelJointGap * magnify} />
          <RectangleElement ID="front_panel_gap_first"
            x={(+ (sectionWidth - indentation - legSize + panelUpperJointLength) * magnify)}
            y={(+ (sectionLength - indentation - panelDstSide - panelWidth / 3 * 2) * magnify)}
            width={panelJointGap * magnify}
            height={panelWidth / 3 * magnify} />

          {/** Non-visible elements */}

          <PathDotted type={2} ID="right_panel_lower_joint_first"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide - panelWidth / 3 * 2) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' v ' + (panelLowerJointS) * magnify +
              ' l ' + (panelWidth / 3) * magnify + ' ' + (panelWidth / 3) * magnify +
              ' v ' + (-panelLowerJointL) * magnify + ''} />
          <PathDotted type={2} ID="front_panel_lower_joint_first"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - panelDstSide - panelWidth / 3) * magnify) +
              ' h ' + (panelLowerJointL) * magnify +
              ' l ' + (-panelWidth / 3) * magnify + ' ' + (-panelWidth / 3) * magnify +
              ' h ' + (-panelLowerJointS) * magnify + ''} />

          <PathDotted type={2} ID="plate_first"
            path={'M' + (+ sectionWidth * magnify) + ',' + (0) +
              ' v ' + (sectionLength - corner) * magnify +
              ' a ' + (corner) * magnify + ' ' + (corner) * magnify + ' 0 0 1 ' + (-corner) * magnify + ' ' + (corner) * magnify +
              ' h ' + (-(sectionWidth - corner)) * magnify + ''} />

          {/** Cuts */}

          <Cut ID="horizontal_cut_first"
            path={'M ' + (+ (sectionWidth - indentation - panelDstSide - panelWidth) * magnify) + ',' + (0) +
              ' h' + ((panelWidth + indentation) * magnify + 10)} />
          <Cut ID="vertical_cut_first"
            path={'M ' + (0) + ',' + (+ (sectionLength - indentation - panelDstSide - panelWidth) * magnify) +
              ' v ' + ((panelWidth + indentation) * magnify + 10)} />

          {/** Horizontal measures */}

          <HorizontalMeasureC ID="right_panel_with_first"
            x={+ (sectionWidth - indentation - panelDstSide - panelWidth) * magnify}
            y={+ (sectionLength - indentation - legSize) * magnify - measureOffset * 2}
            value={panelWidth}
            magnify={magnify} />
          <HorizontalMeasureC ID="right_panel_dst_side_first"
            x={+ (sectionWidth - indentation - panelDstSide) * magnify}
            y={+ (sectionLength - indentation - legSize) * magnify - measureOffset * 2}
            value={panelDstSide}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_dst_side_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' v ' + (-measureOffset * 2) +
              ' h ' + (panelDstSide) * magnify +
              ' v ' + (measureOffset * 2 + R2 * magnify)} />
          <HorizontalMeasureC ID="right_panel_with_third_1_first"
            x={+ (sectionWidth - indentation - panelDstSide - panelWidth / 3 * 2) * magnify}
            y={+ (sectionLength - indentation - legSize) * magnify - measureOffset}
            value={panelWidth / 3}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_with_third_1_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide - panelWidth / 3 * 2) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' v ' + (-measureOffset) +
              ' h ' + (panelWidth / 3) * magnify +
              ' v ' + (measureOffset)} />
          <HorizontalMeasureC ID="right_panel_with_third_2_first"
            x={+ (sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify}
            y={+ (sectionLength - indentation - legSize) * magnify - measureOffset}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureC ID="front_panel_upper_joint_and_gap_first"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset}
            value={panelUpperJointLength + panelJointGap}
            magnify={magnify} />
          <PathNarrowLine ID="front_panel_upper_joint_and_gap_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - panelDstSide - panelWidth / 3) * magnify) +
              ' v ' + ((panelWidth / 3 + panelDstSide) * magnify + measureOffset) +
              ' h ' + (panelUpperJointLength + panelJointGap) * magnify +
              ' v ' + (-(panelWidth / 3 + panelDstSide) * magnify - measureOffset)} />
          <HorizontalMeasureC ID="front_panel_lower_joint_first"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 2}
            value={panelLowerJointL}
            magnify={magnify} />
          <PathNarrowLine ID="front_panel_lower_joint_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - panelDstSide - panelWidth / 3) * magnify) +
              ' v ' + ((panelWidth / 3 + panelDstSide) * magnify + measureOffset * 2) +
              ' h ' + (panelLowerJointL) * magnify +
              ' v ' + (-(panelWidth / 3 + panelDstSide) * magnify - measureOffset * 2)} />
          <HorizontalMeasureC ID="legsize_horizotal_first"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (sectionLength) * magnify + measureOffset}
            value={legSize}
            magnify={magnify} />
          <PathNarrowLine ID="legsize_horizontal_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - R2) * magnify) +
              ' v ' + ((R2 + indentation) * magnify + measureOffset) +
              ' h ' + (legSize * magnify) +
              ' v ' + ((-R2 - indentation) * magnify - measureOffset)} />
          <HorizontalMeasureC ID="indentation_horizontal_first"
            x={+ (sectionWidth - indentation) * magnify}
            y={+ (sectionLength) * magnify + measureOffset}
            value={indentation}
            magnify={magnify} />
          <PathNarrowLine ID="indentation_horizontal_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation) * magnify) + ',' + (+ (sectionLength - indentation - R2) * magnify) +
              ' v ' + ((R2 + indentation) * magnify + measureOffset) +
              ' h ' + (indentation * magnify) +
              ' v ' + ((-corner) * magnify - measureOffset)} />

          {/** Vertical measures */}

          <VerticalMeasureC ID="front_panel_width_first"
            x={+ (sectionWidth - indentation - legSize) * magnify - measureOffset * 2}
            y={+ (sectionLength - indentation - panelDstSide - panelWidth) * magnify}
            value={panelWidth}
            magnify={magnify} />
          <VerticalMeasureC ID="front_panel_dst_side_first"
            x={+ (sectionWidth - indentation - legSize) * magnify - measureOffset}
            y={+ (sectionLength - indentation - panelDstSide) * magnify}
            value={panelDstSide}
            magnify={magnify} />
          <PathNarrowLine ID="front_panel_dst_side_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - panelDstSide) * magnify) +
              ' h ' + (-measureOffset) +
              ' v ' + (panelDstSide * magnify) +
              ' h ' + (measureOffset + R2 * magnify) + ''} />
          <VerticalMeasureC ID="front_panel_width_third_1_first"
            x={+ (sectionWidth - indentation - legSize) * magnify - measureOffset}
            y={+ (sectionLength - indentation - panelDstSide - panelWidth / 3 * 2) * magnify}
            value={panelWidth / 3}
            magnify={magnify} />
          <PathNarrowLine ID="front_panel_width_third_1_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - panelDstSide - panelWidth / 3 * 2) * magnify) +
              ' h ' + (-measureOffset) +
              ' v ' + (panelWidth / 3 * magnify) +
              ' h ' + (measureOffset * magnify) + ''} />
          <VerticalMeasureC ID="front_panel_width_third_2_first"
            x={+ (sectionWidth - indentation - legSize) * magnify - measureOffset}
            y={+ (sectionLength - indentation - panelDstSide - panelWidth / 3) * magnify}
            value={panelWidth / 3}
            magnify={magnify} />
          <VerticalMeasureC ID="right_panel_joint_gap_first"
            x={+ (sectionWidth - indentation) * magnify + measureOffset}
            y={+ (sectionLength - indentation - legSize + panelUpperJointLength) * magnify}
            value={panelJointGap}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_joint_gap_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify) + ',' + (+ (sectionLength - indentation - legSize + panelUpperJointLength) * magnify) +
              ' h ' + ((panelWidth / 3 + panelDstSide) * magnify + measureOffset) +
              ' v ' + (panelJointGap * magnify) +
              ' h ' + (-(panelWidth / 3 + panelDstSide) * magnify - measureOffset)} />
          <VerticalMeasureC ID="right_panel_upper_joint_first"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 2}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={panelUpperJointLength + panelJointGap}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_joint_gap_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - R2) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' h ' + ((R2) * magnify + measureOffset * 2) +
              ' v ' + ((panelJointGap + panelUpperJointLength) * magnify) +
              ' h ' + (- measureOffset * 2)} />
          <VerticalMeasureC ID="right_panel_lower_joint_l_first"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 3}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={panelLowerJointL}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_lower_joint_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - R2) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' h ' + ((R2) * magnify + measureOffset * 3) +
              ' v ' + ((panelLowerJointL) * magnify) +
              ' h ' + (-((panelDstSide + panelWidth / 3) * magnify + measureOffset * 3))} />
          <VerticalMeasureC ID="legsize_vertical_first"
            x={+ (sectionWidth) * magnify + measureOffset}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={legSize}
            magnify={magnify} />
          <PathNarrowLine ID="legsize_vertical_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - R2) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' h ' + ((R2 + indentation) * magnify + measureOffset) +
              ' v ' + ((legSize) * magnify) +
              ' h ' + (-((R2 + indentation) * magnify + measureOffset))} />
          <VerticalMeasureC ID="indentation_vertical_first"
            x={+ (sectionWidth) * magnify + measureOffset}
            y={+ (sectionLength - indentation) * magnify}
            value={indentation}
            magnify={magnify} />
          <PathNarrowLine ID="legsize_vertical_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - R2) * magnify) + ',' + (+ (sectionLength - indentation) * magnify) +
              ' h ' + ((R2 + indentation) * magnify + measureOffset) +
              ' v ' + ((indentation) * magnify) +
              ' h ' + (-(corner * magnify + measureOffset))} />
          <VerticalMeasureCHalf ID="right_panel_length_first"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 4}
            y={+ (sectionLength - indentation - legSize + panelLowerJointL) * magnify}
            displayValue={length - (legSize - panelLowerJointL) * 2}
            startValue={0} />
          <PathNarrowLine ID="right_panel_length_first_measure_line"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify) + ',' + (+ (sectionLength - indentation - legSize + panelLowerJointL) * magnify) +
              ' h ' + ((panelDstSide + panelWidth / 3) * magnify + measureOffset * 4)} />
        </g>
      )
    }

    function SecondCircle() {
      var sectionWidth = 200;
      var sectionHeight = 200;

      const width = +(useContext(WidthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));

      useEffect(() => {
        setViewBoxValue(' ' + (- frameSide) +
          ' ' + (- (frameSide + measureOffset + measureTextOffset)) +
          ' ' + ((frameSide) + sectionWidth * magnify + (measureOffset * 2 + measureTextOffset + frameSide)) +
          ' ' + ((frameSide + measureOffset + measureTextOffset) + sectionHeight * magnify + frameSide))
      },
        [width, height, thickness]);

      /*Láb és fedlap*/
      return (
        <g id='second_group'>

          {/** Visible parts */}

          <PathVisible ID="plate_part_second"
            path={'M' + (0) + ',' + (0) +
              ' h' + (sectionWidth - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + ((thickness - R2 - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 -' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (-(sectionWidth - R2) * magnify) + ''} />
          <PathVisible ID="leg_second"
            path={'M' + (+ (sectionWidth - indentation) * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + ((sectionHeight - thickness) * magnify) +
              ' m ' + (-legSize * magnify) + ' 0 ' +
              ' v' + (-(sectionHeight - thickness) * magnify) + ''} />
          <PathVisible ID="front_panel_visble_second"
            path={'M' + (0) + ',' + (+ (thickness + panelHeight) * magnify) +
              ' h ' + (sectionWidth - indentation - legSize) * magnify + ''} />
          <PathCut ID="rigth_panel_second"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide) * magnify) + ',' + (+ thickness * magnify) +
              ' v' + ((panelHeight - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(panelWidth - R2 * 2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v' + (-(panelHeight - R2) * magnify) + ''} />

          {/** Cuts */}

          <Cut ID="vertical_cut_second"
            path={'M' + (0) + ',' + (0) +
              ' v' + (thickness + panelHeight) * magnify + ' '} />
          <Cut ID="horizontal_cut_second"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ sectionHeight * magnify) +
              ' h ' + (legSize * magnify) + ' '} />

          {/** Non-visible parts */}

          <PathDotted type={2} ID="front_panel_non_visible_second"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (thickness + panelHeight) * magnify) +
              ' h ' + (legSize - panelDstSide - panelWidth) * magnify + ''} />
          <PathDotted type={2} ID="front_panel_joint_second"
            path={'M' + (+ (sectionWidth - indentation - legSize + panelUpperJointLength + panelJointGap) * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + (panelUpperJointHeight) * magnify +
              ' m ' + (-panelJointGap) * magnify + ' ' + (-panelUpperJointHeight * magnify) +
              ' v ' + (panelUpperJointHeight) * magnify +
              ' h ' + (panelLowerJointL - panelJointGap - panelUpperJointLength) * magnify + ''} />
          <PathDotted type={2} ID="right_panel_joint_second"
            path={'M' + (+ (sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify) + ',' + (+ (thickness) * magnify) +
              ' v ' + (panelHeight) * magnify +
              ' m ' + (-panelWidth / 3) * magnify + ' 0 ' +
              ' v ' + (-panelHeight) * magnify + ''} />

          {/** Horizontal measures */}

          <HorizontalMeasureCHalf ID="plate_width_second"
            x={+ sectionWidth * magnify}
            y={- measureOffset}
            displayValue={width}
            startValue={0} />
          <PathNarrowLine ID="plate_width_second_measure_line"
            path={'M' + (+ (sectionWidth) * magnify) + ',' + (+ R2 * magnify) +
              ' v ' + (-R2 * magnify - measureOffset) +
              ' h ' + (-sectionWidth * magnify)} />
          <HorizontalMeasureC ID="right_panel_width_third_1_second"
            x={+ (sectionWidth - indentation - panelDstSide - panelWidth / 3 * 2) * magnify}
            y={+ (thickness + panelHeight) * magnify + measureOffset}
            value={panelWidth / 3}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_width_third_1_second_measure_line"
            path={'M' + ((sectionWidth - indentation - panelDstSide - panelWidth / 3 * 2) * magnify) + ',' + ((thickness + panelHeight) * magnify) +
              ' v ' + (measureOffset) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (-measureOffset)} />
          <HorizontalMeasureC ID="right_panel_width_third_2_second"
            x={+ (sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify}
            y={+ (thickness + panelHeight) * magnify + measureOffset}
            value={panelWidth / 3}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_width_third_2_second_measure_line"
            path={'M' + ((sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify) + ',' + ((thickness + panelHeight) * magnify) +
              ' v ' + (measureOffset) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (-measureOffset - R2 * magnify)} />
          <HorizontalMeasureC ID="right_panel_width_second"
            x={+ (sectionWidth - indentation - panelDstSide - panelWidth) * magnify}
            y={+ (thickness + panelHeight) * magnify + measureOffset * 2}
            value={panelWidth}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_width_second_measure_line"
            path={'M' + ((sectionWidth - indentation - panelDstSide - panelWidth) * magnify) + ',' + ((thickness + panelHeight - R2) * magnify) +
              ' v ' + (measureOffset * 2 + R2 * magnify) +
              ' h ' + (panelWidth * magnify) +
              ' v ' + (-R2 * magnify - measureOffset * 2)} />
          <HorizontalMeasureC ID="right_panel_dst_side_second"
            x={+ (sectionWidth - indentation - panelDstSide) * magnify}
            y={+ (thickness + panelHeight) * magnify + measureOffset * 2}
            value={panelDstSide}
            magnify={magnify} />
          <PathNarrowLine ID="right_panel_dst_second_second_measure_line"
            path={'M' + ((sectionWidth - indentation - panelDstSide) * magnify) + ',' + ((thickness + panelHeight) * magnify) +
              ' v ' + (measureOffset * 2) +
              ' h ' + (panelDstSide * magnify) +
              ' v ' + (-measureOffset * 2)} />
          <HorizontalMeasureC ID="legsize_second"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (thickness + panelHeight) * magnify + measureOffset * 3}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasureC ID="indentation_second"
            x={+ (sectionWidth - indentation) * magnify}
            y={+ (thickness + panelHeight) * magnify + measureOffset * 3}
            value={indentation}
            magnify={magnify} />
          <PathNarrowLine ID="indentation_second_measure_line"
            path={'M' + ((sectionWidth - indentation) * magnify) + ',' + ((thickness + panelHeight) * magnify + measureOffset * 3) +
              ' h ' + (indentation * magnify) +
              ' v ' + (-(panelHeight + R2) * magnify - measureOffset * 3)} />

          {/** Vertical measures */}

          <VerticalMeasureC ID="front_panel_upper_indentation_height_second"
            x={+ (sectionWidth - indentation) * magnify + measureOffset}
            y={+ (thickness) * magnify}
            value={panelUpperJointHeight}
            magnify={magnify} />
          <PathNarrowLine ID="front_panel_upper_indentation_height_second_measure_line"
            path={'M' + (sectionWidth - indentation - panelDstSide - panelWidth / 3) * magnify + ',' + (thickness + panelUpperJointHeight) * magnify +
              ' h ' + ((panelWidth / 3 + panelDstSide) * magnify + measureOffset) +
              ' v ' + (-panelUpperJointHeight * magnify)} />
          <VerticalMeasureC ID="front_panel_height_second"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 2}
            y={+ (thickness) * magnify}
            value={panelHeight}
            magnify={magnify} />
          <PathNarrowLine ID="front_panel_height_second_measure_line"
            path={'M' + (sectionWidth - indentation - panelDstSide - R2) * magnify + ',' + (thickness + panelHeight) * magnify +
              ' h ' + ((R2 + panelDstSide) * magnify + measureOffset * 2) +
              ' v ' + (-panelHeight * magnify)} />
          <VerticalMeasureC ID="thickness_second"
            x={+ (sectionWidth) * magnify + measureOffset}
            y={0}
            value={thickness}
            magnify={magnify} />
          <PathNarrowLine ID="thickness_second_measure_line"
            path={'M' + (sectionWidth - R2) * magnify + ',' + (0) +
              ' h ' + ((R2) * magnify + measureOffset) +
              ' v ' + (thickness * magnify) +
              ' h ' + (-(R2) * magnify - measureOffset)} />
          <VerticalMeasureCHalf ID="height_second"
            x={+ sectionWidth * magnify + measureOffset * 2}
            y={0}
            displayValue={height}
            startValue={+ sectionHeight * magnify} />
          <PathNarrowLine ID="thickness_second_measure_line"
            path={'M' + (sectionWidth - R2) * magnify + ',' + (0) +
              ' h ' + ((R2) * magnify + measureOffset * 2) +
              ' v ' + (sectionHeight * magnify)} />
        </g>
      )
    }

    function ThirdCircle() {
      var sectionWidth = 100;
      var sectionHeight = 100;
      useEffect(() => {
        setViewBoxValue('' + (- frameSide) +
          ' ' + (- frameSide) +
          ' ' + (frameSide + sectionWidth * magnify + frameSide) +
          ' ' + (frameSide + sectionHeight * magnify + frameSide + ''))
      },
        []);
      return (
        <g id="third_group">

          {/** Visible parts */}

          <PathVisible ID="front_stretcher_third"
            path={'M' + (0) + ',' + (+ (sectionHeight / 2 - stretcherHeight / 2) * magnify) +
              ' h' + ((sectionWidth - legSize) * magnify) +
              ' v' + (stretcherHeight * magnify) +
              ' h' + (-(sectionWidth - legSize) * magnify) + ''} />
          <PathVisible ID="leg_third"
            path={'M' + (+ sectionWidth * magnify) + ',' + (0) +
              ' v ' + (sectionHeight * magnify) +
              ' m ' + (-legSize * magnify) + ' 0 ' +
              ' v ' + (-sectionHeight * magnify) + ''} />
          <RectangleElementCut ID="right_stretcher_third"
            x={(+ (sectionWidth - stretcherDstSide - stretcherWidth) * magnify)}
            y={(+ (sectionHeight / 2 - stretcherHeight / 2) * magnify)}
            width={stretcherWidth * magnify}
            height={stretcherHeight * magnify} />

          {/** Cuts */}

          <Cut ID="upper_horizontal_cut_third"
            path={'M' + (+ (sectionWidth - legSize) * magnify) + ',' + (0) +
              ' h ' + (legSize * magnify + 10) + ''} />
          <Cut ID="lower_horizontal_cut_third"
            path={'M' + (+ (sectionWidth - legSize) * magnify) + ',' + (+ sectionHeight * magnify) +
              ' h ' + (legSize * magnify + 10) + ''} />
          <Cut ID="vertical_cut_third"
            path={'M' + (0) + ',' + (+ (sectionHeight / 2 - stretcherHeight / 2) * magnify) +
              ' v ' + (stretcherHeight * magnify + 10) + ''} />

          {/** Non-visible parts */}

          <PathDotted type={2} ID="right_panel_joint_third"
            path={'M' + (+ (sectionWidth - stretcherDstSide - stretcherWidth / 3 * 2) * magnify) + ',' + (+ (sectionHeight / 2 - stretcherHeight / 2) * magnify) +
              ' v ' + (stretcherHeight * magnify) +
              ' m ' + (stretcherWidth / 3 * magnify) + ' 0 ' +
              ' v ' + (-stretcherHeight * magnify) + ''} />
          <PathDotted type={2} ID="front_stretcher_nonvisible_third"
            path={'M' + (+ (sectionWidth - legSize) * magnify) + ',' + (+ (sectionHeight / 2 - stretcherHeight / 2) * magnify) +
              ' h ' + (legSize - stretcherWidth - stretcherDstSide) * magnify +
              ' m 0 ' + (stretcherHeight * magnify) +
              ' h ' + (-(legSize - stretcherWidth - stretcherDstSide)) * magnify + ''} />

          {/** Horizontal measures */}

          <HorizontalMeasureC ID="right_stretcher_side_dst_third"
            x={+ (sectionWidth - stretcherDstSide) * magnify}
            y={+ (sectionHeight / 2 - stretcherHeight / 2) * magnify}
            value={stretcherDstSide}
            magnify={magnify} />
          <HorizontalMeasureC ID="right_stretcher_width_third_third"
            x={+ (sectionWidth - stretcherDstSide - stretcherWidth / 3 * 2) * magnify}
            y={+ (sectionHeight / 2 - stretcherHeight / 2) * magnify - measureOffset}
            value={stretcherWidth / 3}
            magnify={magnify} />
          <PathNarrowLine ID="right_stretcher_width_third_third_measure_line"
            path={'M' + (+ (sectionWidth - stretcherDstSide - stretcherWidth / 3 * 2) * magnify) + ',' + (+ (sectionHeight / 2 - stretcherHeight / 2) * magnify) +
              ' v ' + (-measureOffset) +
              ' h ' + (stretcherWidth / 3) * magnify +
              ' v ' + (measureOffset)} />
          <HorizontalMeasureC ID="right_stretcher_width_third"
            x={+ (sectionWidth - stretcherDstSide - stretcherWidth) * magnify}
            y={+ (sectionHeight / 2 - stretcherHeight / 2) * magnify - measureOffset * 2}
            value={stretcherWidth}
            magnify={magnify} />
          <PathNarrowLine ID="right_stretcher_width_third_measure_line"
            path={'M' + (+ (sectionWidth - stretcherDstSide - stretcherWidth) * magnify) + ',' + (+ (sectionHeight / 2 - stretcherHeight / 2) * magnify) +
              ' v ' + (-measureOffset * 2) +
              ' h ' + (stretcherWidth) * magnify +
              ' v ' + (measureOffset * 2)} />

          {/** Vertical measures */}

          <VerticalMeasureC ID="front_stretcher_height_third"
            x={+ (sectionWidth - legSize) * magnify - measureOffset}
            y={+ (sectionHeight / 2 - stretcherHeight / 2) * magnify}
            value={stretcherHeight}
            magnify={magnify} />

        </g>
      )
    }

    var comp = () => {
      switch (id) {
        case "front":
          setSize(4);
          return <FrontViewCharacter />
        case "side":
          setSize(4);
          return <SideViewCharacter />
        case "top":
          setSize(4);
          return <TopViewCharacter />
        case "first_circle":
          setSize(12);
          return <FirstCircle />
        case "second_circle":
          setSize(12);
          return <SecondCircle />
        case "third_circle":
          setSize(12);
          return <ThirdCircle />
        default:
          return <h6>Invalid name!!</h6>
      }
    };

    return (
      <IonCol size="12" size-sm={size}>
        <svg id={id} viewBox={viewBoxValue} preserveAspectRatio='xMidYMid meet'>
          <CutPattern></CutPattern>
          {comp()}
        </svg>
      </IonCol>
    )
  }

  var drawings = () => {
    if (type === "all") {
      return <>
        <IonRow>
          <IonCol size="auto">
            <IonItem>
              <IonButton onClick={downloadDrawingCharacter}>Exportálás</IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <SVGPicture id="front" />
          <SVGPicture id="side" />
          <SVGPicture id="top" />
        </IonRow>
      </>;
    }
    else {
      return <Circles circleID={type} />
    }
  }

  return (
    <>
      {drawings()}
    </>
  )
}

function ChairFormalView() {
  function SVGPicture({ id }) {
    const [viewBoxValue, setViewBoxValue] = useState('0 0 0 0');

    function TopViewFormal() {
      const width = +(useContext(WidthContext));
      const length = +(useContext(LengthContext));
      useEffect(() => {
        setViewBoxValue(' ' + (- frameSide) +
          ' ' + (- (frameSide + measureOffset + measureTextOffset)) +
          ' ' + ((frameSide) + width + (measureOffset + measureTextOffset + frameSide)) +
          ' ' + ((frameSide + measureOffset + measureTextOffset) + length + frameSide))
      },
        [width, length]);
      return (
        <g id="formalDrawing_top">

          {/** Visible parts */}

          <RectangleElementRound ID="plate_top"
            x={0}
            y={0}
            width={width}
            height={length}
            rx={corner}
            ry={corner} />

          {/** Measures */}

          <HorizontalMeasureC ID="plate_width_top"
            x={0}
            y={-measureOffset}
            value={width}
            magnify={1} />
          <PathNarrowLine ID="plate_width_top_measure_line"
            path={'M' + (0) + ',' + (corner) +
              ' v' + (-(measureOffset + corner)) +
              ' h ' + (width) +
              ' v ' + (measureOffset + corner)} />
          <VerticalMeasureC ID="plate_length_top"
            x={width + measureOffset}
            y={0}
            value={length}
            magnify={1} />
          <PathNarrowLine ID="plate_length_top_measure_line"
            path={'M' + (width - corner) + ',' + (0) +
              ' h ' + (corner + measureOffset) +
              ' v ' + (length) +
              ' h ' + (-(measureOffset + corner))} />

          <PathDotted type={1} ID="divider_width_half_top"
            path={'M' + (+ width / 2) + ',' + (- dividerOffset) +
              ' v' + (length + dividerOffset * 2) + ' '} />
          <PathDotted type={1} ID="divider_length_half_top"
            path={'M' + (- dividerOffset) + ',' + (+ length / 2) +
              ' h' + (width + dividerOffset * 2) + ' '} />
        </g>
      )
    }

    function FrontViewFormal() {
      const width = +(useContext(WidthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));
      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide + measureOffset + measureTextOffset)) +
          ' ' + (- (frameSide)) +
          ' ' + ((frameSide + measureOffset + measureTextOffset) + width + (measureOffset + measureTextOffset + frameSide)) +
          ' ' + ((frameSide) + height + frameSide))
      },
        [width, height, thickness]);
      return (
        <g id="formalDrawing_front">+

          {/** Visible elements */}

          <RectangleElement ID="plate_front"
            x={0}
            y={0}
            width={width}
            height={thickness} />
          <RectangleElement ID="leftLeg_front"
            x={indentation}
            y={thickness}
            width={legSize}
            height={height - thickness} />
          <RectangleElement ID="rightLeg_front"
            x={(width - indentation - legSize)}
            y={(thickness)}
            width={legSize}
            height={height - thickness} />
          <RectangleElement ID="stretcher_front"
            x={legSize + indentation}
            y={(height - stretcherDstGround - stretcherHeight)}
            width={(width - 2 * (legSize + indentation))}
            height={stretcherHeight} />
          <RectangleElement ID="panel_front"
            x={+ legSize + indentation}
            y={(+ thickness)}
            width={(width - (2 * (indentation + legSize)))}
            height={panelHeight} />

          {/** Measures */}

          <VerticalMeasureC ID="height_front"
            x={-measureOffset}
            y={0}
            value={height}
            magnify={1} />
          <PathNarrowLine ID="height_front_measure_line"
            path={'M' + (R2) + ',' + (0) +
              ' h ' + (-(measureOffset + R2)) +
              ' v ' + (height) +
              ' h ' + (measureOffset + R2+indentation)} />
          <VerticalMeasureC ID="stretcher_height_front"
            x={indentation + legSize + measureOffset}
            y={height - stretcherDstGround - stretcherHeight}
            value={stretcherHeight}
            magnify={1} />
          <VerticalMeasureC ID="stretcher_dst_ground_front"
            x={indentation + legSize + measureOffset}
            y={height - stretcherDstGround}
            value={stretcherDstGround}
            magnify={1} />
          <PathNarrowLine ID="stretcher_dst_ground_measure_line"
            path={'M' + (indentation+legSize) + ',' + (height) +
              ' h ' + (measureOffset) +
              ' v ' + (-stretcherDstGround) } />
          <VerticalMeasureC ID="thickness_front"
            x={width + measureOffset}
            y={0}
            value={thickness}
            magnify={1} />
          <PathNarrowLine ID="thickness_measure_line"
            path={'M' + (width-R2) + ',' + (0) +
              ' h ' + (measureOffset + R2) +
              ' v ' + (thickness) +
              ' h ' + (-measureOffset - R2)} />
          <VerticalMeasureC ID="panel_height_front"
            x={width + measureOffset}
            y={thickness}
            value={panelHeight}
            magnify={1} />
          <PathNarrowLine ID="panel_height_measure_line"
            path={'M' + (width-R2) + ',' + (thickness) +
              ' h ' + (measureOffset + R2) +
              ' v ' + (panelHeight) +
              ' h ' + (-measureOffset - R2-indentation-legSize)} />
        </g>
      )
    }

    var comp = () => {
      switch (id) {
        case "front":
          return <FrontViewFormal />
        case "top":
          return <TopViewFormal />
        default:
          return <h6>Invalid name!!</h6>
      }
    };
    return (
      <IonCol size="12" size-sm="4">
        <svg id={id} viewBox={viewBoxValue} preserveAspectRatio='xMidYMid meet'>
          <CutPattern></CutPattern>
          {comp()}
        </svg>
      </IonCol>
    )
  }

  return (
    <>
      <IonRow>
        <IonCol size="auto">
          <IonItem>
            <IonButton onClick={downloadDrawingFormal}>Exportálás</IonButton>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <SVGPicture id="front" />
        <SVGPicture id="top" />
      </IonRow>
    </>
  )
}