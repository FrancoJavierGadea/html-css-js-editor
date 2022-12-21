import { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CodeEditor from "./CodeEditor";


import StyledButton from "../Styled/StyledButton";

import Brand from "./Brand";


function EditorComponent({onChange, defaultCss = '', defaultHtml = '', defaultJs = '', height = '50vh'}) {

    const htmlRef = useRef(null);

    const cssRef = useRef(null);

    const jsRef = useRef(null);

    const [html, setHtml] = useState(defaultHtml);

    const [css, setCss] = useState(defaultCss);

    const [js, setJs] = useState(defaultJs);

    useEffect(() => {

        setHtml(defaultHtml);

        setJs(defaultJs);

        setCss(defaultCss);
        
    }, [defaultCss, defaultHtml, defaultJs]);



    useEffect(() => {
        
        const doc = document.implementation.createHTMLDocument();

        //Set Html
        doc.documentElement.innerHTML = html;
    
        //Add css
            const styles = doc.createElement('style');

            styles.innerHTML = css;

        doc.head.appendChild(styles);

        onChange(doc, {html, css, js});

    }, [html, css]);


    const changeHtml = (value) => setHtml(value);
    
    const changeCss = (value) => setCss(value);

    const changeJs = (value) => setJs(value);

    const runJs = () => {

        const doc = document.implementation.createHTMLDocument();

        //Set Html
        doc.documentElement.innerHTML = html;

        //Add CSS
            const styles = doc.createElement('style');

            styles.innerHTML = css;

        doc.head.appendChild(styles);

        //Add JS
            const script = doc.createElement('script');

            script.textContent = js;

        doc.body.appendChild(script);
        
        onChange(doc, {html, css, js});
    }
         
    

    //? Cargar un Archivo
    const load = ({target}) => {

        const file = target.files[0];
        
        const reader = new FileReader();

        reader.onload = () => {

            switch(file.type){

                case 'text/html':
                    setHtml(reader.result);
                    htmlRef.current.setValue(reader.result);
                    break;

                case 'text/css':
                    setCss(reader.result);
                    cssRef.current.setValue(reader.result);
                    break;    

                case 'text/javascript':
                    setJs(reader.result);
                    jsRef.current.setValue(reader.result);
                    break;
            }
        }

        reader.readAsText(file);
    }


    return (<div className="EditorComponent">

        <Tabs defaultActiveKey="html" fill justify style={{backgroundColor: '#676767'}}>

            <Tab eventKey="html" title={<Brand name="html" title="HTML"/>}>
                <div className="position-relative">

                    <CodeEditor height={height} language="html" defaultValue={defaultHtml} onChange={changeHtml} ref={htmlRef}></CodeEditor>
                
                    <StyledButton bottom="5px" right="20px" size="25px" title="Cargar HTML">
                        <label>
                            <i className="bi bi-upload"></i>
                            <input className="d-none" type="file" accept=".html" onChange={load} />
                        </label>
                    </StyledButton>

                </div>
            </Tab>

            <Tab eventKey="css" title={<Brand name="css" title="CSS"/>}>
                <div className="position-relative">

                    <CodeEditor height={height} language="css" defaultValue={defaultCss} onChange={changeCss} ref={cssRef}></CodeEditor>
                
                    <StyledButton bottom="5px" right="20px" size="25px" title="Cargar CSS">
                        <label>
                            <i className="bi bi-upload"></i>
                            <input className="d-none" type="file" accept=".css" onChange={load} />
                        </label>
                    </StyledButton>

                </div>
            </Tab>

            <Tab eventKey="js" title={<Brand name="js" title="JavaScript"/>}>
                <div className="position-relative">

                    <CodeEditor height={height} language="javascript" defaultValue={defaultJs} onChange={changeJs} ref={jsRef}></CodeEditor>

                    <StyledButton top="0px" right="20px" size="40px" onClick={runJs} title="Ejecutar JavaScript">
                        <i className="bi bi-play-fill"></i>
                    </StyledButton>

                    <StyledButton bottom="5px" right="20px" size="25px" title="Cargar JavaScript">
                        <label>
                            <i className="bi bi-upload"></i>
                            <input className="d-none" type="file" accept=".js" onChange={load} />
                        </label>
                    </StyledButton>
                </div>
            </Tab>

        </Tabs>

    </div>);
}

export default EditorComponent;