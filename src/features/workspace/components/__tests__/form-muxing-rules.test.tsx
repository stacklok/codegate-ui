import { render } from '@/lib/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { FormMuxRules } from '../form-mux-rules'
import userEvent from '@testing-library/user-event'

test('all fields are disabled if the form is disabled', async () => {
  render(<FormMuxRules isDisabled={true} workspaceName="fake-workspace" />)

  expect(
    screen.getByLabelText(/matcher type/i, { selector: 'button' })
  ).toBeDisabled()
  expect(
    screen.getByLabelText(/matcher/i, { selector: 'input' })
  ).toBeDisabled()
  expect(screen.getByLabelText(/model/i, { selector: 'input' })).toBeDisabled()
  expect(
    screen.getByLabelText(/delete/i, { selector: 'button' })
  ).toBeDisabled()
  expect(
    screen.getByLabelText(/add filter/i, { selector: 'button' })
  ).toBeDisabled()
  expect(
    screen.getByLabelText(/revert changes/i, { selector: 'button' })
  ).toBeDisabled()
  expect(screen.getByLabelText(/save/i, { selector: 'button' })).toBeDisabled()
})

test('muxing rules form works correctly', async () => {
  render(<FormMuxRules isDisabled={false} workspaceName="fake-workspace" />)

  // should only have 1 row initially
  expect(
    screen.getAllByLabelText(/matcher type/i, { selector: 'button' }).length
  ).toEqual(1)
  expect(
    screen.getAllByLabelText(/matcher/i, { selector: 'input' }).length
  ).toEqual(1)
  expect(
    screen.getAllByLabelText(/model/i, { selector: 'input' }).length
  ).toEqual(1)
  expect(
    screen.getAllByLabelText(/delete/i, { selector: 'button' }).length
  ).toEqual(1)

  // shouldn't be able to delete the catch-all row
  expect(
    screen.getAllByLabelText(/delete/i, { selector: 'button' })[0]
  ).toBeDisabled()

  // populate the "catch-all" row
  await userEvent.click(screen.getByLabelText('Model', { selector: 'input' }))
  await userEvent.click(screen.getByRole('option', { name: /claude-3.6/i }))
  await waitFor(() => {
    expect(screen.getByLabelText('Model', { selector: 'input' })).toHaveValue(
      'claude-3.6'
    )
  })

  // add a new row
  await userEvent.click(
    screen.getByLabelText(/add filter/i, { selector: 'button' })
  )

  // add a new row
  expect(
    screen.getAllByLabelText(/matcher type/i, { selector: 'button' }).length
  ).toEqual(2)
  expect(
    screen.getAllByLabelText(/matcher/i, { selector: 'input' }).length
  ).toEqual(2)
  expect(
    screen.getAllByLabelText(/model/i, { selector: 'input' }).length
  ).toEqual(2)
  expect(
    screen.getAllByLabelText(/delete/i, { selector: 'button' }).length
  ).toEqual(2)

  // shouldn't be able to delete the catch-all row
  expect(
    screen.getAllByLabelText(/delete/i, { selector: 'button' })[1]
  ).toBeDisabled()

  // populate new row
  const newMatcherTypeSelect = screen.getAllByLabelText(/matcher type/i, {
    selector: 'button',
  })[0]
  const newMatcherInput = screen.getAllByLabelText(/matcher/i, {
    selector: 'input',
  })[0]
  const newModelComboBox = screen.getAllByLabelText(/model/i, {
    selector: 'input',
  })[0]

  await userEvent.click(newMatcherTypeSelect as HTMLFormElement)
  await userEvent.click(screen.getByRole('option', { name: 'FIM' }))

  await userEvent.type(newMatcherInput as HTMLFormElement, '.tsx')

  await userEvent.click(newModelComboBox as HTMLFormElement)
  await userEvent.click(screen.getByRole('option', { name: /chatgpt-4p/i }))

  await userEvent.click(screen.getByRole('button', { name: /save/i }))

  await waitFor(() => {
    expect(
      screen.getByText(/muxing rules for fake-workspace updated/i)
    ).toBeVisible()
  })
})

test('displays validation errors with invalid config', async () => {
  render(<FormMuxRules isDisabled={false} workspaceName="fake-workspace" />)

  // should only have 1 row initially
  expect(
    screen.getAllByLabelText(/matcher type/i, { selector: 'button' }).length
  ).toEqual(1)
  expect(
    screen.getAllByLabelText(/matcher/i, { selector: 'input' }).length
  ).toEqual(1)
  expect(
    screen.getAllByLabelText(/model/i, { selector: 'input' }).length
  ).toEqual(1)
  expect(
    screen.getAllByLabelText(/delete/i, { selector: 'button' }).length
  ).toEqual(1)

  // add a new row
  await userEvent.click(
    screen.getByLabelText(/add filter/i, { selector: 'button' })
  )

  // populate the matcher input, but not the model
  const matcherInput = screen.getAllByLabelText(/matcher/i, {
    selector: 'input',
  })[0]
  await userEvent.type(matcherInput as HTMLFormElement, '.tsx')

  await userEvent.click(screen.getByRole('button', { name: /save/i }))

  await waitFor(() => {
    expect(screen.getByText(/muxing: model is required/i)).toBeVisible()
  })
})
