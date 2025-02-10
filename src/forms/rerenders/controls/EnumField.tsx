import type {
  ControlProps,
  EnumCellProps,
  OwnPropsOfEnum,
  RankedTester,
} from "@jsonforms/core";
import { isEnumControl, rankWith } from "@jsonforms/core";
import {
  withJsonFormsControlProps,
  withJsonFormsEnumProps,
} from "@jsonforms/react";
import { Label, Select, SelectButton } from "@stacklok/ui-kit";

import { getRACPropsFromJSONForms } from "../utils";

// eslint-disable-next-line react-refresh/only-export-components
const EnumFieldControl = (
  props: EnumCellProps & OwnPropsOfEnum & ControlProps,
) => {
  const items = (props.options ?? []).map(({ label, value }) => ({
    textValue: label,
    id: value,
  }));
  const mappedProps = getRACPropsFromJSONForms(props);

  console.log(mappedProps);

  return (
    <Select
      aria-labelledby="preferred-model-id"
      name="model"
      isRequired
      className="w-full"
      items={items}
    >
      <Label className="text-primary text-base mb-2">
        <div className="flex items-center">
          {props.label}{" "}
          {mappedProps.isRequired === true ? (
            <span className="text-red-600">*</span>
          ) : null}
        </div>
      </Label>
      hello
      <SelectButton />
    </Select>
  );
};

const tester: RankedTester = (...args) => {
  const x = rankWith(2, isEnumControl)(...args);
  console.log({ args, x });
  return x;
};

const renderer = withJsonFormsControlProps(
  withJsonFormsEnumProps(EnumFieldControl, false),
);

const config = { tester, renderer };

export default config;
