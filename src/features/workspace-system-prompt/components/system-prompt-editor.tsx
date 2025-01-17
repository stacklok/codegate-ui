import Editor, { type Theme } from "@monaco-editor/react";
import { Button, DarkModeContext, Heading } from "@stacklok/ui-kit";
import { Dispatch, SetStateAction, useContext, useState } from "react";

type DarkModeContextValue = {
  preference: "dark" | "light" | null;
  override: "dark" | "light" | null;
};

const DEFAULT_VALUE =
  "<!-- Add any additional prompts you would like to pass to your LLM here. -->";

function inferDarkMode(
  contextValue:
    | null
    | [DarkModeContextValue, Dispatch<SetStateAction<DarkModeContextValue>>],
): Theme {
  if (contextValue === null) return "light";
  if (contextValue[0].override === "dark") return "vs-dark";
  if (contextValue[0].preference === "dark") return "vs-dark";
  return "light";
}

export function SystemPromptEditor() {
  const context = useContext(DarkModeContext);
  const theme: Theme = inferDarkMode(context);

  const [value, setValue] = useState<string>(() => DEFAULT_VALUE);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Heading level={4}>System prompt</Heading>
        <Button
          onPress={() => {
            console.log(value);
          }}
        >
          Save changes
        </Button>
      </div>
      <Editor
        value={value}
        onChange={(v) => setValue(v ?? "")}
        height="50dvh"
        defaultLanguage="Markdown"
        theme={theme}
        className="bg-base"
        defaultValue="<!-- Add any additional prompts you would like to pass to your LLM here. -->"
      />
    </>
  );
}
