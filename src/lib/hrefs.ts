export const hrefs = {
  external: {
    discord: 'https://discord.gg/stacklok',
    github: { newIssue: 'https://github.com/stacklok/codegate/issues/new' },
    docs: {
      home: 'https://docs.codegate.ai/',
      workspaces: 'https://docs.codegate.ai/features/workspaces',
    },
  },
  prompt: (id: string) => `/prompt/${id}`,
  workspaces: {
    all: '/workspaces',
    create: '/workspace/create',
    edit: (name: string) => `/workspace/${name}`,
  },
}
