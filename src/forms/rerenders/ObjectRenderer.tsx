import isEmpty from "lodash/isEmpty";
import {
  findUISchema,
  GroupLayout,
  isObjectControl,
  RankedTester,
  rankWith,
  StatePropsOfControlWithDetail,
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsDetailProps } from "@jsonforms/react";
import { useMemo } from "react";

const ObjectRenderer = ({
  renderers,
  cells,
  uischemas,
  schema,
  label,
  path,
  visible,
  enabled,
  uischema,
  rootSchema,
}: StatePropsOfControlWithDetail) => {
  const detailUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas ?? [],
        schema,
        uischema.scope,
        path,
        "Group",
        uischema,
        rootSchema,
      ),
    [uischemas, schema, path, uischema, rootSchema],
  );
  if (isEmpty(path)) {
    detailUiSchema.type = "VerticalLayout";
  } else {
    (detailUiSchema as GroupLayout).label = label;
  }
  return (
    <div className={visible ? "" : "hidden"}>
      <JsonFormsDispatch
        visible={visible}
        enabled={enabled}
        schema={schema}
        uischema={detailUiSchema}
        path={path}
        renderers={renderers}
        cells={cells}
      />
    </div>
  );
};

export const tester: RankedTester = rankWith(2, isObjectControl);
const renderer = withJsonFormsDetailProps(ObjectRenderer);

const config = { tester, renderer };

export default config;
