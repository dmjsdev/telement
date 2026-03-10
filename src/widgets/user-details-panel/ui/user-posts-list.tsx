import type { UseQueryResult } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw, ScrollText } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Post } from "@/entities/user/model/types";
import { UserDetailsSkeleton } from "@/entities/user/ui/user-details-skeleton";

type UserPostsListProps = {
  postsQuery: UseQueryResult<Post[], Error>;
};

export function UserPostsList({ postsQuery }: UserPostsListProps) {
  return (
    <Card className="border-border/70 bg-card/85 shadow-sm backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="size-5 text-muted-foreground" />
          Посты пользователя
        </CardTitle>
      </CardHeader>
      <CardContent>
        {postsQuery.isLoading ? (
          <div className="space-y-3">
            <UserDetailsSkeleton compact />
          </div>
        ) : null}

        {postsQuery.isError ? (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Не удалось получить посты</AlertTitle>
            <AlertDescription>
              Профиль уже загружен, но дополнительный блок вернул ошибку.
            </AlertDescription>
            <div className="mt-4">
              <Button
                onClick={() => void postsQuery.refetch()}
                size="sm"
                variant="secondary"
              >
                <RefreshCcw className="size-4" />
                Повторить
              </Button>
            </div>
          </Alert>
        ) : null}

        {postsQuery.data ? (
          <ScrollArea className="h-[420px] pr-3">
            <div className="space-y-3 p-1">
              {postsQuery.data.map((post) => (
                <Card className="bg-background/70 py-3" key={post.id} size="sm">
                  <CardHeader className="gap-1">
                    <CardTitle className="text-sm leading-6">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-muted-foreground">
                    {post.body}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : null}
      </CardContent>
    </Card>
  );
}
