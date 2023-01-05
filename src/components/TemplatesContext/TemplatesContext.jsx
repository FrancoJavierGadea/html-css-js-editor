import { createContext, useReducer, useState } from "react";
import { initialState, templatesReducer } from "./TemplatesReducers";

import defaultTemplates from "../../assets/templates/templates";


export const TemplatesContext = createContext();


function TemplatesProvider({children}) {

    const [currentTemplate, setCurrentTemplate] = useState(defaultTemplates.default);

    const [templates, dispatch] = useReducer(templatesReducer, initialState)

    const data = {
        templates,
        dispatch,
        currentTemplate,
        setCurrentTemplate
    }

    return (<TemplatesContext.Provider value={data}>{children}</TemplatesContext.Provider>);
}

export default TemplatesProvider;