import { MuxMatcherType, MuxRule } from "@/api/generated";
import { useFormState } from "@/hooks/useFormState";
import { isEqual } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type PreferredMuxRule = MuxRule & { id: string };

type MuxingRulesFormState = {
  rules: PreferredMuxRule[];
};

const DEFAULT_STATE: PreferredMuxRule = {
  id: uuidv4(),
  provider_id: "",
  model: "",
  matcher: "",
  matcher_type: MuxMatcherType.CATCH_ALL,
};

export const useMuxingRulesFormState = (initialValues: MuxRule[]) => {
  const formState = useFormState<MuxingRulesFormState>({
    rules: [{ ...DEFAULT_STATE, id: uuidv4() }],
  });
  const { values, updateFormValues, setInitialValues } = formState;
  const lastValuesRef = useRef(values.rules);

  useEffect(() => {
    const newValues =
      initialValues.length === 0
        ? [DEFAULT_STATE]
        : initialValues.map((item) => ({ ...item, id: uuidv4() }));

    if (!isEqual(lastValuesRef.current, newValues)) {
      lastValuesRef.current = newValues;
      setInitialValues({ rules: newValues });
    }
  }, [initialValues, setInitialValues]);

  const addRule = useCallback(() => {
    const newRules = [
      ...values.rules.slice(0, values.rules.length - 1),
      { ...DEFAULT_STATE, id: uuidv4() },
      ...values.rules.slice(values.rules.length - 1),
    ];
    updateFormValues({
      rules: newRules,
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
