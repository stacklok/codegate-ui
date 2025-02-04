import {
  Badge,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  LinkButton,
  TableHeader,
} from "@stacklok/ui-kit";
import { Globe02, Tool01 } from "@untitled-ui/icons-react";
import { PROVIDER_AUTH_TYPE_MAP } from "../lib/utils";
import { TableActions } from "./table-actions";
import { useProviders } from "../hooks/use-providers";

export function TableProviders() {
  const { data: providers = [] } = useProviders();

  return (
    <Table aria-label="List of workspaces">
      <Row>
        <TableHeader>
          <Column id="provider" isRowHeader>
            name & description
          </Column>
          <Column id="type" isRowHeader>
            provider
          </Column>
          <Column id="endpoint" isRowHeader>
            endpoint
          </Column>
          <Column id="auth" isRowHeader>
            authentication
          </Column>
          <Column id="configuration"></Column>
        </TableHeader>
      </Row>
      <TableBody>
        {providers.map((provider) => (
          <Row key={provider.id}>
            <Cell className="">
              <div className="text-primary">{provider.name}</div>
              <div className="text-tertiary">{provider.description}</div>
            </Cell>
            <Cell className="capitalize">{provider.provider_type}</Cell>
            <Cell className="">
              <div className="flex items-center gap-2">
                <Globe02 className="size-4" />
                <span>{provider.endpoint}</span>
              </div>
            </Cell>
            <Cell className="">
              <div className="flex items-center justify-between gap-2">
                {provider.auth_type ? (
                  <Badge size="sm" className="text-tertiary">
                    {PROVIDER_AUTH_TYPE_MAP[provider.auth_type]}
                  </Badge>
                ) : (
                  "N/A"
                )}
                <LinkButton
                  variant="tertiary"
                  className="flex gap-2 items-center"
                  href={`/providers/${provider.id}`}
                >
                  <Tool01 className="size-4" /> Manage
                </LinkButton>
              </div>
            </Cell>
            <Cell alignment="end">
              <TableActions provider={provider} />
            </Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
