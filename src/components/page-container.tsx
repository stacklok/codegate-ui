import { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <section className="flex-col p-6 max-w-screen-xl mx-auto">
      {children}
    </section>
  );
}
