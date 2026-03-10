import { Link } from 'react-router-dom'
import type { UseQueryResult } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Post, User } from "@/entities/user/model/types";
import { UserDetailsCard } from "@/entities/user/ui/user-details-card";
import { UserDetailsSkeleton } from "@/entities/user/ui/user-details-skeleton";
import { cn } from "@/lib/utils";

import { UserPostsList } from "./ui/user-posts-list";

type UserDetailsPanelProps = {
  backHref: string;
  isValidUserId: boolean;
  postsQuery: UseQueryResult<Post[], Error>;
  userQuery: UseQueryResult<User, Error>;
};

export function UserDetailsPanel({
  backHref,
  isValidUserId,
  postsQuery,
  userQuery,
}: UserDetailsPanelProps) {
  if (!isValidUserId) {
    return (
      <Alert
        className="mx-auto mt-8 max-w-2xl bg-card/90 shadow-sm animate-page-enter"
        variant="destructive"
      >
        <AlertCircle className="size-4" />
        <AlertTitle>Некорректный идентификатор пользователя</AlertTitle>
        <AlertDescription>
          Откройте карточку из списка, чтобы перейти к деталям.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 animate-page-enter animate-page-enter-delay-1">
        <Link
          className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          to={backHref}
        >
          <ArrowLeft className="size-4" />
          Назад к списку
        </Link>
      </div>

      {userQuery.isLoading ? (
        <div className="animate-page-enter animate-page-enter-delay-1">
          <UserDetailsSkeleton />
        </div>
      ) : null}

      {userQuery.isError ? (
        <Alert className="bg-card/90 shadow-sm animate-page-enter animate-page-enter-delay-2" variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Не удалось загрузить карточку пользователя</AlertTitle>
          <AlertDescription>
            Данные профиля сейчас недоступны. Можно повторить запрос или
            вернуться к списку.
          </AlertDescription>
          <div className="mt-4">
            <Button
              onClick={() => void userQuery.refetch()}
              size="sm"
              variant="secondary"
            >
              <RefreshCcw className="size-4" />
              Повторить
            </Button>
          </div>
        </Alert>
      ) : null}

      {userQuery.data ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="animate-page-enter animate-page-enter-delay-2">
          <UserDetailsCard user={userQuery.data} />
          </div>
          <div className="animate-page-enter animate-page-enter-delay-3">
          <UserPostsList postsQuery={postsQuery} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
