"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  PieChart,
  Search,
  BarChart3,
  TrendingUp,
  MapPin,
  Info,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const navigation = [
  { key: "home", href: "/", icon: null },
  { key: "national", href: "/national", icon: PieChart },
  { key: "regional", href: "/regional", icon: MapPin },
  { key: "compare", href: "/compare", icon: BarChart3 },
  { key: "trends", href: "/trends", icon: TrendingUp },
  { key: "search", href: "/search", icon: Search },
  { key: "about", href: "/about", icon: Info },
];

export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  <span>{t(item.key)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={locale === "id" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Link href="/id" className="px-2 py-1 text-xs">
                    ID
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={locale === "en" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Link href="/en" className="px-2 py-1 text-xs">
                    EN
                  </Link>
                </Button>
              </div>
            </div>

            {/* Beta Badge */}
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-1 p-4">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href === "/" ? "" : item.href}`}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{t(item.key)}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={locale === "id" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Link href="/id" className="px-3 py-1">
                    Indonesian
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={locale === "en" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Link href="/en" className="px-3 py-1">
                    English
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}