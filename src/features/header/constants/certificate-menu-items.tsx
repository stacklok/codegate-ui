import { OptionsSchema } from "@stacklok/ui-kit";
import { Download, ShieldCheck } from "lucide-react";

export const CERTIFICATE_MENU_ITEMS = [
  {
    icon: <ShieldCheck />,
    id: "about-certificate-security",
    href: "/certificates/security",
    textValue: "About certificate security",
  },
  {
    icon: <Download />,
    id: "download-certificates",
    href: "/certificates",
    textValue: "Download certificates",
  },
] as const satisfies OptionsSchema<"menu">[];
