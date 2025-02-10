import type { ControlProps, RankedTester } from "@jsonforms/core";
import { isStringControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Input, Label, TextField } from "@stacklok/ui-kit";

import { getRACPropsFromJSONForms, JsonFormsDescription } from "../utils";

// eslint-disable-next-line react-refresh/only-export-components
const TextFieldControl = (props: ControlProps) => {
  const { label } = props;
  const mappedProps = getRACPropsFromJSONForms(props);

  return (
    <TextField {...mappedProps}>
      <Label className="text-primary text-base mb-2 ">
        <div className="flex items-center">
          {label}{" "}
          {mappedProps.isRequired === true ? (
            <span className="text-red-600">*</span>
          ) : null}
        </div>
      </Label>
      <Input />
      <JsonFormsDescription {...props} />
    </TextField>
  );
};

const tester: RankedTester = rankWith(1, isStringControl);

const renderer = withJsonFormsControlProps(TextFieldControl);

const config = { tester, renderer };

export default config;
