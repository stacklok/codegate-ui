import type {
  EnumCellProps,
  OwnPropsOfEnum,
  RankedTester,
} from "@jsonforms/core";
import { isEnumControl, rankWith } from "@jsonforms/core";
import { withJsonFormsEnumProps } from "@jsonforms/react";
import {
  Input,
  Label,
  Select,
  SelectButton,
  TextField,
} from "@stacklok/ui-kit";

import { JsonFormsDescription } from "../utils";

const EnumFieldControl = (props: EnumCellProps & OwnPropsOfEnum) => {
  const items = (props.options ?? []).map(({ label, value }) => ({
    textValue: label,
    id: value,
  }));

  console.log({ items });

  return (
    <Select
      aria-labelledby="preferred-model-id"
      name="model"
      isRequired
      className="w-full"
      items={items}
    >
      <Label />

      <SelectButton />
    </Select>
  );

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

const tester: RankedTester = (...args) => {
  const x = rankWith(2, isEnumControl)(...args);
  console.log({ args, x });
  return x;
};

const renderer = withJsonFormsEnumProps(EnumFieldControl, false);

const config = { tester, renderer };

export default config;
