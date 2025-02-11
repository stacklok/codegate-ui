import type {
  ControlProps,
  EnumCellProps,
  OwnPropsOfEnum,
  RankedTester,
} from "@jsonforms/core";
import { isEnumControl, rankWith } from "@jsonforms/core";
import { withJsonFormsEnumProps } from "@jsonforms/react";
import { Select, SelectButton } from "@stacklok/ui-kit";
import { getRACPropsFromJSONForms, LabelWithDescription } from "../utils";

// eslint-disable-next-line react-refresh/only-export-components
const EnumFieldControl = (
  props: EnumCellProps & OwnPropsOfEnum & ControlProps,
) => {
  const items = [
    {
      label: "Select an option",
      value: "",
    },
    ...(props.options ?? []),
  ].map(({ label, value }) => ({
    textValue: label,
    id: value,
  }));
  const mappedProps = getRACPropsFromJSONForms(props);

  return (
    <Select
      aria-labelledby="preferred-model-id"
      name="model"
      className="w-full"
      items={items}
      {...mappedProps}
      onSelectionChange={(newValue) => {
        props.handleChange(props.path, newValue);
      }}
      selectedKey={mappedProps.value ?? ""}
    >
      <LabelWithDescription {...props} isRequired={mappedProps.isRequired} />

      <SelectButton />
    </Select>
  );
};

const tester: RankedTester = (...args) => {
  const x = rankWith(2, isEnumControl)(...args);
  return x;
};

// @ts-expect-error the types are not properly handled here for some reason
// for pragmatic reasons I ignored this
const renderer = withJsonFormsEnumProps(EnumFieldControl, false);

const config = { tester, renderer };

export default config;
