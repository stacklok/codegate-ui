import { MuxMatcherType, MuxRule } from "@/api/generated";
import { useFormState } from "@/hooks/useFormState";
import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type PreferredMuxRule = MuxRule & { id: string };

const DEFAULT_STATE: PreferredMuxRule = {
  id: "",
  provider_id: "",
  model: "",
  matcher: "",
  matcher_type: MuxMatcherType.CATCH_ALL,
};

export const useMuxingRulesFormState = (initialValues: MuxRule[]) => {
  const formState = useFormState<{
    rules: PreferredMuxRule[];
  }>({
    rules: [{ ...DEFAULT_STATE, id: uuidv4() }],
  });
  const { values, updateFormValues } = formState;

  useEffect(() => {
    if (initialValues.length === 0) return;

    updateFormValues({
      rules: initialValues.map((item) => ({ ...item, id: uuidv4() })),
    });
  }, [initialValues, updateFormValues]);

  const addRule = useCallback(() => {
    updateFormValues({
      rules: [...values.rules, { ...DEFAULT_STATE, id: uuidv4() }],
    });
  }, [updateFormValues, values.rules]);

  const setRules = useCallback(
    (rules: PreferredMuxRule[]) => {
      updateFormValues({ rules });
    },
    [updateFormValues],
  );

  const setRuleItem = useCallback(
    (rule: PreferredMuxRule) => {
      updateFormValues({
        rules: values.rules.map((item) => (item.id === rule.id ? rule : item)),
      });
    },
    [updateFormValues, values.rules],
  );

  const removeRule = useCallback(
    (ruleIndex: number) => {
      updateFormValues({
        rules: values.rules.filter((_, index) => index !== ruleIndex),
      });
    },
    [updateFormValues, values.rules],
  );

  return { addRule, setRules, setRuleItem, removeRule, values, formState };
};
