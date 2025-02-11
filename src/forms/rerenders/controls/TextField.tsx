import type { ControlProps, RankedTester } from "@jsonforms/core";
import { isStringControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Input, TextField } from "@stacklok/ui-kit";

import { getRACPropsFromJSONForms, LabelWithDescription } from "../utils";

// eslint-disable-next-line react-refresh/only-export-components
const TextFieldControl = (props: ControlProps) => {
  const mappedProps = getRACPropsFromJSONForms(props);

  return (
    <TextField {...mappedProps}>
      <LabelWithDescription {...props} isRequired={mappedProps.isRequired} />
      <Input />
    </TextField>
  );
};

const tester: RankedTester = rankWith(1, isStringControl);

const renderer = withJsonFormsControlProps(TextFieldControl);

const config = { tester, renderer };

export default config;
