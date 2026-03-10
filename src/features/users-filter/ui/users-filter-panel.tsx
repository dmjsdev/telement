import { Building2, LayoutGrid, List, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  UserListFilters,
  UserSort,
  UserView,
} from "@/entities/user/model/types";
import { cn } from "@/lib/utils";

type UsersFilterPanelProps = {
  cities: string[];
  filters: UserListFilters;
  onCityChange: (city: string) => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
  onSortChange: (sort: UserSort) => void;
  onViewChange: (view: UserView) => void;
};

export function UsersFilterPanel({
  cities,
  filters,
  onCityChange,
  onQueryChange,
  onReset,
  onSortChange,
  onViewChange,
}: UsersFilterPanelProps) {
  const hasActiveFilters =
    filters.query !== "" ||
    filters.city !== "all" ||
    filters.sort !== "name" ||
    filters.view !== "cards";

  return (
    <Card className="sticky top-4 border-border/70 bg-card/85 shadow-sm backdrop-blur">
      <CardContent className="space-y-5">
        {hasActiveFilters ? (
          <Button className="w-full" onClick={onReset} size="sm" variant="secondary">
            <RotateCcw className="size-4" />
            Сбросить всё
          </Button>
        ) : null}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Search className="size-4 text-muted-foreground" />
            Поиск
          </div>
          <Input
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Имя, email, компания..."
            value={filters.query}
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="size-4 text-muted-foreground" />
            Город
          </div>
          <ScrollArea className="h-[180px] pr-3">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => onCityChange("all")}
                size="sm"
                variant={filters.city === "all" ? "default" : "outline"}
              >
                Все города
              </Button>
              {cities.map((city) => (
                <Button
                  className={cn("justify-start")}
                  key={city}
                  onClick={() => onCityChange(city)}
                  size="sm"
                  variant={filters.city === city ? "default" : "outline"}
                >
                  {city}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="text-sm font-medium">Сортировка</div>
          <Tabs
            onValueChange={(value) => onSortChange(value as UserSort)}
            value={filters.sort}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="name">По имени</TabsTrigger>
              <TabsTrigger value="city">По городу</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Вид списка</div>
          <Tabs
            onValueChange={(value) => onViewChange(value as UserView)}
            value={filters.view}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cards">
                <LayoutGrid className="size-4" />
                Карточки
              </TabsTrigger>
              <TabsTrigger value="compact">
                <List className="size-4" />
                Компактно
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
