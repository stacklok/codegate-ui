import type {
  EnumCellProps,
  OwnPropsOfEnum,
  RankedTester,
} from "@jsonforms/core";
import { isEnumControl, rankWith } from "@jsonforms/core";
import { withJsonFormsEnumProps } from "@jsonforms/react";
import { Label, Select, SelectButton } from "@stacklok/ui-kit";

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
};

const tester: RankedTester = (...args) => {
  const x = rankWith(2, isEnumControl)(...args);
  console.log({ args, x });
  return x;
};

// @ts-expect-error the types are not properly handled here for some reason
// for pragmatic reasons I ignored this
const renderer = withJsonFormsEnumProps(EnumFieldControl, false);

const config = { tester, renderer };

export default config;
