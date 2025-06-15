import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalAction({showModal, handleClose, handleAction, password, setPassword, title, message}) {
    return(
        <>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancelar
                </Button>
                <Button variant="danger" onClick={handleAction}>
                Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
export default ModalAction;