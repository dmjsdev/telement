import { BriefcaseBusiness, Globe, GraduationCap, Mail, MapPinned, PhoneCall } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { User } from '@/entities/user/model/types'
import {
  formatAddress,
  getEmailDomain,
  getInitials,
  getUserFullName,
} from '@/entities/user/model/lib'

type UserDetailsCardProps = {
  user: User
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <Card className="border-border/70 bg-card/85 shadow-sm backdrop-blur">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar className="ring-4 ring-background" size="lg">
            <AvatarImage alt={getUserFullName(user)} src={user.image} />
            <AvatarFallback>{getInitials(user)}</AvatarFallback>
          </Avatar>
          <div className="space-y-3">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{getUserFullName(user)}</CardTitle>
              <div className="text-sm text-muted-foreground">
                @{user.username} · {user.age} лет · {user.gender}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{user.address.city}</Badge>
              <Badge variant="secondary">{user.company.department}</Badge>
              <Badge variant="secondary">{user.bloodGroup}</Badge>
              <Badge variant="secondary">{user.hair.color}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <Card className="bg-background/70 py-3" size="sm">
          <CardHeader className="gap-3">
            <CardTitle className="text-sm">Контакты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <PhoneCall className="mt-0.5 size-4 shrink-0" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="mt-0.5 size-4 shrink-0" />
              <span>{getEmailDomain(user.email)}</span>
            </div>
            <div className="flex items-start gap-2">
              <GraduationCap className="mt-0.5 size-4 shrink-0" />
              <span>{user.university}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/70 py-3" size="sm">
          <CardHeader className="gap-3">
            <CardTitle className="text-sm">Адрес и работа</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPinned className="mt-0.5 size-4 shrink-0" />
              <span>{formatAddress(user.address)}</span>
            </div>
            <div className="flex items-start gap-2">
              <BriefcaseBusiness className="mt-0.5 size-4 shrink-0" />
              <div>
                <div className="font-medium text-foreground">{user.company.name}</div>
                <div className="mt-1">{user.company.title}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.12em]">
                  {user.company.department}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
