import { useContext } from "react";
import { Button } from "react-bootstrap";
import { getDownloadUrl } from "../../services/JSONDownloader";
import { TemplatesContext } from "../TemplatesContext/TemplatesContext";
import { types } from "../TemplatesContext/TemplatesReducers";


function TemplatesButton({template, showOptions = true, hide}) {

    const {setCurrentTemplate, dispatch} = useContext(TemplatesContext);
    

    const changeTemplate = () => {

        setCurrentTemplate({...template});
        hide();
    }

    const deteleTemplate = () => {

        dispatch({
            type: types.delete,
            payload: {template}
        });
    }

    return (<div className="TemplatesButton mb-2 d-flex">

        <Button className="border-0 border-bottom border-info rounded-0 text-start" variant="outline-secondary" style={{flexGrow: 1}} onClick={changeTemplate}>{template.name}</Button>

        {
            showOptions ? 
                <>
                    <Button className="border-0 border-bottom border-info rounded-0" variant="outline-success" href={getDownloadUrl(template)} download={template.name + '.json'}><i className="bi bi-download"></i></Button>    
            
                    <Button className="border-0 border-bottom border-info rounded-0" variant="outline-danger" onClick={deteleTemplate}><i className="bi bi-trash"></i></Button>        
                </>
            : ''
        }

    </div>);
}

export default TemplatesButton;