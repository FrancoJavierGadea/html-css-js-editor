import { useEffect, useRef, useState } from "react";

//? Bootstrap y Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import EditorComponent from "./components/EditorComponent/EditorComponent";
import Split from 'react-split';
import RenderComponent from "./components/RenderComponent/RenderComponent";

//Codigo por defecto
import defaultTemplate from "./assets/templates/default.json";

import TemplatesOptionsComponent from "./components/TemplatesOptionsComponent/TemplatesOptionsComponent";
import OptionsComponent from "./components/OptionsComponent/OptionsComponent";
import { Button } from "react-bootstrap";


const editorHeight = 'calc(100vh - 48px - 29px)';

function App() {
	console.log('app');

	const [template, setTemplate] = useState({});

	const changeTemplate = (value) => {

		setTemplate(value);
	}

	const [doc, setDoc] = useState(null);

	const [code, setCode] = useState(null);

	const changeDocument = (document, code) => {

		setDoc(new String(document.documentElement.innerHTML));

		setCode(code);
	} 

	const templateOptionsRef = useRef({});

	return (
		<div className="App bg-dark m-0 p-0 overflow-hidden" style={{minHeight: '100vh'}}>

			<Split className="split" sizes={[50, 50]} minSize={200} gutterSize={10}>

				<div>
					<EditorComponent height={editorHeight} onChange={changeDocument} defaultHtml={template.html} defaultCss={template.css} defaultJs={template.js}></EditorComponent>
				</div>

				<div>
					<RenderComponent document={doc}></RenderComponent>
				</div>

			</Split>

			<TemplatesOptionsComponent onChange={changeTemplate} code={code} ref={templateOptionsRef}></TemplatesOptionsComponent>

			<OptionsComponent>

				<Button position="left" className="text-light border-0" variant="outline-secondary" size="sm" onClick={() => templateOptionsRef.current.show()}>{template.name}</Button>
				
				<Button position="left" className="text-light border-0" variant="outline-secondary" size="sm" onClick={() => templateOptionsRef.current.showTemplatesModal()}>Guardar Template</Button>
			</OptionsComponent>

		</div>
	);
}

export default App;
