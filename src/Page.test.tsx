import { render } from './lib/test-utils'
import Page from './Page'

test('render NotFound route', () => {
  const { getByText, getByRole } = render(<Page />, {
    routeConfig: {
      initialEntries: ['/fake-route'],
    },
  })

  expect(getByText(/Oops! There's nothing here/i)).toBeVisible()
  expect(getByRole('button', { name: 'Home' })).toBeVisible()
})
