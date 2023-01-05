export const exist = (name) => {

    return Object.keys({...localStorage}).includes(name);
}


export const getTemplates = () => {

    let aux = {...localStorage};

    for(let key in aux){

        aux[key] = JSON.parse(aux[key]);
    }

    return aux;
}

export const loadTemplates = (templates) => {

    templates.forEach(template => {

        localStorage.setItem(template.name, JSON.stringify(template));
    });

    return getTemplates();
}


export const saveTemplate = (template) => {

    localStorage.setItem(template.name, JSON.stringify(template));

    return getTemplates();
}


export const deleteTemplate = (template) => {

    localStorage.removeItem(template.name); 
    
    return getTemplates();
}

export const deleteAllTemplates = () => {

    localStorage.clear();

    return getTemplates();
}
