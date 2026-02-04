export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
  badge?: string;
}

export const docsNavigation: NavItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Overview", href: "/docs" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Quick Start", href: "/docs/getting-started/quickstart" },
      { title: "Configuration", href: "/docs/getting-started/configuration" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Tools Overview", href: "/docs/tools" },
      { title: "MigrateIQ", href: "/docs/tools/migrateiq", badge: "Popular" },
      { title: "VerifyIQ", href: "/docs/tools/verifyiq" },
      { title: "CodifyIQ", href: "/docs/tools/codifyiq" },
      { title: "ComplyIQ", href: "/docs/tools/complyiq" },
      { title: "DataIQ", href: "/docs/tools/dataiq" },
      { title: "SecureIQ", href: "/docs/tools/secureiq" },
      { title: "Tessera", href: "/docs/tools/tessera", badge: "AI" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Heroku to AWS", href: "/docs/guides/heroku-to-aws" },
      { title: "SOC2 Compliance", href: "/docs/guides/soc2-compliance" },
      { title: "Monolith Decomposition", href: "/docs/guides/monolith-decomposition" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "CLI Reference", href: "/docs/api/cli" },
      { title: "Python API", href: "/docs/api/python" },
    ],
  },
  {
    title: "About",
    items: [
      { title: "Changelog", href: "/docs/about/changelog" },
      { title: "Contributing", href: "/docs/about/contributing" },
      { title: "License", href: "/docs/about/license" },
    ],
  },
];
