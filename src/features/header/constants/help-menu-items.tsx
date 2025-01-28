import {
  Continue,
  Copilot,
  Discord,
  Github,
  Youtube,
} from "@/components/icons";
import { OptionsSchema } from "@stacklok/ui-kit";
import { BookOpenText } from "lucide-react";

export const HELP_MENU_ITEMS = [
  {
    textValue: "Getting started",
    id: "setup",
    items: [
      {
        icon: <Continue />,
        id: "continue-setup",
        href: "https://docs.codegate.ai/how-to/use-with-continue",
        textValue: "Use with Continue",
        target: "_blank",
      },
      {
        icon: <Copilot />,
        id: "copilot-setup",
        href: "https://docs.codegate.ai/how-to/use-with-copilot",
        textValue: "Use with Copilot",
        target: "_blank",
      },
      {
        icon: <BookOpenText />,
        id: "documentation",
        href: "https://docs.codegate.ai/",
        textValue: "Documentation",
        target: "_blank",
      },
    ],
  },
  {
    textValue: "Resources",
    id: "resources",
    items: [
      {
        icon: <Discord />,
        id: "discord",
        href: "https://discord.gg/stacklok",
        textValue: "Discord",
        target: "_blank",
      },
      {
        icon: <Github />,
        id: "github",
        href: "https://github.com/stacklok/codegate",
        textValue: "GitHub",
        target: "_blank",
      },
      {
        icon: <Youtube />,
        id: "youtube",
        href: "https://www.youtube.com/@Stacklok",
        textValue: "YouTube",
        target: "_blank",
      },
    ],
  },
] as const satisfies OptionsSchema<"menu">[];
