import { useEffect, useState } from "react";

//? Bootstrap y Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import EditorComponent from "./components/EditorComponent/EditorComponent";
import Split from 'react-split';
import RenderComponent from "./components/RenderComponent/RenderComponent";

//Codigo por defecto
import defaultTemplate from "./assets/templates/default.json";
import bootstrapTemplate from "./assets/templates/bootstrap.json";

function App() {

  const [values, setValues] = useState(bootstrapTemplate);

  const [doc, setDoc] = useState(null);

  const changeDocument = (document, code) => {

    setDoc(new String(document.documentElement.innerHTML));
  } 



  return (
    <div className="App bg-dark m-0 p-0 overflow-hidden" style={{minHeight: '100vh'}}>

      <Split className="split" sizes={[50, 50]} minSize={200} gutterSize={10}>

        <div>
          <EditorComponent onChange={changeDocument} defaultHtml={values.html} defaultCss={values.css} defaultJs={values.js}></EditorComponent>
        </div>

        <div>
          <RenderComponent document={doc}></RenderComponent>
        </div>

      </Split>

    </div>
  );
}

export default App;
