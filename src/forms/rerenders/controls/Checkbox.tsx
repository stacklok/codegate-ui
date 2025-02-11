import type { ControlProps, RankedTester } from "@jsonforms/core";
import { isBooleanControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Checkbox, Tooltip, TooltipInfoButton } from "@stacklok/ui-kit";
import { TooltipTrigger } from "react-aria-components";

import { getRACPropsFromJSONForms, JsonFormsError } from "../utils";

const CheckboxControl = (props: ControlProps) => {
  const { label, description } = props;
  const { value: isSelected, ...mappedProps } = getRACPropsFromJSONForms(props);

  return (
    <>
      <Checkbox textPosition="right" {...mappedProps} isSelected={isSelected}>
        <div className="flex items-center gap-1">
          {label}
          {description !== undefined && description.length > 0 ? (
            <TooltipTrigger delay={0}>
              <TooltipInfoButton className="text-sm text-gray-800" />
              <Tooltip className="max-w-72">{description}</Tooltip>
            </TooltipTrigger>
          ) : null}
        </div>
      </Checkbox>
      <JsonFormsError {...props} />
    </>
  );
};

const tester: RankedTester = rankWith(2, isBooleanControl);

const renderer = withJsonFormsControlProps(CheckboxControl);

const config = { tester, renderer };

export default config;
