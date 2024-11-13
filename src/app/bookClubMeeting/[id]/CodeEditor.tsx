"use client";

import React, { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs } from "@uiw/codemirror-extensions-langs";
import { VscDebugStart } from "react-icons/vsc";

type Props = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const languages: string[] = [
  "Javascript",
  "Java",
  "Python",
  "Php",
  "C",
  "Ruby",
  "Typescript",
];

const languageIds = {
  Javascript: 63,
  Java: 62,
  Php: 68,
  Python: 71,
  Ruby: 72,
  Typescript: 74,
  C: 51,
};

export const getExtensionLanguage = (lang: string) => {
  const extensionLanguages = {
    Javascript: [langs.javascript()],
    Java: [langs.java()],
    Php: [langs.php()],
    Python: [langs.python()],
    Ruby: [langs.ruby()],
    Typescript: [langs.typescript()],
    C: [langs.c()],
  };

  return extensionLanguages[lang as keyof typeof extensionLanguages];
};

// const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

// TODO: code compiler not working, disable for temp
export default function CodeEditor({ code, setCode }: Props) {
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState<string>("Javascript");

  const handleRunCode = () => {
    setIsRunning(true);
    compile();
  };

  const compile = async () => {
    const url = "https://judge0-ce.p.rapidapi.com/submissions";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": rapidApiKey ?? "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: languageIds[language as keyof typeof languageIds],
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
      "X-RapidAPI-Key": rapidApiKey ?? "",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    };
    try {
      const response = await fetch(url, { method: "GET", headers });
      const data = await response.json();
      if (!data.status) return;
      const statusId: number = data.status.id;

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
    <div className="m-1 h-full rounded-xl">
      <div className="mb-3 flex justify-between">
        <select
          className="rounded-lg border-[1px] border-slate-400"
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lan, index) => {
            return (
              <option key={index} value={lan}>
                {lan}
              </option>
            );
          })}
        </select>
        <button
          onClick={handleRunCode}
          className={`h-[27px] rounded-lg bg-orange-100 px-[5px] ${
            isRunning && "text-[12px]"
          }
        `}
        >
          {isRunning ? "running" : <VscDebugStart />}
        </button>
      </div>
      <div className="h-[90%] overflow-y-scroll">
        <div className="h-[84%] overflow-hidden rounded-t-lg">
          <CodeMirror
            value={code}
            height="100%"
            extensions={getExtensionLanguage(language)}
            theme={vscodeDark}
            className="h-full"
            id="editor"
            onChange={(editor) => {
              setCode(editor);
            }}
          />
        </div>

        <div className="mb-2 h-[16%] overflow-y-scroll rounded-b-lg border-t-[1px] border-dashed border-white bg-black p-2 text-white">
          <h2 className="m-0">output :</h2>
          <div className="w-full overflow-y-scroll">{output}</div>
        </div>
      </div>
    </div>
  );
}
