import { SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  UserListFilters,
  UserSort,
  UserView,
} from "@/entities/user/model/types";
import { UsersFilterPanel } from "@/features/users-filter/ui/users-filter-panel";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";

type UsersListHeaderProps = {
  cities: string[];
  filters: UserListFilters;
  onCityChange: (city: string) => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
  onSortChange: (sort: UserSort) => void;
  onViewChange: (view: UserView) => void;
  total: number;
  visibleCount: number;
};

export function UsersListHeader({
  cities,
  filters,
  onCityChange,
  onQueryChange,
  onReset,
  onSortChange,
  onViewChange,
  total,
  visibleCount,
}: UsersListHeaderProps) {
  return (
    <Card className="overflow-visible border-border/70 bg-card/85 shadow-sm backdrop-blur">
      <CardHeader className="gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-3">
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl">
              Тестовое задание для Telement - Список пользователей
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6">
              <Badge className="w-fit bg-accent text-accent-foreground">
                DummyJSON Users API
              </Badge>
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row">
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  className="w-full sm:w-auto"
                  size="sm"
                  variant="outline"
                />
              }
            >
              <SlidersHorizontal className="size-4" />
              Фильтры
            </SheetTrigger>
            <SheetContent
              className="w-full gap-0 overflow-y-auto sm:max-w-md"
              side="right"
            >
              <SheetHeader></SheetHeader>
              <div className="px-4 pb-4">
                <UsersFilterPanel
                  cities={cities}
                  filters={filters}
                  onCityChange={onCityChange}
                  onQueryChange={onQueryChange}
                  onReset={onReset}
                  onSortChange={onSortChange}
                  onViewChange={onViewChange}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        <Card className="gap-2 bg-background/70 py-3" size="sm">
          <CardHeader className="gap-1">
            <CardDescription>Показано сейчас</CardDescription>
            <CardTitle className="text-xl">
              {visibleCount} / {total}
            </CardTitle>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
}
