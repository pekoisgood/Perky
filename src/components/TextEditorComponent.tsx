import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";
const TextEditorComponent = () => {
  return (
    <NodeViewWrapper className="react-component-with-content">
      <span className="label" contentEditable={false}>
        React Component
      </span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};
export default TextEditorComponent;
