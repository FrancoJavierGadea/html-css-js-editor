export const load = () => {

    let templates = [];

    try {

        if( localStorage.getItem('templates') ){

            templates = JSON.parse( localStorage.getItem('templates') );
        }
    }
    catch (error) {
        
        console.log('Error loading Templates: ', error);
    }

    return templates;
}


export const save = (template) => {

    let aux = null;

    try {
        
        const previous = load();
    
        previous.push(template);
    
        localStorage.setItem('templates', JSON.stringify(previous));

        aux = template;

    } catch (error) {
        
        console.log('Error saving template', error);
    }

    return aux;
}
