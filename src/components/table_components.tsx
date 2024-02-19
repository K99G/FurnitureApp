import { useState, useContext, useEffect, createContext } from "react";
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonToggle } from "@ionic/react";
import { RectangleElement, RectangleElementDotted, RectangleElementCut, RectangleElementCutRound, RectangleElementRound, PathCut, PathDotted, PathNarrowLine, PathVisible, Polyline, PolylineDotted, CircleMeasure, CircleView, Cut, TextMeasure, TextString, Arrow, CutPattern, VerticalMeasure, VerticalMeasureHalf, HorizontalMeasure, HorizontalMeasureHalf } from './drawingelements'
import { downloadDrawing } from "./converter";

var corner = 2;
var startingPoint = 200;
var magnify = 4;
var indentation = 35;
var R2 = 2;
var legSize = 50;

var arrowOffset = 50;
var textOffset = 30;
var measureOffset = 50;
var measureTextOffset = 10;


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

var drawerTotalHeight = 120;
var drawerBoardHeight = 21;

var PanelHeight = 120;
var PanelDistanceFromSide = 5;
var PanelWidth = 21;
var PanelUpperJointLength = 10;
var PanelUpperJointHeight = 20;
var PanelUpperJointGap = 1;
var PanelLowerJointL = 37;
var PanelLowerJointS = PanelLowerJointL - PanelWidth / 3;
var PanelLowerJointHeight = drawerTotalHeight - PanelUpperJointHeight - sideSupportHeight;

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
var drawerSideHeight = drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - drawerSideDistanceFromPlate;
var drawerSideWidth = 21;
var drawerSideDistanceFromLeg = 1;
var drawerSideFrontPanelOverlap = 14;

var trayBottomHeight = 5;
var trayBottomIndentation = 6;
var trayBottomDistanceFromBottom = 17;
var trayBottomDistanceFromLeg = 73;
var trayBottomGap = 1;

var drawerHorizontalUpperPartHeight = 13;

var drawerFrontHeight = 97;
var drawerFrontWidth = 21;
var drawerFrontDistanceFromPlate = 1;
var drawerFrontDistanceFromBottom = 1;
var drawerFrontDistanceFromSide = 5;

var concaveElementHeight = 18;
var concaveElementWidthRect = 7;
var concaveElementWidthTri = 20;

var drawerBackHeight = 60;
var drawerBackWidth = 15;

const legFrontSupportJointWidth = 24;
const legFrontSupportJointLength = 30;
const legFrontSupportJointHeight = frontSupportHeight / 3;
const legFrontSupportJointDstSide = 5;
const legFrontSupportJointGap = 1;

const sideSupportFrontSupportJointWidth = 9;
const sideSupportFrontSupportJointHeigth = frontSupportHeight / 3;
const sideSupportFrontSupportJointGap = 1;

const frameSide = 10;


function downloadDrawingCharacter() {
  downloadDrawing(document.getElementById("front"));
  downloadDrawing(document.getElementById("side"));
  downloadDrawing(document.getElementById("top"));
}


const HeightContext = createContext(0);
const WidthContext = createContext(0);
const LengthContext = createContext(0);
const ThicknessContext = createContext(0);

export function TableView() {
  const [heightValue, setHeightValue] = useState(0);
  const [widthValue, setWidthValue] = useState(0);
  const [lengthValue, setLengthValue] = useState(0);
  const [thicknessValue, setThicknessValue] = useState(0);

  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    if ((+(heightValue) < 100) || (+(widthValue) < 100) || (+(lengthValue) < 100) || (+(thicknessValue) < 10))
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
                <TableDrawings></TableDrawings>
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

    function FrontView() {
      const width = +(useContext(WidthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));

      useEffect(() => {
        setViewBoxValue(' ' + (startingPoint - (frameSide)) +
          ' ' + (startingPoint - (arrowOffset + frameSide)) +
          ' ' + ((frameSide) + width + arrowOffset + frameSide) +
          ' ' + ((arrowOffset + frameSide) + height + (arrowOffset + measureOffset * 2 + frameSide)) + ' ');
      },
        [width, height, thickness]);
      return (
        <g id="front">

          {/**Leftside */}

          <PathVisible ID="plate_part_visible_front"
            path={'M' + (startingPoint + width / 2) + ',' + startingPoint +
              ' h' + (-(width / 2 - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (-corner) + ' ' + (corner) +
              ' v' + (thickness - corner * 2) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (corner) + ' ' + (corner) +
              ' h' + (width / 2 - corner) + ''} />
          <RectangleElement ID="left_leg_front"
            x={(startingPoint + indentation)}
            y={(startingPoint + thickness)}
            width={legSize}
            height={(height - thickness)} />
          <RectangleElement ID="middle_stretcher_front"
            x={(startingPoint + indentation + legSize)}
            y={(startingPoint + height - middleStretcherDistanceFromGround - middleStretcherHeight)}
            width={(width - (indentation + legSize) * 2 + (legSize - sideStretcherWidth - sideStretcherDistanceFromSide))}
            height={middleStretcherHeight} />
          <PathVisible ID="drawer_part_front"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerTotalHeight) +
              ' h' + (-(width / 2 - indentation - legSize)) +
              ' v' + (-drawerBoardHeight) +
              ' h' + (width / 2 - legSize - indentation) + ''} />

          {/**Rightside */}

          <PathCut ID="plate_part_cut_front"
            path={'M' + (startingPoint + width / 2) + ',' + startingPoint +
              ' h' + ((width / 2 - corner)) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (corner) + ' ' + (corner) +
              ' v' + (thickness - corner * 2) +
              ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (-corner) + ' ' + (corner) +
              ' h' + (-(width / 2 - corner))} />
          <RectangleElementCutRound ID="side_stretcher_front"
            x={(startingPoint + width - indentation - sideStretcherDistanceFromSide - sideStretcherWidth)}
            y={(startingPoint + height - sideStretcherDistanceFromGround - sideStretcherHeight)}
            width={sideStretcherWidth}
            height={sideStretcherHeight} rx={R2} ry={R2} />
          <PathVisible ID="inner_rightleg_front"
            path={'M' + (startingPoint + width - indentation - legSize) + ',' + (startingPoint + thickness) +
              ' v' + (drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) +
              ' m 0 ' + (drawerSlideHeight2 + sideSupportHeight) +
              ' v' + (height - thickness - drawerTotalHeight - middleStretcherDistanceFromGround - middleStretcherHeight) +
              ' m 0 ' + (middleStretcherHeight) +
              ' v' + (middleStretcherDistanceFromGround) +
              ' h' + (legSize) +
              ' v' + (-(height - thickness)) + ' '} />
          <PathVisible ID="drawer_board_front" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerTotalHeight) +
            ' h' + (width / 2 - legSize - indentation) + ''} />
          <PathCut ID="right_side_panel_front"
            path={'M' + (startingPoint + width - indentation - PanelDistanceFromSide) + ',' + (startingPoint + thickness) +
              ' v' + (PanelHeight - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h' + (-(PanelWidth / 3 - R2)) +
              ' v' + (-sideSupportHeight) +
              ' h' + (-(PanelWidth * (2 / 3))) +
              ' v' + (-(PanelHeight - sideSupportHeight)) + ''} />
          <RectangleElementCut ID="right_side_support_front"
            x={(startingPoint + width - indentation - PanelDistanceFromSide - PanelWidth / 3 - sideSupportWidth)}
            y={(startingPoint + thickness + drawerTotalHeight - sideSupportHeight)}
            width={sideSupportWidth}
            height={sideSupportHeight} />
          <PathCut ID="drawer_slide_front"
            path={'M' + (startingPoint + width - indentation - legSize - drawerSlideWidth2) + ',' + (startingPoint + thickness + PanelHeight - sideSupportHeight) +
              ' h' + (drawerSlideWidth1 + drawerSlideWidth2) +
              ' v' + (-drawerSlideHeight1) +
              ' h' + (-drawerSlideWidth1) +
              ' v' + (drawerSlideHeight1 - drawerSlideHeight2) +
              ' h' + (-drawerSlideWidth2) + ' Z'} />
          <PathCut ID="drawer_right_side_front"
            path={'M' + (startingPoint + (width - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth)) + ',' + (startingPoint + (thickness + drawerSideDistanceFromPlate + drawerSideHeight)) +
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
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerHorizontalUpperPartHeight) +
              ' h' + (width / 2 - indentation - legSize - drawerSideDistanceFromPlate - drawerSideWidth)} />
          <PathCut ID="tray_bottom_front"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerSideDistanceFromPlate + drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight) +
              ' h' + (width / 2 - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) +
              ' v' + (trayBottomHeight) +
              ' h' + (-(width / 2 - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation)) + ' '} />

          <CircleView ID="circle_3"
            cx={(startingPoint + width - indentation - legSize / 2)}
            cy={(startingPoint + thickness + drawerTotalHeight / 2)}
            onClick={() => setType("third")} />

          <CircleView ID="circle_4"
            cx={startingPoint + width - indentation - legSize / 2}
            cy={startingPoint + height - sideStretcherDistanceFromGround - sideStretcherHeight / 2}
            onClick={() => setType("fourth")} />


          {/**C cut */}

          <PathDotted type={3} ID="cut_C_line_front"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + height + arrowOffset) +
              ' v' + (-(height + arrowOffset * 2)) + ' '} />
          <Arrow direction="right" ID="cut_C_arrow_top_front"
            x={(startingPoint + width / 2)}
            y={(startingPoint - arrowOffset)} />
          <Arrow direction="right" ID="cut_C_arrow_bottom_front"
            x={(startingPoint + width / 2)}
            y={(startingPoint + height + arrowOffset)} />
          <TextString ID="cut_C_text_top_front"
            x={(startingPoint + width / 2 + textOffset)}
            y={startingPoint - arrowOffset}
            value="C" />
          <TextString ID="cut_C_text_bottom_front"
            x={(startingPoint + width / 2 + textOffset)}
            y={startingPoint + height + arrowOffset}
            value="C" />

          {/**B cut */}

          <PathDotted type={3} ID="cut_B_line_front"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerTotalHeight * 2 / 5) +
              ' h' + (width / 2 + arrowOffset) + ' '} />
          <Arrow direction="down" ID="cut_B_arrow_front"
            x={(startingPoint + width + arrowOffset)}
            y={(startingPoint + thickness + drawerTotalHeight * 2 / 5)} />
          <TextString ID="cut_B_text_front"
            x={(startingPoint + width + arrowOffset)}
            y={startingPoint + thickness + drawerTotalHeight * 2 / 5 + textOffset}
            value="B" />

          {/**Measurements */}

          <HorizontalMeasure ID="width_front"
            x={startingPoint}
            y={startingPoint + height + arrowOffset + measureOffset * 2}
            value={width}
            magnify={1} />
          <HorizontalMeasure ID="leg_distance_front"
            x={startingPoint + indentation + legSize}
            y={startingPoint + height + arrowOffset + measureOffset}
            value={width - (indentation + legSize) * 2}
            magnify={1} />
          <VerticalMeasure ID="middle_stretcher_height_front"
            x={startingPoint + width / 3 * 2}
            y={startingPoint + height - middleStretcherDistanceFromGround - middleStretcherHeight}
            value={middleStretcherHeight}
            magnify={1} />
        </g>
      )
    }

    function SideView() {
      const length = +(useContext(LengthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));

      useEffect(() => {
        setViewBoxValue(' ' + (startingPoint - (frameSide * 2)) +
          ' ' + (startingPoint - (frameSide)) +
          ' ' + ((frameSide * 2) + length + measureOffset * 3 + frameSide) +
          ' ' + ((frameSide) + height + (measureOffset * 2 + frameSide)) + ' ');
      },
        [length, height, thickness]);
      return (
        <g id="side">

          {/**Leg and Plate */}

          <RectangleElementCutRound ID="plate_part_cut_side"
            x={(startingPoint)}
            y={startingPoint}
            width={length}
            height={thickness}
            rx={corner}
            ry={corner} />

          <PathVisible ID="left_rear_leg_side"
            path={'M' + (startingPoint + indentation) + ',' + (startingPoint + thickness) +
              ' v' + (height - thickness) +
              ' h' + (legSize) +
              ' v' + (-(height - thickness - drawerTotalHeight)) +
              ' m 0 ' + (-(sideSupportHeight)) +
              ' v' + (-(drawerTotalHeight - sideSupportHeight)) + ''} />
          <RectangleElement ID="side_crosssleg_side"
            x={startingPoint + indentation + legSize}
            y={startingPoint + height - sideStretcherDistanceFromGround - sideStretcherHeight}
            width={length - 2 * (indentation + legSize)}
            height={sideStretcherHeight} />
          <RectangleElementCutRound ID="middle_stretcher_rear_side"
            x={startingPoint + length / 2 - middleStretcherDistance / 2 - middleStretcherWidth}
            y={startingPoint + height - middleStretcherDistanceFromGround - middleStretcherHeight}
            width={middleStretcherWidth}
            height={middleStretcherHeight}
            rx={R2}
            ry={R2} />
          <RectangleElementCutRound ID="middle_stretcher_front_side"
            x={startingPoint + length / 2 + middleStretcherDistance / 2}
            y={startingPoint + height - middleStretcherDistanceFromGround - middleStretcherHeight}
            width={middleStretcherWidth}
            height={middleStretcherHeight}
            rx={R2}
            ry={R2} />
          <PathVisible ID="left_front_leg_side"
            path={'M' + (startingPoint + length - indentation) + ',' + (startingPoint + thickness) +
              ' v' + (height - thickness) +
              ' h' + (-legSize) +
              ' v' + (-(height - thickness - drawerTotalHeight)) + ''} />

          {/**Drawer */}

          <PathCut ID="rear_panel_side"
            path={'M' + (startingPoint + indentation + PanelDistanceFromSide) + ',' + (startingPoint + thickness) +
              ' v' + (PanelHeight - R2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h' + (PanelWidth - R2 * 2) +
              ' a ' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v' + (-(PanelHeight - R2)) + ''} />
          <PathCut ID="drawer_front_side"
            path={'M' + (startingPoint + length - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) + ',' + (startingPoint + thickness + drawerFrontDistanceFromPlate) +
              ' h' + (drawerFrontWidth - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v' + (drawerFrontHeight - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h' + (-(drawerFrontWidth - R2)) +
              ' v ' + (-trayBottomDistanceFromBottom) +
              ' h' + (trayBottomIndentation)} />
          {/** not rectangle */}<RectangleElement ID="left_side_support_side" x={startingPoint + indentation + PanelDistanceFromSide + PanelWidth} y={startingPoint + thickness + PanelHeight - drawerBoardHeight} width={length - indentation * 2 - PanelDistanceFromSide - PanelWidth - frontSupportDistanceFromSide - frontSupportWidth} height={drawerBoardHeight} />
          <PathCut ID="front_support_side"
            path={'M' + (startingPoint + length - indentation - frontSupportDistanceFromSide - frontSupportWidth) + ',' + (startingPoint + thickness + drawerFrontHeight + drawerFrontDistanceFromBottom + drawerFrontDistanceFromPlate) +
              ' h' + (sideSupportWidth - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (R2) + ' ' + (R2) +
              ' v' + (sideSupportHeight - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1 ' + (-R2) + ' ' + (R2) +
              ' h' + (-(sideSupportWidth - R2)) + ' Z'} />
          <RectangleElementCut ID="traybottom_side"
            x={startingPoint + indentation + legSize + trayBottomDistanceFromLeg}
            y={startingPoint + thickness + drawerTotalHeight - drawerBoardHeight - trayBottomDistanceFromBottom - drawerSlideHeight2 - trayBottomHeight}
            width={(length - legSize - indentation * 2 - trayBottomDistanceFromLeg - drawerFrontDistanceFromSide - drawerFrontWidth / 3 * 2)}
            height={trayBottomHeight} />
          <RectangleElementCut ID="drawer_back_side"
            x={startingPoint + indentation + legSize + trayBottomDistanceFromLeg}
            y={startingPoint + thickness + drawerTotalHeight - drawerBoardHeight - trayBottomDistanceFromBottom - drawerSlideHeight2 - trayBottomHeight - drawerBackHeight}
            width={drawerBackWidth}
            height={drawerBackHeight} />
          <RectangleElement ID="drawer_slide_side"
            x={startingPoint + indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect}
            y={startingPoint + thickness + drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2}
            width={length - indentation * 2 - legSize - trayBottomDistanceFromLeg + concaveElementWidthRect - drawerFrontDistanceFromSide - drawerFrontWidth}
            height={drawerSlideHeight2} />
          <PathVisible ID="concave_element_side"
            path={'M' + (startingPoint + indentation + legSize + trayBottomDistanceFromLeg + concaveElementWidthTri) + ',' + (startingPoint + thickness + drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2) +
              ' h' + (-(concaveElementWidthRect + concaveElementWidthTri)) +
              ' v' + (-(drawerSlideHeight1 - drawerSlideHeight2)) +
              ' h' + (concaveElementWidthRect) +
              ' v' + (concaveElementHeight - 10.19) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) + ' Z'} />
          <PathVisible ID="drawer_other_side_side"
            path={'M' + (startingPoint + length - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) + ',' + (startingPoint + thickness + drawerFrontDistanceFromPlate) +
              ' h' + (-(length - indentation * 2 - legSize - drawerFrontDistanceFromSide - drawerFrontWidth - trayBottomDistanceFromLeg - concaveElementWidthTri)) +
              ' l' + (-(concaveElementWidthTri - R2)) + ',' + (concaveElementWidthTri * 0.24932 - R2) +
              'a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v' + (drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight) + ''} />

          <CircleView ID="circle_1"
            cx={startingPoint + indentation + legSize / 2}
            cy={startingPoint + thickness + drawerTotalHeight / 2}
            onClick={() => setType("first")} />
          <CircleView ID="circle_2"
            cx={startingPoint + length - indentation - legSize / 2}
            cy={startingPoint + thickness + drawerTotalHeight / 2}
            onClick={() => setType("second")} />
          <CircleView ID="circle_8"
            cx={startingPoint + length / 2}
            cy={startingPoint + height - sideStretcherDistanceFromGround - sideStretcherHeight / 2}
            onClick={() => setType("eighth")} />

          {/**Horizontal measures*/}

          <HorizontalMeasure ID="rear_legsize_side"
            x={startingPoint + indentation}
            y={startingPoint + height + measureOffset}
            value={legSize}
            magnify={1} />

          <HorizontalMeasure ID="front_legsize_side"
            x={startingPoint + length - indentation - legSize}
            y={startingPoint + height + measureOffset}
            value={legSize}
            magnify={1} />

          <HorizontalMeasure ID="middle_stretcher_distance_side"
            x={(startingPoint + length / 2 - middleStretcherDistance / 2)}
            y={startingPoint + height + measureOffset}
            value={middleStretcherDistance}
            magnify={1} />

          <HorizontalMeasure ID="leg_distance_side"
            x={startingPoint + indentation + legSize}
            y={startingPoint + height + measureOffset * 2}
            value={length - 2 * (indentation + legSize)}
            magnify={1} />

          <HorizontalMeasure ID="length_measure_side"
            x={startingPoint}
            y={startingPoint + height + measureOffset * 3}
            value={length}
            magnify={1} />

          {/**Vertical measures*/}

          <VerticalMeasure ID="thickness_side"
            x={startingPoint + length + measureOffset}
            y={startingPoint}
            value={thickness}
            magnify={1} />

          <VerticalMeasure ID="height_side"
            x={startingPoint + length + measureOffset * 2}
            y={startingPoint}
            value={height}
            magnify={1} />

          <VerticalMeasure ID="side_stretcher_height_side"
            x={startingPoint + length + measureOffset}
            y={startingPoint + height - sideStretcherDistanceFromGround - sideStretcherHeight}
            value={sideStretcherHeight}
            magnify={1} />

          <VerticalMeasure ID="side_stretcher_dstfromground_side"
            x={startingPoint + length + measureOffset}
            y={startingPoint + height - sideStretcherDistanceFromGround}
            value={sideStretcherDistanceFromGround}
            magnify={1} />
        </g>
      )
    }

    function TopView() {
      const length = +(useContext(LengthContext));
      const width = +(useContext(WidthContext));

      useEffect(() => {
        setViewBoxValue(' ' + (startingPoint - (frameSide)) +
          ' ' + (startingPoint - (frameSide)) +
          ' ' + ((frameSide) + width + arrowOffset + frameSide) +
          ' ' + ((frameSide) + length + (frameSide)) + ' ');
      },
        [width, length]);

      return (
        <g id="top">
          {/**Leftside */}
          <PathDotted ID="plate_top" type={1}
            path={'M' + (startingPoint) + ',' + (startingPoint) +
              ' h' + (width) +
              ' v' + (length) +
              ' h' + (-width) + ' Z'} />
          <PathVisible ID="rear_stretcher_top" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + length / 2 - middleStretcherDistance / 2 - middleStretcherWidth) +
            ' h' + (-(width / 2 - indentation - PanelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) +
            ' v' + (middleStretcherWidth) +
            ' h' + ((width / 2 - indentation - PanelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) + ''} />
          <PathVisible ID="front_stretcher_top" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + length / 2 + middleStretcherDistance / 2) +
            ' h' + (-(width / 2 - indentation - PanelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) +
            ' v' + (middleStretcherWidth) +
            ' h' + ((width / 2 - indentation - PanelDistanceFromSide - tablePanelWidth - sideSupportWidth + sideSupportPanelOverlap)) + ''} />
          <PathVisible ID="table_side_panel_rear_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + indentation + PanelDistanceFromSide) +
              ' h' + (-(width / 2 - indentation - legSize)) +
              ' v' + (PanelWidth / 3) +
              ' h' + (-PanelUpperJointLength) +
              ' v' + (PanelWidth / 3) +
              ' h' + (PanelUpperJointLength) +
              ' v' + (sideStretcherWidth / 3) +
              ' h' + (width / 2 - indentation - legSize) + ' '} />
          <PathVisible ID="left_side_support_top"
            path={'M' + (startingPoint + indentation + PanelDistanceFromSide + PanelWidth + sideSupportWidth - sideSupportPanelOverlap) + ',' + (startingPoint + indentation + PanelDistanceFromSide + PanelWidth) +
              ' h' + (-(sideSupportWidth - sideSupportPanelOverlap - legSize + PanelDistanceFromSide + PanelWidth)) +
              ' v' + (legSize - PanelDistanceFromSide - PanelWidth) + ' h' + (-(legSize - PanelDistanceFromSide - PanelWidth)) +
              ' v' + (length - indentation - legSize - indentation - PanelDistanceFromSide - sideSupportWidth) +
              ' h' + (sideSupportWidth - sideSupportPanelOverlap) + ' Z'} />
          <PathVisible ID="left_side_panel_top"
            path={'M' + (startingPoint + indentation + PanelDistanceFromSide) + ',' + (startingPoint + indentation + legSize) +
              ' v' + (length - (indentation + legSize) * 2) +
              ' h' + (PanelWidth / 3) +
              ' v' + (PanelUpperJointLength) +
              ' h' + (PanelWidth / 3) +
              ' v' + (-PanelUpperJointLength) +
              ' h' + (PanelWidth / 3) +
              ' v' + (-(length - (indentation + legSize) * 2)) +
              ' h' + (-PanelWidth / 3) +
              ' v' + (-PanelUpperJointLength) +
              ' h' + (-PanelWidth / 3) +
              ' v' + (PanelUpperJointLength) + ' Z'} />
          <PathCut ID="left_rear_leg_top"
            path={'M' + (startingPoint + indentation + legSize / 2) + ',' + (startingPoint + indentation) +
              ' h' + (-(legSize / 2 - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h' + (PanelDistanceFromSide + PanelWidth / 3 - R2) +
              ' v' + (-(PanelUpperJointLength + PanelUpperJointGap)) +
              ' h' + (PanelWidth / 3) +
              ' v' + (PanelUpperJointLength + PanelUpperJointGap) +
              ' h' + (PanelWidth / 3 + (legSize - PanelDistanceFromSide - PanelWidth - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v' + (-(PanelWidth / 3 + (legSize - PanelDistanceFromSide - PanelWidth - R2))) +
              ' h' + (-(PanelUpperJointLength + PanelUpperJointGap)) +
              ' v' + (-PanelWidth / 3) +
              ' h' + (PanelUpperJointLength + PanelUpperJointGap) +
              ' v' + (-(PanelWidth / 3 + PanelDistanceFromSide - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) +
              ' h' + (-(legSize / 2 - R2))} />
          <PathCut ID="left_front_leg_top"
            path={'M' + (startingPoint + indentation + PanelDistanceFromSide + PanelWidth) + ',' + (startingPoint + length - indentation - legSize) +
              ' h' + (-PanelWidth / 3) +
              ' v' + (PanelUpperJointLength + PanelUpperJointGap) +
              ' h' + (-sideStretcherWidth / 3) +
              ' v' + (-(PanelUpperJointLength + PanelUpperJointGap)) +
              ' h' + (-(PanelWidth / 3 + PanelDistanceFromSide - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) + ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +
              ' h' + (legSize - R2 * 2) + ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (-R2) +
              ' v' + (-(legSize - R2 * 2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) + ' Z'} />
          <PathVisible ID="front_support_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + length - indentation - frontSupportDistanceFromSide) +
              ' h' + (-(width / 2 - indentation - legSize)) +
              ' v' + (-(legSize - corner - frontSupportDistanceFromSide)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (-R2) +
              ' h' + (-(legSize - PanelDistanceFromSide - PanelWidth - R2)) +
              ' v' + (-(frontSupportWidth - legSize + frontSupportDistanceFromSide)) +
              ' h' + (width / 2 - indentation - PanelDistanceFromSide - PanelWidth) + ''} />

          <PathDotted type={3} ID="middle_line_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint - arrowOffset) +
              ' v' + (length + arrowOffset * 2) + ''} />
          <PathDotted type={3} ID="cut_A_line_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + length / 2 + middleStretcherDistance / 2 + middleStretcherWidth / 2) +
              ' h' + (width / 2 + arrowOffset) + ''} />
          <Arrow direction="up" ID="cut_A_arrow_top"
            x={(startingPoint + width + arrowOffset)}
            y={(startingPoint + length / 2 + middleStretcherDistance / 2 + middleStretcherWidth / 2)} />
          <TextString ID="cut_A_text_front"
            x={(startingPoint + width + arrowOffset)}
            y={startingPoint + length / 2 + middleStretcherDistance / 2 + middleStretcherWidth / 2 - textOffset}
            value="A" />

          {/**Rightside */}

          <PathCut ID="drawer_front_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + length - indentation - drawerFrontDistanceFromSide) +
              ' h' + (width / 2 - legSize - indentation) +
              ' v' + (-drawerFrontWidth) +
              ' h' + (-(width / 2 - legSize - indentation))} />
          <PathCut ID="rear_side_panel_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + indentation + PanelDistanceFromSide) +
              ' h' + (width / 2 - legSize - indentation) +
              ' v' + (PanelWidth / 3) +
              ' h' + (PanelLowerJointL) +
              ' l' + (-PanelWidth / 3) + ' ' + (PanelWidth / 3) +
              ' h' + (-PanelLowerJointS) +
              ' v' + (PanelWidth / 3) +
              ' h' + (-(width / 2 - legSize - indentation)) + ''} />
          <PathCut ID="right_side_panel_top"
            path={'M' + (startingPoint + width - indentation - PanelDistanceFromSide) + ',' + (startingPoint + indentation + legSize) +
              ' v' + (length - (indentation + legSize) * 2) +
              ' h' + (-PanelWidth / 3) +
              ' v' + (PanelLowerJointL) +
              ' h' + (-PanelWidth / 3) +
              ' v' + (-PanelLowerJointL) +
              ' h' + (-PanelWidth / 3) +
              ' v' + (-(length - (indentation + legSize) * 2)) +
              ' h' + (PanelWidth / 3) +
              ' v' + (-PanelLowerJointS) +
              ' l' + (PanelWidth / 3) + ' ' + (-PanelWidth / 3) +
              ' v' + (PanelLowerJointL) + ' Z'} />
          <PathCut ID="right_front_leg_top"
            path={'M' + (startingPoint + width - indentation - legSize / 2) + ',' + (startingPoint + length - indentation) +
              ' h' + (-(legSize / 2 - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (-R2) + ' ' + (-R2) +
              ' v' + (-(legSize - R2 * 2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (-R2) +
              ' h' + (legSize - PanelDistanceFromSide - PanelWidth - R2 + PanelWidth / 3) +
              ' v' + (PanelLowerJointL + PanelUpperJointGap) +
              ' h' + (PanelWidth / 3) +
              ' v' + (-(PanelLowerJointL + PanelUpperJointGap)) +
              ' h' + (PanelWidth / 3 + PanelDistanceFromSide - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (-R2) + ' ' + (R2) + ' Z'} />
          <PathCut ID="right_rear_leg_outside_top"
            path={'M' + (startingPoint + width - indentation - legSize / 2) + ',' + (startingPoint + indentation) +
              ' h' + (legSize / 2 - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (R2) +
              ' v' + (legSize - R2 * 2) + ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (-R2) + ' ' + (R2) +
              ' h' + (-(PanelDistanceFromSide + PanelWidth / 3 - R2)) +
              ' v' + (-(legSize - (PanelDistanceFromSide + PanelWidth / 3))) +
              ' h' + (-(legSize - (PanelDistanceFromSide + PanelWidth / 3))) +
              ' v' + (-(PanelDistanceFromSide + PanelWidth / 3 - R2)) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 1' + (R2) + ' ' + (-R2) + ' Z'} />
          <PathCut ID="right_rear_leg_outside_botom"
            path={'M' + (startingPoint + width - indentation - PanelDistanceFromSide - PanelWidth / 3 * 2) + ',' + (startingPoint + indentation + legSize) +
              ' v' + (-(legSize - PanelDistanceFromSide - PanelWidth / 3 * 2)) +
              ' h' + (-(legSize - PanelDistanceFromSide - PanelWidth / 3 * 2)) +
              ' v' + (legSize - PanelDistanceFromSide - PanelWidth / 3 * 2 - R2) +
              ' a' + (R2) + ' ' + (R2) + ' 0 0 0' + (R2) + ' ' + (R2) + ' Z'} />
          <PathVisible ID="right_side_support_top"
            path={'M' + (startingPoint + width - indentation - PanelDistanceFromSide - PanelWidth - (sideSupportWidth - sideSupportPanelOverlap)) + ',' + (startingPoint + indentation + PanelDistanceFromSide + PanelWidth + trayBottomDistanceFromLeg) +
              ' v' + (-trayBottomDistanceFromLeg) + ''} />
          <PathCut ID="drawer_back_side_top"
            path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + indentation + PanelDistanceFromSide + PanelWidth + trayBottomDistanceFromLeg) +
              ' h' + (width / 2 - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - 21) +
              ' v' + (drawerBackWidth) +
              ' h' + (-(width / 2 - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - 21)) + ''} />
          <RectangleElementCut ID="drawer_right_side_top"
            x={startingPoint + width - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth}
            y={(startingPoint + indentation + PanelDistanceFromSide + PanelWidth + trayBottomDistanceFromLeg)}
            width={drawerSideWidth}
            height={length - 2 * indentation - PanelDistanceFromSide - drawerFrontDistanceFromSide - drawerFrontWidth - PanelWidth - trayBottomDistanceFromLeg} />
          <RectangleElement ID="drawer_slide_lower_part_top"
            x={startingPoint + width - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2}
            y={startingPoint + indentation + PanelDistanceFromSide + PanelWidth + trayBottomDistanceFromLeg - concaveElementWidthRect}
            width={drawerSlideWidth2}
            height={concaveElementWidthRect} />
          <RectangleElement ID="drawer_slide_higher_part_top"
            x={startingPoint + width - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1}
            y={startingPoint + indentation + PanelDistanceFromSide + PanelWidth + trayBottomDistanceFromLeg - concaveElementWidthRect}
            width={drawerSlideWidth1}
            height={length - 2 * indentation - PanelDistanceFromSide - legSize - PanelWidth - trayBottomDistanceFromLeg + concaveElementWidthRect} />

          <CircleView ID="circle_5"
            cx={startingPoint + width - indentation - legSize / 2}
            cy={startingPoint + indentation + legSize }
            onClick={() => setType("fifth")} />
          <CircleView ID="circle_6"
            cx={startingPoint + width - indentation - legSize / 2}
            cy={startingPoint + length - indentation - legSize}
            onClick={() => setType("sixth")} />
          <CircleView ID="circle_7"
            cx={startingPoint + indentation + legSize / 2}
            cy={startingPoint + length - indentation - legSize}
            onClick={() => setType("seventh")} />
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
        setViewBoxValue(' ' + (startingPoint - (measureOffset + measureTextOffset + frameSide)) +
          ' ' + (startingPoint - (measureOffset * 2 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionLength * magnify + measureOffset * 1.5 + frameSide) +
          ' ' + ((measureOffset * 2 + measureTextOffset + frameSide) + sectionHeight * magnify + (measureOffset * 2 + frameSide)) + ' ');
      },
        [height, length, thickness]);
      return (
        <g id="first">

          {/** Visible lines */}

          <PathCut ID="plate_part_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint) +
              ' h ' + (-(sectionLength - R2) * magnify) +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (thickness - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + ((sectionLength - R2) * magnify) + ''} />
          <PathCut ID="rear_panel_first"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide) * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v' + (PanelHeight - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (PanelWidth - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v' + (-(PanelHeight - R2) * magnify) + ''} />
          <PathVisible ID="rear_leg_first"
            path={'M' + (startingPoint + indentation * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v ' + (sectionHeight - thickness) * magnify +
              ' m ' + (legSize * magnify) + ' 0 ' +
              ' v ' + (-(sectionHeight - thickness - drawerTotalHeight) * magnify) +
              ' m 0 ' + (-sideSupportHeight * magnify) +
              ' v ' + (-(drawerTotalHeight - sideSupportHeight) * magnify) + ''} />
          <PathVisible ID="side_support_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify) +
              ' h ' + (-(sectionLength - indentation - PanelDistanceFromSide - PanelWidth) * magnify) +
              ' v ' + (sideSupportHeight - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + ((sectionLength - indentation - PanelDistanceFromSide - PanelWidth - R2) * magnify)} />
          <PathVisible ID="drawer_slide_lower_part_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg + concaveElementWidthRect) * magnify) +
              ' v ' + (drawerSlideHeight2 * magnify) +
              ' h ' + ((sectionLength - indentation - legSize - trayBottomDistanceFromLeg + concaveElementWidthRect) * magnify) + ''} />
          <PathVisible ID="concave_element_first"
            path={'M' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg + concaveElementWidthTri) * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2) * magnify) +
              ' h' + (-(concaveElementWidthRect + concaveElementWidthTri) * magnify) +
              ' v' + (-(drawerSlideHeight1 - drawerSlideHeight2) * magnify) +
              ' h' + (concaveElementWidthRect) * magnify +
              ' v' + (concaveElementHeight - 10.19) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' Z'} />
          <PathCut ID="traybottom_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - trayBottomDistanceFromBottom - drawerSlideHeight2 - trayBottomHeight) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (trayBottomHeight * magnify) +
              ' h ' + (sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify + ''} />
          <PathCut ID="drawer_back_first"
            path={'M' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' h ' + (drawerBackWidth * magnify) +
              ' v ' + (-(drawerBackHeight - R2)) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' h ' + (-(drawerBackWidth - R2)) * magnify +
              ' v ' + (drawerBackHeight) * magnify + ''} />
          <PathVisible ID="drawer_other_side_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint + (thickness + drawerSideDistanceFromPlate) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg - concaveElementWidthTri) * magnify) +
              ' l ' + (-(concaveElementWidthTri - R2) * magnify) + ',' + (concaveElementWidthTri * 0.24932 - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (drawerTotalHeight - drawerBoardHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight) * magnify + ''} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="drawer_slide_height_1_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify) +
              ' h ' + (-(sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) + ''} />
          <PathDotted type={2} ID="leg_side_support_overlap_first"
            path={'M' + (startingPoint + (indentation + legSize) * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight) * magnify) +
              ' v ' + (-(sideSupportHeight * magnify)) + ''} />
          <PathDotted type={2} ID="side_panel_joint_first"
            path={'M' + (startingPoint + (indentation + legSize - PanelUpperJointLength - PanelUpperJointGap) * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v ' + (PanelUpperJointHeight * magnify) +
              ' m ' + (PanelUpperJointGap * magnify) + ' ' + (-PanelUpperJointHeight * magnify) +
              ' v ' + (PanelUpperJointHeight * magnify) +
              ' h ' + (-(PanelLowerJointL - PanelUpperJointLength)) * magnify +
              ' v ' + (PanelLowerJointHeight * magnify) +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' v ' + (-PanelLowerJointHeight * magnify) +
              ' m ' + (PanelUpperJointGap * magnify) + ' 0 ' +
              ' v ' + (PanelLowerJointHeight * magnify) +
              ' h ' + (-PanelWidth / 3 * magnify) +
              ' v ' + (-PanelLowerJointHeight * magnify) + ''} />
          <PathDotted type={2} ID="side_support_joint_first"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth) * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify) +
              ' h ' + (-(sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap) * magnify) +
              ' v ' + (sideSupportRearPanelOverlapHeight * magnify) +
              ' h ' + ((sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap) * magnify) +
              ' m ' + (-sideSupportRearPanelOverlapLength) * magnify + ' 0 ' +
              ' v ' + (-sideSupportRearPanelOverlapHeight * magnify) + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_vertical_first"
            path={'M' + (startingPoint + sectionLength * magnify) + ',' + (startingPoint - 10) +
              ' v ' + ((thickness + drawerTotalHeight) * magnify + 10 * 2) + ''} />
          <PathDotted type={1} ID="cut_horizontal_first"
            path={'M' + (startingPoint + indentation * magnify - 10) + ',' + (startingPoint + sectionHeight * magnify) +
              ' h ' + (legSize * magnify + 10 * 2) + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasure ID="panel_upper_joint_length_first"
            x={startingPoint + (indentation + legSize - PanelUpperJointLength) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={PanelUpperJointLength}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_upper_joint_length_gap_first"
            x={startingPoint + (indentation + legSize - PanelUpperJointLength - PanelUpperJointGap) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={PanelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_lower_joint_length_and_gap_first"
            x={startingPoint + (indentation + legSize - PanelLowerJointL - PanelUpperJointGap) * magnify}
            y={startingPoint - measureOffset}
            value={PanelLowerJointL + PanelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasureHalf ID="side_panel_length_first"
            x={startingPoint + (indentation + legSize - PanelLowerJointL - PanelUpperJointGap) * magnify}
            y={startingPoint - measureOffset * 1.5}
            displayValue={length - (indentation + legSize - PanelLowerJointL) * 2}
            startValue={startingPoint + sectionLength * magnify} />
          <HorizontalMeasureHalf ID="length_first"
            x={startingPoint}
            y={startingPoint - measureOffset * 2}
            displayValue={length}
            startValue={startingPoint + sectionLength * magnify} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasure ID="drawer_back_width_first"
            x={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={startingPoint + (drawerTotalHeight + thickness) * magnify + measureOffset * 0.5}
            value={drawerBackWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="concave_element_width_tri_first"
            x={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={startingPoint + (drawerTotalHeight + thickness) * magnify + measureOffset}
            value={concaveElementWidthTri}
            magnify={magnify} />
          <HorizontalMeasureHalf ID="traybottom_length_first"
            x={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={startingPoint + (drawerTotalHeight + thickness) * magnify + measureOffset * 1.5}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + PanelWidth - trayBottomIndentation + PanelDistanceFromSide)}
            startValue={startingPoint + sectionLength * magnify} />
          <HorizontalMeasureHalf ID="drawer_side_length_first"
            x={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            y={startingPoint + (drawerTotalHeight + thickness) * magnify + measureOffset * 2}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + PanelWidth - drawerSideFrontPanelOverlap + PanelDistanceFromSide)}
            startValue={startingPoint + sectionLength * magnify} />

          <HorizontalMeasure ID="rear_panel_width_1_first"
            x={startingPoint + (indentation + PanelDistanceFromSide) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="rear_panel_width_1_first"
            x={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="rear_panel_side_support_overlap_and_gap_first"
            x={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset}
            value={sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap}
            magnify={magnify} />
          <HorizontalMeasure ID="rear_panel_distance_from_side_first"
            x={startingPoint + (indentation) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.5}
            value={PanelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasure ID="rear_panel_width_first"
            x={startingPoint + (indentation + PanelDistanceFromSide) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.5}
            value={PanelWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="legsize_first"
            x={startingPoint + (indentation) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 2}
            value={legSize}
            magnify={magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasure ID="side_support_height_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_slide_height_2_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_slide_height_2_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasure ID="traybottom_distance_from_bottom_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom) * magnify}
            value={trayBottomDistanceFromBottom}
            magnify={magnify} />
          <VerticalMeasure ID="traybottom_height_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify}
            value={trayBottomHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_back_height_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight - drawerBackHeight) * magnify}
            value={drawerBackHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_side_plate_gap_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness) * magnify}
            value={drawerSideDistanceFromPlate}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_slide_height_2_first"
            x={startingPoint + sectionLength * magnify + measureOffset}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_side_height_first"
            x={startingPoint + sectionLength * magnify + measureOffset * 1.5}
            y={startingPoint + (thickness + drawerSideDistanceFromPlate) * magnify}
            value={drawerSideHeight}
            magnify={magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasure ID="side_support_rear_panel_joint_height_first"
            x={startingPoint + indentation * magnify - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportRearPanelOverlapHeight}
            magnify={magnify} />
          <VerticalMeasure ID="panel_lower_joint_height_first"
            x={startingPoint + indentation * magnify - measureOffset * 0.5}
            y={startingPoint + (thickness + PanelUpperJointHeight) * magnify}
            value={PanelLowerJointHeight}
            magnify={magnify} />
          <VerticalMeasure ID="panel_upper_joint_height_first"
            x={startingPoint + indentation * magnify - measureOffset * 0.5}
            y={startingPoint + (thickness) * magnify}
            value={PanelUpperJointHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_total_height_first"
            x={startingPoint + indentation * magnify - measureOffset}
            y={startingPoint + (thickness) * magnify}
            value={drawerTotalHeight}
            magnify={magnify} />
          <VerticalMeasure ID="thickness_first"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint}
            value={thickness}
            magnify={magnify} />
          <VerticalMeasureHalf ID="leg_height_first"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + thickness * magnify}
            displayValue={height - thickness}
            startValue={startingPoint + sectionHeight * magnify} />
          <VerticalMeasureHalf ID="height_first"
            x={startingPoint - measureOffset}
            y={startingPoint}
            displayValue={height}
            startValue={startingPoint + sectionHeight * magnify} />
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
        setViewBoxValue(' ' + (startingPoint - (measureOffset*1.5 + measureTextOffset + frameSide)) +
          ' ' + (startingPoint - (measureOffset * 1 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionLength * magnify + measureOffset * 1.5 + frameSide) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionHeight * magnify + (measureOffset * 2.5 + frameSide)) + ' ');
      },
        [height, thickness, length]);

      return (
        <g id="second">

          {/**Visible parts*/}

          <PathCut ID="plate_second"
            path={'M' + (startingPoint) + ',' + (startingPoint) +
              ' h ' + (sectionLength - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (thickness - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(sectionLength - R2)) * magnify + ''} />
          <PathVisible ID="leg_visible_second"
            path={'M' + (startingPoint + (sectionLength - indentation) * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v ' + (sectionHeight - thickness) * magnify +
              ' m ' + (-legSize * magnify) + ' 0 ' +
              ' v ' + (-(sectionHeight - thickness - drawerTotalHeight)) * magnify + ''} />
          <PathCut ID="drawer_front_second"
            path={'M' + (startingPoint + (sectionLength - (indentation + drawerFrontDistanceFromSide + drawerFrontWidth)) * magnify) + ',' + (startingPoint + (thickness + drawerFrontDistanceFromPlate) * magnify) +
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
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerFrontDistanceFromPlate + drawerFrontHeight + drawerFrontDistanceFromBottom - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' h' + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify +
              ' v' + (trayBottomHeight) * magnify +
              ' h' + (-(sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation)) * magnify + ''} />
          <PathVisible ID="drawer_side_second"
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerSideDistanceFromPlate) * magnify) +
              ' h ' + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify +
              ' m 0 ' + (drawerFrontHeight - drawerSlideHeight2) * magnify +
              ' h ' + (-(sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify) + ''} />
          <PathVisible ID="side_support_second"
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify) +
              ' h ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify +
              ' v ' + (sideSupportHeight * magnify) +
              ' h ' + (-(sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify) + ''} />
          <PathCut ID="front_support_second"
            path={'M' + (startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - frontSupportHeight) * magnify) +
              ' h ' + (frontSupportLength - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (frontSupportHeight - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (-(frontSupportLength - R2)) * magnify + ''} />

          {/**Non-visible lines */}

          <PathDotted type={2} ID="leg_invisible_second" path={'M' + (startingPoint + (sectionLength - indentation - legSize) * magnify) + ',' + (startingPoint + thickness * magnify) +
            ' v ' + (drawerTotalHeight * magnify) + ''} />
          <PathDotted type={2} ID="drawer_slide_invisible"
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify) +
              ' h ' + (sectionLength - indentation - legSize) * magnify + ''} />
          <RectangleElementDotted type={2} ID="leg_front_support_indentation_second"
            x={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            y={startingPoint + (thickness + drawerTotalHeight - frontSupportHeight / 3 * 2) * magnify}
            width={legFrontSupportJointLength * magnify}
            height={legFrontSupportJointHeight * magnify} />
          <PathDotted type={2} ID="side_support_front_support_indentation_second"
            path={'M' + (startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify) + ',' + (startingPoint + (thickness + drawerTotalHeight - frontSupportHeight / 3 * 2) * magnify) +
              ' h' + (sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify +
              ' v' + (sideSupportFrontSupportJointHeigth * magnify) +
              ' h' + (-(sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify) +
              ' m ' + (sideSupportFrontSupportJointWidth * magnify) + ' 0 ' +
              ' v' + (-sideSupportFrontSupportJointHeigth) * magnify + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_vertical_second"
            path={'M' + (startingPoint) + ',' + (startingPoint - 20) +
              ' v' + ((indentation + drawerTotalHeight) * magnify + 10 * 2) + ''} />
          <PathDotted type={1} ID="cut_horizontal_second"
            path={'M' + (startingPoint + (sectionLength - indentation) * magnify + 10) + ',' + (startingPoint + sectionHeight * magnify) +
              ' h ' + (-(legSize * magnify + 10 * 2))} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasure ID="leg_indentation_second"
            x={startingPoint + (sectionLength - indentation) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={indentation}
            magnify={magnify} />
          <PathNarrowLine ID="length_second_measure"
            path={'M' + (startingPoint + (sectionLength) * magnify) + ',' + (startingPoint - measureOffset) +
              ' h' + (-sectionLength * magnify) + ''} />
          <CircleMeasure ID="length_second_measure_circle"
            cx={(startingPoint + (sectionLength) * magnify)}
            cy={(startingPoint - measureOffset)} />
          <TextMeasure ID="length_second_measure_text"
            x={(startingPoint + (sectionLength / 2) * magnify)}
            y={(startingPoint - measureOffset - measureTextOffset)}
            value={length}
            deg={0} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasure ID="side_support_front_support_indentation_width_second"
            x={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap}
            magnify={magnify} />
          <HorizontalMeasure ID="leg_front_support_indentation_width_second"
            x={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={legFrontSupportJointLength}
            magnify={magnify} />
          <HorizontalMeasure ID="leg_front_support_indentation_distance_from_side_second"
            x={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={legFrontSupportJointDstSide}
            magnify={magnify} />
          <HorizontalMeasure ID="front_support_distance_from_side_second"
            x={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={frontSupportDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasure ID="legsize_second"
            x={startingPoint + (sectionLength - indentation - legSize) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasure ID="front_support_width_second"
            x={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.5}
            value={frontSupportWidth}
            magnify={magnify} />
          <PathNarrowLine ID="tray_bottom_length_second_measure"
            path={'M' + (startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify) + ',' + (startingPoint + sectionHeight * magnify + measureOffset * 2) +
              ' h' + (-(sectionLength - indentation - drawerFrontDistanceFromSide - drawerBackWidth + trayBottomIndentation) * magnify) + ''} />
          <CircleMeasure ID="tray_bottom_length_second_measure_circle"
            cx={(startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify)}
            cy={(startingPoint + sectionHeight * magnify + measureOffset * 2)} />
          <TextMeasure ID="tray_bottom_length_second_measure_text"
            x={(startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify / 2)}
            y={(startingPoint + sectionHeight * magnify + measureOffset * 2 - measureTextOffset)}
            value={length}
            deg={0} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasure ID="drawer_front_plate_distance_second"
            x={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            y={startingPoint + thickness * magnify}
            value={drawerFrontDistanceFromPlate}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_front_height_second"
            x={startingPoint + (sectionLength - indentation) * magnify + measureOffset}
            y={startingPoint + (thickness + drawerFrontDistanceFromPlate) * magnify}
            value={drawerFrontHeight}
            magnify={magnify} />
          <PathNarrowLine ID="leg_height_measure_second"
            path={'M' + (startingPoint + (sectionLength) * magnify + measureOffset) + ',' + (startingPoint + thickness * magnify) +
              'v' + (sectionHeight - thickness) * magnify} />
          <CircleMeasure ID="leg_height_measure_second_circle"
            cx={startingPoint + sectionLength * magnify + measureOffset}
            cy={startingPoint + thickness * magnify} />
          <TextMeasure ID="leg_height_measure_second_text"
            x={startingPoint + sectionLength * magnify + measureOffset - measureTextOffset}
            y={startingPoint + ((sectionHeight - thickness) / 2) * magnify}
            value={height - thickness}
            deg={270} />
          <PathNarrowLine ID="height_measure_second_measure"
            path={'M' + (startingPoint + (sectionLength) * magnify + measureOffset * 1.5) + ',' + (startingPoint) +
              'v' + (sectionHeight) * magnify} />
          <CircleMeasure ID="height_measure_second_measure_circle"
            cx={startingPoint + sectionLength * magnify + measureOffset * 1.5}
            cy={startingPoint} />
          <TextMeasure ID="height_measure_second_measure_text"
            x={startingPoint + sectionLength * magnify + measureOffset * 1.5 - measureTextOffset}
            y={startingPoint + (sectionHeight) / 2 * magnify}
            value={height}
            deg={270} />

          {/** Vertical measures - left of drawing */}

          <VerticalMeasure ID="support_height_1_second"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight / 3) * magnify}
            value={sideSupportHeight / 3}
            magnify={magnify} />
          <VerticalMeasure ID="support_height_2_second"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight / 3 * 2) * magnify}
            value={sideSupportHeight / 3}
            magnify={magnify} />
          <VerticalMeasure ID="slide_height_2_second"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasure ID="side_support_total_height_second"
            x={startingPoint - measureOffset}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasure ID="slide_height_1_second"
            x={startingPoint - measureOffset}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify}
            value={drawerSlideHeight1}
            magnify={magnify} />
          <VerticalMeasure ID="tray_bottom_distance_from_bottom_second"
            x={startingPoint - measureOffset * 1.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom) * magnify}
            value={trayBottomDistanceFromBottom}
            magnify={magnify} />
          <VerticalMeasure ID="tray_bottom_height_second"
            x={startingPoint - measureOffset * 1.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify}
            value={trayBottomHeight}
            magnify={magnify} />
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
        setViewBoxValue(' ' + (startingPoint - (measureOffset*1 + measureTextOffset + frameSide)) +
          ' ' + (startingPoint - (measureOffset * 1.5 + measureTextOffset + frameSide)) +
          ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 2 + frameSide) +
          ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionHeight * magnify + (measureOffset * 3 + frameSide)) + ' ');
      },
        [width, height, thickness]);

      return (
        <g id="third_circle">
          {/**Chair parts */}
          <PathCut ID="plate_part_cut_third"
            path={'M' + (startingPoint) + ',' + (startingPoint) +
              ' h' + ((sectionWidth - corner) * magnify) +
              ' a' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (corner * magnify) + ' ' + (corner * magnify) +
              ' v' + ((thickness - corner * 2) * magnify) +
              ' a' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (-corner * magnify) + ' ' + (corner * magnify) +
              ' h' + (-(sectionWidth - corner) * magnify)} />
          <PathVisible ID="inner_rightleg_front"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize) * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v ' + (drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify +
              ' m 0 ' + (drawerSlideHeight2 + sideSupportHeight) * magnify +
              ' v ' + (sectionHeight - thickness - drawerTotalHeight) * magnify +
              ' m ' + (legSize * magnify) + ' 0 ' +
              ' v ' + (-(sectionHeight - thickness) * magnify) + ' '} />
          <PathVisible ID="drawer_board_front"
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerTotalHeight) * magnify) +
              ' h' + (sectionWidth - legSize - indentation) * magnify + ''} />
          <PathCut ID="right_side_panel_third"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide) * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v' + ((PanelHeight - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(PanelWidth / 3 - R2) * magnify) +
              ' v' + (-sideSupportHeight * magnify) +
              ' h' + (-(PanelWidth * (2 / 3) * magnify)) +
              ' v' + (-(PanelHeight - sideSupportHeight) * magnify) + ''} />
          <RectangleElementCut ID="right_side_support_third"
            x={(startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth / 3 - sideSupportWidth) * magnify)}
            y={(startingPoint + (thickness + drawerTotalHeight - sideSupportHeight) * magnify)}
            width={sideSupportWidth * magnify}
            height={sideSupportHeight * magnify} />
          <PathCut ID="drawer_slide_third"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize - drawerSlideWidth2) * magnify) + ',' + (startingPoint + (thickness + PanelHeight - sideSupportHeight) * magnify) +
              ' h' + ((drawerSlideWidth1 + drawerSlideWidth2) * magnify) +
              ' v' + (-drawerSlideHeight1 * magnify) +
              ' h' + (-drawerSlideWidth1 * magnify) +
              ' v' + ((drawerSlideHeight1 - drawerSlideHeight2) * magnify) +
              ' h' + (-drawerSlideWidth2 * magnify) + ' Z'} />
          <PathCut ID="drawer_right_side_third"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify) + ',' + (startingPoint + (thickness + drawerSideDistanceFromPlate + drawerSideHeight) * magnify) +
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
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerHorizontalUpperPartHeight) * magnify) +
              ' h' + (sectionWidth - indentation - legSize - drawerSideDistanceFromPlate - drawerSideWidth) * magnify} />
          <PathCut ID="tray_bottom_third"
            path={'M' + (startingPoint) + ',' + (startingPoint + (thickness + drawerSideDistanceFromPlate + drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight) * magnify) +
              ' h' + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) * magnify +
              ' v' + (trayBottomHeight) * magnify +
              ' h' + (-(sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation)) * magnify + ' '} />

          {/**Cuts */}

          <PathDotted type={1}
            ID="cut_vertical_third"
            path={'M' + (startingPoint) + ',' + (startingPoint - 10) +
              ' v' + ((thickness + drawerTotalHeight) * magnify + 10 * 2)} />
          <PathDotted type={1}
            ID="cut_horizontal_third"
            path={'M' + (startingPoint + (sectionWidth - indentation) * magnify + 10) + ',' + (startingPoint + sectionHeight * magnify) +
              ' h' + (-(legSize * magnify + 10 * 2))} />

          {/**Non-visible lines */}

          <PathDotted type={2}
            ID="leg_and_rear_panel_nonvisible_third"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize - (sideSupportWidth - sideSupportLegOverlap)) * magnify) + ',' + (startingPoint + (thickness + PanelHeight - 11) * magnify) +
              ' h' + (sideSupportWidth - sideSupportLegOverlap) * magnify +
              ' m 0 ' + (-(11 + drawerSlideHeight2) * magnify) +
              ' v' + ((drawerSlideHeight2 + sideSupportHeight) * magnify) + ' '} />
          <PathDotted type={2}
            ID="rear_panel_indentation"
            path={'M' + (startingPoint + (sectionWidth + -indentation - legSize + PanelUpperJointLength + PanelUpperJointGap) * magnify) + ',' + (startingPoint + thickness * magnify) +
              ' v ' + (PanelUpperJointHeight * magnify) +
              ' m ' + (-PanelUpperJointGap * magnify) + ' ' + (-PanelUpperJointHeight * magnify) +
              ' v ' + (PanelUpperJointHeight * magnify) +
              ' h ' + (PanelLowerJointL + PanelUpperJointGap - PanelUpperJointLength) * magnify +
              ' v ' + (PanelHeight - PanelUpperJointHeight - sideSupportHeight) * magnify +
              ' m ' + (-PanelUpperJointGap * magnify) + ' ' + (-(PanelHeight - PanelUpperJointHeight - sideSupportHeight)) * magnify +
              ' v ' + (PanelHeight - PanelUpperJointHeight - sideSupportHeight) * magnify +
              ' m ' + (-PanelWidth / 3 * magnify) + ' ' + (-(PanelHeight - PanelUpperJointHeight - sideSupportHeight)) * magnify +
              ' v ' + (PanelHeight - PanelUpperJointHeight - sideSupportHeight) * magnify +
              ' m ' + (PanelUpperJointGap * magnify) + ' ' + (-(PanelHeight - PanelUpperJointHeight - sideSupportHeight)) * magnify +
              ' v ' + (PanelHeight - PanelUpperJointHeight - sideSupportHeight) * magnify + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasure ID="panel_upper_joint_length_third"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={PanelUpperJointLength}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_upper_joint_gap_third"
            x={startingPoint + (sectionWidth - indentation - legSize + PanelUpperJointLength) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={PanelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasure ID="indentation_third"
            x={startingPoint + (sectionWidth - indentation) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_lower_joint_l_gap_third"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={startingPoint - measureOffset}
            value={PanelLowerJointL + PanelUpperJointGap}
            magnify={magnify} />

          <HorizontalMeasureHalf ID="width_third"
            x={startingPoint + sectionWidth * magnify}
            y={startingPoint - measureOffset * 1.5}
            displayValue={width}
            startValue={startingPoint} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasure ID="traybottom_indentation_third"
            x={startingPoint + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify}
            y={startingPoint + (thickness + drawerTotalHeight) * magnify + measureOffset * 0.5}
            value={trayBottomIndentation + trayBottomGap}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_side_width_third"
            x={startingPoint + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={drawerSideWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_side_dst_from_leg_third"
            x={startingPoint + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={drawerSideDistanceFromLeg}
            magnify={magnify} />
          <HorizontalMeasure ID="rigth_panel_third_width_1_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth / 3 * 2) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="rigth_panel_third_width_2_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth / 3) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_slide_width_2_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.0}
            value={drawerSlideWidth2}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_slide_width_1_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.0}
            value={drawerSlideWidth1}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_width_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.0}
            value={PanelWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_dst_from_side_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.0}
            value={PanelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasure ID="side_support_overlap_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth + sideSupportPanelOverlap - sideSupportWidth) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 1.5}
            value={sideSupportWidth - sideSupportLegOverlap}
            magnify={magnify} />
          <HorizontalMeasure ID="side_support_width_third"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth + sideSupportPanelOverlap - sideSupportWidth) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 2.0}
            value={sideSupportWidth}
            magnify={magnify} />7
          <HorizontalMeasure ID="legsize_third"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 2.5}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasureHalf ID="traybottom_width_third"
            x={startingPoint + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 2.5}
            displayValue={width - 2 * (indentation + legSize + drawerSideDistanceFromLeg + drawerSideWidth - trayBottomIndentation)}
            startValue={startingPoint} />
          <HorizontalMeasureHalf ID="drawer_width_third"
            x={startingPoint + (sectionWidth - indentation - legSize - drawerSideDistanceFromLeg) * magnify}
            y={startingPoint + sectionHeight * magnify + measureOffset * 3.0}
            displayValue={width - 2 * (indentation + legSize + drawerSideDistanceFromLeg)}
            startValue={startingPoint} />

          {/** Vertical Measures - left of drawing */}

          <VerticalMeasure ID="side_support_half_third"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={startingPoint + (indentation + drawerTotalHeight - sideSupportHeight / 2) * magnify}
            value={sideSupportHeight / 2}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_slide_height_2_third"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={startingPoint + (indentation + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2) * magnify}
            value={drawerSlideHeight2}
            magnify={magnify} />
          <VerticalMeasure ID="side_support_height_third"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 1}
            y={startingPoint + (indentation + drawerTotalHeight - sideSupportHeight) * magnify}
            value={sideSupportHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_slide_height_1_third"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 1}
            y={startingPoint + (indentation + drawerTotalHeight - sideSupportHeight - drawerSlideHeight1) * magnify}
            value={drawerSlideHeight1}
            magnify={magnify} />
          <VerticalMeasure ID="thickness_third"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 0.5}
            y={startingPoint}
            value={thickness}
            magnify={magnify} />
          <VerticalMeasure ID="rear_panel_upper_joint_height_third"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness) * magnify}
            value={PanelUpperJointHeight}
            magnify={magnify} />
          <VerticalMeasure ID="rear_panel_lower_joint_height_third"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 0.5}
            y={startingPoint + (thickness + PanelUpperJointHeight) * magnify}
            value={PanelLowerJointHeight}
            magnify={magnify} />
          <VerticalMeasure ID="total_drawer_height_third"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 1}
            y={startingPoint + (thickness) * magnify}
            value={drawerTotalHeight}
            magnify={magnify} />
          <VerticalMeasureHalf ID="leg_height_third"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 1.5}
            y={startingPoint + thickness * magnify}
            displayValue={height - thickness}
            startValue={startingPoint + sectionHeight * magnify} />
          <VerticalMeasureHalf ID="height_third"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 2}
            y={startingPoint}
            displayValue={height}
            startValue={startingPoint + sectionHeight * magnify} />


          {/** Vertical Measures - right of drawing */}

          <VerticalMeasure ID="traybottom_dst_from_bottom_third"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom) * magnify}
            value={trayBottomDistanceFromBottom}
            magnify={magnify} />

          <VerticalMeasure ID="traybottom_height_third"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - trayBottomDistanceFromBottom - trayBottomHeight) * magnify}
            value={trayBottomHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_rear_height_third"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (thickness + drawerSideDistanceFromPlate + drawerHorizontalUpperPartHeight) * magnify}
            value={drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight - drawerHorizontalUpperPartHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_side_height_third"
            x={startingPoint - measureOffset}
            y={startingPoint + (thickness + drawerSideDistanceFromPlate) * magnify}
            value={drawerSideHeight}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_plate_gap_third"
            x={startingPoint - measureOffset}
            y={startingPoint + (thickness) * magnify}
            value={drawerSideDistanceFromPlate}
            magnify={magnify} />

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
        setViewBoxValue('000 000 1500 1500')
      },
        [realheight, thickness]);
      return (
        <g id="fourth">
          {/**Visible lines */}
          <PathVisible ID="middle_stretcher_fourth"
            path={'M' + (startingPoint) + ',' + (startingPoint + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify) +
              ' h ' + (stretcherSectionWidth + legSize - sideStretcherWidth - sideStretcherDistanceFromSide) * magnify +
              ' v ' + (middleStretcherHeight * magnify) +
              ' h ' + (-(stretcherSectionWidth + legSize - sideStretcherWidth - sideStretcherDistanceFromSide) * magnify) + ' '} />
          <PathVisible ID="right_leg_fourth"
            path={'M' + (startingPoint + stretcherSectionWidth * magnify) + ',' + (startingPoint) +
              'v' + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify +
              ' m 0 ' + (middleStretcherHeight * magnify) +
              ' v ' + (sideStretcherDistanceFromGround + (sideStretcherHeight - middleStretcherHeight) / 2 - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (legSize - R2 * 2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v ' + (-(legSectionHeight - R2) * magnify)} />
          <RectangleElementCutRound ID="side_stretcher_cut_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize - sideStretcherWidth - sideStretcherDistanceFromSide) * magnify}
            y={startingPoint + 20 * magnify}
            width={sideStretcherWidth * magnify}
            height={sideStretcherHeight * magnify}
            rx={R2 * magnify}
            ry={R2 * magnify} />

          <PathVisible ID="ground"
            path={'M' + (startingPoint) + ',' + (startingPoint + legSectionHeight * magnify) +
              ' h' + ((stretcherSectionWidth + legSize) * magnify + measureOffset * 3 + 20)} />

          {/**Non-visible lines */}
          <PathDotted type={2} ID="non_visible_leg_part_fourth"
            path={'M' + (startingPoint + stretcherSectionWidth * magnify) + ',' + (startingPoint + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify) +
              ' v ' + (middleStretcherHeight * magnify)} />
          <PathDotted type={2} ID="middle_stretcher_indentation_fourth"
            path={'M' + (startingPoint + (stretcherSectionWidth + (legSize - sideStretcherWidth - sideStretcherDistanceFromSide)) * magnify) + ',' + (startingPoint + (20 + (sideStretcherHeight - middleStretcherJointHeight) / 2) * magnify) +
              ' h ' + (middleStretcherJointWidth + middleStretcherJointGap) * magnify +
              ' v ' + (middleStretcherJointHeight * magnify) +
              ' h ' + -(middleStretcherJointWidth + middleStretcherJointGap) * magnify +
              ' m ' + (middleStretcherJointWidth * magnify) + ' 0 ' +
              ' v ' + (-middleStretcherJointHeight * magnify) + ''} />
          <PathDotted type={2} ID="side_stretcher_indentation_fourth"
            path={'M' + (startingPoint + (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide - sideStretcherWidth / 3 * 2) * magnify) + ',' + (startingPoint + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify) +
              ' h ' + (sideStretcherWidth / 3 * magnify) +
              ' v ' + (middleStretcherHeight * magnify) +
              ' h ' + (-sideStretcherWidth / 3 * magnify) +
              ' Z'} />
          {/**Cuts */}
          <PathDotted type={1} ID="leg_cut_fourth"
            path={'M' + (startingPoint + stretcherSectionWidth * magnify - 10) + ',' + (startingPoint) +
              'h' + (legSize * magnify + 10 * 2) + ''} />
          <PathDotted type={1} ID='stretcher_cut_fourth'
            path={'M' + (startingPoint) + ',' + (startingPoint + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify - 10) +
              'v' + (middleStretcherHeight * magnify + 10 * 2) + ''} />

          {/**Horizantal measures */}

          <HorizontalMeasure ID="side_stretcher_side_gap_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={sideStretcherDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasure ID="side_stretcher_width_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide - sideStretcherWidth) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={sideStretcherWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="middle_stretcher_overlap_fourth"
            x={startingPoint + stretcherSectionWidth * magnify}
            y={startingPoint + legSectionHeight * magnify + measureOffset}
            value={legSize - sideStretcherDistanceFromSide - sideStretcherWidth + middleStretcherJointWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="middle_stretcher_overlap_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize - sideStretcherDistanceFromSide - sideStretcherWidth + middleStretcherJointWidth) * magnify}
            y={startingPoint + legSectionHeight * magnify + measureOffset}
            value={middleStretcherJointGap}
            magnify={magnify} />

          {/**Vertical measures */}
          <VerticalMeasure ID="middle_stretcher_indentation_height_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset}
            y={startingPoint + (20 + (sideStretcherHeight - middleStretcherJointHeight) / 2) * magnify}
            value={middleStretcherJointHeight}
            magnify={magnify} />
          <VerticalMeasure ID="middle_stretcher_height_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 1.5}
            y={startingPoint + (20 + (sideStretcherHeight - middleStretcherHeight) / 2) * magnify}
            value={middleStretcherHeight}
            magnify={magnify} />
          <VerticalMeasure ID="height_difference_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 1.5}
            y={startingPoint + (20 + sideStretcherHeight - (sideStretcherHeight - middleStretcherHeight) / 2) * magnify}
            value={(sideStretcherHeight - middleStretcherHeight) / 2}
            magnify={magnify} />
          <VerticalMeasure ID="side_stretcher_height_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 2}
            y={startingPoint + (20) * magnify}
            value={sideStretcherHeight}
            magnify={magnify} />
          <VerticalMeasure ID="side_stretcher_ground_distance_fourth"
            x={startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 2}
            y={startingPoint + (20 + sideStretcherHeight) * magnify}
            value={sideStretcherDistanceFromGround}
            magnify={magnify} />

          <PathNarrowLine ID="leg_height_fourth_measure"
            path={'M' + (startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 2.5) + ',' + (startingPoint + legSectionHeight * magnify) +
              ' v' + (-legSectionHeight * magnify) + ''} />
          <CircleMeasure ID="leg_height_fourth_measure_circle"
            cx={(startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 2.5)}
            cy={(startingPoint + legSectionHeight * magnify)} />
          <TextMeasure ID="leg_height_fourth_measure_text"
            x={(startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 2.5 - measureTextOffset)}
            y={(startingPoint + legSectionHeight / 2 * magnify)}
            value={realheight - thickness}
            deg={270} />

          <PathNarrowLine ID="height_fourth_measure"
            path={'M' + (startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 3) + ',' + (startingPoint + legSectionHeight * magnify) +
              ' v' + (-legSectionHeight * magnify) + ''} />
          <CircleMeasure ID="height_fourth_measure_circle"
            cx={(startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 3)}
            cy={(startingPoint + legSectionHeight * magnify)} />
          <TextMeasure ID="height_fourth_measure_text"
            x={(startingPoint + (stretcherSectionWidth + legSize) * magnify + measureOffset * 3 - measureTextOffset)}
            y={(startingPoint + legSectionHeight / 2 * magnify)}
            value={realheight}
            deg={270} />
        </g>
      )

    }

    function FifthCircle() {
      const width = +useContext(WidthContext);
      const length = +useContext(LengthContext);
      const sectionWidth = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (startingPoint - (measureOffset*2.5 + measureTextOffset + frameSide)) +
        ' ' + (startingPoint - (measureOffset * 1 + measureTextOffset + frameSide)) +
        ' ' + ((measureOffset * 2.5 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 1 + frameSide) +
        ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + sectionLength * magnify + (measureOffset * 3 + frameSide)) + ' ');      },
        [width, length]);
      return (
        <g id="fifth">

          {/** Visible lines */}

          <PathCut ID="rear_side_panel_fifth"
            path={'M' + (startingPoint) + ',' + (startingPoint + (indentation + PanelDistanceFromSide) * magnify) +
              ' h' + (sectionWidth - indentation - legSize) * magnify +
              ' v ' + (PanelWidth / 3) * magnify +
              ' h' + (PanelLowerJointL * magnify) +
              ' l ' + (-PanelWidth / 3) * magnify + ' ' + (PanelWidth / 3) * magnify +
              ' h ' + (-PanelLowerJointS * magnify) +
              ' v ' + (PanelWidth / 3) * magnify +
              ' h ' + (-(sectionWidth - indentation - legSize) * magnify) + ''} />
          <PathCut ID="right_side_panel_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide) * magnify) + ',' + (startingPoint + sectionLength * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize) * magnify) +
              ' h ' + (-PanelWidth / 3) * magnify +
              ' v' + (-PanelLowerJointL * magnify) +
              ' l ' + (-PanelWidth / 3) * magnify + ' ' + (PanelWidth / 3) * magnify +
              ' v ' + (PanelLowerJointS * magnify) +
              ' h ' + (-PanelWidth / 3) * magnify +
              ' v ' + ((sectionWidth - indentation - legSize) * magnify) + ''} />
          <PathCut ID="right_rear_leg_outside_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize / 2) * magnify) + ',' + (startingPoint + indentation * magnify) +
              ' h' + (legSize / 2 - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (legSize - R2 * 2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(PanelDistanceFromSide + PanelWidth / 3 - R2) * magnify) +
              ' v' + (-(legSize - (PanelDistanceFromSide + PanelWidth / 3)) * magnify) +
              ' h' + (-(legSize - (PanelDistanceFromSide + PanelWidth / 3)) * magnify) +
              ' v' + (-(PanelDistanceFromSide + PanelWidth / 3 - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (-R2 * magnify) + ' Z'} />
          <PathCut ID="right_rear_leg_outside_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth / 3 * 2) * magnify) + ',' + (startingPoint + (indentation + legSize) * magnify) +
              ' v' + (-(legSize - PanelDistanceFromSide - PanelWidth / 3 * 2) * magnify) +
              ' h' + (-(legSize - PanelDistanceFromSide - PanelWidth / 3 * 2) * magnify) +
              ' v' + (legSize - PanelDistanceFromSide - PanelWidth / 3 * 2 - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 0' + (R2 * magnify) + ' ' + (R2 * magnify) + ' Z'} />
          <PathVisible ID="right_side_support_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth + sideSupportPanelOverlap - sideSupportWidth) * magnify) + ',' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth) * magnify) +
              ' v ' + (legSize - PanelDistanceFromSide - PanelWidth + trayBottomDistanceFromLeg) * magnify} />
          <PathCut ID="drawer_back_side_fifth" path={'M' + (startingPoint) + ',' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
            ' h' + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - drawerSideWidth) * magnify +
            ' v' + (drawerBackWidth * magnify) +
            ' h' + (-(sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideHeight1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ''} />
          <RectangleElement ID="drawer_slide_lower_part_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify}
            y={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect) * magnify}
            width={drawerSlideWidth2 * magnify}
            height={concaveElementWidthRect * magnify} />
          <PathVisible ID="drawer_slide_higher_part_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap) * magnify) + ',' + (startingPoint + sectionLength * magnify) +
              ' v ' + (-(sectionLength - (indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect)) * magnify) +
              ' h ' + (-drawerSlideWidth1 * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg - concaveElementWidthRect)) * magnify + ''} />
          <PathCut ID="drawer_right_side_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify) + ',' + (startingPoint + sectionLength * magnify) +
              ' v ' + (- (sectionLength - indentation - legSize - trayBottomDistanceFromLeg) * magnify) +
              ' h ' + (-drawerSideWidth * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_fifth"
            path={'M' + (startingPoint) + ',' + (startingPoint - 10) +
              ' v' + (sectionLength * magnify + 10) +
              ' h ' + (sectionWidth * magnify + 10) + ''} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="plate_fifth"
            path={'M' + (startingPoint) + ',' + (startingPoint) +
              ' h' + (sectionWidth - corner) * magnify +
              ' a ' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 1 ' + (corner * magnify) + ' ' + (corner * magnify) +
              ' v ' + (sectionLength - corner) * magnify + ''} />
          <PathDotted type={2} ID="side_support_side_panel_overlap_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth + sideSupportPanelOverlap) * magnify) + ',' + (startingPoint + sectionLength * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize) * magnify) +
              ' h ' + (-(PanelWidth / 3 * 2) * magnify) + ' '} />
          <PathDotted type={2} ID="side_support_rear_panel_overlap_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize) * magnify) + ',' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify) +
              ' v ' + (PanelWidth / 3) * magnify +
              ' m 0 ' + (PanelWidth / 3 - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) * magnify +
              ' h ' + (-(sideSupportWidth - legSize + (PanelWidth - sideSupportPanelOverlap) + PanelDistanceFromSide) * magnify) +
              ' v ' + (sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap) * magnify +
              ' m 0 ' + (-sideSupportRearPanelOverlapLength * magnify) +
              ' h ' + ((sideSupportWidth - legSize + (PanelWidth - sideSupportPanelOverlap) + PanelDistanceFromSide) * magnify) + ''} />
          <PathDotted type={2} ID="side_support_drawer_overlap_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - sideSupportWidth + sideSupportPanelOverlap) * magnify) + ',' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify + ''} />
          <PathDotted type={2} ID="drawer_slide_drawer_overlap_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify) + ',' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
              ' v ' + ((sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify) + ''} />
          <PathDotted type={2} ID="drawer_rear_side_overlap"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ',' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg + drawerBackWidth) * magnify) +
              ' h ' + (drawerSideWidth * magnify) + ''} />
          <PathDotted type={2} ID="traybottom_drawer_overlap_fifth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify) + ',' + (startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify) +
              ' v ' + (sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify +
              ' m ' + (trayBottomGap * magnify) + ' 0 ' +
              ' v ' + (-(sectionLength - (indentation + legSize + trayBottomDistanceFromLeg)) * magnify) + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasure ID="rear_panel_lower_joint_l_fifth"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={(startingPoint + indentation * magnify - measureOffset * 0.5)}
            value={PanelLowerJointL + PanelUpperJointGap}
            magnify={magnify} />
          <HorizontalMeasure ID="legsize_horizontal_fifth"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={(startingPoint + indentation * magnify - measureOffset)}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasure ID="indentation_horizontal_fifth"
            x={startingPoint + (sectionWidth - indentation) * magnify}
            y={(startingPoint + indentation * magnify - measureOffset)}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasureHalf ID="plate_width_fifth"
            x={startingPoint + sectionWidth * magnify}
            y={startingPoint - measureOffset}
            displayValue={width}
            startValue={startingPoint} />
          <HorizontalMeasureHalf ID="rear_panel_width_fifth"
            x={startingPoint + (sectionWidth - indentation - legSize + PanelLowerJointL) * magnify}
            y={startingPoint - measureOffset * 0.5}
            displayValue={width - (indentation + legSize - PanelLowerJointL) * 2}
            startValue={startingPoint} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasure ID="traybottom_indentation_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset * 0.5}
            value={trayBottomIndentation}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_drawer_slide_gap_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset * 0.5}
            value={drawerSlideDrawerGap}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_slide_width_1_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset * 0.5}
            value={drawerSlideWidth1}
            magnify={magnify} />
          <HorizontalMeasure ID="side_support_side_panel_overlap_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset * 0.5}
            value={sideSupportPanelOverlap}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_side_width_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset}
            value={drawerSideWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="side_panel_width_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset}
            value={PanelWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="drawer_slide_width_2_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset * 1.5}
            value={drawerSlideWidth2}
            magnify={magnify} />
          <HorizontalMeasure ID="side_support_width_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - sideSupportWidth + sideSupportPanelOverlap) * magnify}
            y={startingPoint + (sectionLength) * magnify + measureOffset * 2}
            value={sideSupportWidth}
            magnify={magnify} />
          <HorizontalMeasureHalf ID="traybottom_width_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify}
            y={startingPoint + sectionLength * magnify + measureOffset * 2.5}
            displayValue={width - 2 * (indentation + PanelDistanceFromSide + PanelWidth + drawerSlidePanelGap + drawerSlideWidth1 + drawerSlideDrawerGap + drawerSideWidth - trayBottomIndentation)}
            startValue={startingPoint} />
          <HorizontalMeasureHalf ID="drawer_width_fifth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify}
            y={startingPoint + sectionLength * magnify + measureOffset * 3}
            displayValue={width - 2 * (indentation + PanelDistanceFromSide + PanelWidth + drawerSlidePanelGap + drawerSlideWidth1 + drawerSlideDrawerGap)}
            startValue={startingPoint} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasure ID="side_support_legsize_overlap_fifth"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) * magnify}
            value={legSize - (PanelWidth - sideSupportRearPanelOverlapLength - sideSupportRearPanelOverlapGap) - PanelDistanceFromSide}
            magnify={magnify} />
          <VerticalMeasure ID="legsize_vertical_fifth"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset}
            y={startingPoint + (indentation) * magnify}
            value={legSize}
            magnify={magnify} />
          <VerticalMeasureHalf ID="side_panel_length_fifth"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 0.5}
            y={startingPoint + (indentation + legSize - PanelLowerJointL - PanelUpperJointGap) * magnify}
            displayValue={length - (indentation + legSize - PanelLowerJointL - PanelUpperJointGap) * 2}
            startValue={startingPoint + sectionLength * magnify} />
          <VerticalMeasureHalf ID="plate_length_fifth"
            x={startingPoint + (sectionWidth) * magnify + measureOffset}
            y={startingPoint}
            displayValue={length}
            startValue={startingPoint + sectionLength * magnify} />

          {/** Vertical measures - left of drawing */}
          <VerticalMeasure ID="drawer_back_width_fifth"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            value={drawerBackWidth}
            magnify={magnify} />
          <VerticalMeasure ID="side_support_rear_panel_overlap_fifth"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth - (sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap)) * magnify}
            value={sideSupportRearPanelOverlapLength + sideSupportRearPanelOverlapGap}
            magnify={magnify} />
          <VerticalMeasure ID="rear_panel_width_fifth"
            x={startingPoint - measureOffset}
            y={startingPoint + (indentation + PanelDistanceFromSide) * magnify}
            value={PanelWidth}
            magnify={magnify} />
          <VerticalMeasureHalf ID="traybottom_length_fifth"
            x={startingPoint - measureOffset * 1.5}
            y={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + PanelWidth - trayBottomIndentation + PanelDistanceFromSide)}
            startValue={startingPoint + sectionLength * magnify} />
          <VerticalMeasureHalf ID="drawer_side_length_fifth"
            x={startingPoint - measureOffset * 2}
            y={startingPoint + (indentation + legSize + trayBottomDistanceFromLeg) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + PanelWidth - drawerSideFrontPanelOverlap + PanelDistanceFromSide)}
            startValue={startingPoint + sectionLength * magnify} />
          <VerticalMeasureHalf ID="side_support_length_fifth"
            x={startingPoint - measureOffset * 2.5}
            y={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth - sideSupportRearPanelOverlapLength) * magnify}
            displayValue={length - (indentation * 2 + PanelDistanceFromSide * 2 + PanelWidth + frontSupportLength - sideSupportRearPanelOverlapLength - sideSupportFrontSupportJointWidth)}
            startValue={startingPoint + sectionLength * magnify} />
        </g>
      )
    }

    function SixthCircle() {
      const width = +useContext(WidthContext);
      const length = +useContext(LengthContext);
      const sectionWidth = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (startingPoint - (measureOffset*3.5 + measureTextOffset + frameSide)) +
        ' ' + (startingPoint - ( frameSide)) +
        ' ' + ((measureOffset * 3.5 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 1 + frameSide) +
        ' ' + (( frameSide) + sectionLength * magnify + (measureOffset * 1.5 + frameSide)) + ' ');      },
        [width, length]);
      return (
        <g id="sixth">

          {/** Visible lines */}

          <PathCut ID="drawer_front_sixth"
            path={'M' + (startingPoint) + ',' + (startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide) * magnify) +
              ' h' + (sectionWidth - legSize - indentation) * magnify +
              ' v' + (-drawerFrontWidth) * magnify +
              ' h' + (-(sectionWidth - legSize - indentation) * magnify)} />
          <PathCut ID="right_front_leg_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize / 2) * magnify) + ',' + (startingPoint + (sectionLength - indentation) * magnify) +
              ' h' + (-(legSize / 2 - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v' + (-(legSize - R2 * 2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' h' + (legSize - PanelDistanceFromSide - PanelWidth - R2 + PanelWidth / 3) * magnify +
              ' v' + (PanelLowerJointL + PanelUpperJointGap) * magnify +
              ' h' + (PanelWidth / 3) * magnify +
              ' v' + (-(PanelLowerJointL + PanelUpperJointGap) * magnify) +
              ' h' + (PanelWidth / 3 + PanelDistanceFromSide - R2) * magnify +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v' + (legSize - R2 * 2) * magnify + ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1' + (-R2 * magnify) + ' ' + (R2 * magnify) + ' Z'} />
          <PathCut ID="right_side_panel_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - legSize) * magnify +
              ' h ' + (-PanelWidth / 3) * magnify +
              ' v ' + (PanelLowerJointL * magnify) +
              ' h ' + (-PanelWidth / 3 * magnify) +
              ' v ' + (-PanelLowerJointL * magnify) +
              ' h ' + (-PanelWidth / 3 * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize)) * magnify + ''} />
          <PathVisible ID="drawer_slide_higher_part_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - legSize) * magnify +
              ' h ' + (-drawerSlideWidth1) * magnify +
              ' v ' + (-(sectionLength - indentation - legSize)) * magnify + ''} />
          <PathCut ID="drawer_right_side_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - PanelDistanceFromSide - PanelWidth) * magnify +
              ' h ' + (-drawerSideWidth) * magnify +
              ' v ' + (-(sectionLength - indentation - PanelDistanceFromSide - PanelWidth)) * magnify + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="cut_sixth"
            path={'M' + (startingPoint + sectionWidth * magnify) + ',' + (startingPoint) +
              ' h ' + (-sectionWidth * magnify) +
              ' v ' + (sectionLength * magnify) + ''} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="plate_sixth"
            path={'M' + (startingPoint + sectionWidth * magnify) + ',' + (startingPoint) +
              ' v ' + ((sectionLength - R2) * magnify) +
              ' a' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h' + (-(sectionWidth - R2) * magnify) + ''} />
          <PathDotted type={2} ID="side_support_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth + sideSupportPanelOverlap) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth + sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify +
              ' h ' + (-sideSupportWidth * magnify) +
              ' v ' + (-(sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth + sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify) +
              ' m 0 ' + ((sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth + sideSupportFrontSupportJointWidth) * magnify) +
              ' h ' + (sideSupportWidth * magnify)} />
          <PathDotted type={2} ID="drawer_slide_overlap_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideWidth2) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify} />
          <PathDotted type={2} ID="traybottom_overlap_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify) + ',' + (startingPoint) +
              ' v ' + ((sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify) +
              ' h ' + (-(sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation) * magnify) +
              ' m 0 ' + (trayBottomGap * magnify) +
              ' h ' + ((sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ''} />
          <PathDotted type={2} ID="traybottom_gap_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth + trayBottomIndentation + trayBottomGap) * magnify) + ',' + (startingPoint) +
              ' v ' + ((sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + drawerSideFrontPanelOverlap) * magnify)} />
          <PathDotted type={2} ID="front_support_sixth"
            path={'M' + (startingPoint) + ',' + (startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportWidth) * magnify) +
              ' h ' + (sectionLength - indentation - PanelDistanceFromSide - PanelWidth + sideSupportPanelOverlap) * magnify +
              ' v ' + (frontSupportWidth - legSize + frontSupportDistanceFromSide) * magnify + ''} />
          <PathDotted type={2} ID="drawer_side_drawer_front_overlap_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth - drawerSlidePanelGap - drawerSlideWidth1 - drawerSlideDrawerGap - drawerSideWidth) * magnify) + ',' + (startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify) +
              ' v ' + (drawerSideFrontPanelOverlap * magnify) +
              ' h ' + (drawerSideWidth * magnify) + ''} />
          <PathDotted type={2} ID="front_support_leg_joint_sixth"
            path={'M' + (startingPoint + (sectionWidth - indentation - legSize) * magnify) + ',' + (startingPoint + (sectionLength - indentation - PanelDistanceFromSide - legFrontSupportJointDstSide) * magnify) +
              ' h ' + (legFrontSupportJointWidth + legFrontSupportJointGap) * magnify +
              ' v ' + (-(legFrontSupportJointLength) * magnify) +
              ' h ' + (-(legFrontSupportJointWidth + legFrontSupportJointGap) * magnify) +
              ' m ' + (legFrontSupportJointWidth) * magnify + ' 0 ' +
              ' v ' + (legFrontSupportJointLength * magnify) + ' '} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasure ID="front_support_leg_joint_width_sixth"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="front_support_leg_joint_gap_width_sixth"
            x={startingPoint + (sectionWidth - indentation - legSize + legFrontSupportJointWidth) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointGap}
            magnify={magnify} />
          <HorizontalMeasure ID="right_side_panel_third_width_1_sixth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth / 3 * 2) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="right_side_panel_third_width_2_sixth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth / 3) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="right_side_panel_width_sixth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide - PanelWidth) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset}
            value={PanelWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="right_side_panel_distance_from_side_sixth"
            x={startingPoint + (sectionWidth - indentation - PanelDistanceFromSide) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset}
            value={PanelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasureHalf ID="drawer_front_width_sixth"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 1.5}
            displayValue={width - (indentation + legSize) * 2}
            startValue={startingPoint} />
          <HorizontalMeasure ID="legsize_horizontal_sixth"
            x={startingPoint + (sectionWidth - indentation - legSize) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={legSize}
            magnify={magnify} />
          <HorizontalMeasure ID="indentation_horizontal_sixth"
            x={startingPoint + (sectionWidth - indentation) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={indentation}
            magnify={magnify} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasure ID="panel_lower_joint_l_sixth"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - legSize) * magnify}
            value={PanelLowerJointL}
            magnify={magnify} />
          <VerticalMeasure ID="panel_lower_joint_l_sixth"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - legSize + PanelLowerJointL) * magnify}
            value={PanelUpperJointGap}
            magnify={magnify} />
          <VerticalMeasure ID="legsize_vertical_sixth"
            x={startingPoint + (sectionWidth - indentation) * magnify + measureOffset}
            y={startingPoint + (sectionLength - indentation - legSize) * magnify}
            value={legSize}
            magnify={magnify} />
          <VerticalMeasureHalf ID="right_side_panel_length_sixth"
            x={startingPoint + (sectionWidth) * magnify + measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - legSize + PanelLowerJointL) * magnify}
            displayValue={length - (indentation + legSize - PanelLowerJointL) * 2}
            startValue={startingPoint} />
          <VerticalMeasureHalf ID="length_sixth"
            x={startingPoint + (sectionWidth) * magnify + measureOffset}
            y={startingPoint + (sectionLength) * magnify}
            displayValue={length}
            startValue={startingPoint} />

          {/** Vertical measures - left of drawing */}

          <VerticalMeasure ID="traybottom_indentation_sixth"
            x={startingPoint - measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify}
            value={trayBottomIndentation + trayBottomGap}
            magnify={magnify} />
          <VerticalMeasure ID="drawer_front_length_sixth"
            x={startingPoint - measureOffset}
            y={startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth) * magnify}
            value={drawerFrontWidth}
            magnify={magnify} />
          <VerticalMeasure ID="leg_front_support_joint_length_sixth"
            x={startingPoint - measureOffset * 1.5}
            y={startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            value={legFrontSupportJointLength}
            magnify={magnify} />
          <VerticalMeasure ID="leg_front_support_joint_dst_side_length_sixth"
            x={startingPoint - measureOffset * 1.5}
            y={startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - legFrontSupportJointDstSide) * magnify}
            value={legFrontSupportJointDstSide}
            magnify={magnify} />
          <VerticalMeasure ID="front_support_length_sixth"
            x={startingPoint - measureOffset * 2}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify}
            value={frontSupportLength}
            magnify={magnify} />
          <VerticalMeasureHalf ID="traybottom_length_sixth"
            x={startingPoint - measureOffset * 2.5}
            y={startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + trayBottomIndentation) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + PanelWidth - trayBottomIndentation + PanelDistanceFromSide)}
            startValue={startingPoint} />
          <VerticalMeasureHalf ID="drawer_side_length_sixth"
            x={startingPoint - measureOffset * 3}
            y={startingPoint + (sectionLength - indentation - drawerFrontDistanceFromSide - drawerFrontWidth + drawerSideFrontPanelOverlap) * magnify}
            displayValue={length - (indentation * 2 + legSize + trayBottomDistanceFromLeg + PanelWidth - drawerSideFrontPanelOverlap + PanelDistanceFromSide)}
            startValue={startingPoint} />
          <VerticalMeasureHalf ID="side_support_length_sixth"
            x={startingPoint - measureOffset * 3.5}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify}
            displayValue={length - (indentation * 2 + PanelDistanceFromSide * 2 + PanelWidth + frontSupportLength - sideSupportRearPanelOverlapLength - sideSupportFrontSupportJointWidth)}
            startValue={startingPoint} />
        </g>
      )
    }

    function SeventhCircle() {
      const width = +useContext(WidthContext);
      const length = +useContext(LengthContext);
      const sectionWidth = 200;
      const sectionLength = 200;

      useEffect(() => {
        setViewBoxValue(' ' + (startingPoint - (measureOffset*1.5 + measureTextOffset + frameSide)) +
        ' ' + (startingPoint - (measureOffset * 1.5 + measureTextOffset + frameSide)) +
        ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionWidth * magnify + measureOffset * 1.5 + frameSide) +
        ' ' + ((measureOffset * 1.5 + measureTextOffset + frameSide) + sectionLength * magnify + (measureOffset * 1 + frameSide)) + ' ');      },
        [width, length]);
      return (
        <g id="seventh">

          {/** Visible lines */}

          <PathVisible ID="left_side_panel_seventh"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - legSize) * magnify +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' v ' + (PanelUpperJointLength * magnify) +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' v ' + (-PanelUpperJointLength * magnify) +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' v ' + (-(sectionLength - indentation - legSize)) * magnify + ''} />
          <PathCut ID="left_leg_cut_seventh"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide) * magnify) + ',' + (startingPoint + (sectionWidth - indentation - legSize) * magnify) +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' v ' + ((PanelUpperJointLength + PanelUpperJointGap) * magnify) +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' v ' + (-(PanelUpperJointLength + PanelUpperJointGap) * magnify) +
              ' h ' + (PanelWidth / 3 * magnify) +
              ' h ' + ((legSize - PanelDistanceFromSide - PanelWidth - R2) * magnify) +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (legSize - 2 * R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (R2 * magnify) +
              ' h ' + (-(legSize - 2 * R2)) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (-R2 * magnify) + ' ' + (-R2 * magnify) +
              ' v ' + (-(legSize - 2 * R2)) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (-R2 * magnify) +
              ' Z '} />
          <PathVisible ID="front_support_seventh"
            path={'M' + (startingPoint + sectionWidth * magnify) + ',' + (startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify) +
              ' h ' + (-(sectionWidth - indentation - PanelDistanceFromSide - PanelWidth) * magnify) +
              ' v ' + (frontSupportLength - legSize + frontSupportDistanceFromSide) * magnify +
              ' h ' + (legSize - PanelDistanceFromSide - PanelWidth - R2) * magnify +
              ' a ' + (R2 * magnify) + ' ' + (R2 * magnify) + ' 0 0 1 ' + (R2 * magnify) + ' ' + (R2 * magnify) +
              ' v ' + (legSize - frontSupportDistanceFromSide - R2) * magnify +
              ' h ' + ((sectionWidth - indentation - legSize) * magnify) + ''} />
          <PathVisible ID="side_support_visible_seventh"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3 + sideSupportWidth) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify + ''} />

          {/** Cuts */}

          <PathDotted type={1} ID="horizontal_cut_seventh"
            path={'M' + (startingPoint - 10) + ',' + (startingPoint) +
              ' h ' + ((indentation + PanelDistanceFromSide + PanelWidth / 3 + sideSupportWidth) * magnify + 2 * 10)} />
          <PathDotted type={1} ID="vertical_cut_seventh"
            path={'M' + (startingPoint + sectionWidth * magnify) + ',' + (startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify - 10) +
              ' v ' + ((frontSupportLength + frontSupportDistanceFromSide + indentation) * magnify + 2 * 10)} />

          {/** Non-visible lines */}

          <PathDotted type={2} ID="plate-non-visible_seventh"
            path={'M' + (startingPoint) + ',' + (startingPoint) +
              ' v' + (sectionLength - corner) * magnify +
              ' a ' + (corner * magnify) + ' ' + (corner * magnify) + ' 0 0 0 ' + (corner * magnify) + ' ' + (corner * magnify) +
              ' h ' + (sectionWidth - corner) * magnify + ''} />
          <PathDotted type={2} ID="side-front_support_non_visible_1_seventh"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify +
              ' h' + (PanelWidth / 3 * 2) * magnify +
              ' m ' + (-PanelWidth / 3 * 2) * magnify + ' 0 ' +
              ' v ' + (sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap) * magnify +
              ' h ' + (sideSupportWidth) * magnify +
              ' v ' + (-(sideSupportFrontSupportJointWidth + sideSupportFrontSupportJointGap)) * magnify +
              ' m 0 ' + ((sideSupportFrontSupportJointWidth) * magnify) +
              ' h ' + (-sideSupportWidth) * magnify} />
          <PathDotted type={2} ID="side-front_support_non_visible_1_seventh"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3 * 2) * magnify) + ',' + (startingPoint + (sectionLength - indentation - legSize) * magnify) +
              ' h ' + (-PanelWidth / 3) * magnify +
              ' v ' + (-(frontSupportLength - legSize + frontSupportDistanceFromSide) * magnify) +
              ' h ' + (PanelWidth / 3 * 2) * magnify + ''} />
          <PathDotted type={2} ID="side_panel_indentation_and_gap_seventh"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify) + ',' + (startingPoint + (sectionLength - indentation - legSize) * magnify) +
              ' v ' + (PanelLowerJointL + PanelUpperJointGap) * magnify +
              ' h ' + (PanelWidth / 3) * magnify +
              ' v ' + (-(PanelLowerJointL + PanelUpperJointGap)) * magnify +
              ' m 0 ' + (PanelLowerJointL * magnify) +
              ' h ' + (-PanelWidth / 3 * magnify)} />
          <PathDotted type={2} ID="front_support_indentation_seventh"
            path={'M' + (startingPoint + (indentation + legSize) * magnify) + ',' + (startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide) * magnify) +
              ' h ' + (-(legFrontSupportJointWidth + legFrontSupportJointGap) * magnify) +
              ' v ' + (-legFrontSupportJointLength * magnify) +
              ' h ' + ((legFrontSupportJointWidth + legFrontSupportJointGap) * magnify) +
              ' m ' + (-(legFrontSupportJointWidth) * magnify) + ' 0 ' +
              ' v ' + (legFrontSupportJointLength * magnify) + ''} />

          {/** Horizontal measures - above drawing */}

          <HorizontalMeasure ID="side_panel_side_support_overlap_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={PanelWidth / 3 * 2}
            magnify={magnify} />
          <HorizontalMeasure ID="side_panel_width_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide) * magnify}
            y={startingPoint - measureOffset}
            value={PanelWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="side_support_width_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify}
            y={startingPoint - measureOffset * 1.5}
            value={sideSupportWidth}
            magnify={magnify} />

          {/** Horizontal measures - below drawing */}

          <HorizontalMeasure ID="panel_width_third_1_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="panel_width_third_2_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={PanelWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="front_support_indentation_gap_seventh"
            x={startingPoint + (indentation + legSize - legFrontSupportJointWidth) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointGap}
            magnify={magnify} />
          <HorizontalMeasure ID="front_support_indentation_width_seventh"
            x={startingPoint + (indentation + legSize - legFrontSupportJointWidth) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 0.5}
            value={legFrontSupportJointWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="side_panel_distance_from_side_seventh"
            x={startingPoint + (indentation) * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset}
            value={PanelDistanceFromSide}
            magnify={magnify} />
          <HorizontalMeasure ID="indentation_horizontal_seventh"
            x={startingPoint}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={indentation}
            magnify={magnify} />
          <HorizontalMeasure ID="legsize_horizontal_seventh"
            x={startingPoint + indentation * magnify}
            y={startingPoint + (sectionLength - indentation) * magnify + measureOffset * 1.5}
            value={legSize}
            magnify={magnify} />

          <PathNarrowLine ID="front_support_width_seventh_measure"
            path={'M' + (startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify) + ',' + (startingPoint + (sectionLength - indentation) * magnify + measureOffset * 2) +
              ' h ' + (sectionWidth - (indentation + PanelDistanceFromSide + PanelWidth / 3)) * magnify + ''} />
          <CircleMeasure ID="front_support_width_seventh_measure_circle"
            cx={(startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3) * magnify)}
            cy={(startingPoint + (sectionLength - indentation) * magnify + measureOffset * 2)} />
          <TextMeasure ID="front_support_width_seventh_measure_text"
            x={(startingPoint + (indentation + PanelDistanceFromSide + PanelWidth / 3 + (sectionWidth - (indentation + PanelDistanceFromSide + PanelWidth / 3)) / 2) * magnify)}
            y={(startingPoint + (sectionLength - indentation) * magnify + measureOffset * 2 - measureTextOffset)}
            value={width - (indentation + PanelDistanceFromSide + PanelWidth / 3) * 2}
            deg={0} />
          <PathNarrowLine ID="width_seventh_measure"
            path={'M' + (startingPoint) + ',' + (startingPoint + (sectionLength - indentation) * magnify + measureOffset * 2.5) +
              ' h ' + (sectionWidth) * magnify + ''} />
          <CircleMeasure ID="width_seventh_measure_circle"
            cx={startingPoint}
            cy={(startingPoint + (sectionLength - indentation) * magnify + measureOffset * 2.5)} />
          <TextMeasure ID="width_seventh_measure_text"
            x={(startingPoint + (sectionWidth) * magnify / 2)}
            y={(startingPoint + (sectionLength - indentation) * magnify + measureOffset * 2.5 - measureTextOffset)}
            value={width}
            deg={0} />

          {/** Vertical measures - right of drawing */}

          <VerticalMeasure ID="front_support_indentation_distance_from_side_seventh"
            x={startingPoint + sectionWidth * magnify + measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide) * magnify}
            value={legFrontSupportJointDstSide}
            magnify={magnify} />
          <VerticalMeasure ID="front_support_indentation_length_seventh"
            x={startingPoint + sectionWidth * magnify + measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - legFrontSupportJointDstSide - legFrontSupportJointLength) * magnify}
            value={legFrontSupportJointLength}
            magnify={magnify} />
          <VerticalMeasure ID="legsize_without_side_indentation_seventh"
            x={startingPoint + sectionWidth * magnify + measureOffset * 1}
            y={startingPoint + (sectionLength - indentation - legSize) * magnify}
            value={legSize - frontSupportDistanceFromSide}
            magnify={magnify} />
          <VerticalMeasure ID="front_support_length_seventh"
            x={startingPoint + sectionWidth * magnify + measureOffset * 1.5}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify}
            value={frontSupportLength}
            magnify={magnify} />
          <VerticalMeasure ID="indentation_vertical_seventh"
            x={startingPoint + sectionWidth * magnify + measureOffset * 1.5}
            y={startingPoint + (sectionLength - indentation) * magnify}
            value={indentation}
            magnify={magnify} />

          {/** Vertical measures - left of drawing */}

          <VerticalMeasure ID="side_support_front_support_overlap_length_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide) * magnify - measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength) * magnify}
            value={sideSupportFrontSupportJointWidth}
            magnify={magnify} />
          <VerticalMeasure ID="side_support_front_support_overlap_gap_seventh"
            x={startingPoint + (indentation + PanelDistanceFromSide) * magnify - measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify}
            value={sideSupportFrontSupportJointGap}
            magnify={magnify} />
          <VerticalMeasure ID="panel_lower_joint_l_seventh"
            x={startingPoint + indentation * magnify - measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - legSize) * magnify}
            value={PanelLowerJointL}
            magnify={magnify} />
          <VerticalMeasure ID="panel_lower_joint_l_gap_seventh"
            x={startingPoint + indentation * magnify - measureOffset * 0.5}
            y={startingPoint + (sectionLength - indentation - legSize + PanelLowerJointL) * magnify}
            value={PanelUpperJointGap}
            magnify={magnify} />
          <VerticalMeasure ID="legsize_vertical_seventh"
            x={startingPoint + indentation * magnify - measureOffset}
            y={startingPoint + (sectionLength - indentation - legSize) * magnify}
            value={legSize}
            magnify={magnify} />

          <PathNarrowLine ID="side_support_length_seventh_measure"
            path={'M' + (startingPoint - measureOffset * 0.5) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify + ''} />
          <CircleMeasure ID="side_support_length_seventh_measure_circle"
            cx={startingPoint - measureOffset * 0.5}
            cy={(startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) * magnify)} />
          <TextMeasure ID="side_support_length_seventh_measure_text"
            x={(startingPoint - measureOffset * 0.5 - measureTextOffset)}
            y={(startingPoint + (sectionLength - indentation - frontSupportDistanceFromSide - frontSupportLength + sideSupportFrontSupportJointWidth) / 2 * magnify)}
            value={length - (indentation * 2 + PanelDistanceFromSide + frontSupportDistanceFromSide + frontSupportLength + PanelWidth - sideSupportFrontSupportJointWidth * 2)}
            deg={270} />

          <PathNarrowLine ID="side_panel_length_seventh_measure"
            path={'M' + (startingPoint - measureOffset) + ',' + (startingPoint) +
              ' v ' + (sectionLength - indentation - legSize + PanelLowerJointL) * magnify + ''} />
          <CircleMeasure ID="side_panel_length_seventh_measure_circle"
            cx={startingPoint - measureOffset}
            cy={(startingPoint + (sectionLength - indentation - legSize + PanelLowerJointL) * magnify)} />
          <TextMeasure ID="side_panel_length_seventh_measure_text"
            x={(startingPoint - measureOffset - measureTextOffset)}
            y={(startingPoint + (sectionLength - indentation - legSize + PanelLowerJointL) / 2 * magnify)}
            value={length - (indentation + legSize - PanelLowerJointL) * 2}
            deg={270} />

          <PathNarrowLine ID="length_seventh_measure"
            path={'M' + (startingPoint - measureOffset * 1.5) + ',' + (startingPoint) +
              ' v ' + (sectionLength) * magnify + ''} />
          <CircleMeasure ID="length_seventh_measure_circle"
            cx={startingPoint - measureOffset * 1.5}
            cy={(startingPoint + (sectionLength) * magnify)} />
          <TextMeasure ID="length_seventh_measure_text"
            x={(startingPoint - measureOffset * 1.5 - measureTextOffset)}
            y={(startingPoint + (sectionLength) / 2 * magnify)}
            value={length}
            deg={270} />
        </g>
      )
    }

    function EighthCircle() {
      const stretcherLength = 200;
      const middlestretcherindentationHeight = 30;
      setViewBoxValue(' ' + (startingPoint - ( frameSide)) +
      ' ' + (startingPoint - (measureOffset * 1 + measureTextOffset + frameSide)) +
      ' ' + ((frameSide) + stretcherLength * magnify + measureOffset * 1.5 + frameSide) +
      ' ' + ((measureOffset * 1 + measureTextOffset + frameSide) + (sideStretcherHeight+sideStretcherDistanceFromGround) * magnify + ( frameSide)) + ' ');
      return (
        <g id="eighth">
          {/**Visible lines */}
          <PathVisible ID="side_stretcher_eighth"
            path={'M' + (startingPoint) + ',' + (startingPoint) +
              ' h' + (stretcherLength * magnify) +
              ' m ' + (-stretcherLength * magnify) + ' ' + (sideStretcherHeight * magnify) +
              ' h ' + (stretcherLength * magnify) + ''} />
          <RectangleElementCutRound ID="rear_middle_stretcher_eighth"
            x={startingPoint + ((stretcherLength - middleStretcherDistance) / 2 - middleStretcherWidth) * magnify}
            y={startingPoint + (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            width={middleStretcherWidth * magnify}
            height={middleStretcherHeight * magnify}
            rx={R2 * magnify}
            ry={R2 * magnify} />
          <RectangleElementCutRound ID="front_middle_stretcher_eighth"
            x={startingPoint + ((stretcherLength + middleStretcherDistance) / 2) * magnify}
            y={startingPoint + (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            width={middleStretcherWidth * magnify}
            height={middleStretcherHeight * magnify}
            rx={R2 * magnify}
            ry={R2 * magnify} />
          <RectangleElementDotted type={2} ID="rear_middle_stretcher_indentation_eighth"
            x={startingPoint + ((stretcherLength - middleStretcherDistance) / 2 - middleStretcherWidth / 3 * 2) * magnify}
            y={startingPoint + (sideStretcherHeight - middlestretcherindentationHeight) / 2 * magnify}
            width={middleStretcherWidth / 3 * magnify}
            height={middlestretcherindentationHeight * magnify} />
          <RectangleElementDotted type={2} ID="front_middle_stretcher_indentation_eighth"
            x={startingPoint + ((stretcherLength + middleStretcherDistance) / 2 + middleStretcherWidth / 3) * magnify}
            y={startingPoint + (sideStretcherHeight - middlestretcherindentationHeight) / 2 * magnify}
            width={middleStretcherWidth / 3 * magnify}
            height={middlestretcherindentationHeight * magnify} />
          <PathVisible ID="ground_eighth"
            path={'M' + (startingPoint - 20) + ',' + (startingPoint + (sideStretcherHeight + sideStretcherDistanceFromGround) * magnify) +
              ' h' + (stretcherLength * magnify + 40)} />

          {/**Cuts */}

          <PathDotted type={1} ID="left_cut_eighth"
            path={'M' + (startingPoint) + ',' + (startingPoint - measureOffset) +
              ' v' + (sideStretcherHeight * magnify + measureOffset * 2)} />
          <PathDotted type={1} ID="right_cut_eighth"
            path={'M' + (startingPoint + stretcherLength * magnify) + ',' + (startingPoint - measureOffset) +
              ' v' + (sideStretcherHeight * magnify + measureOffset * 2)} />

          {/**Horizontal measures */}

          <HorizontalMeasure ID="middle_stretchers_distance_eighth"
            x={startingPoint + (stretcherLength - middleStretcherDistance) / 2 * magnify}
            y={startingPoint - measureOffset}
            value={middleStretcherDistance}
            magnify={magnify} />
          <HorizontalMeasure ID="middle_stretchers_width_eighth"
            x={startingPoint + (stretcherLength + middleStretcherDistance) / 2 * magnify}
            y={startingPoint - measureOffset}
            value={middleStretcherWidth}
            magnify={magnify} />
          <HorizontalMeasure ID="middle_stretchers_width_1_eighth"
            x={startingPoint + ((stretcherLength + middleStretcherDistance) / 2 + middleStretcherWidth / 3) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={middleStretcherWidth / 3}
            magnify={magnify} />
          <HorizontalMeasure ID="middle_stretchers_width_2_eighth"
            x={startingPoint + ((stretcherLength + middleStretcherDistance) / 2 + middleStretcherWidth / 3 * 2) * magnify}
            y={startingPoint - measureOffset * 0.5}
            value={middleStretcherWidth / 3}
            magnify={magnify} />

          {/**Vertical measures */}

          <VerticalMeasure ID="middle_stretcher_indentation_difference_eighth"
            x={startingPoint + stretcherLength * magnify + measureOffset * 0.5}
            y={startingPoint + (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            value={(middleStretcherHeight - middlestretcherindentationHeight) / 2}
            magnify={magnify} />
          <VerticalMeasure ID="middle_stretcher_indentation_height_eighth"
            x={startingPoint + stretcherLength * magnify + measureOffset * 0.5}
            y={startingPoint + (sideStretcherHeight - middlestretcherindentationHeight) / 2 * magnify}
            value={(middlestretcherindentationHeight)}
            magnify={magnify} />
          <VerticalMeasure ID="middle_stretcher_height_eighth"
            x={startingPoint + stretcherLength * magnify + measureOffset * 1}
            y={startingPoint + (sideStretcherHeight - middleStretcherHeight) / 2 * magnify}
            value={(middleStretcherHeight)}
            magnify={magnify} />
          <VerticalMeasure ID="middle_stretcher_distance_from_side_eighth"
            x={startingPoint + stretcherLength * magnify + measureOffset * 1}
            y={startingPoint + ((sideStretcherHeight - middleStretcherHeight) / 2 + middleStretcherHeight) * magnify}
            value={(sideStretcherHeight - middleStretcherHeight) / 2}
            magnify={magnify} />
          <VerticalMeasure ID="side_stretcher_height__eighth"
            x={startingPoint + stretcherLength * magnify + measureOffset * 1.5}
            y={startingPoint}
            value={sideStretcherHeight}
            magnify={magnify} />

          <VerticalMeasure ID="side_stretcher_distance_from_ground_eighth"
            x={startingPoint + stretcherLength * magnify + measureOffset * 1.5}
            y={startingPoint + sideStretcherHeight * magnify}
            value={sideStretcherDistanceFromGround}
            magnify={magnify} />

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

