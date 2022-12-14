import Editor from "@monaco-editor/react";
import { forwardRef, useId, useImperativeHandle, useRef } from "react";

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

function CodeEditor({height, defaultValue, onChange, language}, ref) {

    const editorRef = useRef(null);

    
    const change = () => {
        
        onChange(editorRef.current.getValue());
    }
    
    const onMount = (editor, monaco) => {
        
        //editor.onKeyUp(change);
        
        editorRef.current = editor;
    }

    useImperativeHandle(ref, () => {

        return {
            setValue: (value) => editorRef.current.setValue(value)
        }
    })

    return (<div className="CodeEditor">

        <Editor height={height} theme="vs-dark" language={language} defaultValue={defaultValue} onMount={onMount} onChange={change} options={options} />
        
    </div>);
}

export default forwardRef(CodeEditor);