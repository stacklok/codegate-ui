import * as apiServices from "@/api/generated/sdk.gen";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const client = apiServices.client;

export async function serverApi() {
  client.setConfig({
    baseUrl: BASE_URL,
  });

  return { ...apiServices, client };
}
