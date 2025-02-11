import { Button, Card, CardBody, CardFooter, Form } from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { ComponentProps, useState } from "react";
import { SchemaForm } from "@/forms";
import { Static, TSchema } from "@sinclair/typebox";
import { isEqual } from "lodash";
import { FlipBackward } from "@untitled-ui/icons-react";

export function FormCard<T extends TSchema>({
  className,
  isDisabled = false,
  schema,
  initialData,
  formError = null,
  onSubmit,
  isPending = false,
  ...props
}: {
  /*
   * The error message to display at the bottom of the form
   */
  formError?: string | null;
  className?: string;
  isDisabled?: boolean;
  schema: T;
  initialData: Static<T>;
  onSubmit: (data: Static<T>) => void;
  isPending?: boolean;
} & Omit<ComponentProps<typeof Card>, "onSubmit">) {
  const [data, setData] = useState(() => initialData);
  const isDirty = !isEqual(data, initialData);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
    >
      <Card className={twMerge(className, "shrink-0")} {...props}>
        <CardBody>
          <SchemaForm
            data={data}
            schema={schema}
            onChange={({ data }) => setData(data)}
            isDisabled={isDisabled}
            validationMode="ValidateAndShow"
          />
        </CardBody>
        <CardFooter className="justify-end gap-2">
          {formError && <div className="p-1 text-red-700">{formError}</div>}
          {isDirty && (
            <Button variant="tertiary" onPress={() => setData(initialData)}>
              <FlipBackward />
              Revert changes
            </Button>
          )}
          <Button
            isDisabled={isDisabled || !isDirty}
            isPending={isPending}
            type="submit"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
