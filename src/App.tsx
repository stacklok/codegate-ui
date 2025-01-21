import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { usePromptsData } from "./hooks/usePromptsData";
import { Sidebar } from "./components/Sidebar";
import { useSse } from "./hooks/useSse";
import Page from "./Page";

function App() {
  const { data: prompts, isLoading } = usePromptsData();
  useSse();

  return (
    <div className="flex w-screen h-screen">
      <Sidebar loading={isLoading}>
        <PromptList prompts={prompts ?? []} />
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          <Page />
        </div>
      </div>
    </div>
  );
}

export default App;
