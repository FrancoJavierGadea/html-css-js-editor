

export function getDownloadUrl(obj){

    return 'data:text/json;charset=utf-8,' + encodeURIComponent( JSON.stringify(obj) );
} 