import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      aria-label={
        isDark ? "Переключить на светлую тему" : "Переключить на темную тему"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="sm"
      variant="outline"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
