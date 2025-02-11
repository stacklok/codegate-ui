export { BaseSchemaForm } from "./BaseSchemaForm";

import type {
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  ValidationMode,
} from "@jsonforms/core";

import Checkbox from "./rerenders/controls/Checkbox";
import TextField from "./rerenders/controls/TextField";
import EnumField from "./rerenders/controls/EnumField";
import ObjectRenderer from "./rerenders/ObjectRenderer";
import VerticalLayout from "./rerenders/VerticalLayout";

import { BaseSchemaForm } from "./BaseSchemaForm";
import { JsonFormsInitStateProps, JsonFormsReactProps } from "@jsonforms/react";
import { JSX } from "react/jsx-runtime";
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers";

const formRenderers: JsonFormsRendererRegistryEntry[] = [
  TextField,
  Checkbox,
  EnumField,

  // layouts
  ObjectRenderer,
  VerticalLayout,

  // default stuff, not based on mui but not ui-kit based either
  // must be last, otherwise it would override our custom stuff
  ...vanillaRenderers,
];

const formCells = [...vanillaCells];

type SchemaFormProps<T extends JsonSchema> = Omit<
  JSX.IntrinsicAttributes &
    JsonFormsInitStateProps &
    JsonFormsReactProps & { validationMode?: ValidationMode },
  "renderers" | "schema"
> & { schema: T; isDisabled?: boolean };

export function SchemaForm<T extends JsonSchema>({
  ...props
}: SchemaFormProps<T>) {
  return (
    <BaseSchemaForm renderers={formRenderers} cells={formCells} {...props} />
  );
}
