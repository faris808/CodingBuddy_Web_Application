import { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/cobalt.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
const Editor = ({ socketRef, roomid, onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "cobalt",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on("change", (instance, changes) => {
        //This is an event of codemirror
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomid,
            code,
          });
        }
      });
    }
    init();
  }, [onCodeChange, roomid, socketRef]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return ()=>{
        socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
  }, [socketRef.current]);
  return <textarea id="realtimeEditor"></textarea>;
};
export default Editor;
