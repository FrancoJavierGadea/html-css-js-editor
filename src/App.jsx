import { useEffect, useState } from "react";

//? Bootstrap y Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Col, Container, Row } from "react-bootstrap";

import EditorComponent from "./components/EditorComponent/EditorComponent";

//Codigo por defecto
import defaultHtml from "./assets/defaultCode/html.txt";
import defaultCss from "./assets/defaultCode/styles.txt";
import defaultJs from "./assets/defaultCode/js.txt";

function App() {

  const [values, setValues] = useState({});

  //Cargar valores por defecto
  useEffect(() => {

    const load = async () => {

      try {

        setValues({
          html: await (await fetch(defaultHtml)).text(),

          css: await (await fetch(defaultCss)).text(),

          js: await (await fetch(defaultJs)).text()
        })
      }
      catch (error) {}
    }

    load();

  }, []);


  const [doc, setDoc] = useState(null);

  const changeDocument = (document) => {

    setDoc(new String(document.documentElement.innerHTML));
  } 



  return (
    <div className="App bg-dark m-0 p-0 overflow-hidden" style={{minHeight: '100vh'}}>

      <Container fluid>
        <Row>
          <Col className="m-0 p-0" xs={6}>

            <EditorComponent onChange={changeDocument} defaultHtml={values.html} defaultCss={values.css} defaultJs={values.js}></EditorComponent>

          </Col>

          <Col className="m-0 p-0" xs={6}>

            <iframe srcDoc={doc} style={{height: '100%', width: '100%'}}></iframe>

          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
