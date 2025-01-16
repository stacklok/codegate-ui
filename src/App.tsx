import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, Link } from "react-router-dom";
import { Chat } from "./components/Chat";
import { usePromptsData } from "./hooks/usePromptsData";
import { Sidebar } from "./components/Sidebar";
import { useSse } from "./hooks/useSse";
import { Help } from "./components/Help";
import { Certificates } from "./components/Certificates";
import { CertificateSecurity } from "./components/CertificateSecurity";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./components/ui/breadcrumb";
import { useBreadcrumb } from "./hooks/useBreadcrumb";

function App() {
  const { data: prompts, isLoading, refetch } = usePromptsData();
  useSse();
  const breadcrumb = useBreadcrumb();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar loading={isLoading}>
        <PromptList prompts={prompts ?? []} />
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="px-6 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/">Dashboard</Link>
              </BreadcrumbItem>
              {breadcrumb && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="w-96 truncate">
                      {breadcrumb}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prompt/:id" element={<Chat />} />
            <Route path="/help/:section" element={<Help />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route
              path="/certificates/security"
              element={<CertificateSecurity />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
