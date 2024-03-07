import { useState, useContext, useEffect, createContext } from "react";
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { RectangleElement, RectangleElementDotted, RectangleElementCut, RectangleElementCutRound, PathCut, PathCutPlate, PathDotted, PathNarrowLine, PathVisible, CircleMeasure, CircleView, Cut, TextMeasure, TextString, Arrow, CutPattern, VerticalMeasureL, VerticalMeasureLHalf, HorizontalMeasureL, HorizontalMeasureLHalf, Rounding, TextLabel, Dowel, } from './drawingelements'
import { downloadDrawing } from "./converter";

var corner = 2;
var magnify = 4;
var indentation = 35;
var R2 = 2;
var legSize = 50;

var arrowOffset = 50;
var textOffset = 30;
var measureOffset = 50;
var measureTextOffset = 10;
var labelOffset = 100;

var dowelHeight = 39
var dowelDiameter = 8;
var dowelGap = 1;
var dowelDstSide = legSize - 39;
var dowelPlateOverlap = 9;
var dowelIndentation = 6;

var sideStretcherWidth = 21;
var sideStretcherDistanceFromSide = 5;
var sideStretcherDistanceFromGround = 100;
var sideStretcherHeight = 70;

var middleStretcherHeight = 50;
var middleStretcherWidth = 21;
var middleStretcherDistance = 80;
var middleStretcherDistanceFromGround = 110;

var sideSupportHeight = 21;
var sideSupportWidth = 70;
var sideSupportPanelOverlap = 14;
var sideSupportRearPanelOverlapLength = 9;
var sideSupportRearPanelOverlapHeight = 10;
var sideSupportRearPanelOverlapGap = 1;
var sideSupportLegOverlap = 38;

var drawerBoardHeight = 21;

var panelDistanceFromSide = 5;
var panelWidth = 21;
var panelUpperJointLength = 10;
var panelUpperJointHeight = 20;
var panelUpperJointGap = 1;
var panelLowerJointL = 37;
var panelLowerJointS = panelLowerJointL - panelWidth / 3;


var frontSupportHeight = 21;
var frontSupportWidth = 70;
var frontSupportLength = 70;
var frontSupportDistanceFromSide = 5;

var tablePanelWidth = 21;

var drawerSlideHeight1 = 21;
var drawerSlideHeight2 = 3;
var drawerSlideWidth1 = 21;
var drawerSlideWidth2 = 25;
var drawerSlidePanelGap = 3;
var drawerSlideDrawerGap = 1;

var drawerSideDistanceFromPlate = 1;
var drawerSideWidth = 21;
var drawerSideDistanceFromLeg = 1;
var drawerSideFrontPanelOverlap = 14;

var trayBottomHeight = 5;
var trayBottomIndentation = 6;
var trayBottomDistanceFromBottom = 17;
var trayBottomDistanceFromLeg = 73;
var trayBottomGap = 1;

var drawerHorizontalUpperPartHeight = 13;

var drawerFrontWidth = 21;
var drawerFrontDistanceFromPlate = 1;
var drawerFrontDistanceFromBottom = 1;
var drawerFrontDistanceFromSide = 5;

var concaveElementHeight = 18;
var concaveElementWidthRect = 7;
var concaveElementWidthTri = 20;

const legFrontSupportJointWidth = 24;
const legFrontSupportJointLength = 30;
const legFrontSupportJointHeight = frontSupportHeight / 3;
const legFrontSupportJointDstSide = 5;
const legFrontSupportJointGap = 1;

const sideSupportFrontSupportJointWidth = 12;
const sideSupportFrontSupportJointHeigth = frontSupportHeight / 3;
const sideSupportFrontSupportJointGap = 1;

const frameSide = 20;

function downloadDrawingCharacter() {
  downloadDrawing(document.getElementById("front"));
  downloadDrawing(document.getElementById("side"));
  downloadDrawing(document.getElementById("top"));
}


const HeightContext = createContext(0);
const WidthContext = createContext(0);
const LengthContext = createContext(0);
const ThicknessContext = createContext(0);
const DrawerHeightContext = createContext(0);



export function TableView() {
  const [heightValue, setHeightValue] = useState(0);
  const [widthValue, setWidthValue] = useState(0);
  const [lengthValue, setLengthValue] = useState(0);
  const [thicknessValue, setThicknessValue] = useState(0);
  const [drawerHeightValue, setDrawerHeightValue] = useState(0);

  const [visibility, setVisibility] = useState(false)


  useEffect(() => {
    if ((+(heightValue) < 100) || (+(widthValue) < 100) || (+(lengthValue) < 100) || (+(thicknessValue) < 10) || +(drawerHeightValue) === 0)
      setVisibility(false);
    else
      setVisibility(true);
  },
    [heightValue, widthValue, lengthValue, thicknessValue])

  let drawings = () => {
    if (visibility === true)
      return <>
        <HeightContext.Provider value={heightValue}>
          <WidthContext.Provider value={widthValue}>
            <LengthContext.Provider value={lengthValue}>
              <ThicknessContext.Provider value={thicknessValue}>
                <DrawerHeightContext.Provider value={drawerHeightValue}>
                  <TableDrawings></TableDrawings>
                </DrawerHeightContext.Provider>
              </ThicknessContext.Provider>
            </LengthContext.Provider>
          </WidthContext.Provider>
        </HeightContext.Provider>
      </>
    else return <></>
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
        <IonCol size='6' sizeMd="4" sizeLg="3">
          <IonItem>
            <IonLabel>Fiók magassága(mm)</IonLabel>
            <IonSelect placeholder="Magasság kiválasztása" okText="Kiválasztás" cancelText="Mégse" onIonChange={(e: any) => setDrawerHeightValue(e.target.value)}>
              <IonSelectOption value={90}>90</IonSelectOption>
              <IonSelectOption value={120}>120</IonSelectOption>
              <IonSelectOption value={150}>150</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      {drawings()}
    </IonGrid>
  )
}

function TableDrawings() {
  const [type, setType] = useState('all');
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
    const drawerTotalHeight = +(useContext(DrawerHeightContext));

    var panelLowerJointHeight = drawerTotalHeight - panelUpperJointHeight - sideSupportHeight;
    var drawerSideHeight = drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - drawerSideDistanceFromPlate;
    var drawerFrontHeight = drawerTotalHeight - frontSupportHeight - drawerFrontDistanceFromBottom - drawerFrontDistanceFromPlate;
    var panelHeight = drawerTotalHeight;


    const dovetailRatio = drawerFrontHeight / 97;
    const dovetailTeethHeightL = dovetailRatio * 22;
    const dovetailTeethDstL = dovetailRatio * 6.5;
    const dovetailTeethHeightS = dovetailRatio * 18;
    const dovetailTeethSideGapL = dovetailRatio * 9;
    const dovetailTeethHeightDiff = (dovetailTeethHeightL - dovetailTeethHeightS);
    const dovetailTeethDstS = dovetailRatio * 10.5;
    const dovetailTeethSideGapS = dovetailTeethSideGapL + dovetailTeethHeightDiff / 2;

    var drawerBackHeight = drawerFrontHeight / 97 * 60;
    const dovetailRatioR = drawerBackHeight / 97;
    const dovetailTeethHeightLR = dovetailRatioR * 22;
    const dovetailTeethDstLR = dovetailRatioR * 6.5;
    const dovetailTeethHeightSR = dovetailRatioR * 18;
    const dovetailTeethSideGapLR = dovetailRatioR * 9;
    const dovetailTeethHeightDiffR = (dovetailTeethHeightLR - dovetailTeethHeightSR);
    const dovetailTeethDstSR = dovetailRatioR * 10.5;
    const dovetailTeethSideGapSR = dovetailTeethSideGapLR + dovetailTeethHeightDiffR / 2;
    var drawerBackWidth = 15;


    function FrontView() {
      const width = +(useContext(WidthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));

      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide)) +
          ' ' + (- (labelOffset + frameSide)) +
          ' ' + ((frameSide) + width + arrowOffset + frameSide) +
          ' ' + ((labelOffset + frameSide) + height + (arrowOffset + measureOffset * 2 + frameSide)) + ' ');
      },
        [width, height, thickness]);
      return (
        <g id="front">

          {/**Leftside */}

          <PathVisible ID="plate_part_visible_front"
            path={'M' + (width / 2) + ',' + 0 +
              ' h' + (-(width / 2 - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (-corner) + ' ' + (corner) +
              ' v' + (thickness - corner * 2) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (corner) + ' ' + (corner) +
              ' h' + (width / 2 - corner) + ''} />
          <RectangleElement ID="left_leg_front"
            x={(+ indentation)}
            y={(+ thickness)}
            width={legSize}
            height={(height - thickness)} />
          <RectangleElement ID="middle_stretcher_front"
            x={(+ indentation + legSize)}
            y={(+ height - middleStretcherDistanceFromGround - middleStretcherHeight)}
            width={(width - (indentation + legSize) * 2 + (legSize - sideStretcherWidth - sideStretcherDistanceFromSide))}
            height={middleStretcherHeight} />
          <PathVisible ID="drawer_part_front"
            path={'M' + (+ width / 2) + ',' + (+ thickness + drawerTotalHeight) +
              ' h' + (-(width / 2 - indentation - legSize)) +
              ' v' + (-drawerBoardHeight) +
              ' h' + (width / 2 - legSize - indentation) + ''} />

          {/**Rightside */}

          <PathCut ID="plate_part_cut_front"
            path={'M' + (+ width / 2) + ',' + 0 +
              ' h' + ((width / 2 - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (corner) + ' ' + (corner) +
              ' v' + (thickness - corner * 2) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (-corner) + ' ' + (corner) +
              ' h' + (-(width / 2 - corner))} />
          <RectangleElementCutRound ID="side_stretcher_front"
            x={(+ width - indentation - sideStretcherDistanceFromSide - sideStretcherWidth)}
            y={(+ height - sideStretcherDistanceFromGround - sideStretcherHeight)}
            width={sideStretcherWidth}
            height={sideStretcherHeight} rx={R2} ry={R2} />
          <PathVisible ID="inner_rightleg_front"
            path={'M' + (+ width - indentation - legSize) + ',' + (+ thickness) +
              ' v' + (drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) +
              ' m 0 ' + (drawerSlideHeight2 + sideSupportHeight) +
              ' v' + (height - thickness - drawerTotalHeight - middleStretcherDistanceFromGround - middleStretcherHeight) +
              ' m 0 ' + (middleStretcherHeight) +
              ' v' + (middleStretcherDistanceFromGround) +
              ' h' + (legSize) +
              ' v' + (-(height - thickness)) + ' '} />
          <PathVisible ID="drawer_board_front" path={'M' + (+ width / 2) + ',' + (+ thickness + drawerTotalHeight) +
            ' h' + (width / 2 - legSize - indentation) + ''} />
          <PathCut ID="right_side_panel_front"
            path={'M' + (+ width - indentation - panelDistanceFromSide) + ',' + (+ thickness) +
              ' v' + (panelHeight - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h' + (-(panelWidth / 3 - R2)) +
              ' v' + (-sideSupportHeight) +
              ' h' + (-(panelWidth * (2 / 3))) +
              ' v' + (-(panelHeight - sideSupportHeight)) + ''} />
          <RectangleElementCut ID="right_side_support_front"
            x={(+ width - indentation - panelDistanceFromSide - panelWidth / 3 - sideSupportWidth)}
            y={(+ thickness + drawerTotalHeight - sideSupportHeight)}
            width={sideSupportWidth}
            height={sideSupportHeight} />
          <PathCut ID="drawer_slide_front"
            path={'M' + (+ width - indentation - legSize - drawerSlideWidth2) + ',' + (thickness + drawerTotalHeight - sideSupportHeight) +
              ' h' + (drawerSlideWidth1 + drawerSlideWidth2) +
              ' v' + (-drawerSlideHeight1) +
              ' h' + (-drawerSlideWidth1) +
              ' v' + (drawerSlideHeight1 - drawerSlideHeight2) +
              ' h' + (-drawerSlideWidth2) + ' Z'} />
          <PathCut ID="drawer_right_side_front"
            path={'M' + (+ (width - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth)) + ',' + (+ (thickness + drawerSideDistanceFromPlate + drawerSideHeight)) +
              ' v ' + (-(trayBottomDistanceFromBottom)) +
              ' h' + ((trayBottomIndentation + trayBottomGap)) +
              ' v' + (-trayBottomHeight) +
              ' h' + (-(trayBottomIndentation + trayBottomGap)) +
              ' v' + (-(drawerSideHeight - R2 - trayBottomDistanceFromBottom - trayBottomHeight)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (-R2) +
              ' h' + ((drawerSideWidth - R2 * 2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v' + (drawerSideHeight - R2)} />
          <PathVisible ID="drawer_horizontal_upper_part_front"
            path={'M' + (+ width / 2) + ',' + (+ thickness + drawerHorizontalUpperPartHeight) +
              ' h' + (width / 2 - indentation - legSize - drawerSideDistanceFromPlate - drawerSideWidth)} />
          <PathCut ID="tray_bottom_front"
            path={'M' + (+ width / 2) + ',' + (+ thickness + drawerSideDistanceFromPlate + drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight) +
              ' h' + (width / 2 - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) +
              ' v' + (trayBottomHeight) +
              ' h' + (-(width / 2 - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation)) + ' '} />

          <CircleView ID="circle_3"
            cx={(+ width - indentation - legSize / 2)}
            cy={(+ thickness + drawerTotalHeight / 2)}
            number={3}
            onClick={() => setType("third")} />

          <CircleView ID="circle_4"
            cx={+ width - indentation - legSize / 2}
            cy={+ height - sideStretcherDistanceFromGround - sideStretcherHeight / 2}
            number={4}
            onClick={() => setType("fourth")} />


          {/**C cut */}

          <PathDotted type={3} ID="cut_C_line_front"
            path={'M' + (+ width / 2) + ',' + (+ height + arrowOffset) +
              ' v' + (-(height + arrowOffset * 2)) + ' '} />
          <Arrow direction="right" ID="cut_C_arrow_top_front"
            x={(+ width / 2)}
            y={(- arrowOffset)} />
          <Arrow direction="right" ID="cut_C_arrow_bottom_front"
            x={(+ width / 2)}
            y={(+ height + arrowOffset)} />
          <TextString ID="cut_C_text_top_front"
            x={(+ width / 2 + textOffset)}
            y={- arrowOffset}
            value="C" />
          <TextString ID="cut_C_text_bottom_front"
            x={(+ width / 2 + textOffset)}
            y={+ height + arrowOffset}
            value="C" />

          {/**B cut */}

          <PathDotted type={3} ID="cut_B_line_front"
            path={'M' + (+ width / 2) + ',' + (+ thickness + drawerTotalHeight * 2 / 5) +
              ' h' + (width / 2 + arrowOffset) + ' '} />
          <Arrow direction="down" ID="cut_B_arrow_front"
            x={(+ width + arrowOffset)}
            y={(+ thickness + drawerTotalHeight * 2 / 5)} />
          <TextString ID="cut_B_text_front"
            x={(+ width + arrowOffset)}
            y={+ thickness + drawerTotalHeight * 2 / 5 + textOffset}
            value="B" />

          {/**Measurements */}

          <HorizontalMeasureL ID="width_front"
            x={0}
            y={+ height + arrowOffset + measureOffset * 2}
            value={width}
            magnify={1} />
          <HorizontalMeasureL ID="leg_distance_front"
            x={+ indentation + legSize}
            y={+ height + arrowOffset + measureOffset}
            value={width - (indentation + legSize) * 2}
            magnify={1} />
          <VerticalMeasureL ID="middle_stretcher_height_front"
            x={+ width / 3 * 2}
            y={+ height - middleStretcherDistanceFromGround - middleStretcherHeight}
            value={middleStretcherHeight}
            magnify={1} />

          {/** Labels */}
          <TextLabel ID="label_front"
            x={indentation + legSize}
            y={-labelOffset}
            value={"elölnézet"} />

          <TextLabel ID="label_A_front"
            x={width - indentation - legSize}
            y={-labelOffset}
            value={"A homlokmetszet"} />
        </g>
      )
    }

    function SideView() {
      const length = +(useContext(LengthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));

      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide * 2)) +
          ' ' + (- (frameSide + labelOffset)) +
          ' ' + ((frameSide * 2) + length + measureOffset * 3 + frameSide) +
          ' ' + ((frameSide + labelOffset) + height + (measureOffset * 2 + frameSide)) + ' ');
      },
        [length, height, thickness]);
      return (
        <g id="side">

          {/**Leg and Plate */}

          {/**<RectangleElementCutRound ID="plate_part_cut_side"
            x={(0)}
            y={0}
            width={length}
            height={thickness}
            rx={corner}
            ry={corner} />*/}

          <PathCutPlate ID="first_plate_part_cut_side"
            orientation={1}
            path={'M' + (length / 20 * 3) + ',' + 0 +
              ' h ' + (-length / 20 * 3 + R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v ' + (thickness - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h ' + (length / 20 * 3 - R2) +
              ' v ' + (-thickness)} />
          <PathCutPlate ID="second_plate_part_cut_side"
            orientation={2}
            path={'M' + (length / 20 * 7) + ',' + 0 +
              ' h ' + (-length / 20 * 4) +
              ' v ' + (thickness) +
              ' h ' + (length / 20 * 4) +
              ' v ' + (-thickness)} />

          <PathCutPlate ID="third_plate_part_cut_side"
            orientation={1}
            path={'M' + (length / 20 * 10.5) + ',' + 0 +
              ' h ' + (-length / 20 * 3.5) +
              ' v ' + (thickness) +
              ' h ' + (length / 20 * 3.5) +
              ' v ' + (-thickness)} />

          <PathCutPlate ID="fourth_plate_part_cut_side"
            orientation={2}
            path={'M' + (length / 20 * 13.5) + ',' + 0 +
              ' h ' + (-length / 20 * 3) +
              ' v ' + (thickness) +
              ' h ' + (length / 20 * 3) +
              ' v ' + (-thickness)} />

          <PathCutPlate ID="fifth_plate_part_cut_side"
            orientation={1}
            path={'M' + (length / 20 * 17) + ',' + 0 +
              ' h ' + (-length / 20 * 3.5) +
              ' v ' + (thickness) +
              ' h ' + (length / 20 * 3.5) +
              ' v ' + (-thickness)} />

          <PathCutPlate ID="sixth_plate_part_cut_side"
            orientation={2}
            path={'M' + (length / 20 * 17) + ',' + 0 +
              ' h ' + (length / 20 * 3 - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v ' + (thickness - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h ' + (-length / 20 * 3 + R2) +
              ' v ' + (-thickness)} />


          <PathVisible ID="left_rear_leg_side"
            path={'M' + (+ indentation) + ',' + (+ thickness) +
              ' v' + (height - thickness) +
              ' h' + (legSize) +
              ' v' + (-(height - thickness - drawerTotalHeight)) +
              ' m 0 ' + (-(sideSupportHeight)) +
              ' v' + (-(drawerTotalHeight - sideSupportHeight)) + ''} />
          <RectangleElement ID="side_crosssleg_side"
            x={+ indentation + legSize}
            y={+ height - sideStretcherDistanceFromGround - sideStretcherHeight}
            width={length - 2 * (indentation + legSize)}
            height={sideStretcherHeight} />
          <RectangleElementCutRound ID="middle_stretcher_rear_side"
            x={+ length / 2 - middleStretcherDistance / 2 - middleStretcherWidth}
            y={+ height - middleStretcherDistanceFromGround - middleStretcherHeight}
            width={middleStretcherWidth}
            height={middleStretcherHeight}
            rx={R2}
            ry={R2} />
          <RectangleElementCutRound ID="middle_stretcher_front_side"
            x={+ length / 2 + middleStretcherDistance / 2}
            y={+ height - middleStretcherDistanceFromGround - middleStretcherHeight}
            width={middleStretcherWidth}
            height={middleStretcherHeight}
            rx={R2}
            ry={R2} />
          <PathVisible ID="left_front_leg_side"
            path={'M' + (+ length - indentation) + ',' + (+ thickness) +
              ' v' + (height - thickness) +
              ' h' + (-legSize) +
              ' v' + (-(height - thickness - drawerTotalHeight)) + ''} />

          {/**Drawer */}

          <PathCut ID="rear_panel_side"
            path={'M' + (+ indentation + panelDistanceFromSide) + ',' + (+ thickness) +
              ' v' + (panelHeight - R2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h' + (panelWidth - R2 * 2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v' + (-(panelHeight - R2)) + ''} />
          <PathCut ID="drawer_front_side"
            path={'M' + (+ length - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) + ',' + (+ thickness + drawerFrontDistanceFromPlate) +
              ' h' + (drawerFrontWidth - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v' + (drawerFrontHeight - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h' + (-(drawerFrontWidth - R2)) +
              ' v ' + (-trayBottomDistanceFromBottom) +
              ' h' + (trayBottomIndentation + trayBottomGap) +
              ' v ' + (-trayBottomHeight) +
              ' h' + (-trayBottomIndentation - trayBottomGap) +
              ' Z '} />
          <RectangleElement ID="left_side_support_side"
            x={+ indentation + panelDistanceFromSide + panelWidth}
            y={+ thickness + drawerTotalHeight - sideSupportHeight}
            width={length - indentation * 2 - panelDistanceFromSide - panelWidth - frontSupportDistanceFromSide - frontSupportWidth}
            height={drawerBoardHeight} />
          <PathCut ID="front_support_side"
            path={'M' + (+ length - indentation - frontSupportDistanceFromSide - frontSupportWidth) + ',' + (thickness + drawerFrontHeight + drawerFrontDistanceFromBottom + drawerFrontDistanceFromPlate) +
              ' h' + (sideSupportWidth - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v' + (sideSupportHeight - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h' + (-(sideSupportWidth - R2)) + ' Z'} />
          <RectangleElementCut ID="traybottom_side"
            x={+ indentation + legSize + trayBottomDistanceFromLeg}
            y={+ thickness + drawerTotalHeight - drawerBoardHeight - trayBottomDistanceFromBottom - drawerSlideHeight2 - trayBottomHeight}
            width={(length - legSize - indentation * 2 - trayBottomDistanceFromLeg - drawerFrontDistanceFromSide - drawerFrontWidth / 3 * 2)}
            height={trayBottomHeight} />
          <RectangleElementCut ID="drawer_back_side"
            x={+ indentation + legSize + trayBottomDistanceFromLeg}
            y={+ thickness + drawerTotalHeight - drawerBoardHeight - trayBottomDistanceFromBottom - drawerSlideHeight2 - trayBottomHeight - drawerBackHeight}
            width={drawerBackWidth}
            height={drawerBackHeight} />
          <RectangleElement ID="drawer_slide_side"
            x={+ indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect}
            y={+ thickness + drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2}
            width={length - indentation * 2 - legSize - trayBottomDistanceFromLeg + concaveElementWidthRect - drawerFrontDistanceFromSide - drawerFrontWidth}
            height={drawerSlideHeight2} />
          <PathVisible ID="concave_element_side"
            path={'M' + (+ indentation + legSize + trayBottomDistanceFromLeg + concaveElementWidthTri) + ',' + (+ thickness + drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2) +
              ' h' + (-(concaveElementWidthRect + concaveElementWidthTri)) +
              ' v' + (-(drawerSlideHeight1 - drawerSlideHeight2)) +
              ' h' + (concaveElementWidthRect) +
              ' v' + (concaveElementHeight - 10.19) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) + ' Z'} />
          <PathVisible ID="drawer_other_side_side"
            path={'M' + (+ length - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) + ',' + (+ thickness + drawerFrontDistanceFromPlate) +
              ' h' + (-(length - indentation * 2 - legSize - drawerFrontDistanceFromSide - drawerFrontWidth - trayBottomDistanceFromLeg)) +
              ' v' + (drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight) + ''} />

          <CircleView ID="circle_1"
            cx={+ indentation + legSize / 2}
            cy={+ thickness + drawerTotalHeight / 2}
            number={1}
            onClick={() => setType("first")} />
          <CircleView ID="circle_2"
            cx={+ length - indentation - legSize / 2}
            cy={+ thickness + drawerTotalHeight / 2}
            number={2}
            onClick={() => setType("second")} />
          <CircleView ID="circle_8"
            cx={+ length / 2}
            cy={+ height - sideStretcherDistanceFromGround - sideStretcherHeight / 2}
            number={8}
            onClick={() => setType("eighth")} />

          {/**Horizontal measures*/}

          <HorizontalMeasureL ID="rear_legsize_side"
            x={+ indentation}
            y={+ height + measureOffset}
            value={legSize}
            magnify={1} />

          <HorizontalMeasureL ID="front_legsize_side"
            x={+ length - indentation - legSize}
            y={+ height + measureOffset}
            value={legSize}
            magnify={1} />

          <HorizontalMeasureL ID="middle_stretcher_distance_side"
            x={(+ length / 2 - middleStretcherDistance / 2)}
            y={+ height + measureOffset}
            value={middleStretcherDistance}
            magnify={1} />

          <HorizontalMeasureL ID="leg_distance_side"
            x={+ indentation + legSize}
            y={+ height + measureOffset * 2}
            value={length - 2 * (indentation + legSize)}
            magnify={1} />

          <HorizontalMeasureL ID="length_measure_side"
            x={0}
            y={+ height + measureOffset * 3}
            value={length}
            magnify={1} />

          {/**Vertical measures*/}

          <VerticalMeasureL ID="thickness_side"
            x={+ length + measureOffset}
            y={0}
            value={thickness}
            magnify={1} />

          <VerticalMeasureL ID="height_side"
            x={+ length + measureOffset * 2}
            y={0}
            value={height}
            magnify={1} />

          <VerticalMeasureL ID="side_stretcher_height_side"
            x={+ length + measureOffset}
            y={+ height - sideStretcherDistanceFromGround - sideStretcherHeight}
            value={sideStretcherHeight}
            magnify={1} />

          <VerticalMeasureL ID="side_stretcher_dstfromground_side"
            x={+ length + measureOffset}
            y={+ height - sideStretcherDistanceFromGround}
            value={sideStretcherDistanceFromGround}
            magnify={1} />

          {/** Label */}

          <TextLabel ID="label_side"
            x={length / 2}
            y={-labelOffset}
            value={"C-C függőleges metszet"} />
        </g>
      )
    }

    function TopView() {
      const length = +(useContext(LengthContext));
      const width = +(useContext(WidthContext));

      useEffect(() => {
        setViewBoxValue(' ' + (- (frameSide)) +
          ' ' + (- (frameSide + labelOffset)) +
          ' ' + ((frameSide) + width + arrowOffset + frameSide) +
          ' ' + ((frameSide + labelOffset) + length + (frameSide)) + ' ');
      },
        [width, length]);

      return (
        <g id="top">
          {/**Leftside */}
          <PathDotted ID="plate_top" type={1}
            path={'M' + (0) + ',' + (0) +
              ' h' + (width) +
              ' v' + (length) +
              ' h' + (-width) + ' Z'} />
          <PathVisible ID="rear_stretcher_top" path={'M' + (+ width / 2) + ',' + (+ length / 2 - middleStretcherDistance / 2 - middleStretcherWidth) +
            ' h' + (-(width / 2 - indentation - panelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) +
            ' v' + (middleStretcherWidth) +
            ' h' + ((width / 2 - indentation - panelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) + ''} />
          <PathVisible ID="front_stretcher_top" path={'M' + (+ width / 2) + ',' + (+ length / 2 + middleStretcherDistance / 2) +
            ' h' + (-(width / 2 - indentation - panelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) +
            ' v' + (middleStretcherWidth) +
            ' h' + ((width / 2 - indentation - panelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) + ''} />
          <PathVisible ID="table_side_panel_rear_top"
            path={'M' + (+ width / 2) + ',' + (+ indentation + panelDistanceFromSide) +
              ' h' + (-(width / 2 - indentation - legSize)) +
              ' v' + (panelWidth / 3) +
              ' h' + (-panelUpperJointLength) +
              ' v' + (panelWidth / 3) +
              ' h' + (panelUpperJointLength) +
              ' v' + (sideStretcherWidth / 3) +
              ' h' + (width / 2 - indentation - legSize) + ' '} />
          <PathVisible ID="left_side_support_top"
            path={'M' + (+ indentation + panelDistanceFromSide + panelWidth + sideSupportWidth - sideSupportPanelOverlap) + ',' + (+ indentation + panelDistanceFromSide + panelWidth) +
              ' h' + (-(sideSupportWidth - sideSupportPanelOverlap - legSize + panelDistanceFromSide + panelWidth)) +
              ' v' + (legSize - panelDistanceFromSide - panelWidth) + ' h' + (-(legSize - panelDistanceFromSide - panelWidth)) +
              ' v' + (length - indentation - legSize - indentation - panelDistanceFromSide - sideSupportWidth) +
              ' h' + (sideSupportWidth - sideSupportPanelOverlap) + ' Z'} />
          <PathVisible ID="left_side_panel_top"
            path={'M' + (+ indentation + panelDistanceFromSide) + ',' + (+ indentation + legSize) +
              ' v' + (length - (indentation + legSize) * 2) +
              ' h' + (panelWidth / 3) +
              ' v' + (panelUpperJointLength) +
              ' h' + (panelWidth / 3) +
              ' v' + (-panelUpperJointLength) +
              ' h' + (panelWidth / 3) +
              ' v' + (-(length - (indentation + legSize) * 2)) +
              ' h' + (-panelWidth / 3) +
              ' v' + (-panelUpperJointLength) +
              ' h' + (-panelWidth / 3) +
              ' v' + (panelUpperJointLength) + ' Z'} />
          <PathCut ID="left_rear_leg_top"
            path={'M' + (+ indentation + legSize / 2) + ',' + (+ indentation) +
              ' h' + (-(legSize / 2 - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h' + (panelDistanceFromSide + panelWidth / 3 - R2) +
              ' v' + (-(panelUpperJointLength + panelUpperJointGap)) +
              ' h' + (panelWidth / 3) +
              ' v' + (panelUpperJointLength + panelUpperJointGap) +
              ' h' + (panelWidth / 3 + (legSize - panelDistanceFromSide - panelWidth - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v' + (-(panelWidth / 3 + (legSize - panelDistanceFromSide - panelWidth - R2))) +
              ' h' + (-(panelUpperJointLength + panelUpperJointGap)) +
              ' v' + (-panelWidth / 3) +
              ' h' + (panelUpperJointLength + panelUpperJointGap) +
              ' v' + (-(panelWidth / 3 + panelDistanceFromSide - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) +
              ' h' + (-(legSize / 2 - R2))} />
          <PathCut ID="left_front_leg_top"
            path={'M' + (+ indentation + panelDistanceFromSide + panelWidth) + ',' + (+ length - indentation - legSize) +
              ' h' + (-panelWidth / 3) +
              ' v' + (panelUpperJointLength + panelUpperJointGap) +
              ' h' + (-sideStretcherWidth / 3) +
              ' v' + (-(panelUpperJointLength + panelUpperJointGap)) +
              ' h' + (-(panelWidth / 3 + panelDistanceFromSide - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) + ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h' + (legSize - R2 * 2) + ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v' + (-(legSize - R2 * 2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) + ' Z'} />
          <PathVisible ID="front_support_top"
            path={'M' + (+ width / 2) + ',' + (+ length - indentation - frontSupportDistanceFromSide) +
              ' h' + (-(width / 2 - indentation - legSize)) +
              ' v' + (-(legSize - corner - frontSupportDistanceFromSide)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) +
              ' h' + (-(legSize - panelDistanceFromSide - panelWidth - R2)) +
              ' v' + (-(frontSupportWidth - legSize + frontSupportDistanceFromSide)) +
              ' h' + (width / 2 - indentation - panelDistanceFromSide - panelWidth) + ''} />

          <PathDotted type={3} ID="middle_line_top"
            path={'M' + (+ width / 2) + ',' + (- arrowOffset) +
              ' v' + (length + arrowOffset * 2) + ''} />
          <PathDotted type={3} ID="cut_A_line_top"
            path={'M' + (+ width / 2) + ',' + (+ length / 2 + middleStretcherDistance / 2 + middleStretcherWidth / 2) +
              ' h' + (width / 2 + arrowOffset) + ''} />
          <Arrow direction="up" ID="cut_A_arrow_top"
            x={(+ width + arrowOffset)}
            y={(+ length / 2 + middleStretcherDistance / 2 + middleStretcherWidth / 2)} />
          <TextString ID="cut_A_text_front"
            x={(+ width + arrowOffset)}
            y={+ length / 2 + middleStretcherDistance / 2 + middleStretcherWidth / 2 - textOffset}
            value="A" />

          {/**Rightside */}

          <PathCut ID="drawer_front_top"
            path={'M' + (+ width / 2) + ',' + (+ length - indentation - drawerFrontDistanceFromSide) +
              ' h' + (width / 2 - legSize - indentation) +
              ' v' + (-drawerFrontWidth) +
              ' h' + (-(width / 2 - legSize - indentation))} />
          <PathCut ID="rear_side_panel_top"
            path={'M' + (+ width / 2) + ',' + (+ indentation + panelDistanceFromSide) +
              ' h' + (width / 2 - legSize - indentation) +
              ' v' + (panelWidth / 3) +
              ' h' + (panelLowerJointL) +
              ' l' + (-panelWidth / 3) + ' ' + (panelWidth / 3) +
              ' h' + (-panelLowerJointS) +
              ' v' + (panelWidth / 3) +
              ' h' + (-(width / 2 - legSize - indentation)) + ''} />
          <PathCut ID="right_side_panel_top"
            path={'M' + (+ width - indentation - panelDistanceFromSide) + ',' + (+ indentation + legSize) +
              ' v' + (length - (indentation + legSize) * 2) +
              ' h' + (-panelWidth / 3) +
              ' v' + (panelLowerJointL) +
              ' h' + (-panelWidth / 3) +
              ' v' + (-panelLowerJointL) +
              ' h' + (-panelWidth / 3) +
              ' v' + (-(length - (indentation + legSize) * 2)) +
              ' h' + (panelWidth / 3) +
              ' v' + (-panelLowerJointS) +
              ' l' + (panelWidth / 3) + ' ' + (-panelWidth / 3) +
              ' v' + (panelLowerJointL) + ' Z'} />
          <PathCut ID="right_front_leg_top"
            path={'M' + (+ width - indentation - legSize / 2) + ',' + (+ length - indentation) +
              ' h' + (-(legSize / 2 - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (-R2) + ' ' + (-R2) +
              ' v' + (-(legSize - R2 * 2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (-R2) +
              ' h' + (legSize - panelDistanceFromSide - panelWidth - R2 + panelWidth / 3) +
              ' v' + (panelLowerJointL + panelUpperJointGap) +
              ' h' + (panelWidth / 3) +
              ' v' + (-(panelLowerJointL + panelUpperJointGap)) +
              ' h' + (panelWidth / 3 + panelDistanceFromSide - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (-R2) + ' ' + (R2) + ' Z'} />
          <PathCut ID="right_rear_leg_outside_top"
            path={'M' + (+ width - indentation - legSize / 2) + ',' + (+ indentation) +
              ' h' + (legSize / 2 - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) + ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (-R2) + ' ' + (R2) +
              ' h' + (-(panelDistanceFromSide + panelWidth / 3 - R2)) +
              ' v' + (-(legSize - (panelDistanceFromSide + panelWidth / 3))) +
              ' h' + (-(legSize - (panelDistanceFromSide + panelWidth / 3))) +
              ' v' + (-(panelDistanceFromSide + panelWidth / 3 - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (-R2) + ' Z'} />
          <PathCut ID="right_rear_leg_outside_botom"
            path={'M' + (+ width - indentation - panelDistanceFromSide - panelWidth / 3 * 2) + ',' + (+ indentation + legSize) +
              ' v' + (-(legSize - panelDistanceFromSide - panelWidth / 3 * 2)) +
              ' h' + (-(legSize - panelDistanceFromSide - panelWidth / 3 * 2)) +
              ' v' + (legSize - panelDistanceFromSide - panelWidth / 3 * 2 - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0' + (R2) + ' ' + (R2) + ' Z'} />
          <PathVisible ID="right_side_support_top"
            path={'M' + (+ width - indentation - panelDistanceFromSide - panelWidth - (sideSupportWidth - sideSupportPanelOverlap)) + ',' + (+ indentation + panelDistanceFromSide + panelWidth + trayBottomDistanceFromLeg) +
              ' v' + (-trayBottomDistanceFromLeg) + ''} />
          <PathCut ID="drawer_back_side_top"
            path={'M' + (+ width / 2) + ',' + (+ indentation + panelDistanceFromSide + panelWidth + trayBottomDistanceFromLeg) +
              ' h' + (width / 2 - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - 21) +
              ' v' + (drawerBackWidth) +
              ' h' + (-(width / 2 - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - 21)) + ''} />
          <RectangleElementCut ID="drawer_right_side_top"
            x={+ width - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth}
            y={(+ indentation + panelDistanceFromSide + panelWidth + trayBottomDistanceFromLeg)}
            width={drawerSideWidth}
            height={length - 2 * indentation - panelDistanceFromSide - drawerFrontDistanceFromSide - drawerFrontWidth - panelWidth - trayBottomDistanceFromLeg} />
          <RectangleElement ID="drawer_slide_lower_part_top"
            x={+ width - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2}
            y={+ indentation + panelDistanceFromSide + panelWidth + trayBottomDistanceFromLeg - concaveElementWidthRect}
            width={drawerSlideWidth2}
            height={concaveElementWidthRect} />
          <RectangleElement ID="drawer_slide_higher_part_top"
            x={+ width - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1}
            y={+ indentation + panelDistanceFromSide + panelWidth + trayBottomDistanceFromLeg - concaveElementWidthRect}
            width={drawerSlideWidth1}
            height={length - 2 * indentation - panelDistanceFromSide - legSize - panelWidth - trayBottomDistanceFromLeg + concaveElementWidthRect} />

          <CircleView ID="circle_5"
            cx={+ width - indentation - legSize / 2}
            cy={+ indentation + legSize}
            number={5}
            onClick={() => setType("fifth")} />
          <CircleView ID="circle_6"
            cx={+ width - indentation - legSize / 2}
            cy={+ length - indentation - legSize}
            number={6}
            onClick={() => setType("sixth")} />
          <CircleView ID="circle_7"
            cx={+ indentation + legSize / 2}
            cy={+ length - indentation - legSize}
            number={7}
            onClick={() => setType("seventh")} />

          {/** Labels */}

          <TextLabel ID="label_top"
            x={width / 6 * 2}
            y={-labelOffset}
            value={"lap és fiók nélküli felülnézet"} />

          <TextLabel ID="label_B_top"
            x={width / 6 * 5}
            y={-labelOffset}
            value={"B vízszintes metszet"} />
        </g>
      )
    }

    function FirstCircle() {
      const height = +useContext(HeightContext);
      const length = +useContext(LengthContext);
      const thickness = +useContext(ThicknessContext);
      const sectionHeight = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (- (measureOffset + measureTextOffset + frameSide)) +
          ' ' + (- (measureOffset * 2 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionLength * magnify + measureOffset * 1.5 + frameSide) +
          ' ' + ((measureOffset * 2 + measureTextOffset + frameSide) + sectionHeight * magnify + (measureOffset * 2 + frameSide)) + ' ');
      },
        [height, length, thickness]);
      return (
        <g id="first">

          {/** Visible lines */}

          <PathCutPlate orientation={1} ID="plate_part_1_first"
            path={'M' + (+ sectionLength / 3 * magnify) + ',' + (0) +
              ' h ' + (-(sectionLength / 3 - R2) * magnify) +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (thickness - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + ((sectionLength / 3 - R2) * magnify) + ''} />
          <PathCutPlate orientation={2} ID="plate_part_2_first"
            path={'M' + (+ sectionLength / 3 * 2 * magnify) + ',' + (0) +
              ' h ' + (-(sectionLength / 3) * magnify) +
              ' v ' + (thickness) * magnify +
              ' h ' + ((sectionLength / 3) * magnify) + ''} />
          <PathCutPlate orientation={1} ID="plate_part_3_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (0) +
              ' h ' + (-(sectionLength / 3) * magnify) +
              ' v ' + (thickness) * magnify +
              ' h ' + ((sectionLength / 3) * magnify) + ''} />

          <PathCut ID="rear_panel_first"
            path={'M' + (+ (indentation + panelDistanceFromSide) * magnify) + ',' + (+ thickness * magnify) +
              ' v' + (panelHeight - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (panelWidth - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v' + (-(panelHeight - R2) * magnify) + ''} />
          <PathVisible ID="rear_leg_first"
            path={'M' + (+ indentation * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + (sectionHeight - thickness) * magnify +
              ' m ' + (legSize * magnify) + ' 0 ' +
              ' v ' + (-(sectionHeight - thickness - drawerTotalHeight) * magnify) +
              ' m 0 ' + (-sideSupportHeight * magnify) +
              ' v ' + (-(drawerTotalHeight - sideSupportHeight) * magnify) + ''} />
          <PathVisible ID="side_support_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify) +
              ' h ' + (-(sectionLength - indentation - panelDistanceFromSide - panelWidth) * magnify) +
              ' v ' + (sideSupportHeight - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + ((sectionLength - indentation - panelDistanceFromSide - panelWidth - R2) * magnify)} />
          <PathVisible ID="drawer_slide_lower_part_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg + concaveElementWidthRect) * magnify) +
              ' v ' + (drawerSlideHeight2 * magnify) +
              ' h ' + ((sectionLength - indentation - legSize - trayBottomDistanceFromLeg + concaveElementWidthRect) * magnify) + ''} />
          <PathVisible ID="concave_element_first"
            path={'M' + (+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify) + ',' + (+ (thickness + drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2) * magnify) +
              ' h' + (-(concaveElementWidthRect) * magnify) +
              ' v' + (-(drawerSlideHeight1 - drawerSlideHeight2) * magnify) +
              ' h' + (concaveElementWidthRect) * magnify +
              ' v' + (concaveElementHeight) * magnify} />
          <PathCut ID="traybottom_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight - trayBottomDistanceFromBottom - drawerSlideHeight2 - trayBottomHeight) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (trayBottomHeight * magnify) +
              ' h ' + (sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify + ''} />
          <PathCut ID="drawer_back_first"
            path={'M' + (+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' h ' + (drawerBackWidth * magnify) +
              ' v ' + (-(drawerBackHeight - R2)) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' h ' + (-(drawerBackWidth - R2)) * magnify +
              ' v ' + (drawerBackHeight) * magnify + ''} />
          <PathVisible ID="drawer_other_side_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (+ (thickness + drawerSideDistanceFromPlate) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight) * magnify + ''} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="drawer_slide_height_1_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) + ''} />
          <PathDotted type={2} ID="leg_side_support_overlap_first"
            path={'M' + (+ (indentation + legSize) * magnify) + ',' + (+ (thickness + drawerTotalHeight) * magnify) +
              ' v ' + (-(sideSupportHeight * magnify)) + ''} />
          <PathDotted type={2} ID="side_panel_joint_first"
            path={'M' + (+ (indentation + legSize - panelUpperJointLength - panelUpperJointGap) * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + (panelUpperJointHeight * magnify) +
              ' m ' + (panelUpperJointGap * magnify) + ' ' + (-panelUpperJointHeight * magnify) +
              ' v ' + (panelUpperJointHeight * magnify) +
              ' h ' + (-(panelLowerJointL - panelUpperJointLength)) * magnify +
              ' v ' + (panelLowerJointHeight * magnify) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (-panelLowerJointHeight * magnify) +
              ' m ' + (panelUpperJointGap * magnify) + ' 0 ' +
              ' v ' + (panelLowerJointHeight * magnify) +
              ' h ' + (-panelWidth / 3 * magnify) +
              ' v ' + (-panelLowerJointHeight * magnify) + ''} />
          <PathDotted type={2} ID="side_support_joint_first"
            path={'M' + (+ (indentation + panelDistanceFromSide + panelWidth) * magnify) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify) +
              ' h ' + (-(sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap) * magnify) +
              ' v ' + (sideSupportRearPanelOverlapHeight * magnify) +
              ' h ' + ((sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap) * magnify) +
              ' m ' + (-sideSupportRearPanelOverlapLength) * magnify + ' 0 ' +
              ' v ' + (-sideSupportRearPanelOverlapHeight * magnify) + ''} />
          <RectangleElementDotted type={2} ID="dowel_and_gap_first"
            x={+ (indentation + dowelDstSide) * magnify}
            y={+ (thickness - dowelPlateOverlap - dowelGap) * magnify}
            width={dowelDiameter * magnify}
            height={(dowelHeight + dowelGap) * magnify} />
          <PathDotted type={2} ID="dowel_top_first"
            path={'M' + (+ (indentation + dowelDstSide) * magnify) + ',' + (+ (thickness - dowelPlateOverlap) * magnify) +
              ' h ' + (dowelDiameter * magnify)} />
          <PathDotted type={3} ID="dowel_centre_line_first"
            path={'M' + (+ (indentation + dowelDstSide + dowelDiameter / 2) * magnify) + ',' + (+ (thickness - dowelPlateOverlap - dowelGap) * magnify - 20) +
              ' v ' + ((dowelHeight + dowelGap) * magnify + 20 * 2)} />
          <PathDotted type={2} ID="rear_dovetailTeeth_first"
            path={'M' + (+  indentation + legSize + trayBottomDistanceFromLeg + drawerBackWidth) * magnify + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight + dovetailTeethSideGapSR) * magnify) +
              ' l ' + (-drawerBackWidth) * magnify + ' ' + (-dovetailTeethHeightDiffR / 2) * magnify +
              ' v ' + (dovetailTeethHeightLR) * magnify +
              ' l ' + (drawerBackWidth) * magnify + ' ' + (-dovetailTeethHeightDiffR / 2) * magnify +
              ' v ' + (dovetailTeethDstSR) * magnify +
              ' l ' + (-drawerBackWidth) * magnify + ' ' + (-dovetailTeethHeightDiffR / 2) * magnify +
              ' v ' + (dovetailTeethHeightLR) * magnify +
              ' l ' + (drawerBackWidth) * magnify + ' ' + (-dovetailTeethHeightDiffR / 2) * magnify +
              ' v ' + (dovetailTeethDstSR) * magnify +
              ' l ' + (-drawerBackWidth) * magnify + ' ' + (-dovetailTeethHeightDiffR / 2) * magnify +
              ' v ' + (dovetailTeethHeightLR) * magnify +
              ' l ' + (drawerBackWidth) * magnify + ' ' + (-dovetailTeethHeightDiffR / 2) * magnify} />


          {/** Cuts */}

          <Cut ID="cut_vertical_first"
            path={'M' + (+ sectionLength * magnify) + ',' + (- 10) +
              ' v ' + ((thickness + drawerTotalHeight) * magnify + 10 * 2) + ''} />
          <Cut ID="cut_horizontal_first"
            path={'M' + (+ indentation * magnify - 10) + ',' + (+ sectionHeight * magnify) +
              ' h ' + (legSize * magnify + 10 * 2) + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasureL ID="panel_upper_joint_length_first"
            x={+ (indentation + legSize - panelUpperJointLength) * magnify}
            y={- measureOffset * 0.5}
            value={panelUpperJointLength}
            magnify={magnify} />
          <HorizontalMeasureL ID="panel_upper_joint_length_gap_first"
            x={+ (indentation + legSize - panelUpperJointLength - panelUpperJointGap) * magnify}
            y={- measureOffset * 0.5}
            value={panelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="dowel_dst_side_first"
            x={+ (indentation + dowelDstSide) * magnify}
            y={- measureOffset}
            value={legSize - dowelDstSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="dowel_diameter_first"
            x={+ (indentation + dowelDstSide) * magnify}
            y={- measureOffset * 0.5}
            value={dowelDiameter}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="side_panel_length_first"
            x={+ (indentation + legSize - panelLowerJointL - panelUpperJointGap) * magnify}
            y={- measureOffset * 1.5}
            displayValue={length - (indentation + legSize - panelLowerJointL) * 2}
            startValue={+ sectionLength * magnify} />
          <HorizontalMeasureLHalf ID="length_first"
            x={0}
            y={- measureOffset * 2}
            displayValue={length}
            startValue={+ sectionLength * magnify} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasureL ID="drawer_back_width_first"
            x={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={+ (drawerTotalHeight + thickness) * magnify + measureOffset * 0.5}
            value={drawerBackWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="concave_element_width_tri_first"
            x={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={+ (drawerTotalHeight + thickness) * magnify + measureOffset}
            value={concaveElementWidthTri}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="traybottom_length_first"
            x={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={+ (drawerTotalHeight + thickness) * magnify + measureOffset * 1.5}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + panelWidth - trayBottomIndentation + panelDistanceFromSide)}
            startValue={+ sectionLength * magnify} />
          <HorizontalMeasureLHalf ID="drawer_side_length_first"
            x={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={+ (drawerTotalHeight + thickness) * magnify + measureOffset * 2}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + panelWidth - drawerSideFrontPanelOverlap + panelDistanceFromSide)}
            startValue={+ sectionLength * magnify} />

          <HorizontalMeasureL ID="rear_panel_width_1_first"
            x={+ (indentation + panelDistanceFromSide) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="rear_panel_width_1_first"
            x={+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="rear_panel_side_support_overlap_and_gap_first"
            x={+ (indentation + panelDistanceFromSide + panelWidth - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) * magnify}
            y={+ sectionHeight * magnify + measureOffset}
            value={sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="rear_panel_distance_from_side_first"
            x={+ (indentation) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.5}
            value={panelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="rear_panel_width_first"
            x={+ (indentation + panelDistanceFromSide) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.5}
            value={panelWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="legsize_first"
            x={+ (indentation) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 2}
            value={legSize}
            magnify={magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasureL ID='dowel_plate_overlap_first'
            x={+ (indentation + legSize) * magnify + measureOffset * 0.5}
            y={+ (thickness - dowelPlateOverlap - dowelGap) * magnify}
            value={dowelPlateOverlap + dowelGap}
            magnify={magnify} />
          <VerticalMeasureL ID='dowel_and_gap_height_first'
            x={+ (indentation + legSize) * magnify + measureOffset}
            y={+ (thickness - dowelPlateOverlap - dowelGap) * magnify}
            value={dowelHeight + dowelGap}
            magnify={magnify} />

          <VerticalMeasureL ID="side_support_height_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_slide_height_2_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_slide_height_2_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasureL ID="traybottom_distance_from_bottom_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom) * magnify}
            value={trayBottomDistanceFromBottom}
            magnify={magnify} />
          <VerticalMeasureL ID="traybottom_height_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify}
            value={trayBottomHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_back_height_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight) * magnify}
            value={drawerBackHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_side_plate_gap_first"
            x={+ sectionLength * magnify + measureOffset * 0.5}
            y={+ (thickness) * magnify}
            value={drawerSideDistanceFromPlate}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_slide_height_2_first"
            x={+ sectionLength * magnify + measureOffset}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_side_height_first"
            x={+ sectionLength * magnify + measureOffset * 1.5}
            y={+ (thickness + drawerSideDistanceFromPlate) * magnify}
            value={drawerSideHeight}
            magnify={magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasureL ID="side_support_rear_panel_joint_height_first"
            x={+ indentation * magnify - measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportRearPanelOverlapHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="panel_lower_joint_height_first"
            x={+ indentation * magnify - measureOffset * 0.5}
            y={+ (thickness + panelUpperJointHeight) * magnify}
            value={panelLowerJointHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="panel_upper_joint_height_first"
            x={+ indentation * magnify - measureOffset * 0.5}
            y={+ (thickness) * magnify}
            value={panelUpperJointHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_total_height_first"
            x={+ indentation * magnify - measureOffset}
            y={+ (thickness) * magnify}
            value={drawerTotalHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="thickness_first"
            x={- measureOffset * 0.5}
            y={0}
            value={thickness}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="leg_height_first"
            x={- measureOffset * 0.5}
            y={+ thickness * magnify}
            displayValue={height - thickness}
            startValue={+ sectionHeight * magnify} />
          <VerticalMeasureLHalf ID="height_first"
            x={- measureOffset}
            y={0}
            displayValue={height}
            startValue={+ sectionHeight * magnify} />

          {/** Roundings */}
          <Rounding ID="plate_bottom_rounding_first"
            x={0}
            y={+ thickness * magnify}
            R={R2}
            deg={225} />
          <Rounding ID="rear_panel_rounding_first"
            x={+ (indentation + panelDistanceFromSide) * magnify}
            y={+ (thickness + panelHeight) * magnify}
            R={R2}
            deg={225} />
          <Rounding ID="side_support_rounding_first"
            x={+ (indentation + panelDistanceFromSide + panelWidth) * magnify}
            y={+ (thickness + panelHeight) * magnify}
            R={R2}
            deg={225} />
        </g>
      )

    }

    function SecondCircle() {
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));
      const length = +(useContext(LengthContext));
      const sectionLength = 250;
      const sectionHeight = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (- (measureOffset * 1.5 + measureTextOffset + frameSide)) +
          ' ' + (- (measureOffset * 1 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionLength * magnify + measureOffset * 1.5 + frameSide) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionHeight * magnify + (measureOffset * 2.5 + frameSide)) + ' ');
      },
        [height, thickness, length]);

      return (
        <g id="second">

          {/**Visible parts*/}

          <PathCutPlate orientation={1} ID="plate_part_1_second"
            path={'M' + (0) + ',' + (0) +
              ' h ' + (sectionLength / 5) * magnify +
              ' v' + (thickness) * magnify +
              ' h' + (-(sectionLength / 5)) * magnify + ''} />
          <PathCutPlate orientation={2} ID="plate_part_2_second"
            path={'M' + (+ sectionLength / 5 * magnify) + ',' + (0) +
              ' h ' + (sectionLength / 5 * 2) * magnify +
              ' v' + (thickness) * magnify +
              ' h' + (-(sectionLength / 5 * 2)) * magnify + ''} />
          <PathCutPlate orientation={1} ID="plate_part_3_second"
            path={'M' + (+ sectionLength / 5 * 3 * magnify) + ',' + (0) +
              ' h ' + (sectionLength / 5 * 2 - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (thickness - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(sectionLength / 5 * 2 - R2)) * magnify + ''} />
          <PathVisible ID="leg_visible_second"
            path={'M' + (+ (sectionLength - indentation) * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + (sectionHeight - thickness) * magnify +
              ' m ' + (-legSize * magnify) + ' 0 ' +
              ' v ' + (-(sectionHeight - thickness - drawerTotalHeight)) * magnify + ''} />
          <PathCut ID="drawer_front_second"
            path={'M' + (+ (sectionLength - (indentation + drawerFrontDistanceFromSide + drawerFrontWidth)) * magnify) + ',' + (+ (thickness + drawerFrontDistanceFromPlate) * magnify) +
              ' h ' + (drawerFrontWidth - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (drawerFrontHeight - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (-(drawerFrontWidth - R2)) * magnify +
              ' v ' + (-(drawerSlideHeight2 - drawerFrontDistanceFromBottom + trayBottomDistanceFromBottom) * magnify) +
              ' h ' + (trayBottomIndentation + trayBottomGap) * magnify +
              ' v ' + (-trayBottomHeight * magnify) +
              ' h ' + (-(trayBottomIndentation + trayBottomGap)) * magnify +
              ' v' + (-(drawerFrontHeight - (drawerSlideHeight2 - drawerFrontDistanceFromBottom + trayBottomDistanceFromBottom + trayBottomHeight))) * magnify + ''} />
          <PathCut ID="tray_bottom_second"
            path={'M' + (0) + ',' + (+ (thickness + drawerFrontDistanceFromPlate + drawerFrontHeight + drawerFrontDistanceFromBottom - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' h' + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify +
              ' v' + (trayBottomHeight) * magnify +
              ' h' + (-(sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation)) * magnify + ''} />
          <PathVisible ID="drawer_side_second"
            path={'M' + (0) + ',' + (+ (thickness + drawerSideDistanceFromPlate) * magnify) +
              ' h ' + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify +
              ' m 0 ' + (drawerFrontHeight - drawerSlideHeight2) * magnify +
              ' h ' + (-(sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify) + ''} />
          <PathVisible ID="side_support_second"
            path={'M' + (0) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify) +
              ' h ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify +
              ' v ' + (sideSupportHeight * magnify) +
              ' h ' + (-(sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify) + ''} />
          <PathCut ID="front_support_second"
            path={'M' + (+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify) + ',' + (+ (thickness + drawerTotalHeight - frontSupportHeight) * magnify) +
              ' h ' + (frontSupportLength - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (frontSupportHeight - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (-(frontSupportLength - R2)) * magnify + ''} />

          {/**Non-visible lines */}

          <PathDotted type={2} ID="leg_invisible_second" path={'M' + (+ (sectionLength - indentation - legSize) * magnify) + ',' + (+ thickness * magnify) +
            ' v ' + (drawerTotalHeight * magnify) + ''} />
          <PathDotted type={2} ID="drawer_slide_invisible"
            path={'M' + (0) + ',' + (+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify) +
              ' h ' + (sectionLength - indentation - legSize) * magnify + ''} />
          <RectangleElementDotted type={2} ID="leg_front_support_indentation_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            y={+ (thickness + drawerTotalHeight - frontSupportHeight / 3 * 2) * magnify}
            width={legFrontSupportJointLength * magnify}
            height={legFrontSupportJointHeight * magnify} />
          <PathDotted type={2} ID="side_support_front_support_indentation_second"
            path={'M' + (+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify) + ',' + (+ (thickness + drawerTotalHeight - frontSupportHeight / 3 * 2) * magnify) +
              ' h' + (sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify +
              ' v' + (sideSupportFrontSupportJointHeigth * magnify) +
              ' h' + (-(sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify) +
              ' m ' + (sideSupportFrontSupportJointWidth * magnify) + ' 0 ' +
              ' v' + (-sideSupportFrontSupportJointHeigth) * magnify + ''} />

          <PathDotted type={2} ID="front_dovetailTeeth_second"
            path={'M' + (+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify) + ',' + (+ (thickness + drawerFrontDistanceFromPlate + dovetailTeethSideGapS) * magnify) +
              ' l ' + (drawerFrontWidth / 3 * 2) * magnify + ' ' + (-dovetailTeethHeightDiff / 2) * magnify +
              ' v ' + (dovetailTeethHeightL) * magnify +
              ' l ' + (-drawerFrontWidth / 3 * 2) * magnify + ' ' + (-dovetailTeethHeightDiff / 2) * magnify +
              ' v ' + (dovetailTeethDstS) * magnify +
              ' l ' + (drawerFrontWidth / 3 * 2) * magnify + ' ' + (-dovetailTeethHeightDiff / 2) * magnify +
              ' v ' + (dovetailTeethHeightL) * magnify +
              ' l ' + (-drawerFrontWidth / 3 * 2) * magnify + ' ' + (-dovetailTeethHeightDiff / 2) * magnify +
              ' v ' + (dovetailTeethDstS) * magnify +
              ' l ' + (drawerFrontWidth / 3 * 2) * magnify + ' ' + (-dovetailTeethHeightDiff / 2) * magnify +
              ' v ' + (dovetailTeethHeightL) * magnify +
              ' l ' + (-drawerFrontWidth / 3 * 2) * magnify + ' ' + (-dovetailTeethHeightDiff / 2) * magnify} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_vertical_second"
            path={'M' + (0) + ',' + (- 20) +
              ' v' + ((indentation + drawerTotalHeight) * magnify + 10 * 2) + ''} />
          <PathDotted type={1} ID="cut_horizontal_second"
            path={'M' + (+ (sectionLength - indentation) * magnify + 10) + ',' + (+ sectionHeight * magnify) +
              ' h ' + (-(legSize * magnify + 10 * 2))} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasureL ID="leg_indentation_second"
            x={+ (sectionLength - indentation) * magnify}
            y={- measureOffset * 0.5}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="length_second"
            x={+ (sectionLength) * magnify}
            y={- measureOffset}
            displayValue={length}
            startValue={0} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasureL ID="side_support_front_support_indentation_width_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="leg_front_support_indentation_width_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={legFrontSupportJointLength}
            magnify={magnify} />
          <HorizontalMeasureL ID="leg_front_support_indentation_distance_from_side_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={legFrontSupportJointDstSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="front_support_distance_from_side_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={frontSupportDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="legsize_second"
            x={+ (sectionLength - indentation - legSize) * magnify}
            y={+ sectionHeight * magnify + measureOffset}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasureL ID="front_support_width_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.5}
            value={frontSupportWidth}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="traybottom_length_second"
            x={+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 2}
            displayValue={length - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation - indentation - legSize - trayBottomDistanceFromLeg}
            startValue={0} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasureL ID="drawer_front_plate_distance_second"
            x={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            y={+ thickness * magnify}
            value={drawerFrontDistanceFromPlate}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_front_height_second"
            x={+ (sectionLength - indentation) * magnify + measureOffset}
            y={+ (thickness + drawerFrontDistanceFromPlate) * magnify}
            value={drawerFrontHeight}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="leg_height_second"
            x={+ (sectionLength) * magnify + measureOffset}
            y={+ thickness * magnify}
            displayValue={height - thickness}
            startValue={+ sectionHeight * magnify} />
          <VerticalMeasureLHalf ID="height_second"
            x={+ (sectionLength) * magnify + measureOffset * 1.5}
            y={0}
            displayValue={height}
            startValue={+ sectionHeight * magnify} />

          {/** Vertical measures - left of drawing */}

          <VerticalMeasureL ID="support_height_1_second"
            x={- measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight / 3) * magnify}
            value={sideSupportHeight / 3}
            magnify={magnify} />
          <VerticalMeasureL ID="support_height_2_second"
            x={- measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight / 3 * 2) * magnify}
            value={sideSupportHeight / 3}
            magnify={magnify} />
          <VerticalMeasureL ID="slide_height_2_second"
            x={- measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasureL ID="side_support_total_height_second"
            x={- measureOffset}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="slide_height_1_second"
            x={- measureOffset}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify}
            value={drawerSlideHeight1}
            magnify={magnify} />
          <VerticalMeasureL ID="tray_bottom_distance_from_bottom_second"
            x={- measureOffset * 1.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom) * magnify}
            value={trayBottomDistanceFromBottom}
            magnify={magnify} />
          <VerticalMeasureL ID="tray_bottom_height_second"
            x={- measureOffset * 1.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify}
            value={trayBottomHeight}
            magnify={magnify} />

          {/** Roundings */}
          <Rounding ID="plate_rounding_second"
            x={+ sectionLength * magnify}
            y={0}
            R={R2}
            deg={45} />
          <Rounding ID="drawer_front_rounding_second"
            x={+ (sectionLength - indentation - drawerFrontDistanceFromSide) * magnify}
            y={+ (thickness + drawerFrontDistanceFromPlate + drawerFrontHeight) * magnify}
            R={R2}
            deg={135} />
          <Rounding ID="front_support_second"
            x={+ (sectionLength - indentation - frontSupportDistanceFromSide) * magnify}
            y={+ (thickness + drawerTotalHeight) * magnify}
            R={R2}
            deg={135} />
        </g>
      )
    }

    function ThirdCircle() {

      const width = +(useContext(WidthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));
      const sectionWidth = 200;
      const sectionHeight = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (- (measureOffset * 1 + measureTextOffset + frameSide)) +
          ' ' + (- (measureOffset * 1.5 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 2 + frameSide) +
          ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionHeight * magnify + (measureOffset * 3 + frameSide)) + ' ');
      },
        [width, height, thickness]);

      return (
        <g id="third">
          {/**Visible parts */}
          <PathCut ID="plate_part_cut_third"
            path={'M' + (0) + ',' + (0) +
              ' h' + ((sectionWidth - corner) * magnify) +
              ' a' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (corner * magnify) + ' ' + (corner * magnify) +
              ' v' + ((thickness - corner * 2) * magnify) +
              ' a' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (-corner * magnify) + ' ' + (corner * magnify) +
              ' h' + (-(sectionWidth - corner) * magnify)} />
          <PathVisible ID="inner_rightleg_front"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + (drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify +
              ' m 0 ' + (drawerSlideHeight2 + sideSupportHeight) * magnify +
              ' v ' + (sectionHeight - thickness - drawerTotalHeight) * magnify +
              ' m ' + (legSize * magnify) + ' 0 ' +
              ' v ' + (-(sectionHeight - thickness) * magnify) + ' '} />
          <PathVisible ID="drawer_board_front"
            path={'M' + (0) + ',' + (+ (thickness + drawerTotalHeight) * magnify) +
              ' h' + (sectionWidth - legSize - indentation) * magnify + ''} />
          <PathCut ID="right_side_panel_third"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide) * magnify) + ',' + (+ thickness * magnify) +
              ' v' + ((panelHeight - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(panelWidth / 3 - R2) * magnify) +
              ' v' + (-sideSupportHeight * magnify) +
              ' h' + (-(panelWidth * (2 / 3) * magnify)) +
              ' v' + (-(panelHeight - sideSupportHeight) * magnify) + ''} />
          <RectangleElementCut ID="right_side_support_third"
            x={(+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth / 3 - sideSupportWidth) * magnify)}
            y={(+ (thickness + drawerTotalHeight - sideSupportHeight) * magnify)}
            width={sideSupportWidth * magnify}
            height={sideSupportHeight * magnify} />
          <PathCut ID="drawer_slide_third"
            path={'M' + (+ (sectionWidth - indentation - legSize - drawerSlideWidth2) * magnify) + ',' + (+ (thickness + panelHeight - sideSupportHeight) * magnify) +
              ' h' + ((drawerSlideWidth1 + drawerSlideWidth2) * magnify) +
              ' v' + (-drawerSlideHeight1 * magnify) +
              ' h' + (-drawerSlideWidth1 * magnify) +
              ' v' + ((drawerSlideHeight1 - drawerSlideHeight2) * magnify) +
              ' h' + (-drawerSlideWidth2 * magnify) + ' Z'} />
          <PathCut ID="drawer_right_side_third"
            path={'M' + (+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify) + ',' + (+ (thickness + drawerSideDistanceFromPlate + drawerSideHeight) * magnify) +
              ' v ' + (-(trayBottomDistanceFromBottom) * magnify) +
              ' h' + ((trayBottomIndentation + trayBottomGap) * magnify) +
              ' v' + (-trayBottomHeight * magnify) +
              ' h' + (-(trayBottomIndentation + trayBottomGap) * magnify) +
              ' v' + (-(drawerSideHeight - R2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' h' + ((drawerSideWidth - R2 * 2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (drawerSideHeight - R2) * magnify} />
          <PathVisible ID="drawer_horizontal_upper_part_third"
            path={'M' + (0) + ',' + (+ (thickness + drawerHorizontalUpperPartHeight) * magnify) +
              ' h' + (sectionWidth - indentation - legSize - drawerSideDistanceFromPlate - drawerSideWidth) * magnify} />
          <PathCut ID="tray_bottom_third"
            path={'M' + (0) + ',' + (+ (thickness + drawerSideDistanceFromPlate + drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' h' + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) * magnify +
              ' v' + (trayBottomHeight) * magnify +
              ' h' + (-(sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation)) * magnify + ' '} />

          {/**Cuts */}

          <PathDotted type={1}
            ID="cut_vertical_third"
            path={'M' + (0) + ',' + (- 10) +
              ' v' + ((thickness + drawerTotalHeight) * magnify + 10 * 2)} />
          <PathDotted type={1}
            ID="cut_horizontal_third"
            path={'M' + (+ (sectionWidth - indentation) * magnify + 10) + ',' + (+ sectionHeight * magnify) +
              ' h' + (-(legSize * magnify + 10 * 2))} />

          {/**Non-visible lines */}

          <PathDotted type={2}
            ID="leg_and_rear_panel_nonvisible_third"
            path={'M' + (+ (sectionWidth - indentation - legSize - (sideSupportWidth - sideSupportLegOverlap)) * magnify) + ',' + (+ (thickness + panelHeight - 11) * magnify) +
              ' h' + (sideSupportWidth - sideSupportLegOverlap) * magnify +
              ' m 0 ' + (-(11 + drawerSlideHeight2) * magnify) +
              ' v' + ((drawerSlideHeight2 + sideSupportHeight) * magnify) + ' '} />
          <PathDotted type={2}
            ID="rear_panel_indentation_third"
            path={'M' + (+ (sectionWidth + -indentation - legSize + panelUpperJointLength + panelUpperJointGap) * magnify) + ',' + (+ thickness * magnify) +
              ' v ' + (panelUpperJointHeight * magnify) +
              ' m ' + (-panelUpperJointGap * magnify) + ' ' + (-panelUpperJointHeight * magnify) +
              ' v ' + (panelUpperJointHeight * magnify) +
              ' h ' + (panelLowerJointL + panelUpperJointGap - panelUpperJointLength) * magnify +
              ' v ' + (panelHeight - panelUpperJointHeight - sideSupportHeight) * magnify +
              ' m ' + (-panelUpperJointGap * magnify) + ' ' + (-(panelHeight - panelUpperJointHeight - sideSupportHeight)) * magnify +
              ' v ' + (panelHeight - panelUpperJointHeight - sideSupportHeight) * magnify +
              ' m ' + (-panelWidth / 3 * magnify) + ' ' + (-(panelHeight - panelUpperJointHeight - sideSupportHeight)) * magnify +
              ' v ' + (panelHeight - panelUpperJointHeight - sideSupportHeight) * magnify +
              ' m ' + (panelUpperJointGap * magnify) + ' ' + (-(panelHeight - panelUpperJointHeight - sideSupportHeight)) * magnify +
              ' v ' + (panelHeight - panelUpperJointHeight - sideSupportHeight) * magnify + ''} />
          <RectangleElementDotted type={2} ID="dowel_and_gap_first_third"
            x={+ (sectionWidth - indentation - dowelDstSide - dowelDiameter) * magnify}
            y={+ (thickness - dowelPlateOverlap - dowelGap) * magnify}
            width={dowelDiameter * magnify}
            height={(dowelHeight + dowelGap) * magnify} />
          <PathDotted type={2} ID="dowel_top_third"
            path={'M' + (+ (sectionWidth - indentation - dowelDstSide) * magnify) + ',' + (+ (thickness - dowelPlateOverlap) * magnify) +
              ' h ' + (-dowelDiameter * magnify)} />
          <PathDotted type={3} ID="dowel_centre_line_third"
            path={'M' + (+ (sectionWidth - indentation - dowelDstSide - dowelDiameter / 2) * magnify) + ',' + (+ (thickness - dowelPlateOverlap - dowelGap) * magnify - 20) +
              ' v ' + ((dowelHeight + dowelGap) * magnify + 20 * 2)} />


          {/** Horizontal measures - above drawing */}

          <HorizontalMeasureL ID="panel_upper_joint_length_third"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={- measureOffset * 0.5}
            value={panelUpperJointLength}
            magnify={magnify} />
          <HorizontalMeasureL ID="panel_upper_joint_gap_third"
            x={+ (sectionWidth - indentation - legSize + panelUpperJointLength) * magnify}
            y={- measureOffset * 0.5}
            value={panelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="dowel_diameter_first"
            x={+ (sectionWidth - indentation - dowelDstSide - dowelDiameter) * magnify}
            y={- measureOffset * 0.5}
            value={dowelDiameter}
            magnify={magnify} />
          <HorizontalMeasureL ID="indentation_third"
            x={+ (sectionWidth - indentation) * magnify}
            y={- measureOffset * 0.5}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasureL ID="panel_lower_joint_l_gap_third"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={- measureOffset}
            value={panelLowerJointL + panelUpperJointGap}
            magnify={magnify} />

          <HorizontalMeasureLHalf ID="width_third"
            x={+ sectionWidth * magnify}
            y={- measureOffset * 1.5}
            displayValue={width}
            startValue={0} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasureL ID="traybottom_indentation_third"
            x={+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify}
            y={+ (thickness + drawerTotalHeight) * magnify + measureOffset * 0.5}
            value={trayBottomIndentation + trayBottomGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_side_width_third"
            x={+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={drawerSideWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_side_dst_from_leg_third"
            x={+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={drawerSideDistanceFromLeg}
            magnify={magnify} />
          <HorizontalMeasureL ID="rigth_panel_third_width_1_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth / 3 * 2) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="rigth_panel_third_width_2_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth / 3) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_slide_width_2_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.0}
            value={drawerSlideWidth2}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_slide_width_1_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.0}
            value={drawerSlideWidth1}
            magnify={magnify} />
          <HorizontalMeasureL ID="panel_width_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.0}
            value={panelWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="panel_dst_from_side_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.0}
            value={panelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_support_overlap_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth + sideSupportPanelOverlap - sideSupportWidth) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 1.5}
            value={sideSupportWidth - sideSupportLegOverlap}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_support_width_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth + sideSupportPanelOverlap - sideSupportWidth) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 2.0}
            value={sideSupportWidth}
            magnify={magnify} />7
          <HorizontalMeasureL ID="legsize_third"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 2.5}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="traybottom_width_third"
            x={+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 2.5}
            displayValue={width - 2 * (indentation + legSize + drawerSideDistanceFromLeg + drawerSideWidth - trayBottomIndentation)}
            startValue={0} />
          <HorizontalMeasureLHalf ID="drawer_width_third"
            x={+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg) * magnify}
            y={+ sectionHeight * magnify + measureOffset * 3.0}
            displayValue={width - 2 * (indentation + legSize + drawerSideDistanceFromLeg)}
            startValue={0} />

          {/** Vertical Measures - left of drawing */}

          <VerticalMeasureL ID="side_support_half_third"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={+ (indentation + drawerTotalHeight - sideSupportHeight / 2) * magnify}
            value={sideSupportHeight / 2}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_slide_height_2_third"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={+ (indentation + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasureL ID="side_support_height_third"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 1}
            y={+ (indentation + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_slide_height_1_third"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 1}
            y={+ (indentation + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify}
            value={drawerSlideHeight1}
            magnify={magnify} />
          <VerticalMeasureL ID="thickness_third"
            x={+ (sectionWidth) * magnify + measureOffset * 0.5}
            y={0}
            value={thickness}
            magnify={magnify} />
          <VerticalMeasureL ID="rear_panel_upper_joint_height_third"
            x={+ (sectionWidth) * magnify + measureOffset * 0.5}
            y={+ (thickness) * magnify}
            value={panelUpperJointHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="rear_panel_lower_joint_height_third"
            x={+ (sectionWidth) * magnify + measureOffset * 0.5}
            y={+ (thickness + panelUpperJointHeight) * magnify}
            value={panelLowerJointHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="total_drawer_height_third"
            x={+ (sectionWidth) * magnify + measureOffset * 1}
            y={+ (thickness) * magnify}
            value={drawerTotalHeight}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="leg_height_third"
            x={+ (sectionWidth) * magnify + measureOffset * 1.5}
            y={+ thickness * magnify}
            displayValue={height - thickness}
            startValue={+ sectionHeight * magnify} />
          <VerticalMeasureLHalf ID="height_third"
            x={+ (sectionWidth) * magnify + measureOffset * 2}
            y={0}
            displayValue={height}
            startValue={+ sectionHeight * magnify} />


          {/** Vertical Measures - right of drawing */}

          <VerticalMeasureL ID="traybottom_dst_from_bottom_third"
            x={- measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom) * magnify}
            value={trayBottomDistanceFromBottom}
            magnify={magnify} />
          <VerticalMeasureL ID="traybottom_height_third"
            x={- measureOffset * 0.5}
            y={+ (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify}
            value={trayBottomHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_rear_height_third"
            x={- measureOffset * 0.5}
            y={+ (thickness + drawerSideDistanceFromPlate + drawerHorizontalUpperPartHeight) * magnify}
            value={drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight - drawerHorizontalUpperPartHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_side_height_third"
            x={- measureOffset}
            y={+ (thickness + drawerSideDistanceFromPlate) * magnify}
            value={drawerSideHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_plate_gap_third"
            x={- measureOffset}
            y={+ (thickness) * magnify}
            value={drawerSideDistanceFromPlate}
            magnify={magnify} />

          <VerticalMeasureL ID='dowel_plate_overlap_third'
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={+ (thickness - dowelPlateOverlap - dowelGap) * magnify}
            value={dowelPlateOverlap + dowelGap}
            magnify={magnify} />
          <VerticalMeasureL ID='dowel_and_gap_height_third'
            x={+ (sectionWidth - indentation) * magnify + measureOffset}
            y={+ (thickness - dowelPlateOverlap - dowelGap) * magnify}
            value={dowelHeight + dowelGap}
            magnify={magnify} />

          {/** Roundings */}

          <Rounding ID="plate_rounding_third"
            x={+ sectionWidth * magnify}
            y={0}
            R={R2}
            deg={45} />
          <Rounding ID="side_panel_rounding_third"
            x={+ (sectionWidth - indentation - panelDistanceFromSide) * magnify}
            y={+ (thickness + panelHeight) * magnify}
            R={R2}
            deg={135} />
          <Rounding ID="drawer_side_rounding_third"
            x={+ (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify}
            y={+ (thickness + drawerSideDistanceFromPlate) * magnify}
            R={R2}
            deg={315} />

        </g>
      )
    }

    function FourthCircle() {
      const realheight = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));
      const legSectionHeight = sideStretcherDistanceFromGround + sideStretcherHeight + 20;
      const stretcherSectionWidth = 100;
      const middleStretcherJointHeight = 30;
      const middleStretcherJointWidth = 11;
      const middleStretcherJointGap = 1;

      useEffect(() => {
        setViewBoxValue(' ' + (- frameSide) +
          ' ' + (- (measureOffset * 1 + measureTextOffset + frameSide)) +
          ' ' + ((frameSide) + (stretcherSectionWidth + legSize) * magnify + measureOffset * 3 + frameSide) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + legSectionHeight * magnify + measureOffset + frameSide) + ' ');
      },
        [realheight, thickness]);
      return (
        <g id="fourth">
          {/**Visible lines */}
          <PathVisible ID="middle_stretcher_fourth"
            path={'M' + (0) + ',' + (+ (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify) +
              ' h ' + (stretcherSectionWidth + legSize - sideStretcherWidth - sideStretcherDistanceFromSide) * magnify +
              ' v ' + (middleStretcherHeight * magnify) +
              ' h ' + (-(stretcherSectionWidth + legSize - sideStretcherWidth - sideStretcherDistanceFromSide) * magnify) + ' '} />
          <PathVisible ID="right_leg_fourth"
            path={'M' + (+ stretcherSectionWidth * magnify) + ',' + (0) +
              'v' + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify +
              ' m 0 ' + (middleStretcherHeight * magnify) +
              ' v ' + (sideStretcherDistanceFromGround + (sideStretcherHeight - middleStretcherHeight) / 2 - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (legSize - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v ' + (-(legSectionHeight - R2) * magnify)} />
          <RectangleElementCutRound ID="side_stretcher_cut_fourth"
            x={+ (stretcherSectionWidth + legSize - sideStretcherWidth - sideStretcherDistanceFromSide) * magnify}
            y={+ 20 * magnify}
            width={sideStretcherWidth * magnify}
            height={sideStretcherHeight * magnify}
            rx={R2 * magnify}
            ry={R2 * magnify} />

          <PathVisible ID="ground"
            path={'M' + (0) + ',' + (+ legSectionHeight * magnify) +
              ' h' + ((stretcherSectionWidth + legSize) * magnify + measureOffset * 3 + 20)} />

          {/**Non-visible lines */}
          <PathDotted type={2} ID="non_visible_leg_part_fourth"
            path={'M' + (+ stretcherSectionWidth * magnify) + ',' + (+ (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify) +
              ' v ' + (middleStretcherHeight * magnify)} />
          <PathDotted type={2} ID="middle_stretcher_indentation_fourth"
            path={'M' + (+ (stretcherSectionWidth + (legSize - sideStretcherWidth - sideStretcherDistanceFromSide)) * magnify) + ',' + (+ (20 + (sideStretcherHeight - middleStretcherJointHeight) / 2) * magnify) +
              ' h ' + (middleStretcherJointWidth + middleStretcherJointGap) * magnify +
              ' v ' + (middleStretcherJointHeight * magnify) +
              ' h ' + -(middleStretcherJointWidth + middleStretcherJointGap) * magnify +
              ' m ' + (middleStretcherJointWidth * magnify) + ' 0 ' +
              ' v ' + (-middleStretcherJointHeight * magnify) + ''} />
          <PathDotted type={2} ID="side_stretcher_indentation_fourth"
            path={'M' + (+ (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide - sideStretcherWidth / 3 * 2) * magnify) + ',' + (+ (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify) +
              ' h ' + (sideStretcherWidth / 3 * magnify) +
              ' v ' + (middleStretcherHeight * magnify) +
              ' h ' + (-sideStretcherWidth / 3 * magnify) +
              ' Z'} />
          {/**Cuts */}
          <PathDotted type={1} ID="leg_cut_fourth"
            path={'M' + (+ stretcherSectionWidth * magnify - 10) + ',' + (0) +
              'h' + (legSize * magnify + 10 * 2) + ''} />
          <PathDotted type={1} ID='stretcher_cut_fourth'
            path={'M' + (0) + ',' + (+ (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify - 10) +
              'v' + (middleStretcherHeight * magnify + 10 * 2) + ''} />

          {/**Horizantal measures */}

          <HorizontalMeasureL ID="side_stretcher_side_gap_fourth"
            x={+ (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide) * magnify}
            y={- measureOffset * 0.5}
            value={sideStretcherDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_stretcher_width_fourth"
            x={+ (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide - sideStretcherWidth) * magnify}
            y={- measureOffset * 0.5}
            value={sideStretcherWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="middle_stretcher_overlap_fourth"
            x={+ stretcherSectionWidth * magnify}
            y={+ legSectionHeight * magnify + measureOffset}
            value={legSize - sideStretcherDistanceFromSide - sideStretcherWidth + middleStretcherJointWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="middle_stretcher_overlap_fourth"
            x={+ (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide - sideStretcherWidth + middleStretcherJointWidth) * magnify}
            y={+ legSectionHeight * magnify + measureOffset}
            value={middleStretcherJointGap}
            magnify={magnify} />

          {/**Vertical measures */}
          <VerticalMeasureL ID="middle_stretcher_indentation_height_fourth"
            x={+ (stretcherSectionWidth + legSize) * magnify + measureOffset}
            y={+ (20 + (sideStretcherHeight - middleStretcherJointHeight) / 2) * magnify}
            value={middleStretcherJointHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="middle_stretcher_height_fourth"
            x={+ (stretcherSectionWidth + legSize) * magnify + measureOffset * 1.5}
            y={+ (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify}
            value={middleStretcherHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="height_difference_fourth"
            x={+ (stretcherSectionWidth + legSize) * magnify + measureOffset * 1.5}
            y={+ (20 + sideStretcherHeight - (sideStretcherHeight - middleStretcherHeight) / 2) * magnify}
            value={(sideStretcherHeight - middleStretcherHeight) / 2}
            magnify={magnify} />
          <VerticalMeasureL ID="side_stretcher_height_fourth"
            x={+ (stretcherSectionWidth + legSize) * magnify + measureOffset * 2}
            y={+ (20) * magnify}
            value={sideStretcherHeight}
            magnify={magnify} />
          <VerticalMeasureL ID="side_stretcher_ground_distance_fourth"
            x={+ (stretcherSectionWidth + legSize) * magnify + measureOffset * 2}
            y={+ (20 + sideStretcherHeight) * magnify}
            value={sideStretcherDistanceFromGround}
            magnify={magnify} />

          <VerticalMeasureLHalf ID="leg_height_fourth"
            x={((stretcherSectionWidth + legSize) * magnify + measureOffset * 2.5)}
            y={(legSectionHeight * magnify)}
            displayValue={realheight - thickness}
            startValue={0} />
          <VerticalMeasureLHalf ID="height_fourth"
            x={((stretcherSectionWidth + legSize) * magnify + measureOffset * 3)}
            y={legSectionHeight * magnify}
            displayValue={realheight}
            startValue={0} />

          {/** Roundings */}

          <Rounding ID="side_stretcher_rounding_fourth"
            x={+ (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide) * magnify}
            y={+ 20 * magnify}
            R={R2}
            deg={45} />
          <Rounding ID="leg_rounding_fourth"
            x={+ (stretcherSectionWidth + legSize) * magnify}
            y={+ legSectionHeight * magnify}
            R={R2}
            deg={135} />
        </g>
      )

    }

    function FifthCircle() {
      const width = +useContext(WidthContext);
      const length = +useContext(LengthContext);
      const sectionWidth = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (- (measureOffset * 2.5 + measureTextOffset + frameSide)) +
          ' ' + (- (measureOffset * 1 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 2.5 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 1 + frameSide) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionLength * magnify + (measureOffset * 3 + frameSide)) + ' ');
      },
        [width, length]);
      return (
        <g id="fifth">

          {/** Visible lines */}

          <PathCut ID="rear_side_panel_fifth"
            path={'M' + (0) + ',' + (+ (indentation + panelDistanceFromSide) * magnify) +
              ' h' + (sectionWidth - indentation - legSize) * magnify +
              ' v ' + (panelWidth / 3) * magnify +
              ' h' + (panelLowerJointL * magnify) +
              ' l ' + (-panelWidth / 3) * magnify + ' ' + (panelWidth / 3) * magnify +
              ' h ' + (-panelLowerJointS * magnify) +
              ' v ' + (panelWidth / 3) * magnify +
              ' h ' + (-(sectionWidth - indentation - legSize) * magnify) + ''} />
          <PathCut ID="right_side_panel_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide) * magnify) + ',' + (+ sectionLength * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize) * magnify) +
              ' h ' + (-panelWidth / 3) * magnify +
              ' v' + (-panelLowerJointL * magnify) +
              ' l ' + (-panelWidth / 3) * magnify + ' ' + (panelWidth / 3) * magnify +
              ' v ' + (panelLowerJointS * magnify) +
              ' h ' + (-panelWidth / 3) * magnify +
              ' v ' + ((sectionWidth - indentation - legSize) * magnify) + ''} />
          <PathCut ID="right_rear_leg_outside_fifth"
            path={'M' + (+ (sectionWidth - indentation - legSize / 2) * magnify) + ',' + (+ indentation * magnify) +
              ' h' + (legSize / 2 - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (legSize - R2 * 2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(panelDistanceFromSide + panelWidth / 3 - R2) * magnify) +
              ' v' + (-(legSize - (panelDistanceFromSide + panelWidth / 3)) * magnify) +
              ' h' + (-(legSize - (panelDistanceFromSide + panelWidth / 3)) * magnify) +
              ' v' + (-(panelDistanceFromSide + panelWidth / 3 - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (-R2 * magnify) + ' Z'} />
          <PathCut ID="right_rear_leg_outside_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth / 3 * 2) * magnify) + ',' + (+ (indentation + legSize) * magnify) +
              ' v' + (-(legSize - panelDistanceFromSide - panelWidth / 3 * 2) * magnify) +
              ' h' + (-(legSize - panelDistanceFromSide - panelWidth / 3 * 2) * magnify) +
              ' v' + (legSize - panelDistanceFromSide - panelWidth / 3 * 2 - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0' + (R2 * magnify) + ' ' + (R2 * magnify) + ' Z'} />
          <PathVisible ID="right_side_support_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth + sideSupportPanelOverlap - sideSupportWidth) * magnify) + ',' + (+ (indentation + panelDistanceFromSide + panelWidth) * magnify) +
              ' v ' + (legSize - panelDistanceFromSide - panelWidth + trayBottomDistanceFromLeg) * magnify} />
          <PathCut ID="drawer_back_side_fifth" path={'M' + (0) + ',' + (+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
            ' h' + (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - drawerSideWidth) * magnify +
            ' v' + (drawerBackWidth * magnify) +
            ' h' + (-(sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ''} />
          <RectangleElement ID="drawer_slide_lower_part_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify}
            y={+ (indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect) * magnify}
            width={drawerSlideWidth2 * magnify}
            height={concaveElementWidthRect * magnify} />
          <PathVisible ID="drawer_slide_higher_part_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap) * magnify) + ',' + (+ sectionLength * magnify) +
              ' v ' + (-(sectionLength - (indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect)) * magnify) +
              ' h ' + (-drawerSlideWidth1 * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect)) * magnify + ''} />
          <PathCut ID="drawer_right_side_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify) + ',' + (+ sectionLength * magnify) +
              ' v ' + (- (sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) +
              ' h ' + (-drawerSideWidth * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_fifth"
            path={'M' + (0) + ',' + (- 10) +
              ' v' + (sectionLength * magnify + 10) +
              ' h ' + (sectionWidth * magnify + 10) + ''} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="plate_fifth"
            path={'M' + (0) + ',' + (0) +
              ' h' + (sectionWidth - corner) * magnify +
              ' a ' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (corner * magnify) + ' ' + (corner * magnify) +
              ' v ' + (sectionLength - corner) * magnify + ''} />
          <PathDotted type={2} ID="side_support_side_panel_overlap_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth + sideSupportPanelOverlap) * magnify) + ',' + (+ sectionLength * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize) * magnify) +
              ' h ' + (-(panelWidth / 3 * 2) * magnify) + ' '} />
          <PathDotted type={2} ID="side_support_rear_panel_overlap_fifth"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify) +
              ' v ' + (panelWidth / 3) * magnify +
              ' m 0 ' + (panelWidth / 3 - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) * magnify +
              ' h ' + (-(sideSupportWidth - legSize + (panelWidth - sideSupportPanelOverlap) + panelDistanceFromSide) * magnify) +
              ' v ' + (sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap) * magnify +
              ' m 0 ' + (-sideSupportRearPanelOverlapLength * magnify) +
              ' h ' + ((sideSupportWidth - legSize + (panelWidth - sideSupportPanelOverlap) + panelDistanceFromSide) * magnify) + ''} />
          <PathDotted type={2} ID="side_support_drawer_overlap_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - sideSupportWidth + sideSupportPanelOverlap) * magnify) + ',' + (+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify + ''} />
          <PathDotted type={2} ID="drawer_slide_drawer_overlap_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify) + ',' + (+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
              ' v ' + ((sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify) + ''} />
          <PathDotted type={2} ID="drawer_rear_side_overlap"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ',' + (+ (indentation + legSize + trayBottomDistanceFromLeg + drawerBackWidth) * magnify) +
              ' h ' + (drawerSideWidth * magnify) + ''} />
          <PathDotted type={2} ID="traybottom_drawer_overlap_fifth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify) + ',' + (+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify +
              ' m ' + (trayBottomGap * magnify) + ' 0 ' +
              ' v ' + (-(sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify) + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasureL ID="rear_panel_lower_joint_l_fifth"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={(+ indentation * magnify - measureOffset * 0.5)}
            value={panelLowerJointL + panelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="legsize_horizontal_fifth"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={(+ indentation * magnify - measureOffset)}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasureL ID="indentation_horizontal_fifth"
            x={+ (sectionWidth - indentation) * magnify}
            y={(+ indentation * magnify - measureOffset)}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="plate_width_fifth"
            x={+ sectionWidth * magnify}
            y={- measureOffset}
            displayValue={width}
            startValue={0} />
          <HorizontalMeasureLHalf ID="rear_panel_width_fifth"
            x={+ (sectionWidth - indentation - legSize + panelLowerJointL) * magnify}
            y={- measureOffset * 0.5}
            displayValue={width - (indentation + legSize - panelLowerJointL) * 2}
            startValue={0} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasureL ID="traybottom_indentation_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify}
            y={+ (sectionLength) * magnify + measureOffset * 0.5}
            value={trayBottomIndentation}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_drawer_slide_gap_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify}
            y={+ (sectionLength) * magnify + measureOffset * 0.5}
            value={drawerSlideDrawerGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_slide_width_1_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1) * magnify}
            y={+ (sectionLength) * magnify + measureOffset * 0.5}
            value={drawerSlideWidth1}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_support_side_panel_overlap_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth) * magnify}
            y={+ (sectionLength) * magnify + measureOffset * 0.5}
            value={sideSupportPanelOverlap}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_side_width_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify}
            y={+ (sectionLength) * magnify + measureOffset}
            value={drawerSideWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_panel_width_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth) * magnify}
            y={+ (sectionLength) * magnify + measureOffset}
            value={panelWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="drawer_slide_width_2_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify}
            y={+ (sectionLength) * magnify + measureOffset * 1.5}
            value={drawerSlideWidth2}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_support_width_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - sideSupportWidth + sideSupportPanelOverlap) * magnify}
            y={+ (sectionLength) * magnify + measureOffset * 2}
            value={sideSupportWidth}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="traybottom_width_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify}
            y={+ sectionLength * magnify + measureOffset * 2.5}
            displayValue={width - 2 * (indentation + panelDistanceFromSide + panelWidth + drawerSlidePanelGap + drawerSlideWidth1 + drawerSlideDrawerGap + drawerSideWidth - trayBottomIndentation)}
            startValue={0} />
          <HorizontalMeasureLHalf ID="drawer_width_fifth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify}
            y={+ sectionLength * magnify + measureOffset * 3}
            displayValue={width - 2 * (indentation + panelDistanceFromSide + panelWidth + drawerSlidePanelGap + drawerSlideWidth1 + drawerSlideDrawerGap)}
            startValue={0} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasureL ID="side_support_legsize_overlap_fifth"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={+ (indentation + panelDistanceFromSide + panelWidth - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) * magnify}
            value={legSize - (panelWidth - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) - panelDistanceFromSide}
            magnify={magnify} />
          <VerticalMeasureL ID="legsize_vertical_fifth"
            x={+ (sectionWidth - indentation) * magnify + measureOffset}
            y={+ (indentation) * magnify}
            value={legSize}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="side_panel_length_fifth"
            x={+ (sectionWidth) * magnify + measureOffset * 0.5}
            y={+ (indentation + legSize - panelLowerJointL - panelUpperJointGap) * magnify}
            displayValue={length - (indentation + legSize - panelLowerJointL - panelUpperJointGap) * 2}
            startValue={+ sectionLength * magnify} />
          <VerticalMeasureLHalf ID="plate_length_fifth"
            x={+ (sectionWidth) * magnify + measureOffset}
            y={0}
            displayValue={length}
            startValue={+ sectionLength * magnify} />

          {/** Vertical measures - left of drawing */}
          <VerticalMeasureL ID="drawer_back_width_fifth"
            x={- measureOffset * 0.5}
            y={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            value={drawerBackWidth}
            magnify={magnify} />
          <VerticalMeasureL ID="side_support_rear_panel_overlap_fifth"
            x={- measureOffset * 0.5}
            y={+ (indentation + panelDistanceFromSide + panelWidth - (sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap)) * magnify}
            value={sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap}
            magnify={magnify} />
          <VerticalMeasureL ID="rear_panel_width_fifth"
            x={- measureOffset}
            y={+ (indentation + panelDistanceFromSide) * magnify}
            value={panelWidth}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="traybottom_length_fifth"
            x={- measureOffset * 1.5}
            y={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + panelWidth - trayBottomIndentation + panelDistanceFromSide)}
            startValue={+ sectionLength * magnify} />
          <VerticalMeasureLHalf ID="drawer_side_length_fifth"
            x={- measureOffset * 2}
            y={+ (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + panelWidth - drawerSideFrontPanelOverlap + panelDistanceFromSide)}
            startValue={+ sectionLength * magnify} />
          <VerticalMeasureLHalf ID="side_support_length_fifth"
            x={- measureOffset * 2.5}
            y={+ (indentation + panelDistanceFromSide + panelWidth - sideSupportRearPanelOverlapLength) * magnify}
            displayValue={length - (indentation * 2 + panelDistanceFromSide * 2 + panelWidth + frontSupportLength - sideSupportRearPanelOverlapLength - sideSupportFrontSupportJointWidth)}
            startValue={+ sectionLength * magnify} />

          {/** Roundings */}

          <Rounding ID="right_rear_leg_rounding_fifth"
            x={+ (sectionWidth - indentation) * magnify}
            y={+ indentation * magnify}
            R={R2}
            deg={45} />
        </g>
      )
    }

    function SixthCircle() {
      const width = +useContext(WidthContext);
      const length = +useContext(LengthContext);
      const sectionWidth = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (- (measureOffset * 3.5 + measureTextOffset + frameSide)) +
          ' ' + (- (frameSide)) +
          ' ' + ((measureOffset * 3.5 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 1 + frameSide) +
          ' ' + ((frameSide) + sectionLength * magnify + (measureOffset * 1.5 + frameSide)) + ' ');
      },
        [width, length]);
      return (
        <g id="sixth">

          {/** Visible lines */}

          <PathCut ID="drawer_front_sixth"
            path={'M' + (0) + ',' + (+ (sectionLength - indentation - drawerFrontDistanceFromSide) * magnify) +
              ' h' + (sectionWidth - legSize - indentation) * magnify +
              ' v' + (-drawerFrontWidth) * magnify +
              ' h' + (-(sectionWidth - legSize - indentation) * magnify)} />
          <PathCut ID="right_front_leg_sixth"
            path={'M' + (+ (sectionWidth - indentation - legSize / 2) * magnify) + ',' + (+ (sectionLength - indentation) * magnify) +
              ' h' + (-(legSize / 2 - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v' + (-(legSize - R2 * 2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' h' + (legSize - panelDistanceFromSide - panelWidth - R2 + panelWidth / 3) * magnify +
              ' v' + (panelLowerJointL + panelUpperJointGap) * magnify +
              ' h' + (panelWidth / 3) * magnify +
              ' v' + (-(panelLowerJointL + panelUpperJointGap) * magnify) +
              ' h' + (panelWidth / 3 + panelDistanceFromSide - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (legSize - R2 * 2) * magnify + ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (R2 * magnify) + ' Z'} />
          <PathCut ID="right_side_panel_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - legSize) * magnify +
              ' h ' + (-panelWidth / 3) * magnify +
              ' v ' + (panelLowerJointL * magnify) +
              ' h ' + (-panelWidth / 3 * magnify) +
              ' v ' + (-panelLowerJointL * magnify) +
              ' h ' + (-panelWidth / 3 * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize)) * magnify + ''} />
          <PathVisible ID="drawer_slide_higher_part_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - legSize) * magnify +
              ' h ' + (-drawerSlideWidth1) * magnify +
              ' v ' + (-(sectionLength - indentation - legSize)) * magnify + ''} />
          <PathCut ID="drawer_right_side_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - panelDistanceFromSide - panelWidth) * magnify +
              ' h ' + (-drawerSideWidth) * magnify +
              ' v ' + (-(sectionLength - indentation - panelDistanceFromSide - panelWidth)) * magnify + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_sixth"
            path={'M' + (+ sectionWidth * magnify) + ',' + (0) +
              ' h ' + (-sectionWidth * magnify) +
              ' v ' + (sectionLength * magnify) + ''} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="plate_sixth"
            path={'M' + (+ sectionWidth * magnify) + ',' + (0) +
              ' v ' + ((sectionLength - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(sectionWidth - R2) * magnify) + ''} />
          <PathDotted type={2} ID="side_support_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth + sideSupportPanelOverlap) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth + sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify +
              ' h ' + (-sideSupportWidth * magnify) +
              ' v ' + (-(sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth + sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify) +
              ' m 0 ' + ((sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth + sideSupportFrontSupportJointWidth) * magnify) +
              ' h ' + (sideSupportWidth * magnify)} />
          <PathDotted type={2} ID="drawer_slide_overlap_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify} />
          <PathDotted type={2} ID="traybottom_overlap_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify) + ',' + (0) +
              ' v ' + ((sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify) +
              ' h ' + (-(sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify) +
              ' m 0 ' + (trayBottomGap * magnify) +
              ' h ' + ((sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ''} />
          <PathDotted type={2} ID="traybottom_gap_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation + trayBottomGap) * magnify) + ',' + (0) +
              ' v ' + ((sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + drawerSideFrontPanelOverlap) * magnify)} />
          <PathDotted type={2} ID="front_support_sixth"
            path={'M' + (0) + ',' + (+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify) +
              ' h ' + (sectionLength - indentation - panelDistanceFromSide - panelWidth + sideSupportPanelOverlap) * magnify +
              ' v ' + (frontSupportWidth - legSize + frontSupportDistanceFromSide) * magnify + ''} />
          <PathDotted type={2} ID="drawer_side_drawer_front_overlap_sixth"
            path={'M' + (+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ',' + (+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify) +
              ' v ' + (drawerSideFrontPanelOverlap * magnify) +
              ' h ' + (drawerSideWidth * magnify) + ''} />
          <PathDotted type={2} ID="front_support_leg_joint_sixth"
            path={'M' + (+ (sectionWidth - indentation - legSize) * magnify) + ',' + (+ (sectionLength - indentation - panelDistanceFromSide - legFrontSupportJointDstSide) * magnify) +
              ' h ' + (legFrontSupportJointWidth + legFrontSupportJointGap) * magnify +
              ' v ' + (-(legFrontSupportJointLength) * magnify) +
              ' h ' + (-(legFrontSupportJointWidth + legFrontSupportJointGap) * magnify) +
              ' m ' + (legFrontSupportJointWidth) * magnify + ' 0 ' +
              ' v ' + (legFrontSupportJointLength * magnify) + ' '} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasureL ID="front_support_leg_joint_width_sixth"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="front_support_leg_joint_gap_width_sixth"
            x={+ (sectionWidth - indentation - legSize + legFrontSupportJointWidth) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="right_side_panel_third_width_1_sixth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth / 3 * 2) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="right_side_panel_third_width_2_sixth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth / 3) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="right_side_panel_width_sixth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide - panelWidth) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset}
            value={panelWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="right_side_panel_distance_from_side_sixth"
            x={+ (sectionWidth - indentation - panelDistanceFromSide) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset}
            value={panelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureLHalf ID="drawer_front_width_sixth"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 1.5}
            displayValue={width - (indentation + legSize) * 2}
            startValue={0} />
          <HorizontalMeasureL ID="legsize_horizontal_sixth"
            x={+ (sectionWidth - indentation - legSize) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasureL ID="indentation_horizontal_sixth"
            x={+ (sectionWidth - indentation) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={indentation}
            magnify={magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasureL ID="panel_lower_joint_l_sixth"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={panelLowerJointL}
            magnify={magnify} />
          <VerticalMeasureL ID="panel_lower_joint_l_sixth"
            x={+ (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={+ (sectionLength - indentation - legSize + panelLowerJointL) * magnify}
            value={panelUpperJointGap}
            magnify={magnify} />
          <VerticalMeasureL ID="legsize_vertical_sixth"
            x={+ (sectionWidth - indentation) * magnify + measureOffset}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={legSize}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="right_side_panel_length_sixth"
            x={+ (sectionWidth) * magnify + measureOffset * 0.5}
            y={+ (sectionLength - indentation - legSize + panelLowerJointL) * magnify}
            displayValue={length - (indentation + legSize - panelLowerJointL) * 2}
            startValue={0} />
          <VerticalMeasureLHalf ID="length_sixth"
            x={+ (sectionWidth) * magnify + measureOffset}
            y={+ (sectionLength) * magnify}
            displayValue={length}
            startValue={0} />

          {/** Vertical measures - left of drawing */}

          <VerticalMeasureL ID="traybottom_indentation_sixth"
            x={- measureOffset * 0.5}
            y={+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify}
            value={trayBottomIndentation + trayBottomGap}
            magnify={magnify} />
          <VerticalMeasureL ID="drawer_front_length_sixth"
            x={- measureOffset}
            y={+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify}
            value={drawerFrontWidth}
            magnify={magnify} />
          <VerticalMeasureL ID="leg_front_support_joint_length_sixth"
            x={- measureOffset * 1.5}
            y={+ (sectionLength - indentation - drawerFrontDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            value={legFrontSupportJointLength}
            magnify={magnify} />
          <VerticalMeasureL ID="leg_front_support_joint_dst_side_length_sixth"
            x={- measureOffset * 1.5}
            y={+ (sectionLength - indentation - drawerFrontDistanceFromSide - legFrontSupportJointDstSide) * magnify}
            value={legFrontSupportJointDstSide}
            magnify={magnify} />
          <VerticalMeasureL ID="front_support_length_sixth"
            x={- measureOffset * 2}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify}
            value={frontSupportLength}
            magnify={magnify} />
          <VerticalMeasureLHalf ID="traybottom_length_sixth"
            x={- measureOffset * 2.5}
            y={+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + panelWidth - trayBottomIndentation + panelDistanceFromSide)}
            startValue={0} />
          <VerticalMeasureLHalf ID="drawer_side_length_sixth"
            x={- measureOffset * 3}
            y={+ (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + drawerSideFrontPanelOverlap) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + panelWidth - drawerSideFrontPanelOverlap + panelDistanceFromSide)}
            startValue={0} />
          <VerticalMeasureLHalf ID="side_support_length_sixth"
            x={- measureOffset * 3.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify}
            displayValue={length - (indentation * 2 + panelDistanceFromSide * 2 + panelWidth + frontSupportLength - sideSupportRearPanelOverlapLength - sideSupportFrontSupportJointWidth)}
            startValue={0} />

          {/** Roundings */}

          <Rounding ID="right_front_leg_rounding_sixth"
            x={+ (sectionWidth - indentation) * magnify}
            y={+ (sectionLength - indentation - legSize) * magnify}
            R={R2}
            deg={45} />
        </g>
      )
    }

    function SeventhCircle() {
      const width = +useContext(WidthContext);
      const length = +useContext(LengthContext);
      const sectionWidth = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (- (measureOffset * 1.5 + measureTextOffset + frameSide)) +
          ' ' + (- (measureOffset * 1.5 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 1.5 + frameSide) +
          ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionLength * magnify + (measureOffset * 1 + frameSide)) + ' ');
      },
        [width, length]);
      return (
        <g id="seventh">

          {/** Visible lines */}

          <PathVisible ID="left_side_panel_seventh"
            path={'M' + (+ (indentation + panelDistanceFromSide) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - legSize) * magnify +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (panelUpperJointLength * magnify) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (-panelUpperJointLength * magnify) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize)) * magnify + ''} />
          <PathCut ID="left_leg_cut_seventh"
            path={'M' + (+ (indentation + panelDistanceFromSide) * magnify) + ',' + (+ (sectionWidth - indentation - legSize) * magnify) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + ((panelUpperJointLength + panelUpperJointGap) * magnify) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' v ' + (-(panelUpperJointLength + panelUpperJointGap) * magnify) +
              ' h ' + (panelWidth / 3 * magnify) +
              ' h ' + ((legSize - panelDistanceFromSide - panelWidth - R2) * magnify) +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (legSize - 2 * R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (-(legSize - 2 * R2)) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v ' + (-(legSize - 2 * R2)) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' Z '} />
          <PathVisible ID="front_support_seventh"
            path={'M' + (+ sectionWidth * magnify) + ',' + (+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify) +
              ' h ' + (-(sectionWidth - indentation - panelDistanceFromSide - panelWidth) * magnify) +
              ' v ' + (frontSupportLength - legSize + frontSupportDistanceFromSide) * magnify +
              ' h ' + (legSize - panelDistanceFromSide - panelWidth - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (legSize - frontSupportDistanceFromSide - R2) * magnify +
              ' h ' + ((sectionWidth - indentation - legSize) * magnify) + ''} />
          <PathVisible ID="side_support_visible_seventh"
            path={'M' + (+ (indentation + panelDistanceFromSide + panelWidth / 3 + sideSupportWidth) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify + ''} />
          <Dowel ID="dowel_seventh"
            cx={(indentation + panelDistanceFromSide + panelWidth / 2) * magnify}
            cy={(sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength - dowelIndentation - dowelDiameter / 2) * magnify}
            diameter={dowelDiameter}
            magnify={magnify} />

          {/** Cuts */}

          <PathDotted type={1} ID="horizontal_cut_seventh"
            path={'M' + (- 10) + ',' + (0) +
              ' h ' + ((indentation + panelDistanceFromSide + panelWidth / 3 + sideSupportWidth) * magnify + 2 * 10)} />
          <PathDotted type={1} ID="vertical_cut_seventh"
            path={'M' + (+ sectionWidth * magnify) + ',' + (+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify - 10) +
              ' v ' + ((frontSupportLength + frontSupportDistanceFromSide + indentation) * magnify + 2 * 10)} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="plate-non-visible_seventh"
            path={'M' + (0) + ',' + (0) +
              ' v' + (sectionLength - corner) * magnify +
              ' a ' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 0 ' + (corner * magnify) + ' ' + (corner * magnify) +
              ' h ' + (sectionWidth - corner) * magnify + ''} />
          <PathDotted type={2} ID="side-front_support_non_visible_1_seventh"
            path={'M' + (+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify) + ',' + (0) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify +
              ' h' + (panelWidth / 3 * 2) * magnify +
              ' m ' + (-panelWidth / 3 * 2) * magnify + ' 0 ' +
              ' v ' + (sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify +
              ' h ' + (sideSupportWidth) * magnify +
              ' v ' + (-(sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap)) * magnify +
              ' m 0 ' + ((sideSupportFrontSupportJointWidth) * magnify) +
              ' h ' + (-sideSupportWidth) * magnify} />
          <PathDotted type={2} ID="side-front_support_non_visible_1_seventh"
            path={'M' + (+ (indentation + panelDistanceFromSide + panelWidth / 3 * 2) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' h ' + (-panelWidth / 3) * magnify +
              ' v ' + (-(frontSupportLength - legSize + frontSupportDistanceFromSide) * magnify) +
              ' h ' + (panelWidth / 3 * 2) * magnify + ''} />
          <PathDotted type={2} ID="side_panel_indentation_and_gap_seventh"
            path={'M' + (+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify) + ',' + (+ (sectionLength - indentation - legSize) * magnify) +
              ' v ' + (panelLowerJointL + panelUpperJointGap) * magnify +
              ' h ' + (panelWidth / 3) * magnify +
              ' v ' + (-(panelLowerJointL + panelUpperJointGap)) * magnify +
              ' m 0 ' + (panelLowerJointL * magnify) +
              ' h ' + (-panelWidth / 3 * magnify)} />
          <PathDotted type={2} ID="front_support_indentation_seventh"
            path={'M' + (+ (indentation + legSize) * magnify) + ',' + (+ (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide) * magnify) +
              ' h ' + (-(legFrontSupportJointWidth + legFrontSupportJointGap) * magnify) +
              ' v ' + (-legFrontSupportJointLength * magnify) +
              ' h ' + ((legFrontSupportJointWidth + legFrontSupportJointGap) * magnify) +
              ' m ' + (-(legFrontSupportJointWidth) * magnify) + ' 0 ' +
              ' v ' + (legFrontSupportJointLength * magnify) + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasureL ID="side_panel_side_support_overlap_seventh"
            x={+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify}
            y={- measureOffset * 0.5}
            value={panelWidth / 3 * 2}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_panel_width_seventh"
            x={+ (indentation + panelDistanceFromSide) * magnify}
            y={- measureOffset}
            value={panelWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_support_width_seventh"
            x={+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify}
            y={- measureOffset * 1.5}
            value={sideSupportWidth}
            magnify={magnify} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasureL ID="panel_width_third_1_seventh"
            x={+ (indentation + panelDistanceFromSide) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="panel_width_third_2_seventh"
            x={+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={panelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="front_support_indentation_gap_seventh"
            x={+ (indentation + legSize - legFrontSupportJointWidth) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointGap}
            magnify={magnify} />
          <HorizontalMeasureL ID="front_support_indentation_width_seventh"
            x={+ (indentation + legSize - legFrontSupportJointWidth) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="side_panel_distance_from_side_seventh"
            x={+ (indentation) * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset}
            value={panelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureL ID="indentation_horizontal_seventh"
            x={0}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasureL ID="legsize_horizontal_seventh"
            x={+ indentation * magnify}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={legSize}
            magnify={magnify} />

          <HorizontalMeasureLHalf ID="front_support_width_seventh"
            x={+ (indentation + panelDistanceFromSide + panelWidth / 3) * magnify}
            y={(+ (sectionLength - indentation) * magnify + measureOffset * 2)}
            displayValue={width - (indentation + panelDistanceFromSide + panelWidth / 3) * 2}
            startValue={+ sectionWidth * magnify} />
          <HorizontalMeasureLHalf ID="width_seventh"
            x={0}
            y={+ (sectionLength - indentation) * magnify + measureOffset * 2.5}
            displayValue={width}
            startValue={+ sectionWidth * magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasureL ID="front_support_indentation_distance_from_side_seventh"
            x={+ sectionWidth * magnify + measureOffset * 0.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide) * magnify}
            value={legFrontSupportJointDstSide}
            magnify={magnify} />
          <VerticalMeasureL ID="front_support_indentation_length_seventh"
            x={+ sectionWidth * magnify + measureOffset * 0.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            value={legFrontSupportJointLength}
            magnify={magnify} />
          <VerticalMeasureL ID="legsize_without_side_indentation_seventh"
            x={+ sectionWidth * magnify + measureOffset * 1}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={legSize - frontSupportDistanceFromSide}
            magnify={magnify} />
          <VerticalMeasureL ID="front_support_length_seventh"
            x={+ sectionWidth * magnify + measureOffset * 1.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify}
            value={frontSupportLength}
            magnify={magnify} />
          <VerticalMeasureL ID="indentation_vertical_seventh"
            x={+ sectionWidth * magnify + measureOffset * 1.5}
            y={+ (sectionLength - indentation) * magnify}
            value={indentation}
            magnify={magnify} />

          {/** Vertical measures - left of drawing */}

          <VerticalMeasureL ID="side_support_front_support_overlap_length_seventh"
            x={+ (indentation + panelDistanceFromSide) * magnify - measureOffset * 0.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify}
            value={sideSupportFrontSupportJointWidth}
            magnify={magnify} />
          <VerticalMeasureL ID="dowel_diameter_seventh"
            x={+ (indentation + panelDistanceFromSide) * magnify - measureOffset * 0.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength-dowelIndentation-dowelDiameter) * magnify}
            value={dowelDiameter}
            magnify={magnify} />
          <VerticalMeasureL ID="side_support_front_support_overlap_gap_seventh"
            x={+ (indentation + panelDistanceFromSide) * magnify - measureOffset * 0.5}
            y={+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify}
            value={sideSupportFrontSupportJointGap}
            magnify={magnify} />
          <VerticalMeasureL ID="panel_lower_joint_l_seventh"
            x={+ indentation * magnify - measureOffset * 0.5}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={panelLowerJointL}
            magnify={magnify} />
          <VerticalMeasureL ID="panel_lower_joint_l_gap_seventh"
            x={+ indentation * magnify - measureOffset * 0.5}
            y={+ (sectionLength - indentation - legSize + panelLowerJointL) * magnify}
            value={panelUpperJointGap}
            magnify={magnify} />
          <VerticalMeasureL ID="legsize_vertical_seventh"
            x={+ indentation * magnify - measureOffset}
            y={+ (sectionLength - indentation - legSize) * magnify}
            value={legSize}
            magnify={magnify} />

          <VerticalMeasureLHalf ID="side_support_length_seventh"
            x={- measureOffset * 0.5}
            y={(+ (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify)}
            displayValue={length - (indentation * 2 + panelDistanceFromSide + frontSupportDistanceFromSide + frontSupportLength + panelWidth - sideSupportFrontSupportJointWidth - sideSupportRearPanelOverlapLength)}
            startValue={0} />

          <VerticalMeasureLHalf ID="side_panel_length_seventh"
            x={- measureOffset}
            y={(+ (sectionLength - indentation - legSize + panelLowerJointL) * magnify)}
            displayValue={length - (indentation + legSize - panelLowerJointL) * 2}
            startValue={0} />

          <VerticalMeasureLHalf ID="length_seventh"
            x={- measureOffset * 1.5}
            y={+ (sectionLength) * magnify}
            displayValue={length}
            startValue={0} />

          {/** Roundings */}

          <Rounding ID="left_front_leg_rounding_seventh"
            x={+ indentation * magnify}
            y={+ (sectionLength - indentation) * magnify}
            R={R2}
            deg={225} />
        </g>
      )
    }

    function EighthCircle() {
      const stretcherLength = 200;
      const middlestretcherindentationHeight = 30;
      setViewBoxValue(' ' + (- (frameSide)) +
        ' ' + (- (measureOffset * 1 + measureTextOffset + frameSide)) +
        ' ' + ((frameSide) + stretcherLength * magnify + measureOffset * 1.5 + frameSide) +
        ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + (sideStretcherHeight + sideStretcherDistanceFromGround) * magnify + (frameSide)) + ' ');
      return (
        <g id="eighth">
          {/**Visible lines */}
          <PathVisible ID="side_stretcher_eighth"
            path={'M' + (0) + ',' + (0) +
              ' h' + (stretcherLength * magnify) +
              ' m ' + (-stretcherLength * magnify) + ' ' + (sideStretcherHeight * magnify) +
              ' h ' + (stretcherLength * magnify) + ''} />
          <RectangleElementCutRound ID="rear_middle_stretcher_eighth"
            x={+ ((stretcherLength - middleStretcherDistance) / 2 - middleStretcherWidth) * magnify}
            y={+ (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            width={middleStretcherWidth * magnify}
            height={middleStretcherHeight * magnify}
            rx={R2 * magnify}
            ry={R2 * magnify} />
          <RectangleElementCutRound ID="front_middle_stretcher_eighth"
            x={+ ((stretcherLength + middleStretcherDistance) / 2) * magnify}
            y={+ (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            width={middleStretcherWidth * magnify}
            height={middleStretcherHeight * magnify}
            rx={R2 * magnify}
            ry={R2 * magnify} />
          <RectangleElementDotted type={2} ID="rear_middle_stretcher_indentation_eighth"
            x={+ ((stretcherLength - middleStretcherDistance) / 2 - middleStretcherWidth / 3 * 2) * magnify}
            y={+ (sideStretcherHeight - middlestretcherindentationHeight) / 2 * magnify}
            width={middleStretcherWidth / 3 * magnify}
            height={middlestretcherindentationHeight * magnify} />
          <RectangleElementDotted type={2} ID="front_middle_stretcher_indentation_eighth"
            x={+ ((stretcherLength + middleStretcherDistance) / 2 + middleStretcherWidth / 3) * magnify}
            y={+ (sideStretcherHeight - middlestretcherindentationHeight) / 2 * magnify}
            width={middleStretcherWidth / 3 * magnify}
            height={middlestretcherindentationHeight * magnify} />
          <PathVisible ID="ground_eighth"
            path={'M' + (- 20) + ',' + (+ (sideStretcherHeight + sideStretcherDistanceFromGround) * magnify) +
              ' h' + (stretcherLength * magnify + 40)} />

          {/**Cuts */}

          <PathDotted type={1} ID="left_cut_eighth"
            path={'M' + (0) + ',' + (- measureOffset) +
              ' v' + (sideStretcherHeight * magnify + measureOffset * 2)} />
          <PathDotted type={1} ID="right_cut_eighth"
            path={'M' + (+ stretcherLength * magnify) + ',' + (- measureOffset) +
              ' v' + (sideStretcherHeight * magnify + measureOffset * 2)} />

          {/**Horizontal measures */}

          <HorizontalMeasureL ID="middle_stretchers_distance_eighth"
            x={+ (stretcherLength - middleStretcherDistance) / 2 * magnify}
            y={- measureOffset}
            value={middleStretcherDistance}
            magnify={magnify} />
          <HorizontalMeasureL ID="middle_stretchers_width_eighth"
            x={+ (stretcherLength + middleStretcherDistance) / 2 * magnify}
            y={- measureOffset}
            value={middleStretcherWidth}
            magnify={magnify} />
          <HorizontalMeasureL ID="middle_stretchers_width_1_eighth"
            x={+ ((stretcherLength + middleStretcherDistance) / 2 + middleStretcherWidth / 3) * magnify}
            y={- measureOffset * 0.5}
            value={middleStretcherWidth / 3}
            magnify={magnify} />
          <HorizontalMeasureL ID="middle_stretchers_width_2_eighth"
            x={+ ((stretcherLength + middleStretcherDistance) / 2 + middleStretcherWidth / 3 * 2) * magnify}
            y={- measureOffset * 0.5}
            value={middleStretcherWidth / 3}
            magnify={magnify} />

          {/**Vertical measures */}

          <VerticalMeasureL ID="middle_stretcher_indentation_difference_eighth"
            x={+ stretcherLength * magnify + measureOffset * 0.5}
            y={+ (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            value={(middleStretcherHeight - middlestretcherindentationHeight) / 2}
            magnify={magnify} />
          <VerticalMeasureL ID="middle_stretcher_indentation_height_eighth"
            x={+ stretcherLength * magnify + measureOffset * 0.5}
            y={+ (sideStretcherHeight - middlestretcherindentationHeight) / 2 * magnify}
            value={(middlestretcherindentationHeight)}
            magnify={magnify} />
          <VerticalMeasureL ID="middle_stretcher_height_eighth"
            x={+ stretcherLength * magnify + measureOffset * 1}
            y={+ (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            value={(middleStretcherHeight)}
            magnify={magnify} />
          <VerticalMeasureL ID="middle_stretcher_distance_from_side_eighth"
            x={+ stretcherLength * magnify + measureOffset * 1}
            y={+ ((sideStretcherHeight - middleStretcherHeight) / 2 + middleStretcherHeight) * magnify}
            value={(sideStretcherHeight - middleStretcherHeight) / 2}
            magnify={magnify} />
          <VerticalMeasureL ID="side_stretcher_height__eighth"
            x={+ stretcherLength * magnify + measureOffset * 1.5}
            y={0}
            value={sideStretcherHeight}
            magnify={magnify} />

          <VerticalMeasureL ID="side_stretcher_distance_from_ground_eighth"
            x={+ stretcherLength * magnify + measureOffset * 1.5}
            y={+ sideStretcherHeight * magnify}
            value={sideStretcherDistanceFromGround}
            magnify={magnify} />

          {/** Roundings */}

          <Rounding ID="middle_stretcher_rounding_eighth"
            x={+ (stretcherLength / 2 - middleStretcherDistance / 2) * magnify}
            y={+ (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            R={R2}
            deg={45} />

        </g>
      )
    }

    var comp = () => {
      switch (id) {
        case "front":
          setSize(4);
          return <FrontView />
        case "side":
          setSize(4);
          return <SideView />
        case "top":
          setSize(4);
          return <TopView />
        case "first_circle":
          setSize(12);
          return <FirstCircle />
        case "second_circle":
          setSize(12);
          return <SecondCircle />
        case "third_circle":
          setSize(12);
          return <ThirdCircle />
        case "fourth_circle":
          setSize(12);
          return <FourthCircle />
        case "fifth_circle":
          setSize(12);
          return <FifthCircle />
        case "sixth_circle":
          setSize(12);
          return <SixthCircle />
        case "seventh_circle":
          setSize(12);
          return <SeventhCircle />
        case "eighth_circle":
          setSize(12);
          return <EighthCircle />
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
    } else {
      return <Circles circleID={type} />
    }
  }

  return (
    <>
      {drawings()}
    </>
  )
}

