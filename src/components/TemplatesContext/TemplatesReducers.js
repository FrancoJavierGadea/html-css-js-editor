
import defaultTemplates from "../../assets/templates/templates";


import { deleteAllTemplates, deleteTemplate, getTemplates, saveTemplate, loadTemplates } from "../../services/TemplatesService";

export const types = {
    add: 'templates - add',
    delete: 'templates - delete',
    deleteAll: 'templates - delete all',
    load: 'templates - load'
}

export const initialState = {
    defaultTemplates: defaultTemplates,

    savedTemplates: getTemplates() 
}

export const templatesReducer = (state, action) => {

    const {type, payload} = action;

    switch(type){

        case types.add:

            return {...state, savedTemplates: saveTemplate(payload.template)};

        case types.delete:

            return {...state, savedTemplates: deleteTemplate(payload.template)}; 
            
        case types.deleteAll:
            
            return {...state, savedTemplates: deleteAllTemplates()};
            
        case types.load:
            
            return {...state, savedTemplates: loadTemplates(payload.templates)}

        default:
            return state;
    }
}