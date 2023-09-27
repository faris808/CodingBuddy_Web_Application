import { useEffect } from "react";
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
const Editor=()=>{
    useEffect(()=>{
        async function init(){
            Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
                mode:{name:'javascript',json:true},
                theme:'cobalt',
                autoCloseTags:true,
                autoCloseBrackets:true,
                lineNumbers:true,
            });
        }
        init();
    },[]);
    return (
        <textarea id="realtimeEditor"></textarea>
    )
}
export default Editor;