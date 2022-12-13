
//? Bootstrap y Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditorComponent from "./components/EditorComponent/EditorComponent";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";


function App() {

  const [doc, setDoc] = useState(null);

  const changeDocument = (document) => {

    setDoc(new String(document.documentElement.innerHTML));
  } 


  return (
    <div className="App bg-dark m-0 p-0 overflow-hidden" style={{minHeight: '100vh'}}>

      <Container fluid>
        <Row>
          <Col className="m-0 p-0" xs={6}>

            <EditorComponent onChange={changeDocument}></EditorComponent>

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
