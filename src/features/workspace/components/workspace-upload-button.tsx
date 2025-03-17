import { Button } from '@stacklok/ui-kit'
import { Upload01 } from '@untitled-ui/icons-react'
import { useMutationCreateWorkspace } from '../hooks/use-mutation-create-workspace'

interface WorkspaceUploadButtonProps {
  onSuccess?: () => void
}

export const WorkspaceUploadButton = ({
  onSuccess,
}: WorkspaceUploadButtonProps) => {
  const { mutateAsync: createWorkspace, isPending } =
    useMutationCreateWorkspace()

  const handleUpload = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const content = await file.text()
        const workspace = JSON.parse(content)

        createWorkspace(
          { body: workspace },
          {
            onSuccess: () => {
              onSuccess?.()
            },
          }
        )
      } catch (error) {
        console.error('Error parsing JSON file:', error)
        // You might want to add proper error handling here
      }
    }

    input.click()
  }

  return (
    <Button
      isIcon
      variant="secondary"
      onPress={handleUpload}
      isPending={isPending}
    >
      <Upload01 />
    </Button>
  )
}
