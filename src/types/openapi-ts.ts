import { OptionsLegacyParser } from "@hey-api/client-fetch";

export type OpenApiTsReactQueryKey = [
  Pick<
    OptionsLegacyParser,
    "baseUrl" | "body" | "headers" | "path" | "query"
  > & {
    _id: string;
    _infinite?: boolean;
  },
];
