import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function TemplatesModal({onChange}, ref) {

    const [name, setName] = useState('');


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);


    const save = () => {

        handleClose();
        
        onChange(name);
    }


    useImperativeHandle(ref, () => {

        return {
            show: handleShow,
            hide: handleClose
        }
    });

    return (<div className="TemplatesModal">

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Guardar Template</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="my-3">
                        
                        <Form.Label>Escribe un nombre</Form.Label>

                        <Form.Control type="text"  value={name} onChange={({target: {value}}) => setName(value)}/>

                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={save}>Save</Button>
            </Modal.Footer>
        </Modal>
        
    </div>);
}

export default forwardRef(TemplatesModal);