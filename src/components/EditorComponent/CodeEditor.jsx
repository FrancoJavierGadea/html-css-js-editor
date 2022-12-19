import Editor from "@monaco-editor/react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const options = {

    padding: {
        top: "20px",
        bottom: "10px"
    },

    scrollbar: { 
        vertical: 'auto' 
    },

    scrollBeyondLastLine: false,

    minimap: { 
        enabled: false 
    }
}

function CodeEditor({height, defaultValue = '', onChange, language}, ref) {

    const editorRef = useRef(null);

    useEffect(() => {
        
        if(editorRef.current !== null) editorRef.current.setValue(defaultValue);

    }, [defaultValue]);

    
    const change = () => {
        
        if(onChange) onChange(editorRef.current.getValue());
    }
    
    const onMount = (editor, monaco) => {
        
        //editor.onKeyUp(change);
        
        editorRef.current = editor;
    }

    useImperativeHandle(ref, () => {

        return {
            setValue: (value) => editorRef.current.setValue(value),
            getValue: () => editorRef.current.getValue()
        }
    })

    return (<div className="CodeEditor">

        <Editor height={height} theme="vs-dark" language={language} defaultValue={defaultValue} onMount={onMount} onChange={change} options={options} />
        
    </div>);
}

export default forwardRef(CodeEditor);