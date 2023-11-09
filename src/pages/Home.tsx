import { IonContent, IonItem, IonHeader, IonLabel,IonPage, IonSelect, IonTitle, IonToolbar, IonSelectOption, IonButton } from '@ionic/react';
import './Home.css';
import React, { useState } from 'react';
import './svg-lines.css';
import { ChairView } from './components';
import { isPlatform  } from '@ionic/react';

const Home: React.FC = () => {
  const [furniture, setFurniture]=useState('');
  const isMobile=(isPlatform('pwa') || isPlatform('mobile') || isPlatform('mobileweb') || isPlatform('android'));
  const alertOptions = {
    header: 'Bútor kiválasztása',
    subHeader: 'Figyelem!',
    message: 'Váltás esetén az eddig felvitt adatok elvesznek!',
  };
  if(isMobile)
  {
    goFullScreen();
  }
  var FurnitureSelected=() =>{
    switch (furniture) {
      case 'chair':
        window.screen.orientation.unlock();
        return <ChairView></ChairView>;
      case 'table':
        {
          if(isMobile)
          {
            window.screen.orientation.lock("landscape-primary");
          }
          return <ChairView></ChairView>
        }
      default:
        return <></>;
    }
  }

  async function goFullScreen(){
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
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
        <IonItem>
        <IonLabel>Bútor típusa</IonLabel>
          <IonSelect onIonChange={(ev)=>{setFurniture(ev.detail.value);}}interface='alert' interfaceOptions={alertOptions}>
            <IonSelectOption value="chair">Szék</IonSelectOption>
            <IonSelectOption value="table">Asztal</IonSelectOption>
            <IonSelectOption value="other">Más</IonSelectOption>
          </IonSelect>
        </IonItem>
        {FurnitureSelected()}
        {/**<ChairView />
        <IonGrid >
          <IonRow>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Magasság(mm)</IonLabel>
                <IonInput onIonInput={(e:any)=>setHeightValue(e.target.value)}  id='height' name='height' inputMode="decimal" type="number" min={0} ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Szélesség(mm)</IonLabel>
                <IonInput onIonInput={(e:any)=>setWidthValue(e.target.value)} id='width' name='width' type="number" min={0}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Hosszúság(mm)</IonLabel>
                <IonInput onIonInput={(e:any)=>setLengthValue(e.target.value)} id='length' name='length' type="number" min={0}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='auto'>
              <IonItem>
                <IonLabel>Anyagvastagság(mm)</IonLabel>
                <IonInput onIonInput={(e:any)=>setThicknessValue(e.target.value)} id='thickness' name='thickness' type="number" min={0}></IonInput>
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

        <IonRow >
          <SVGPicture id="t_front" HeightValue={heightValue} WidthValue={widthValue} LengthValue={lengthValue} ThicknessValue={thicknessValue}/>
          <SVGPicture id="t_side" HeightValue={heightValue} WidthValue={widthValue} LengthValue={lengthValue} ThicknessValue={thicknessValue}/>
          <SVGPicture id="t_top" HeightValue={heightValue} WidthValue={widthValue} LengthValue={lengthValue} ThicknessValue={thicknessValue}/>
        </IonRow>
        <IonRow >
          <SVGPicture id="first_circle" HeightValue={heightValue} WidthValue={widthValue} LengthValue={lengthValue} ThicknessValue={thicknessValue}/>
          <SVGPicture id="second_circle" HeightValue={heightValue} WidthValue={widthValue} LengthValue={lengthValue} ThicknessValue={thicknessValue}/>
          <SVGPicture id="third_circle" HeightValue={heightValue} WidthValue={widthValue} LengthValue={lengthValue} ThicknessValue={thicknessValue}/>
        </IonRow>
  </IonGrid>*/}
      </IonContent>
    </IonPage>
  );
};

export default Home;
