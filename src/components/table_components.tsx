import { useState, useContext, useEffect, createContext } from "react";
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonToggle } from "@ionic/react";
import { RectangleElement, RectangleElementCut, RectangleElementCutRound, RectangleElementRound, PathCut, PathDotted, PathNarrowLine, PathVisible, Polyline, PolylineDotted, CircleMeasure, CircleView, Cut, TextMeasure, TextString, Arrow, CutPattern } from './drawingelements'
import { downloadDrawing } from "./converter";

var length = 700;
var width = 1200;
var height = 730;
var thickness = 21;
var corner = 2;
var startingPoint = 200;

var arrowOffset = 50;
var textOffset = 30;
var measureOffset = 50;
var measureTextOffset = 10;

var legSize = 50;

var sideCrossLegWidth = 21;
var sideCrossLegDistanceFromSide = 5;
var sideCrossLegDistanceFromGround = 100;
var sideCrossLegHeight = 70;

var middleCrossLegHeight = 50;
var middleCrossLegWidth = 21;
var middleCrossLegDistance = 80;
var middleCrossLegDistanceFromGround = 110;

var indentation = 35;
var R2 = 2;

var drawerTotalHeight = 120;
var drawerBoardHeight = 21;
var drawerHeight = 95;

var plateLegJointHeight = 120;
var plateLegJointDistanceFromSide = 5;
var plateLegJointWidth = 21;

var sideSupportHeight = 21;
var sideSupportWidth = 70;
var sideSupportLength = 70;
var sideSupportDistanceFromSide = 5;

var drawerSlideHeight1 = 21;
var drawerSlideHeight2 = 3;
var drawerSlideWidth1 = 21;
var drawerSlideWidth2 = 25;

var drawerSideDistanceFromPlate = 1;
var drawerSideHeight = drawerTotalHeight - sideSupportHeight - drawerSlideHeight2 - drawerSideDistanceFromPlate;
var drawerSideWidth = 21;
var drawerSideDistanceFromLeg = 1;

var trayBottomHeight = 5;
var trayBottomIndentation = 7;
var trayBottomDistanceFromBottom = 17;
var trayBottomDistanceFromLeg = 74;

var drawerHorizontalUpperPartHeight = 14;

var drawerFrontHeight=97;
var drawerFrontWidth=21;
var drawerFrontDistanceFromPlate=1;
var drawerFrontDistanceFromBottom=1;
var drawerFrontDistanceFromSide=5;

var concaveElementHeight=18;
var concaveElementWidthRect=7;
var concaveElementWidthTri=20;

var drawerBackHeight=60;
var drawerBackWidth=15;




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
        setViewBoxValue('0 0 1500 1500');
      },
        [width, height, thickness]);
      return (
        <g id="front">
          {/**Leftside */}
          <PathVisible ID="plate_part_visible_front" path={'M' + (startingPoint + width / 2) + ',' + startingPoint + ' h' + (-(width / 2 - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (-corner) + ' ' + (corner) + ' v' + (thickness - corner * 2) + ' a' + (corner) + ' ' + (corner) + ' 0 0 0 ' + (corner) + ' ' + (corner) + ' h' + (width / 2 - corner)} />
          <RectangleElement ID="left_leg_front" x={(startingPoint + indentation)} y={(startingPoint + thickness)} width={legSize} height={(height - thickness)} />
          <RectangleElement ID="middle_crossleg_front" x={(startingPoint + indentation + legSize)} y={(startingPoint + height - middleCrossLegDistanceFromGround - middleCrossLegHeight)} width={(width - (indentation + legSize) * 2 + (legSize - sideCrossLegWidth - sideCrossLegDistanceFromSide))} height={middleCrossLegHeight} />
          <PathVisible ID="drawer_part_front" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerTotalHeight) + ' h' + (-(width / 2 - indentation - legSize)) + ' v' + (-drawerBoardHeight) + ' h' + (width / 2 - legSize - indentation) + ''} />

          {/**Rightside */}
          <PathCut ID="plate_part_cut_front" path={'M' + (startingPoint + width / 2) + ',' + startingPoint + ' h' + ((width / 2 - corner)) + ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (corner) + ' ' + (corner) + ' v' + (thickness - corner * 2) + ' a' + (corner) + ' ' + (corner) + ' 0 0 1 ' + (-corner) + ' ' + (corner) + ' h' + (-(width / 2 - corner))} />
          <RectangleElementCutRound ID="crossleg_width_front" x={(startingPoint + width - indentation - sideCrossLegDistanceFromSide - sideCrossLegWidth)} y={(startingPoint + height - sideCrossLegDistanceFromGround - sideCrossLegHeight)} width={sideCrossLegWidth} height={sideCrossLegHeight} rx={2} ry={2} />
          <PathVisible ID="drawer_board_and_inner_rightleg_front" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerTotalHeight) + ' h' + (width / 2 - legSize - indentation) + ' v' + (height - thickness - drawerTotalHeight - middleCrossLegDistanceFromGround - middleCrossLegHeight) + ' m 0 ' + (middleCrossLegHeight) + ' v' + (middleCrossLegDistanceFromGround) + ' h' + (legSize) + ' v' + (-(height - thickness)) + ' '} />
          <PathCut ID="plate_leg_joint_front" path={'M' + (startingPoint + width - indentation - plateLegJointDistanceFromSide) + ',' + (startingPoint + thickness) + ' v' + (plateLegJointHeight) + ' h' + (-(plateLegJointWidth / 3)) + ' v' + (-sideSupportHeight) + ' h' + (-(plateLegJointWidth * (2 / 3))) + ' v' + (-(plateLegJointHeight - sideSupportHeight)) + ''} />
          <RectangleElementCut ID="leg_drawer_joint_front" x={(startingPoint + width - indentation - plateLegJointDistanceFromSide - plateLegJointWidth / 3 - sideSupportWidth)} y={(startingPoint + thickness + drawerTotalHeight - sideSupportHeight)} width={sideSupportWidth} height={sideSupportHeight} />
          <PathCut ID="leg_drawer_slide_front" path={'M' + (startingPoint + width - indentation - legSize - drawerSlideWidth2) + ',' + (startingPoint + thickness + plateLegJointHeight - sideSupportHeight) + ' h' + (drawerSlideWidth1 + drawerSlideWidth2) + ' v' + (-drawerSlideHeight1) + ' h' + (-drawerSlideWidth1) + ' v' + (drawerSlideHeight1 - drawerSlideHeight2) + ' h' + (-drawerSlideWidth2) + ' Z'} />
          <PathCut ID="drawer_side_front" path={'M' + (startingPoint + width - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth) + ',' + (startingPoint + thickness + drawerSideDistanceFromPlate + drawerSideHeight) + ' v' + (-(drawerSideHeight - 2)) + 'a' + (2) + ' ' + (2) + ' 0 0 1 ' + (2) + ' ' + (-2) + ' h' + (drawerSideWidth - 2 * 2) + ' a' + (2) + ' ' + (2) + ' 0 0 1 ' + (2) + ' ' + (2) + ' v' + (drawerSideHeight - 2)} />
          <PathVisible ID="drawer_horizontal_upper_part_front" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerHorizontalUpperPartHeight) + ' h' + (width / 2 - indentation - legSize - drawerSideDistanceFromPlate - drawerSideWidth)} />
          <PathCut ID="tray_bottom_front" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerSideDistanceFromPlate + drawerSideHeight - trayBottomDistanceFromBottom - trayBottomHeight) + ' h' + (width / 2 - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation) + ' v' + (trayBottomHeight) + ' h' + (-(width / 2 - indentation - legSize - drawerSideDistanceFromLeg - drawerSideWidth + trayBottomIndentation)) + ' '} />

          {/**C cut */}
          <PathDotted type={3} ID="cut_C_line" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + height + arrowOffset) + ' v' + (-(height + arrowOffset * 2)) + ' '} />
          <Arrow direction="right" ID="cut_C_arrow_top" x={(startingPoint + width / 2)} y={(startingPoint - arrowOffset)} />
          <Arrow direction="right" ID="cut_C_arrow_bottom" x={(startingPoint + width / 2)} y={(startingPoint + height + arrowOffset)} />
          <TextString ID="cut_C_text_top" x={(startingPoint + width / 2 + textOffset)} y={startingPoint - arrowOffset} value="C" />
          <TextString ID="cut_C_text_bottom" x={(startingPoint + width / 2 + textOffset)} y={startingPoint + height + arrowOffset} value="C" />

          {/**B cut */}
          <PathDotted type={3} ID="cut_B_line" path={'M' + (startingPoint + width / 2) + ',' + (startingPoint + thickness + drawerTotalHeight * 2 / 5) + ' h' + (width / 2 + arrowOffset) + ' '} />
          <Arrow direction="down" ID="cut_B_arrow" x={(startingPoint + width + arrowOffset)} y={(startingPoint + thickness + drawerTotalHeight * 2 / 5)} />
          <TextString ID="cut_B_text" x={(startingPoint + width + arrowOffset)} y={startingPoint + thickness + drawerTotalHeight * 2 / 5 + textOffset} value="B" />

          {/**Measurements */}
          <PathNarrowLine ID="measure_width_front" path={'M' + (startingPoint) + ',' + (startingPoint + height + arrowOffset + measureOffset * 2) + ' h' + (width) + ''} />
          <CircleMeasure ID="measure_width_circle_left_front" cx={startingPoint} cy={startingPoint + height + arrowOffset + measureOffset * 2} />
          <CircleMeasure ID="measure_width_circle_right_front" cx={startingPoint + width} cy={startingPoint + height + arrowOffset + measureOffset * 2} />
          <TextMeasure ID="measure_width_text_front" value={width} x={startingPoint + width / 2} y={startingPoint + height + arrowOffset + measureOffset * 2 - measureTextOffset} deg={0} />

          <PathNarrowLine ID="measure_leg_distance_front" path={'M' + (startingPoint + indentation + legSize) + ',' + (startingPoint + height + arrowOffset + measureOffset) + ' h' + (width - 2 * (legSize + indentation)) + ''} />
          <CircleMeasure ID="measure_leg_distance_circle_left_front" cx={startingPoint + indentation + legSize} cy={startingPoint + height + arrowOffset + measureOffset} />
          <CircleMeasure ID="measure_leg_distance_circle_right_front" cx={startingPoint + width - indentation - legSize} cy={startingPoint + height + arrowOffset + measureOffset} />
          <TextMeasure ID="measure_leg_distance_text_front" value={width - 2 * (legSize + indentation)} x={startingPoint + width / 2} y={startingPoint + height + arrowOffset + measureOffset - measureTextOffset} deg={0} />

          <PathNarrowLine ID="measure_middle_crossleg_height_front" path={'M' + (startingPoint + width / 3 * 2) + ',' + (startingPoint + height - middleCrossLegDistanceFromGround - middleCrossLegHeight) + ' v' + (middleCrossLegHeight) + ''} />
          <CircleMeasure ID="measure_middle_crossleg_height_circle_top_front" cx={(startingPoint + width / 3 * 2)} cy={startingPoint + height - middleCrossLegDistanceFromGround - middleCrossLegHeight} />
          <CircleMeasure ID="measure_middle_crossleg_height_circle_bottom_front" cx={(startingPoint + width / 3 * 2)} cy={startingPoint + height - middleCrossLegDistanceFromGround} />
          <TextMeasure ID="measure_middle_crossleg_height_text_front" value={middleCrossLegHeight} x={(startingPoint + width / 3 * 2 - measureTextOffset)} y={startingPoint + height - middleCrossLegDistanceFromGround - middleCrossLegHeight / 2} deg={270} />

        </g>
      )
    }

    function SideView() {
      const length = +(useContext(LengthContext));
      const height = +(useContext(HeightContext));
      const thickness = +(useContext(ThicknessContext));

      useEffect(() => {
        setViewBoxValue('0 0 1500 1500');
      },
        [length, height, thickness]);
      return (
        <g id="side">
          {/**Leg and Plate */}
          <RectangleElementCutRound ID="plate_part_cut_side" x={(startingPoint)} y={startingPoint} width={length} height={thickness} rx={corner} ry={corner} />
          <PathVisible ID="left_rear_leg_side" path={'M' + (startingPoint + indentation) + ',' + (startingPoint + thickness) + ' v' + (height - thickness) + ' h' + (legSize) + ' v' + (-(height - thickness - drawerTotalHeight)) + ' m 0 ' + (-(drawerBoardHeight)) + ' v' + (-(drawerTotalHeight - drawerBoardHeight)) + ''} />
          <RectangleElement ID="side_crosssleg_side" x={startingPoint + indentation + legSize} y={startingPoint + height - sideCrossLegDistanceFromGround - sideCrossLegHeight} width={length - 2 * (indentation + legSize)} height={sideCrossLegHeight} />
          <RectangleElementCut ID="middle_crossleg_rear_side" x={startingPoint + length / 2 - middleCrossLegDistance / 2 - middleCrossLegWidth} y={startingPoint + height - middleCrossLegDistanceFromGround - middleCrossLegHeight} width={middleCrossLegWidth} height={middleCrossLegHeight} />
          <RectangleElementCut ID="middle_crossleg_front_side" x={startingPoint + length / 2 + middleCrossLegDistance / 2} y={startingPoint + height - middleCrossLegDistanceFromGround - middleCrossLegHeight} width={middleCrossLegWidth} height={middleCrossLegHeight} />
          <PathVisible ID="left_front_leg_side" path={'M' + (startingPoint + length - indentation) + ',' + (startingPoint + thickness) + ' v' + (height - thickness) + ' h' + (-legSize) + ' v' + (-(height - thickness - drawerTotalHeight)) + ''} />
          {/**Drawer */}
          <PathCut ID="plate_leg_joint_left_rear_side" path={'M' + (startingPoint + indentation + plateLegJointDistanceFromSide) + ',' + (startingPoint + thickness) + ' v' + (plateLegJointHeight) + ' h' + (plateLegJointWidth) + ' v' + (-plateLegJointHeight)+''} />
          <PathCut ID="drawer front_side" path={'M' + (startingPoint +length - indentation - drawerFrontDistanceFromSide) + ',' + (startingPoint + thickness+drawerFrontDistanceFromPlate) + ' v' + (drawerFrontHeight) + ' h' + (-drawerFrontWidth) + ' v' + (-drawerFrontHeight)+''} />
          <RectangleElement ID="drawer_board_side" x={startingPoint+indentation+plateLegJointDistanceFromSide+plateLegJointWidth} y={startingPoint+thickness+plateLegJointHeight-drawerBoardHeight} width={length-indentation*2-plateLegJointDistanceFromSide-plateLegJointWidth-sideSupportDistanceFromSide-sideSupportLength} height={drawerBoardHeight}/>
          <RectangleElementCut ID="drawer_leg_joint_left_side" x={startingPoint+length-indentation-sideSupportDistanceFromSide-sideSupportLength} y={startingPoint+thickness+drawerFrontHeight+drawerFrontDistanceFromBottom+drawerFrontDistanceFromPlate} width={sideSupportLength} height={sideSupportHeight}/>
          <RectangleElementCut ID="tray_bottom_side" x={startingPoint+indentation+legSize+trayBottomDistanceFromLeg} y={startingPoint+thickness+drawerTotalHeight-drawerBoardHeight-trayBottomDistanceFromBottom-drawerSlideHeight2-trayBottomHeight} width={(length-legSize-indentation*2-trayBottomDistanceFromLeg-drawerFrontDistanceFromSide-drawerFrontWidth/3*2)} height={trayBottomHeight}/>
          <RectangleElementCut ID="drawer_back_side" x={startingPoint+indentation+legSize+trayBottomDistanceFromLeg} y={startingPoint+thickness+drawerTotalHeight-drawerBoardHeight-trayBottomDistanceFromBottom-drawerSlideHeight2-trayBottomHeight-drawerBackHeight} width={drawerBackWidth} height={drawerBackHeight}/>
          <RectangleElement ID="drawer_slide_side" x={startingPoint+indentation+legSize+trayBottomDistanceFromLeg-concaveElementWidthRect} y={startingPoint+thickness+drawerTotalHeight-drawerBoardHeight-drawerSlideHeight2} width={length-indentation*2-legSize-trayBottomDistanceFromLeg+concaveElementWidthRect-drawerFrontDistanceFromSide-drawerFrontWidth} height={drawerSlideHeight2} />
          <PathVisible ID="concave_element_side" path={'M'+(startingPoint+indentation+legSize+trayBottomDistanceFromLeg+concaveElementWidthTri)+','+(startingPoint+thickness+drawerTotalHeight-drawerBoardHeight-drawerSlideHeight2)+' h'+(-(concaveElementWidthRect+concaveElementWidthTri))+' v'+(-(trayBottomDistanceFromBottom+1))+' h'+(concaveElementWidthRect)+' v'+(concaveElementHeight-10.19)+' a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (R2) + ' ' + (R2) +' Z'}/>
          <PathVisible ID="drawer_other_side_side" path={'M'+(startingPoint+length-indentation-drawerFrontDistanceFromSide-drawerFrontWidth)+','+(startingPoint+thickness+drawerFrontDistanceFromPlate)+' h'+(-(length-indentation*2-legSize-drawerFrontDistanceFromSide-drawerFrontWidth-trayBottomDistanceFromLeg-concaveElementWidthTri))+' l'+(-(concaveElementWidthTri-R2))+','+(concaveElementWidthTri*0.24932-R2)+'a' + (R2) + ' ' + (R2) + ' 0 0 0 ' + (-R2) + ' ' + (R2)+' v'+(drawerTotalHeight-drawerBoardHeight-drawerSlideHeight2-trayBottomDistanceFromBottom-trayBottomHeight-drawerBackHeight)+'' }/>
          {/**Measures */}
            {/**Horizontal */}
          <PathNarrowLine ID="rear_leg_measure_side" path={'M'+(startingPoint+indentation)+','+(startingPoint+height+measureOffset)+' h'+(legSize)+''}/>
          <CircleMeasure ID="rear_leg_measure_circle_left_side" cx={startingPoint+indentation} cy={startingPoint+height+measureOffset}/> 
          <CircleMeasure ID="rear_leg_measure_circle_right_side" cx={startingPoint+indentation+legSize} cy={startingPoint+height+measureOffset}/> 
          <TextMeasure ID="rear_leg_measure_text_side" x={startingPoint+indentation+legSize/2} y={startingPoint+height+measureOffset-measureTextOffset} value={legSize} deg={0}/>

          <PathNarrowLine ID="front_leg_measure_side" path={'M'+(startingPoint+length-indentation)+','+(startingPoint+height+measureOffset)+' h'+(-legSize)+''}/>
          <CircleMeasure ID="front_leg_measure_circle_left_side" cx={startingPoint+length-indentation-legSize} cy={startingPoint+height+measureOffset}/> 
          <CircleMeasure ID="front_leg_measure_circle_right_side" cx={startingPoint+length-indentation} cy={startingPoint+height+measureOffset}/> 
          <TextMeasure ID="front_leg_measure_text_side" x={startingPoint+length-indentation-legSize/2} y={startingPoint+height+measureOffset-measureTextOffset} value={legSize} deg={0}/>

          <PathNarrowLine ID="middle_crossleg_distance_measure_side" path={'M'+(startingPoint+length/2-middleCrossLegDistance/2)+','+(startingPoint+height+measureOffset)+' h'+(middleCrossLegDistance)+''}/>
          <CircleMeasure ID="middle_crossleg_distance_measure_circle_left_side" cx={startingPoint+length/2-middleCrossLegDistance/2} cy={startingPoint+height+measureOffset}/> 
          <CircleMeasure ID="middle_crossleg_distance_measure_circle_right_side" cx={startingPoint+length/2+middleCrossLegDistance/2} cy={startingPoint+height+measureOffset}/> 
          <TextMeasure ID="middle_crossleg_distance_measure_text_side" x={startingPoint+length/2} y={startingPoint+height+measureOffset-measureTextOffset} value={middleCrossLegDistance} deg={0}/>

          <PathNarrowLine ID="leg_distance_measure_side" path={'M'+(startingPoint+indentation+legSize)+','+(startingPoint+height+measureOffset*2)+' h'+(length-2*(indentation+legSize))+''}/>
          <CircleMeasure ID="leg_distance_measure_circle_left_side" cx={startingPoint+indentation+legSize} cy={startingPoint+height+measureOffset*2}/> 
          <CircleMeasure ID="leg_distance_measure_circle_right_side" cx={startingPoint+length-indentation-legSize} cy={startingPoint+height+measureOffset*2}/> 
          <TextMeasure ID="leg_distance_measure_text_side" x={startingPoint+length/2} y={startingPoint+height+measureOffset*2-measureTextOffset} value={length-2*(indentation+legSize)} deg={0}/>

          <PathNarrowLine ID="length_measure_side" path={'M'+(startingPoint)+','+(startingPoint+height+measureOffset*3)+' h'+(length)+''}/>
          <CircleMeasure ID="length_measure_circle_left_side" cx={startingPoint} cy={startingPoint+height+measureOffset*3}/> 
          <CircleMeasure ID="length_measure_circle_right_side" cx={startingPoint+length} cy={startingPoint+height+measureOffset*3}/> 
          <TextMeasure ID="length_measure_text_side" x={startingPoint+length/2} y={startingPoint+height+measureOffset*3-measureTextOffset} value={length} deg={0}/>
            {/**Vertical */}
          <PathNarrowLine ID="thickness_measure_side" path={'M'+(startingPoint+length+measureOffset)+','+(startingPoint)+' v'+(thickness)+''}/>
          <CircleMeasure ID="thickness_measure_circle_top_side" cx={startingPoint+length+measureOffset} cy={startingPoint}/> 
          <CircleMeasure ID="thickness_measure_circle_bottom_side" cx={startingPoint+length+measureOffset} cy={startingPoint+thickness}/> 
          <TextMeasure ID="thickness_measure_text_side" x={startingPoint+length+measureOffset-measureTextOffset} y={startingPoint+thickness/2} value={thickness} deg={270}/>
          
          <PathNarrowLine ID="height_measure_side" path={'M'+(startingPoint+length+measureOffset*2)+','+(startingPoint)+' v'+(height)+''}/>
          <CircleMeasure ID="height_measure_circle_top_side" cx={startingPoint+length+measureOffset*2} cy={startingPoint}/> 
          <CircleMeasure ID="height_measure_circle_bottom_side" cx={startingPoint+length+measureOffset*2} cy={startingPoint+height}/> 
          <TextMeasure ID="height_measure_text_side" x={startingPoint+length+measureOffset*2-measureTextOffset} y={startingPoint+height/2} value={height} deg={270}/>
          
          <PathNarrowLine ID="side_crossleg_height_measure_side" path={'M'+(startingPoint+length+measureOffset)+','+(startingPoint+height-sideCrossLegDistanceFromGround-sideCrossLegHeight)+' v'+(sideCrossLegHeight)+''}/>
          <CircleMeasure ID="side_crossleg_height_measure_circle_top_side" cx={startingPoint+length+measureOffset} cy={startingPoint+height-sideCrossLegDistanceFromGround-sideCrossLegHeight}/> 
          <CircleMeasure ID="side_crossleg_height_measure_circle_bottom_side" cx={startingPoint+length+measureOffset} cy={startingPoint+height-sideCrossLegDistanceFromGround}/> 
          <TextMeasure ID="side_crossleg_height_measure_text_side" x={startingPoint+length+measureOffset-measureTextOffset} y={startingPoint+height-sideCrossLegDistanceFromGround-sideCrossLegHeight/2} value={sideCrossLegHeight} deg={270}/>

          <PathNarrowLine ID="side_crossleg_dstfromground_measure_side" path={'M'+(startingPoint+length+measureOffset)+','+(startingPoint+height-sideCrossLegDistanceFromGround)+' v'+(sideCrossLegDistanceFromGround)+''}/>
          <CircleMeasure ID="side_crossleg_dstfromground_measure_circle_top_side" cx={startingPoint+length+measureOffset} cy={startingPoint+height-sideCrossLegDistanceFromGround}/> 
          <CircleMeasure ID="side_crossleg_dstfromground_measure_circle_bottom_side" cx={startingPoint+length+measureOffset} cy={startingPoint+height}/> 
          <TextMeasure ID="side_crossleg_dstfromground_measure_text_side" x={startingPoint+length+measureOffset-measureTextOffset} y={startingPoint+height-sideCrossLegDistanceFromGround/2} value={sideCrossLegDistanceFromGround} deg={270}/>
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
          return /**<TopView />*/
        case "first_circle":
          setSize(12);
          return /**<FirstCircle />*/
        case "second_circle":
          setSize(12);
          return /**<SecondCircle />*/
        case "third_circle":
          setSize(12);
          return /**<ThirdCircle />*/
        case "fourth_circle":
          setSize(12);
          return /**<FourthCircle />*/
        case "fifth_circle":
          setSize(12);
          return /**<FifthCircle />*/
        case "sixth_circle":
          setSize(12);
          return /**<SixthCircle />*/
        case "seventh_circle":
          setSize(12);
          return /**<SeventhCircle />*/
        case "eighth_circle":
          setSize(12);
          return /**<EighthCircle />*/
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
              <IonButton>Exportálás</IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <SVGPicture id="front" />
          <SVGPicture id="side" />
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

