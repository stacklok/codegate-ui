import {
  MuxMatcherType,
  MuxRule,
  V1GetWorkspaceMuxesData,
} from "@/api/generated";
import { v1GetWorkspaceMuxesOptions } from "@/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormState } from "@/hooks/useFormState";

export type PreferredMuxRule = MuxRule & { id: string };

const DEFAULT_STATE: PreferredMuxRule = {
  id: "",
  provider_id: "",
  model: "",
  matcher: "",
  matcher_type: MuxMatcherType.CATCH_ALL,
};

const usePreferredModel = (options: {
  path: {
    workspace_name: string;
  };
}) => {
  return useQuery({
    ...v1GetWorkspaceMuxesOptions(options),
  });
};

export const usePreferredModelWorkspace = (workspaceName: string) => {
  const { values, updateFormValues } = useFormState<{
    rules: PreferredMuxRule[];
  }>({
    rules: [{ ...DEFAULT_STATE, id: uuidv4() }],
  });
  const options: V1GetWorkspaceMuxesData &
    Omit<V1GetWorkspaceMuxesData, "body"> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName],
  );
  const { data, isPending } = usePreferredModel(options);

  useEffect(() => {
    updateFormValues({
      rules: data?.map((item) => ({ ...item, id: uuidv4() })) ?? [
        { ...DEFAULT_STATE, id: uuidv4() },
      ],
    });
  }, [data, updateFormValues]);

  const addRule = useCallback(() => {
    updateFormValues({
      rules: [...values.rules, { ...DEFAULT_STATE, id: uuidv4() }],
    });
  }, [values.rules, updateFormValues]);

  const setRules = useCallback(
    (rules: PreferredMuxRule[]) => {
      updateFormValues({ rules });
    },
    [values.rules, updateFormValues],
  );

  const setRuleItem = useCallback(
    (rule: PreferredMuxRule) => {
      updateFormValues({
        rules: values.rules.map((item) => (item.id === rule.id ? rule : item)),
      });
    },
    [values.rules, updateFormValues],
  );

  const removeRule = useCallback(
    (ruleIndex: number) => {
      updateFormValues({
        rules: values.rules.filter((_, index) => index !== ruleIndex),
      });
    },
    [values.rules, updateFormValues],
  );

  return {
    setRuleItem,
    values,
    addRule,
    setRules,
    removeRule,
    isPending,
  };
};
