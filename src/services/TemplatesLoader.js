

function checkTemplate(json){

    const properties = ['name', 'html', 'css', 'js'];

    let flag = true;

    properties.forEach(key => {

        if(!json.hasOwnProperty(key) || typeof json[key] !== 'string'){

            flag = false;
        }
    });
    
    return flag;
}


function readFile(file){

    return new Promise((resolve, reject) => {
    
        const reader = new FileReader();

        reader.onload = () => {

            let json = JSON.parse(reader.result);
            
            resolve(json);
        }

        reader.onerror = () => {

            reject('Ocurrio un error leyendo los archivos');
        }

        reader.readAsText(file);
    });
}


export function loadTemplates(files){

    return new Promise((resolve, reject) => {
        
        let templates = [];
    
        let promises = [...files].map(file => readFile(file));

        Promise.all(promises)
        .then(values => {
    
            values.forEach(json => {
    
                if( checkTemplate(json) ){
    
                    templates.push(json);
                }
                else {
    
                    Object.values(json).forEach(value => {
    
                        if(checkTemplate(value)) templates.push(value);
                    });
                }
            });
    
            resolve(templates);
        })
        .catch(err => {
    
            reject(err);
        })

    });
    
}