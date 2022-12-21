import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

//templates
import defaultTemplates from "../../assets/templates/templates";
import { load, save } from "../../services/SaveTemplateService";
import TemplatesModal from "./TemplatesModal";



function TemplatesOptionsComponent({onChange, code}, ref) {

    const [templates, setTemplates] = useState( [...Object.values(defaultTemplates), ...load()] );

    const [currentTemplate, setCurrentTemplate] = useState(defaultTemplates.default);

    useEffect(() => {

        onChange(currentTemplate);
        
    }, [currentTemplate]);

    const changeTemplate = ({target: {value}}) => {

        setCurrentTemplate(templates[value]);

        setShow(false);
    }

    //* Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    //* Modal
    const templatesModalRef = useRef({});

    const showTemplatesModal = () => {

        templatesModalRef.current.show();

        setShow(false);
    }

    //? Guardar Template
    const saveTemplate = (name) => {

        let template = save({name, ...code});

        if(currentTemplate){

            setTemplates([...templates, template]);

            setCurrentTemplate(template);
        }
    }


    useImperativeHandle(ref, () => {

        return {
            show: handleShow,
            hide: handleClose,
            showTemplatesModal
        }
    });

    return (<div className="TemplatesOptionsComponent">

        <TemplatesModal ref={templatesModalRef} onChange={saveTemplate}/>

        <Offcanvas show={show} onHide={handleClose} >

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Templates</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="position-relative">
                <div className="d-flex flex-column">
                    {
                        templates.map((value, index) => {

                            return <Button className="mb-2 border-0 border-bottom border-info rounded-0 text-start" variant="outline-secondary" value={index} onClick={changeTemplate} key={index}>{value.name}</Button>        
                        })
                    }
                </div>

                <div className="position-absolute d-flex justify-content-evenly" style={{bottom: '15px'}}>
                    <Button onClick={showTemplatesModal}>Guardar Template</Button>
                </div>
            </Offcanvas.Body>

        </Offcanvas>  

    </div>);

}

export default forwardRef(TemplatesOptionsComponent);