import { useState } from "react";
import Chatroom from "./Chatroom";
import Note from "./Note";
import CodeEditor from "./CodeEditor";

type Props = {
  sidebarFunction: string;
};

const sidebarFunctions = ["CHATROOM", "NOTE", "CODE EDITOR"];

const Side = ({ sidebarFunction }: Props) => {
  const [text, setText] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [code, setCode] = useState<string>("console.log('hello world')");

  const getSideBarFunction = () => {
    if (sidebarFunction === sidebarFunctions[0]) {
      return <Chatroom newMessage={newMessage} setNewMessage={setNewMessage} />;
    } else if (sidebarFunction === sidebarFunctions[1]) {
      return (
        <Note
          text={text}
          setText={setText}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
        />
      );
    } else if (sidebarFunction === sidebarFunctions[2]) {
      return <CodeEditor code={code} setCode={setCode} />;
    }
  };

  return <>{getSideBarFunction()}</>;
};

export default Side;
