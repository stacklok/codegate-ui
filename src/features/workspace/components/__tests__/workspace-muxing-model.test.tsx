import { render } from '@/lib/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { WorkspaceMuxingModel } from '../workspace-muxing-model'
import userEvent from '@testing-library/user-event'

test('renders muxing model', async () => {
  render(
    <WorkspaceMuxingModel isArchived={false} workspaceName="fake-workspace" />
  )
  expect(screen.getByText(/model muxing/i)).toBeVisible()
  expect(
    screen.getByText(
      /select the model you would like to use in this workspace. This section applies only if you are using the MUX endpoint./i
    )
  ).toBeVisible()
  expect(
    screen.getByRole('link', {
      name: /learn more/i,
    })
  ).toBeVisible()

  await userEvent.type(
    screen.getByRole('textbox', {
      name: /filter by/i,
    }),
    '.tsx'
  )

  await userEvent.click(screen.getByTestId(/workspace-models-dropdown/i))
  await userEvent.click(
    screen.getByRole('option', {
      name: /claude-3.6/i,
    })
  )

  expect(screen.getByRole('button', { name: /add filter/i })).toBeVisible()
  expect(screen.getByRole('link', { name: /manage providers/i })).toBeVisible()
  expect(screen.getByRole('button', { name: /revert changes/i })).toBeVisible()
  expect(screen.getByRole('button', { name: /save/i })).toBeVisible()
})

test('disabled muxing fields and buttons for archived workspace', async () => {
  render(
    <WorkspaceMuxingModel isArchived={true} workspaceName="fake-workspace" />
  )

  expect(await screen.findByRole('button', { name: /save/i })).toBeDisabled()
  expect(screen.getByTestId(/workspace-models-dropdown/i)).toBeDisabled()
  expect(
    await screen.findByRole('button', { name: /add filter/i })
  ).toBeDisabled()
})

test('submit additional model overrides', async () => {
  render(
    <WorkspaceMuxingModel isArchived={false} workspaceName="fake-workspace" />
  )

  expect(screen.getAllByRole('textbox', { name: /filter by/i }).length).toEqual(
    1
  )

  await userEvent.click(screen.getByTestId(/workspace-models-dropdown/i))
  await userEvent.click(
    screen.getByRole('option', {
      name: /claude-3.6/i,
    })
  )
  await waitFor(() => {
    expect(screen.getByText(/claude-3.6/i)).toBeVisible()
  })

  await userEvent.click(screen.getByRole('button', { name: /add filter/i }))
  const textFields = await screen.findAllByRole('textbox', {
    name: /filter by/i,
  })
  expect(textFields.length).toEqual(2)
  const modelsButton = await screen.findAllByTestId(
    /workspace-models-dropdown/i
  )
  expect(modelsButton.length).toEqual(2)

  await userEvent.type(textFields[1] as HTMLFormElement, '.ts')

  await userEvent.click(
    (await screen.findByRole('button', {
      name: /select a model/i,
    })) as HTMLFormElement
  )

  await userEvent.click(
    screen.getByRole('option', {
      name: /chatgpt-4p/i,
    })
  )

  await userEvent.click(screen.getByRole('button', { name: /save/i }))

  await waitFor(() => {
    expect(
      screen.getByText(/muxing rules for fake-workspace updated/i)
    ).toBeVisible()
  })
})
