import { Button, DialogFooter } from "@stacklok/ui-kit";
import { useNavigate } from "react-router-dom";

export function ProviderDialogFooter() {
  const navigate = useNavigate();

  return (
    <DialogFooter className="justify-end">
      <Button variant="secondary" onPress={() => navigate("/providers")}>
        Discard
      </Button>
      <Button type="submit" variant="primary">
        Save
      </Button>
    </DialogFooter>
  );
}
