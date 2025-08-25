"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, PieChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Badge } from "@/components/ui/Badge";

const navigation = [
  { key: "national", href: "/national" },
  { key: "regional", href: "/regional" },
  { key: "compare", href: "/compare" },
  { key: "trends", href: "/trends" },
  { key: "search", href: "/search" },
  { key: "about", href: "/about" },
];

export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActivePage = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <PieChart className="h-5 w-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xl font-bold text-foreground whitespace-nowrap">
                Budget <span className="text-primary">ForPublic</span>
              </span>
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                by <span className="text-foreground">ForPublic</span>
                <span className="text-red-600">.id</span>
              </span>
            </div>
            <Badge
              variant="secondary"
              className="hidden text-xs sm:inline-flex"
            >
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = isActivePage(item.href);
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`transition-colors hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 rounded-sm px-1 py-1 ${
                    isActive ? "text-neutral-700 font-medium" : "text-gray-600"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t(item.key as any)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 px-4 md:px-6 lg:px-8">
            <nav className="space-y-4">
              {navigation.map((item) => {
                const isActive = isActivePage(item.href);
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className={`block text-sm font-medium transition-colors py-2 ${
                      isActive
                        ? "text-neutral-700 font-medium"
                        : "text-gray-600 hover:text-neutral-700"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(item.key as any)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Language:</span>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}