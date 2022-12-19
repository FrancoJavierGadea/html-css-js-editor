import { useEffect, useState } from "react";
import StyledButton from "../Styled/StyledButton";


function RenderComponent({document = '', height = '100%'}) {

    const [url, setUrl] = useState('');

    useEffect(() => {

        URL.revokeObjectURL(url);
        
        fetch('data:text/html;charset=UTF-8,' + encodeURIComponent(document))
        .then(res => res.blob())
        .then(value => {
            
            setUrl(URL.createObjectURL(value));
        });
        
    }, [document]);

    return (<div className="RenderComponent" style={{height}}>

        <div className="position-relative h-100">

            <iframe srcDoc={document} style={{height: '100%', width: '100%'}}></iframe>

            <StyledButton top="10px" right="10px" title="Abrir en una nueva pestaña">
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-arrow-up-right-square"></i>
                </a>
            </StyledButton>

            <StyledButton top="10px" right="50px" title="Descargar html">
                <a href={url} target="_blank" rel="noopener noreferrer" download>
                    <i className="bi bi-download"></i>
                </a>
            </StyledButton>
        </div>
    </div>);
}

export default RenderComponent;