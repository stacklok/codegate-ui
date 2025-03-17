import { Workspace } from '@/api/generated'
import { Badge } from '@stacklok/ui-kit'
import { uniqBy } from 'lodash'

export function WorkspacesByProvider({
  workspaces = [],
}: {
  workspaces: Workspace[] | undefined
}) {
  if (workspaces.length === 0) return null
  return (
    <div className="mb-6 flex flex-col gap-1">
      <p>
        The following workspaces are currently using this provider and will need
        to be updated:
      </p>
      <div className="flex flex-wrap gap-1">
        {uniqBy(workspaces, 'name').map((item, index) => {
          return (
            <Badge key={index} className="my-1">
              {item.name}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
