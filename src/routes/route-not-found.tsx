import { EmptyState } from '@/components/EmptyState'
import { IllustrationError, Button } from '@stacklok/ui-kit'
import { useNavigate } from 'react-router-dom'
import { FlipBackward } from '@untitled-ui/icons-react'

export function RouteNotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full items-center justify-center">
      <EmptyState
        title="Oops! There's nothing here"
        description="Either the page you were looking for doesn’t exist or the link may be broken."
        illustration={<IllustrationError className="w-1/2" />}
      >
        <Button variant="primary" onPress={() => navigate('/')}>
          <FlipBackward /> Home
        </Button>
      </EmptyState>
    </div>
  )
}
