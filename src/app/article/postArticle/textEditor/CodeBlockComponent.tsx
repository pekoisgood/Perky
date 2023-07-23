import React from "react";
import { Extension, NodeViewContent, NodeViewWrapper } from "@tiptap/react";

interface Prop {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: ({ language }: { language: string }) => void;
  extension: Extension;
}

const CodeBlockComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: Prop) => {
  return (
    <NodeViewWrapper className="relative">
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
        className="absolute right-[10px] top-[10px]"
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
