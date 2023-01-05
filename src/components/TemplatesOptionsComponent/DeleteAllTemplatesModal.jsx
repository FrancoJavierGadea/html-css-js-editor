import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


function DeleteAllTemplatesModal({onChange}, ref) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);


    const save = () => {

        onChange();

        handleClose();
    }


    useImperativeHandle(ref, () => {

        return {
            show: handleShow,
            hide: handleClose
        }
    });

    return (<div className="DeleteAllTemplatesModal">
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Borrar Todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3 className="py-3 text-center">¿ Estas seguro de eliminar todos los templates guardados ?</h3>
                <h6>Esta accion es irreversible</h6>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="danger" onClick={save}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}

export default forwardRef(DeleteAllTemplatesModal);