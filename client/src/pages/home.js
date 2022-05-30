import { useState } from "react";
import FrameModal from "../component/FrameModal";
// import { Modal } from 'react-bootstrap';

const Home = () => {
    const [selfieimage, setSelfieImage] = useState({ preview: "" });
    const [backgroundimage, setBackgroundImage] = useState({ preview: "" });
    const [selectedFrame, setSelectedFrame] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const changeSelfieHandler = (e) => {
        if (e.target.files.length) {
            setSelfieImage({
                preview: URL.createObjectURL(e.target.files)
            });
            console.log(selfieimage.preview);
        }
    };

    const changeBackgroundHandler = (e) => {
        if (e.target.files.length) {
            setBackgroundImage({
                preview: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const changeFrameHandler = (e) => {
        setModalShow(true);
    }

    const addFrame = (e) => {
        setSelectedFrame(e["item"]);
        // alert(e["item"]);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <div className="image-load selfie-img">
                        {
                            selfieimage.preview ? (<>

                                {
                                    selectedFrame ? (<><img src={selfieimage.preview} alt="dummy" width="93%" height="97%" /><img className="selected-frame" src={selectedFrame} alt="dummy" width="100%" height="100%" /></>) : (<img src={selfieimage.preview} alt="dummy" width="100%" height="100%" />)
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
                            open={modalShow}
                            onClose={() => setModalShow(false)}
                            selectedFrame={addFrame}
                        />
                    </div>
                    {/* <div>
                        {
                            selfieimage.preview ?
                        }
                    </div> */}
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
                    <div className="image-load"></div>
                    <div className="d-flex"><button>Combine</button></div>
                </div>
            </div>
        </div>
    )
}

export default Home;