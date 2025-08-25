import { useTranslations } from "next-intl";
import Link from "next/link";
import { PieChart, ExternalLink } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  // Avoid dynamic year mismatch by using a fixed build-time year (updated during deployment) to keep SSR/CSR consistent.
  // If real-time year rollover is desired, move this logic into a client component with useEffect.
  const BUILD_YEAR = 2025; // update annually if needed

  const ecosystemApps = [
    {
      name: "ForPublic.id",
      url: "https://forpublic.id",
      description: "Platform utama transparansi publik",
    },
    {
      name: "Salary.ForPublic.id",
      url: "https://salary.forpublic.id",
      description: "Transparansi gaji PNS dan pejabat",
    },
    {
      name: "Holiday.ForPublic.id",
      url: "https://holiday.forpublic.id",
      description: "Kalender hari libur nasional",
    },
  ];

  const quickLinks = [
    { key: "about", href: "/about" },
    { key: "methodology", href: "/methodology" },
    { key: "sources", href: "/sources" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <PieChart className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">Budget</span>
                <span className="text-xs text-muted-foreground leading-none">
                  ForPublic.id
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tautan Cepat</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(`links.${link.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Ecosystem */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("ecosystem")}</h3>
            <nav className="flex flex-col space-y-2">
              {ecosystemApps.map((app) => (
                <Link
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>{app.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    {app.description}
                  </p>
                </Link>
              ))}
            </nav>
          </div>

          {/* Data & Methodology */}
          <div className="space-y-4">
            <h3 className="font-semibold">Data & Metodologi</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Sumber Utama</p>
                <p className="text-xs text-muted-foreground">
                  Kementerian Keuangan RI, DJPK, BPKAD
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Update Terakhir</p>
                <p className="text-xs text-muted-foreground">Januari 2025</p>
              </div>
              <div>
                <p className="text-sm font-medium">Lisensi</p>
                <p className="text-xs text-muted-foreground">
                  Open Data - CC BY 4.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              {t("copyright").replace("2025", BUILD_YEAR.toString())}
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="https://github.com/forpublic-id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
