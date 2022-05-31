import { useEffect, useState } from "react";
import FrameModal from "../component/FrameModal";
import SelfieModal from "../component/SelfieModal";
import SelfieResizeDrag from "../component/SelfieResize";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React from 'react';
/**
 * props variable:
 *      selframe - This is selected frame file path
 *      selfie   - This is selected selfie file path
 *      bgimg    - This is background image file path
 * This class is implemented to export as a image file for Merge image section.
 */
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
/**
 * This class implemented to export as a image whenever click export buttons(JPG, PNG, PDF)
 */
class ExportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <ComponentToPrint bgimg={this.props.bgimg} selframe={this.props.selframe} selfie={this.props.selfie} ref={this.componentRef} />
        <div style={{ marginTop: "47px" }}>
          <button className="btn-export" onClick={() => exportComponentAsJPEG(this.componentRef)}>
            Export As JPEG
          </button>
          <button className="btn-export" onClick={() => exportComponentAsPNG(this.componentRef)}>
            Export As PNG
          </button>
          <button className="btn-export" onClick={() => exportComponentAsPDF(this.componentRef)}>
            Export As PDF
          </button>
        </div>
      </React.Fragment>
    );
  }
}
/**
 * 
 * @returns 
 * State variable:
 *     selfieimage:It is stored image file paths for selected file from SelfieModal
 *     selectedSelfie: This is selected selfie file path
 *     backgroundimage: This is selected background image file path
 *     selectedFrame  : This is selected frame image file path
 *     frameModalShow  : This is determined to show or not for frameModal.
 *     selfieModalShow  : This is determined to show or not for selfieModal.
 */
const Home = () => {
  const [selfieimage, setSelfieImage] = useState([]);
  const [selectedSelfie, setSelectedSelfie] = useState("/assets/images/default.png");
  const [backgroundimage, setBackgroundImage] = useState({ preview: "/assets/images/default.png" });
  const [selectedFrame, setSelectedFrame] = useState("/assets/images/default.png");
  const [frameModalShow, setFrameModalShow] = useState(false);
  const [selfieModalShow, setSelfieModalShow] = useState(false);

  //This function is when click selfie button.(It is stored selected file paths)
  const changeSelfieHandler = (e) => {
    const temp = [];
    if (e.target.files.length) {
      for (var i = 0; i < e.target.files.length; i++) {
        temp.push(URL.createObjectURL(e.target.files[i]));
      }
      setSelfieImage(temp);
    }
  };

  //Ths function is when click background button
  const changeBackgroundHandler = (e) => {
    sessionStorage.setItem('setBgImg', URL.createObjectURL(e.target.files[0]));
    if (e.target.files.length) {
      setBackgroundImage({
        preview: URL.createObjectURL(e.target.files[0])
      });

    }
  };

  //This function is when click frame button
  const changeFrameHandler = (e) => {
    setFrameModalShow(true);
  }

  //This function adds selected frame file path into selectedframe state variable
  const addFrame = (e) => {
    setSelectedFrame(e["item"]);
  }

  //This function adds selected selfie file path into selectedselfie state variable
  const addSelfie = (e) => {
    setSelectedSelfie(e["item"]);
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
                    selectedFrame != "/assets/images/default.png" ? (<><img src={selectedSelfie} alt="dummy" width="93%" height="97%" /><img className="selected-frame" src={selectedFrame} alt="dummy" width="100%" height="100%" /></>) : (<img src={selectedSelfie} alt="dummy" width="100%" height="100%" />)
                  }
                </>
              ) : (<img src={selectedSelfie} alt="dummy" width="100%" height="100%" />)
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
            <ExportComponent bgimg={backgroundimage.preview} selframe={selectedFrame} selfie={selectedSelfie} />
          </div>
          <p>Merge Image</p>
        </div>
      </div>
      <div><img className="social" src="assets/images/social.png" alt="dummy" /></div>
    </div >
  )
}
export default Home;