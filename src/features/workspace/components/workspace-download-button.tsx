import { Button } from '@stacklok/ui-kit'
import { Download01 } from '@untitled-ui/icons-react'
import { useQueryGetWorkspaceByName } from '../hooks/use-query-get-workspace-by-name'

interface WorkspaceDownloadButtonProps {
  workspaceName: string
}

export const WorkspaceDownloadButton = ({
  workspaceName,
}: WorkspaceDownloadButtonProps) => {
  const { data: workspace, isLoading } = useQueryGetWorkspaceByName({
    path: {
      workspace_name: workspaceName,
    },
  })

  const handleDownload = () => {
    if (!workspace) return

    const jsonString = JSON.stringify(workspace, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${workspaceName}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      isIcon
      variant="secondary"
      onPress={handleDownload}
      isPending={isLoading}
      isDisabled={!workspace}
    >
      <Download01 />
    </Button>
  )
}
