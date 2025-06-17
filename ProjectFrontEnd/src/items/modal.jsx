import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalAction({showModal, handleClose, handleAction, field, setField, title, message, typeForm, placeholderForm, typeButton, textButton}) {
    return(
        <>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                <Form.Control
                    type={typeForm}
                    placeholder={placeholderForm}
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancelar
                </Button>
                <Button variant={typeButton} onClick={handleAction}>
                {textButton}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
export default ModalAction;