import { RichUtils } from "draft-js";
import { commands } from "../Toolbar/commands";

export default function createHighlightPlugins() {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: "#fffe0d",
      },
    },
    keyBindingFn: (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "h") {
        return commands.highlight.toLowerCase();
      }
    },
    handleKeyCommand: (command, editorState, num, { setEditorState }) => {
      if (command === commands.highlight.toLowerCase()) {
        setEditorState(
          RichUtils.toggleInlineStyle(editorState, commands.highlight)
        );
        return true;
      }
    },
  };
}
