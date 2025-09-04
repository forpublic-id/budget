"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "./Button";
import { useTransition } from "react";
import Image from "next/image";

const IndonesianFlag = () => (
  <Image
    src="/flags/indonesia.svg"
    alt="Indonesian flag"
    width={16}
    height={12}
  />
);

const BritishFlag = () => (
  <Image
    src="/flags/united-kingdom.svg"
    alt="British flag"
    width={16}
    height={12}
  />
);

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageSwitch = (newLocale: string) => {
    if (isPending || currentLocale === newLocale) return;

    startTransition(() => {
      // Replace the current locale in the pathname
      const pathSegments = pathname.split("/");

      if (pathSegments[1] === currentLocale) {
        // Replace existing locale
        pathSegments[1] = newLocale;
      } else {
        // If no locale in path, add it
        pathSegments.splice(1, 0, newLocale);
      }

      const newPath = pathSegments.join("/");
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <div className="flex gap-1">
      <Button
        variant={currentLocale === "id" ? "default" : "ghost"}
        size="sm"
        className={`h-8 px-3 flex items-center gap-1.5 ${
          currentLocale === "id"
            ? "bg-black text-white hover:bg-black/90"
            : "text-black hover:text-black"
        }`}
        disabled={isPending}
        onClick={() => handleLanguageSwitch("id")}
      >
        <IndonesianFlag />
        <span className="font-medium">ID</span>
      </Button>
      <Button
        variant={currentLocale === "en" ? "default" : "ghost"}
        size="sm"
        className={`h-8 px-3 flex items-center gap-1.5 ${
          currentLocale === "en"
            ? "bg-black text-white hover:bg-black/90"
            : "text-black hover:text-black"
        }`}
        disabled={isPending}
        onClick={() => handleLanguageSwitch("en")}
      >
        <BritishFlag />
        <span className="font-medium">EN</span>
      </Button>
    </div>
  );
}
