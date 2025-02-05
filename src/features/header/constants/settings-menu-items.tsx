import { OptionsSchema } from "@stacklok/ui-kit";
import {
  Download01,
  LayersThree01,
  ShieldTick,
} from "@untitled-ui/icons-react";

export const SETTINGS_MENU_ITEMS = [
  {
    textValue: "Providers",
    id: "providers",
    items: [
      {
        icon: <LayersThree01 />,
        id: "providers",
        href: "/providers",
        textValue: "Providers",
      },
    ],
  },
  {
    textValue: "Certificates",
    id: "certificates",
    items: [
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
    ],
  },
] as const satisfies OptionsSchema<"menu">[];
