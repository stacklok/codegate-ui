import Editor, { type Theme } from "@monaco-editor/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DarkModeContext,
  LinkButton,
  Loader,
  Text,
} from "@stacklok/ui-kit";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePostSystemPrompt } from "../hooks/use-set-system-prompt";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  V1GetWorkspaceSystemPromptData,
  V1GetWorkspaceSystemPromptResponse,
  V1SetWorkspaceSystemPromptData,
} from "@/api/generated";
import { useGetSystemPrompt } from "../hooks/use-get-system-prompt";
import {
  QueryCacheNotifyEvent,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { v1GetWorkspaceSystemPromptQueryKey } from "@/api/generated/@tanstack/react-query.gen";

type DarkModeContextValue = {
  preference: "dark" | "light" | null;
  override: "dark" | "light" | null;
};

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

function EditorLoadingUI() {
  return (
    // arbitrary value to match the monaco editor height
    // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
    <div className="min-h-[20rem] w-full flex items-center justify-center">
      <Loader className="my-auto" />
    </div>
  );
}

function isGetSystemPromptQuery(
  queryKey: unknown,
  options: V1GetWorkspaceSystemPromptData,
): boolean {
  return (
    Array.isArray(queryKey) &&
    queryKey[0]._id === v1GetWorkspaceSystemPromptQueryKey(options)[0]?._id
  );
}

function getPromptFromNotifyEvent(event: QueryCacheNotifyEvent): string | null {
  if ("action" in event === false || "data" in event.action === false)
    return null;
  return (
    (event.action.data as V1GetWorkspaceSystemPromptResponse | undefined | null)
      ?.prompt ?? null
  );
}

function usePromptValue({
  initialValue,
  options,
  queryClient,
}: {
  initialValue: string;
  options: V1GetWorkspaceSystemPromptData;
  queryClient: QueryClient;
}) {
  const [value, setValue] = useState<string>(initialValue);

  // Subscribe to changes in the workspace system prompt value in the query cache
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    const unsubscribe = queryCache.subscribe((event) => {
      if (
        event.type === "updated" &&
        event.action.type === "success" &&
        isGetSystemPromptQuery(event.query.options.queryKey, options)
      ) {
        const prompt: string | null = getPromptFromNotifyEvent(event);
        if (prompt === value || prompt === null) return;

        setValue(prompt);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, [options, queryClient, value]);

  return { value, setValue };
}

export function SystemPromptEditor({
  className,
  workspaceName,
}: {
  className?: string;
  workspaceName: string;
}) {
  const context = useContext(DarkModeContext);
  const theme: Theme = inferDarkMode(context);

  const options: V1GetWorkspaceSystemPromptData &
    Omit<V1SetWorkspaceSystemPromptData, "body"> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName],
  );

  const queryClient = useQueryClient();

  const { data: systemPromptResponse, isPending: isGetPromptPending } =
    useGetSystemPrompt(options);
  const { mutate, isPending: isMutationPending } = usePostSystemPrompt(options);

  const { setValue, value } = usePromptValue({
    initialValue: systemPromptResponse?.prompt ?? "",
    options,
    queryClient,
  });

  const { saved, setSaved } = useSavedStatus();

  const handleSubmit = useCallback(
    (value: string) => {
      mutate(
        { ...options, body: { prompt: value } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: v1GetWorkspaceSystemPromptQueryKey(options),
              refetchType: "all",
            });
            setSaved(true);
          },
        },
      );
    },
    [mutate, options, queryClient, setSaved],
  );

  return (
    <Card className={twMerge(className, "shrink-0")}>
      <CardBody>
        <Text className="text-primary">Custom prompt</Text>
        <Text className="text-secondary mb-4">
          Pass custom instructions to your LLM to augment it's behavior, and
          save time & tokens.
        </Text>
        <div className="border border-gray-200 rounded overflow-hidden">
          {isGetPromptPending ? (
            <EditorLoadingUI />
          ) : (
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
            />
          )}
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <LinkButton href="/workspaces" variant="secondary">
          Cancel
        </LinkButton>
        <Button
          isPending={isMutationPending}
          isDisabled={Boolean(isGetPromptPending ?? saved)}
          onPress={() => handleSubmit(value)}
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
