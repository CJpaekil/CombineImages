import Modal from "react-bootstrap/Modal";

const FrameModal = ({ open, onClose, selectedFrame }) => {
    const framepaths = ["/assets/images/frame1.png", "/assets/images/frame2.png", "/assets/images/frame3.png", "/assets/images/frame4.png", "/assets/images/frame5.png", "/assets/images/frame6.png", "/assets/images/frame7.png", "/assets/images/frame8.png", "/assets/images/frame9.png"];
    const selectFrame = (framepath) => {
        onClose();
        selectedFrame(framepath);
    }
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={open}
            onHide={onClose}
            centered
        >
            <Modal.Body>
                <div style={{ textAlign: "center", fontSize: "20px" }}>Choose Frame</div>
                <div className="row">
                    {
                        framepaths.map((item, index) => (
                            <img className="col-sm-4 col-12" src={item} key={index} style={{ marginBottom: "10px" }} onClick={() => selectFrame({ item })} alt="" width="100%" height="auto" />
                        ))
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default FrameModal;