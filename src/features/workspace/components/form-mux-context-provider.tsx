import { createContext, ReactNode, useContext } from 'react'
import { useFieldArray } from 'react-hook-form'
import { WorkspaceConfigFieldValues } from '../lib/schema-mux'

type FormMuxRulesContextValue = ReturnType<
  typeof useFieldArray<WorkspaceConfigFieldValues>
>

const FormMuxRulesContext = createContext<FormMuxRulesContextValue | null>(null)

export const useFormMuxRulesContext = (): FormMuxRulesContextValue => {
  const context = useContext(FormMuxRulesContext)
  if (!context)
    throw Error(
      'useFormMuxRulesContext must be used inside a FormMuxRulesContextProvider'
    )

  return context
}

export function FormMuxRulesContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const value = useFieldArray<WorkspaceConfigFieldValues>({
    name: 'muxing_rules',
  })

  return (
    <FormMuxRulesContext.Provider value={value}>
      {children}
    </FormMuxRulesContext.Provider>
  )
}
