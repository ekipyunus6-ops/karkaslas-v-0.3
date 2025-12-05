"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import {
  LayoutDashboard,
  Building2,
  Gavel,
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Bell,
  LogOut,
  PlusCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type AdminLayoutProps = {
  children: ReactNode
}

const adminMenu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Firmalar",
    href: "/admin/companies",
    icon: Building2,
  },
  {
    label: "İhaleler",
    href: "/admin/auctions",
    icon: Gavel,
  },
  {
    label: "İhale Oluştur",
    href: "/admin/auctions/create",
    icon: PlusCircle,
  },
  {
    label: "Para Yatırma",
    href: "/admin/deposits",
    icon: ArrowDownCircle,
  },
  {
    label: "Para Çekme",
    href: "/admin/withdrawals",
    icon: ArrowUpCircle,
  },
  {
    label: "İhale Giriş Gelirleri",
    href: "/admin/entry-revenue",
    icon: Wallet,
  },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="h-16 px-6 flex items-center border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AL
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Karkaslas</span>
              <span className="text-xs text-muted-foreground">Admin Paneli</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {adminMenu.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Giriş Yapmış Kullanıcı:</span>
            <span className="font-medium text-foreground">
              Platform Admini
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="outline" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
