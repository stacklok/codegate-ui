import { ProviderAuthType } from "@/api/generated";
import { ProviderDialog } from "@/features/providers/components/provider-dialog";
import { ProviderDialogFooter } from "@/features/providers/components/provider-dialog-footer";
import { ProviderForm } from "@/features/providers/components/provider-form";
import { useMutationUpdateProvider } from "@/features/providers/hooks/use-mutation-update-provider";
import { useProvider } from "@/features/providers/hooks/use-provider";
import { DialogContent, Form } from "@stacklok/ui-kit";
import { useParams } from "react-router-dom";

export function RouteProviderUpdate() {
  const { id } = useParams();
  if (id === undefined) {
    throw new Error("Provider id is required");
  }
  const { setProvider, provider } = useProvider(id);
  const { mutateAsync } = useMutationUpdateProvider();

  const handleSubmit = (event: React.FormEvent) => {
    console.log(provider);
    event.preventDefault();
    // await mutationProvider.mutateAsync({
    //   path: { provider_id: id },
    //   body: provider,
    // });
    // await mutationAuthMaterial.mutateAsync({
    //   path: { provider_id: id },
    //   body: {
    //     auth_type: provider.auth_type as ProviderAuthType,
    //     api_key: provider.api_key,
    //   },
    // });
  };

  // TODO add empty state and loading in a next step
  if (provider === undefined) return;

  return (
    <ProviderDialog title="Manage Provider">
      <Form onSubmit={handleSubmit} validationBehavior="aria">
        <DialogContent className="p-8">
          <ProviderForm provider={provider} setProvider={setProvider} />
        </DialogContent>
        <ProviderDialogFooter />
      </Form>
    </ProviderDialog>
  );
}
