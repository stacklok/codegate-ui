import { OptionsSchema } from "@stacklok/ui-kit";
import { Download01, ShieldTick } from "@untitled-ui/icons-react";

export const CERTIFICATE_MENU_ITEMS = [
  {
    icon: <ShieldTick />,
    id: "about-certificate-security",
    href: "/certificates/security",
    textValue: "About certificate security",
  },
  {
    icon: <Download01 />,
    id: "download-certificates",
    href: "/certificates",
    textValue: "Download certificates",
  },
] as const satisfies OptionsSchema<"menu">[];
