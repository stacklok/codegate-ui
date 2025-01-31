export const hrefs = {
  external: {
    docs: "https://docs.codegate.ai/",
  },
  prompt: (id: string) => `/prompt/${id}`,
  workspaces: {
    all: "/workspaces",
    create: "/workspace/create",
    edit: (name: string) => `/workspace/${name}`,
  },
};
