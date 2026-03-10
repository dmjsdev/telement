import { BriefcaseBusiness, Mail, MapPin, Phone, UserCircle2 } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { User } from '@/entities/user/model/types'
import {
  formatAddress,
  getEmailDomain,
  getInitials,
  getUserFullName,
} from '@/entities/user/model/lib'
import { cn } from '@/lib/utils'

type UserCardProps = {
  compact?: boolean
  user: User
}

export function UserCard({ compact = false, user }: UserCardProps) {
  return (
    <Card
      className={cn(
        'h-full w-full min-w-0 border-border/70 bg-card/85 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md',
        compact && 'py-3',
      )}
      size={compact ? 'sm' : 'default'}
    >
      <CardHeader className={cn(compact ? 'gap-2' : 'gap-3')}>
        <div className="flex items-start gap-3">
          <Avatar className="shrink-0 ring-4 ring-background" size={compact ? 'default' : 'lg'}>
            <AvatarImage alt={getUserFullName(user)} src={user.image} />
            <AvatarFallback>{getInitials(user)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-1">
            <CardTitle className="line-clamp-1">{getUserFullName(user)}</CardTitle>
            <div className="line-clamp-1 text-sm text-muted-foreground">@{user.username}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{user.address.city}</Badge>
          <Badge variant="secondary">{getEmailDomain(user.email)}</Badge>
          <Badge variant="secondary">{user.company.department}</Badge>
        </div>
      </CardHeader>

      <CardContent className={cn('grid gap-3 text-sm', compact && 'grid-cols-1 sm:grid-cols-2')}>
        <div className="flex items-start gap-2 text-muted-foreground">
          <Mail className="mt-0.5 size-4 shrink-0" />
          <span className="line-clamp-1">{user.email}</span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <Phone className="mt-0.5 size-4 shrink-0" />
          <span className="line-clamp-1">{user.phone}</span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <BriefcaseBusiness className="mt-0.5 size-4 shrink-0" />
          <span className="line-clamp-2">{user.company.title}</span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span className="line-clamp-2">{formatAddress(user.address)}</span>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <UserCircle2 className="size-4" />
          {user.age} лет, {user.gender}
        </div>
        <span className="text-xs font-medium text-primary">Открыть профиль</span>
      </CardFooter>
    </Card>
  )
}
