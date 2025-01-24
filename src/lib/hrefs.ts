export const hrefs = {
  workspaces: {
    all: "/workspaces",
    create: "/workspace/create",
    edit: (name: string) => `/workspace/${name}`,
  },
};
