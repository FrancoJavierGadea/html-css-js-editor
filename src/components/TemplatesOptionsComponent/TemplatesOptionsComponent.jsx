import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { TemplatesContext } from "../TemplatesContext/TemplatesContext";
import { types } from "../TemplatesContext/TemplatesReducers";

import TemplatesButton from "./TemplatesButton";
import DeleteAllTemplatesModal from "./DeleteAllTemplatesModal";
import AddTemplateModal from "./AddTemplateModal";

import { getDownloadUrl } from "../../services/JSONDownloader";
import { loadTemplates } from "../../services/TemplatesLoader";



function TemplatesOptionsComponent({code}, ref) {

    const {templates, dispatch, setCurrentTemplate} = useContext(TemplatesContext);


    //* Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);


    //* Add Template Modal
    const addTemplateModalRef = useRef({});

    const showAddTemplateModal = () => {

        addTemplateModalRef.current.show();
        handleClose();
    }
    
    //* Delete All Templates Modal
    const deleteAllTemplatesModalRef = useRef({});

    const showDeleteAllTemplatesModal = () => {

        deleteAllTemplatesModalRef.current.show();
        handleClose();
    }
    

    const addTemplate = (name) => {

        dispatch({
            type: types.add,
            payload: {
                template: {name, ...code}
            } 
        });

        setCurrentTemplate({name, ...code});
    }

    const deteleAll = () => {

        dispatch({type: types.deleteAll});

        setCurrentTemplate(templates.defaultTemplates.default);
    }

    const cargarTemplates = ({target}) => {

        loadTemplates(target.files).then(values => {

            dispatch({
                type: types.load, 
                payload: {templates: values}
            });
        })
        .catch(error => {

            console(error);
        });
    }


    useImperativeHandle(ref, () => {

        return {
            show: handleShow,
            hide: handleClose,
            showAddTemplateModal
        }
    });

    return (<div className="TemplatesOptionsComponent">

        <AddTemplateModal ref={addTemplateModalRef} onChange={addTemplate} />

        <DeleteAllTemplatesModal ref={deleteAllTemplatesModalRef} onChange={deteleAll} />

        <Offcanvas show={show} onHide={handleClose} >

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Templates</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="position-relative">
                <div className="d-flex flex-column overflow-auto" style={{maxHeight: '90%'}}>
                    {
                        Object.values(templates.defaultTemplates).map((value, index) => {

                            return <TemplatesButton showOptions={false} template={value} key={'dt-' + index} hide={handleClose}></TemplatesButton>
                        })
                    }
                    {
                        Object.values(templates.savedTemplates).map((value, index) => {

                            return <TemplatesButton template={value} key={'st-' + index} hide={handleClose}></TemplatesButton>
                        })
                    }
                </div>

                <div className="position-absolute d-flex justify-content-evenly w-100" style={{bottom: '15px', left: 0}}>

                    <Button className="px-4" variant="primary" onClick={showAddTemplateModal} title="Guardar Template"><i className="bi bi-plus-square"></i></Button>
                    
                    <Button className="px-4" variant="success" title="Descargar Todos" href={getDownloadUrl(templates.savedTemplates)} download="saved-templates.json"><i className="bi bi-download"></i></Button>
                    
                    <label className="px-4 btn btn-secondary" title="Cargar Template">
                        <input className="d-none" type="file" accept=".json" multiple onChange={cargarTemplates} />
                        <i className="bi bi-upload"></i>
                    </label>
                    
                    
                    <Button className="px-4" variant="danger" onClick={showDeleteAllTemplatesModal} title="Borrar Todos"><i className="bi bi-trash"></i></Button>
                </div>
            </Offcanvas.Body>

        </Offcanvas>  

    </div>);

}

export default forwardRef(TemplatesOptionsComponent);