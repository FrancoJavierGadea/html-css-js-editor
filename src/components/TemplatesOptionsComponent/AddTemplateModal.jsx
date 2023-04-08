import { forwardRef, useImperativeHandle, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { exist } from "../../services/TemplatesService";





function AddTemplateModal({onChange}, ref) {

    const [name, setName] = useState('');

    //* Alerts
    const [showDangerAlert, setShowDangerAlert] = useState(false);

    const [showWarningAlert, setShowWarningAlert] = useState(false);

    //* Modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowDangerAlert(false);
        setShowWarningAlert(false);
    };

    const handleShow = () => setShow(true);


    const save = () => {

        switch(true){

            case name === '':
                setShowDangerAlert(true);
                break;

            case exist(name) && !showWarningAlert:
                setShowWarningAlert(true);
                break;
        
            default:

                onChange(name);
                handleClose();     
                break;
        }  
    }


    const handlerSubmit = (e) => {

        e.preventDefault();

        save();
    }


    useImperativeHandle(ref, () => {

        return { show: handleShow, hide: handleClose };
    });

    return (<div className="TemplatesModal">

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Guardar Template</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {
                    showDangerAlert ?
                        <Alert variant="danger" onClose={() => setShowDangerAlert(false)} dismissible>
                            <h6>Ingresa un nombre !</h6>
                        </Alert>
                    : ''
                }

                {
                    showWarningAlert ?
                        <Alert variant="warning" onClose={() => setShowWarningAlert(false)} dismissible>
                            <h6>Ya existe un template con ese nombre !</h6>
                            Continuar provocara su sobrescritura...
                        </Alert>
                    : ''
                }

                <Form onSubmit={handlerSubmit}>
                    <Form.Group className="my-2">
                        
                        <Form.Label>Escribe un nombre</Form.Label>

                        <Form.Control type="text"  value={name} onChange={({target: {value}}) => setName(value)}/>

                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary" onClick={save}>Guardar</Button>
            </Modal.Footer>
        </Modal>
        
    </div>);
}

export default forwardRef(AddTemplateModal);