import { Bell, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4 md:hidden">
        <span className="font-bold">Karkaslas</span>
      </div>

      <div className="hidden md:flex md:w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="İhalelerde ara..." className="w-full bg-muted/50 pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-sm font-medium md:block">
          <span className="text-muted-foreground">Firma:</span> Otomotiv Ltd. Şti.
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Bildirimler</span>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Çıkış</span>
        </Button>
      </div>
    </header>
  )
}
