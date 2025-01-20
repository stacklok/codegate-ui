import Editor, { type Theme } from "@monaco-editor/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DarkModeContext,
  LinkButton,
  Text,
} from "@stacklok/ui-kit";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePostSystemPrompt } from "../hooks/use-post-system-prompt";
import { Check } from "lucide-react";

type DarkModeContextValue = {
  preference: "dark" | "light" | null;
  override: "dark" | "light" | null;
};

const DEFAULT_VALUE = `You are a security expert conducting a thorough code review.\nIdentify potential security vulnerabilities, suggest improvements, and explain security best practices.`;

function inferDarkMode(
  contextValue:
    | null
    | [DarkModeContextValue, Dispatch<SetStateAction<DarkModeContextValue>>],
): Theme {
  if (contextValue === null) return "light";

  // Handle override
  if (contextValue[0].override === "dark") return "vs-dark";
  if (contextValue[0].override === "light") return "light";

  // Handle preference
  if (contextValue[0].preference === "dark") return "vs-dark";
  return "light";
}

function useSavedStatus() {
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(id);
  }, [saved]);

  return { saved, setSaved };
}

export function SystemPromptEditor({ className }: { className?: string }) {
  const context = useContext(DarkModeContext);
  const theme: Theme = inferDarkMode(context);

  const [value, setValue] = useState<string>(() => DEFAULT_VALUE);

  const { mutate, isPending } = usePostSystemPrompt();

  const { saved, setSaved } = useSavedStatus();

  return (
    <Card className={className}>
      <CardBody>
        <Text className="text-primary">Custom prompt</Text>
        <Text className="text-secondary mb-4">
          Pass custom instructions to your LLM to augment it's behavior, and
          save time & tokens.
        </Text>
        <div className="border border-gray-200 rounded overflow-hidden">
          <Editor
            options={{
              minimap: { enabled: false },
            }}
            value={value}
            onChange={(v) => setValue(v ?? "")}
            height="20rem"
            defaultLanguage="Markdown"
            theme={theme}
            className="bg-base"
            defaultValue="<!-- Add any additional prompts you would like to pass to your LLM here. -->"
          />
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <LinkButton variant="secondary">Cancel</LinkButton>
        <Button
          isPending={isPending}
          isDisabled={saved}
          onPress={() => {
            mutate(value, {
              onSuccess: () => setSaved(true),
            });
          }}
        >
          {saved ? (
            <>
              <span>Saved</span> <Check />
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
