import { useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect } from "react";

export default function MyTldraw() {
  const editor = useEditor();

  useEffect(() => {
    const container = editor.getContainer();
    const focusOnPointerDown = () => editor.focus();
    container.addEventListener("pointerdown", focusOnPointerDown);
    return () => {
      container.removeEventListener("pointerdown", focusOnPointerDown);
    };
  }, [editor]);

  return null;
}
