import Editor, { type Theme } from "@monaco-editor/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  DarkModeContext,
  Dialog,
  DialogModal,
  DialogModalOverlay,
  DialogTrigger,
  FieldGroup,
  Input,
  Loader,
  SearchField,
  SearchFieldClearButton,
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

import { twMerge } from "tailwind-merge";
import {
  V1GetWorkspaceCustomInstructionsData,
  V1GetWorkspaceCustomInstructionsResponse,
  V1SetWorkspaceCustomInstructionsData,
} from "@/api/generated";

import {
  QueryCacheNotifyEvent,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { v1GetWorkspaceCustomInstructionsQueryKey } from "@/api/generated/@tanstack/react-query.gen";
import { useQueryGetWorkspaceCustomInstructions } from "../hooks/use-query-get-workspace-custom-instructions";
import { useMutationSetWorkspaceCustomInstructions } from "../hooks/use-mutation-set-workspace-custom-instructions";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import systemPrompts from "../constants/built-in-system-prompts.json";

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

function EditorLoadingUI() {
  return (
    // arbitrary value to match the monaco editor height
    // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
    <div className="min-h-[20rem] w-full flex items-center justify-center">
      <Loader className="my-auto" />
    </div>
  );
}

function isGetWorkspaceCustomInstructionsQuery(
  queryKey: unknown,
  options: V1GetWorkspaceCustomInstructionsData,
): boolean {
  return (
    Array.isArray(queryKey) &&
    queryKey[0]._id ===
      v1GetWorkspaceCustomInstructionsQueryKey(options)[0]?._id
  );
}

function getCustomInstructionsFromEvent(
  event: QueryCacheNotifyEvent,
): string | null {
  if ("action" in event === false || "data" in event.action === false)
    return null;
  return (
    (
      event.action.data as
        | V1GetWorkspaceCustomInstructionsResponse
        | undefined
        | null
    )?.prompt ?? null
  );
}

function useCustomInstructionsValue({
  initialValue,
  options,
  queryClient,
}: {
  initialValue: string;
  options: V1GetWorkspaceCustomInstructionsData;
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
        isGetWorkspaceCustomInstructionsQuery(
          event.query.options.queryKey,
          options,
        )
      ) {
        const prompt: string | null = getCustomInstructionsFromEvent(event);
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

function PromptPresetPicker() {
  const [query, setQuery] = useState<string>("");

  const fuse = new Fuse(systemPrompts, {
    keys: ["name", "text"],
  });

  return (
    <>
      <div className="flex justify-end">
        <SearchField className="max-w-96" value={query} onChange={setQuery}>
          <FieldGroup>
            <Input icon={<Search />} />
            <SearchFieldClearButton />
          </FieldGroup>
        </SearchField>
      </div>
      <div className="flex flex-wrap gap-6 overflow-auto justify-around ">
        {fuse.search(query.length > 0 ? query : " ").map(({ item }) => {
          return (
            <div className="border rounded-md text-clip w-96 p-2 flex flex-col gap-2">
              <h2 className="font-bold truncate">{item.name}</h2>
              <pre className="h-40 overflow-hidden text-wrap text-sm">
                {item.text}
              </pre>
              <Button variant="secondary">Activate</Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function WorkspaceCustomInstructions({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const context = useContext(DarkModeContext);
  const theme: Theme = inferDarkMode(context);

  const options: V1GetWorkspaceCustomInstructionsData &
    Omit<V1SetWorkspaceCustomInstructionsData, "body"> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName],
  );

  const queryClient = useQueryClient();

  const {
    data: customInstructionsResponse,
    isPending: isCustomInstructionsPending,
  } = useQueryGetWorkspaceCustomInstructions(options);
  const { mutateAsync, isPending: isMutationPending } =
    useMutationSetWorkspaceCustomInstructions(options);

  const { setValue, value } = useCustomInstructionsValue({
    initialValue: customInstructionsResponse?.prompt ?? "",
    options,
    queryClient,
  });

  const handleSubmit = useCallback(
    (value: string) => {
      mutateAsync(
        { ...options, body: { prompt: value } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: v1GetWorkspaceCustomInstructionsQueryKey(options),
              refetchType: "all",
            });
          },
        },
      );
    },
    [mutateAsync, options, queryClient],
  );

  return (
    <Card className={twMerge(className, "shrink-0")}>
      <CardBody>
        <Text className="text-primary">Custom instructions</Text>
        <Text className="text-secondary mb-4">
          Pass custom instructions to your LLM to augment its behavior, and save
          time & tokens.
        </Text>
        <div className="border border-gray-200 rounded overflow-hidden">
          {isCustomInstructionsPending ? (
            <EditorLoadingUI />
          ) : (
            <Editor
              options={{
                minimap: { enabled: false },
                readOnly: isArchived,
              }}
              value={value}
              onChange={(v) => setValue(v ?? "")}
              height="20rem"
              defaultLanguage="Markdown"
              theme={theme}
              className={twMerge("bg-base", isArchived ? "opacity-25" : "")}
            />
          )}
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <DialogTrigger>
          <Button>Use a preset</Button>
          <DialogModalOverlay isDismissable>
            <DialogModal>
              <Dialog width="lg" className="flex flex-col p-4 gap-4">
                <PromptPresetPicker />
              </Dialog>
            </DialogModal>
          </DialogModalOverlay>
        </DialogTrigger>
        <Button
          isPending={isMutationPending}
          isDisabled={Boolean(isArchived ?? isCustomInstructionsPending)}
          onPress={() => handleSubmit(value)}
          variant="secondary"
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
