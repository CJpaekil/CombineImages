import { useEffect, useState } from "react";
import FrameModal from "../component/FrameModal";
import SelfieModal from "../component/SelfieModal";
import SelfieResizeDrag from "../component/SelfieResize";
import canvasToImage from 'canvas-to-image';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useRef } from 'react';



const Home = () => {
  const [selfieimage, setSelfieImage] = useState([]);
  const [selectedSelfie, setSelectedSelfie] = useState(null);
  const [backgroundimage, setBackgroundImage] = useState({ preview: "" });
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [frameModalShow, setFrameModalShow] = useState(false);
  const [selfieModalShow, setSelfieModalShow] = useState(false);
  const componentRef = useRef();

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <>
      {
        backgroundimage.preview ? (
          <img src={backgroundimage.preview} alt="dummy" width="100%" height="100%" />
        ) : (<></>)
      }
      {
        selectedFrame ? (<> <img className="selected-frame" src={selectedFrame} alt="dummy" width="100%" height="100%" /></>) : (<></>)
      }
      {
        selectedSelfie ? (<SelfieResizeDrag selfiesrc={selectedSelfie} />) : (<></>)
      }
    </>
  ));


  const changeSelfieHandler = (e) => {
    const temp = [];
    if (e.target.files.length) {
      for (var i = 0; i < e.target.files.length; i++) {
        temp.push(URL.createObjectURL(e.target.files[i]));
      }
      setSelfieImage(temp);
    }

  };

  const changeBackgroundHandler = (e) => {
    console.log(selfieimage);
    if (e.target.files.length) {
      setBackgroundImage({
        preview: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const changeFrameHandler = (e) => {
    setFrameModalShow(true);
  }

  const addFrame = (e) => {
    setSelectedFrame(e["item"]);
  }

  const addSelfie = (e) => {
    setSelectedSelfie(e["item"]);
  }

  const mergeTotalImages = () => {
    const canvasEl = document.getElementById('myCanvas');

    canvasToImage(canvasEl, {
      name: 'myJPG',
      type: 'jpg',
      quality: 0.5
    });

    canvasToImage('myCanvas', {
      name: 'myPNG',
      type: 'png',
      quality: 1
    });

    canvasToImage('myCanvas');
  }

  const exportChange = () => {
    var exportType = document.getElementById("exportSelect").value;
    alert(exportType);
  }

  useEffect(() => {

    if (selfieimage.length > 0) {
      if (selfieimage.length === 1) {
        setSelectedSelfie(selfieimage[0]);
      }
      else {
        setSelfieModalShow(true);
      }
    }

  }, [selfieimage])

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="image-load selfie-img">
            {
              selfieimage.length >= 1 ? (
                <>
                  {
                    selectedFrame ? (<><img src={selectedSelfie} alt="dummy" width="93%" height="97%" /><img className="selected-frame" src={selectedFrame} alt="dummy" width="100%" height="100%" /></>) : (<img src={selectedSelfie} alt="dummy" width="100%" height="100%" />)
                  }
                </>
              ) : (<></>)
            }
          </div>
          <p>Selfie image </p>
          <div className="d-flex">
            <input type="file" multiple name="Choose Files" accept="image/png, image/gif, image/jpeg" onChange={changeSelfieHandler} />
            <input type="button" value="Choose Files" onClick={() => changeFrameHandler()} />
            <FrameModal
              open={frameModalShow}
              onClose={() => setFrameModalShow(false)}
              selectedFrame={addFrame}
            />
            <SelfieModal
              open={selfieModalShow}
              onClose={() => setSelfieModalShow(false)}
              selfimages={selfieimage}
              selectedSelfie={addSelfie}
            />
          </div>
        </div>
        <div className="col-sm-4 background-img">
          <div className="image-load">
            {
              backgroundimage.preview ? (
                <img src={backgroundimage.preview} alt="dummy" width="100%" height="100%" />
              ) : (<></>)
            }
          </div>
          <p>Background image </p>
          <div className="d-flex"><input type="file" name="Choose Files" accept="image/png, image/gif, image/jpeg" onChange={changeBackgroundHandler} /></div>
        </div>
        <div className="col-sm-4 combined-img">
          <div className="image-load" id="mergeImage">
            <ComponentToPrint ref={componentRef} />
          </div>
          <div className="d-flex">
            <select defaultValue={'DEFAULT'} id="exportSelect" onChange={exportChange}>
              <option value="DEFAULT" disabled>Export</option>
              <option value="Jpeg">Export As JPEG</option>
              <option value="Png">Export As PNG</option>
              <option value="Pdf">Export As PDF</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;