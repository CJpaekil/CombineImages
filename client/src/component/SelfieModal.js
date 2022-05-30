import Modal from "react-bootstrap/Modal";

const SelfieModal = ({ open, onClose, selfimages, selectedSelfie }) => {
    const selectSelfie = (selfiepath) => {
        onClose();
        selectedSelfie(selfiepath);
    }
    console.log(selfimages);
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={open}
            onHide={onClose}
            centered
        >
            <Modal.Body>

                <div style={{ textAlign: "center" }}>Choose Selfie</div>
                <div className="row">
                    {
                        selfimages.map((item, index) => (
                            <img className="col-sm-4 col-12" src={item} key={index} onClick={() => selectSelfie({ item })} alt="" width="100%" height="auto" />
                        ))
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SelfieModal;