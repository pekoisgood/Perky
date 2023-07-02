"use client";

import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs } from "@uiw/codemirror-extensions-langs";

export default function CodeEditor() {
  const [code, setCode] = useState("console.log('hello world')");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState<string>("Javascript");

  console.log(code);

  const langueges: string[] = [
    "Javascript",
    "Java",
    "Python",
    "Php",
    "C",
    "Ruby",
    "Typescript",
  ];

  const handleRun = () => {
    setIsRunning(true);
    compile();
  };

  const getLanguageId = () => {
    if (language === "Javascript") {
      return 63;
    } else if (language === "Java") {
      return 62;
    } else if (language === "Php") {
      return 68;
    } else if (language === "Python") {
      return 71;
    } else if (language === "Ruby") {
      return 72;
    } else if (language === "Typescript") {
      return 74;
    } else if (language === "C") {
      return 51;
    }
  };

  const getExtensionLanguage = () => {
    if (language === "Javascript") {
      return [langs.javascript()];
    } else if (language === "Java") {
      return [langs.java()];
    } else if (language === "Php") {
      return [langs.php()];
    } else if (language === "Python") {
      return [langs.python()];
    } else if (language === "Ruby") {
      return [langs.ruby()];
    } else if (language === "Typescript") {
      return [langs.typescript()];
    } else if (language === "C") {
      return [langs.c()];
    }
  };

  const compile = async () => {
    const url = "https://judge0-ce.p.rapidapi.com/submissions";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "9e4c26e51emshfc0813ef8ed0cd6p1da66bjsn10776e17400e",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: getLanguageId(),
        source_code: code,
        stdin: "SnVkZ2Uw",
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const token = result.split(":")[1].split("}")[0].split('"')[1];
      checkStatus(token);
    } catch (error) {
      console.error(error);
    }
  };

  const checkStatus = async (token: string) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;

    const headers = {
      "X-RapidAPI-Key": "9e4c26e51emshfc0813ef8ed0cd6p1da66bjsn10776e17400e",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    };
    try {
      const response = await fetch(url, { method: "GET", headers });
      const data = await response.json();
      if (!data.status) return;
      let statusId: number = data.status.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutput(atob(data.stdout));
        setIsRunning(false);
        return;
      }
    } catch (err) {
      setIsRunning(false);
      setOutput("error");
    }
  };

  return (
    <>
      <CodeMirror
        value='console.log("hello world")'
        height="200px"
        extensions={getExtensionLanguage()}
        theme={vscodeDark}
        id="editor"
        onChange={(editor, viewUpdate) => {
          setCode(editor);
        }}
      />
      <div className="flex justify-between mt-[5px]">
        <button
          onClick={handleRun}
          className="border-[1px] border-slate-300 p-[5px] rounded-lg"
        >
          {isRunning ? "running" : "run"}
        </button>
        <select
          className="border-[1px] border-slate-400 rounded-lg"
          onChange={(e) => setLanguage(e.target.value)}
        >
          {langueges.map((lan, index) => {
            return (
              <option key={index} value={lan}>
                {lan}
              </option>
            );
          })}
        </select>
      </div>
      <div className="border-[1px] border-black m-[10px] p-[10px] rounded-lg">
        <h2 className="m-0">output:</h2>
        <div className="pl-[10px]">{output}</div>
      </div>
    </>
  );
}
