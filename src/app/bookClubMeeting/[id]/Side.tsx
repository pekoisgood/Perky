import { SetStateAction, useState } from "react";

import Chatroom from "./Chatroom";
import Note from "./Note";
// TODO: need to find alternative code editor compiler
// import CodeEditor from "./CodeEditor";

type Props = {
  sidebarFunction: string;
  text: string;
  code: string;
  setText: React.Dispatch<SetStateAction<string>>;
  setCode: React.Dispatch<SetStateAction<string>>;
};

const sidebarFunctions = ["CHATROOM", "NOTE", "CODE EDITOR"];

const Side = ({ sidebarFunction, text, setText, code, setCode }: Props) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);

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
    }
    // TODO: fixing code editor compiler
    // else if (sidebarFunction === sidebarFunctions[2]) {
    //   return <CodeEditor code={code} setCode={setCode} />;
    // }
  };

  return <>{getSideBarFunction()}</>;
};

export default Side;
