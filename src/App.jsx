import { useContext, useRef, useState } from "react";

//? Bootstrap y Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";

import EditorComponent from "./components/EditorComponent/EditorComponent";
import Split from 'react-split';
import RenderComponent from "./components/RenderComponent/RenderComponent";


import { TemplatesContext } from "./components/TemplatesContext/TemplatesContext";

import TemplatesOptionsComponent from "./components/TemplatesOptionsComponent/TemplatesOptionsComponent";
import OptionsComponent from "./components/OptionsComponent/OptionsComponent";


const editorHeight = 'calc(100vh - 48px - 29px)';

function App() {

	const {currentTemplate} = useContext(TemplatesContext);


	const [doc, setDoc] = useState(null);

	const [code, setCode] = useState(null);

	const changeDocument = (document, code) => {

		setDoc(new String(document.documentElement.innerHTML));

		setCode(code);
	} 

	const templatesOptionsRef = useRef({});

	return (
		<div className="App bg-dark m-0 p-0 overflow-hidden" style={{minHeight: '100vh'}}>

			<Split className="split" sizes={[50, 50]} minSize={200} gutterSize={10}>

				<div>
					<EditorComponent height={editorHeight} onChange={changeDocument} defaultHtml={currentTemplate.html} defaultCss={currentTemplate.css} defaultJs={currentTemplate.js}></EditorComponent>
				</div>

				<div>
					<RenderComponent document={doc}></RenderComponent>
				</div>

			</Split>

			<TemplatesOptionsComponent  code={code} ref={templatesOptionsRef}></TemplatesOptionsComponent>

			<OptionsComponent>

				<Button position="left" className="text-light border-0" variant="outline-secondary" size="sm" onClick={() => templatesOptionsRef.current.show()}>{currentTemplate.name}</Button>
				
				<Button position="left" className="text-light border-0" variant="outline-secondary" size="sm" onClick={() => templatesOptionsRef.current.showAddTemplateModal()}>Guardar Template</Button>
			
				<Button position="right" className="text-light border-0" variant="outline-secondary" size="sm" onClick={() => console.clear()}>Limpiar consola</Button>
			
			</OptionsComponent>

		</div>
	);
}

export default App;
