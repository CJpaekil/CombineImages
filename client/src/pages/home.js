import { useEffect, useState } from "react";
import FrameModal from "../component/FrameModal";
import SelfieModal from "../component/SelfieModal";
import SelfieResizeDrag from "../component/SelfieResize";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useRef } from 'react';

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <img src={this.props.bgimg} alt="" width="100%" height="100%" />
        <img className="selected-frame" src={this.props.selframe} alt="" width="100%" height="100%" />
        <SelfieResizeDrag selfiesrc={this.props.selfie} />
      </div>
    );
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <ComponentToPrint bgimg={this.props.bgimg} selframe={this.props.selframe} selfie={this.props.selfie} ref={this.componentRef} />
        <button onClick={() => exportComponentAsJPEG(this.componentRef)}>
          Export As JPEG
        </button>
        <button onClick={() => exportComponentAsPNG(this.componentRef)}>
          Export As PNG
        </button>
        <button onClick={() => exportComponentAsPDF(this.componentRef)}>
          Export As PDF
        </button>
      </React.Fragment>
    );
  }
}


const Home = () => {
  const [selfieimage, setSelfieImage] = useState([]);
  const [selectedSelfie, setSelectedSelfie] = useState(null);
  const [backgroundimage, setBackgroundImage] = useState({ preview: "" });
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [frameModalShow, setFrameModalShow] = useState(false);
  const [selfieModalShow, setSelfieModalShow] = useState(false);
  const exportRef = useRef();

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
    sessionStorage.setItem('setBgImg', URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
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
    sessionStorage.setItem('setSelFrame', e["item"]);
  }

  const addSelfie = (e) => {
    setSelectedSelfie(e["item"]);
    sessionStorage.setItem('setSelfie', e["item"]);
  }

  const exportChange = () => {
    var exportType = document.getElementById("exportSelect").value;
    // switch (exportType) {
    //   case "JPG":
    //     exportComponentAsJPEG(componentRef);
    //     break;
    //   case "PNG":
    //     exportComponentAsPNG(componentRef)
    //     break;
    //   case "PDF":
    //     exportComponentAsPDF(componentRef)
    //     break;
    //   default:
    //     break;
    // }
  }

  useEffect(() => {
    if (selfieimage.length > 0) {
      if (selfieimage.length === 1) {
        setSelectedSelfie(selfieimage[0]);
        sessionStorage.setItem('setSelfie', selfieimage[0]);
      }
      else {
        setSelfieModalShow(true);
      }
    }

  }, [selfieimage])

  useEffect(() => {
    sessionStorage.clear();
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 col-12">
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
          <div>
            <div className="d-flex justify-content-left"><input type="file" className="btn-files" multiple name="Choose Selfie" accept="image/png, image/gif, image/jpeg" onChange={changeSelfieHandler} title=" " /></div>
            <div className="d-flex justify-content-left" style={{ marginTop: "10px" }}><input type="button" className="btn-files" value="Choose Frame" onClick={() => changeFrameHandler()} /></div>
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
        <div className="col-sm-4 col-12 background-img">
          <div className="image-load">
            {
              backgroundimage.preview ? (
                <img src={backgroundimage.preview} alt="dummy" width="100%" height="100%" />
              ) : (<></>)
            }
          </div>
          <p>Background image </p>
          <div className="d-flex centered"><input type="file" className="btn-files" name="Choose Background" accept="image/png, image/gif, image/jpeg" onChange={changeBackgroundHandler} title=" " /></div>
        </div>
        <div className="col-sm-4 col-12 combined-img">
          <div className="image-load" id="mergeImage">
            <MyComponent bgimg={backgroundimage.preview} selframe={selectedFrame} selfie={selectedSelfie} />
          </div>
          <p>Merge Image</p>
        </div>
      </div>
    </div >
  )
}
export default Home;