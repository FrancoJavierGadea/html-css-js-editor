import { Accordion } from "react-bootstrap";
import CodeEditor from "./CodeEditor";

//Codigo por defecto
import defaultHtml from "../../assets/defaultCode/html.txt";
import defaultCss from "../../assets/defaultCode/styles.txt";
import defaultJs from "../../assets/defaultCode/js.txt";

import { useEffect, useState } from "react";
import PlayButton from "./PlayButton";

const editorHeight = 'calc(100vh - 175px)';

function EditorComponent({onChange}) {

    const [select, setSelect] = useState('html');

    const [html, setHtml] = useState('');

    const [css, setCss] = useState('');

    const [js, setJs] = useState('');

    useEffect(() => {
        
        fetch(defaultHtml)
        .then(res => res.text())
        .then(value => setHtml(value));

        fetch(defaultCss)
        .then(res => res.text())
        .then(value => setCss(value));

        fetch(defaultJs)
        .then(res => res.text())
        .then(value => setJs(value));
    
    }, []);

    useEffect(() => {
        
        const doc = document.implementation.createHTMLDocument();

        //Set Html
        doc.documentElement.innerHTML = html;
    
        //Add css
            const styles = doc.createElement('style');

            styles.innerHTML = css;

        doc.head.appendChild(styles);
       

        onChange(doc);

    }, [html, css]);


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
        

        onChange(doc);
    }

    

    const changeHtml = (value) => setHtml(value);
    
    const changeCss = (value) => setCss(value);
    
    const changeJs = (value) =>  setJs(value);
    

    const AccordionSelect = (value) => {

        if(value){

            setSelect(value);
        }
        else {

            setSelect('html');
        }
    }

    return (<div className="EditorComponent">

        <Accordion activeKey={select} onSelect={AccordionSelect} flush>

            <Accordion.Item eventKey="html">

                <Accordion.Header> <i className="bi bi-filetype-html" style={{fontSize: '21px'}}></i> <b className="mx-2">HTML</b> </Accordion.Header>

                <Accordion.Body className="p-0">
                    <CodeEditor height={editorHeight} language="html" defaultValue={html} onChange={changeHtml}></CodeEditor>
                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey="css">

                <Accordion.Header> <i className="bi bi-filetype-css" style={{fontSize: '21px'}}></i> <b className="mx-2">CSS</b> </Accordion.Header>

                <Accordion.Body className="p-0">
                    <CodeEditor height={editorHeight} language="css" defaultValue={css} onChange={changeCss}></CodeEditor>
                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey="js">

                <Accordion.Header> <i className="bi bi-filetype-js" style={{fontSize: '21px'}}></i> <b className="mx-2">JS</b> </Accordion.Header>

                <Accordion.Body className="p-0">
                    <div className="position-relative">

                        <CodeEditor height={editorHeight} language="javascript" defaultValue={js} onChange={changeJs}></CodeEditor>
                        
                        <PlayButton top="0px" right="20px" size="30px" onClick={runJs} title="Ejecutar Javascript"></PlayButton>
                    </div>
                </Accordion.Body>

            </Accordion.Item>
        </Accordion>

    </div>);
}

export default EditorComponent;