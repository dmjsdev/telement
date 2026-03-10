import { Link } from "react-router-dom";
import { ArrowRight, Github, Sparkles } from "lucide-react";

import LightPillar from "@/components/LightPillar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080312] text-white">
      <div className="absolute inset-0">
        <LightPillar
          bottomColor="#ff8cf2"
          className="opacity-95"
          glowAmount={0.002}
          intensity={0.7}
          pillarHeight={0.4}
          pillarRotation={25}
          pillarWidth={3}
          rotationSpeed={3.0}
          quality="high"
          topColor="#7c3aed"
        />
      </div>

      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(8,3,18,0.2),rgba(8,3,18,0.78)_70%,rgba(8,3,18,0.96))]" /> */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="flex w-full max-w-4xl flex-col items-center text-center animate-page-enter">
          <Badge className="rounded-full border border-white/15 bg-black/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            <Sparkles className="size-4" />
            React + TypeScript + DummyJSON
          </Badge>

          <div className="mt-8 max-w-3xl space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl shadow-xxl">
              Тестовое задание для Telement
            </h1>
          </div>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-44 rounded-full bg-white px-8 text-black hover:bg-white/90",
              )}
              to="/users"
            >
              Посмотреть
              <ArrowRight className="size-4" />
            </Link>
            <a
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "min-w-44 rounded-full border-white/15 bg-white/10 px-8 text-white backdrop-blur-md hover:bg-white/15 hover:text-white",
              )}
              href="https://github.com/dmjsdev/telement"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
