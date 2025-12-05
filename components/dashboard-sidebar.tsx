import Link from "next/link"
import { LayoutDashboard, Gavel, History, Wallet, User, LifeBuoy } from "lucide-react"

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card text-card-foreground md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            A
          </div>
          <span>Karkaslas</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all"
        >
          <LayoutDashboard className="h-5 w-5" />
          Panel
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
        >
          <Gavel className="h-5 w-5" />
          İhalelerim
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
        >
          <History className="h-5 w-5" />
          Teklif Geçmişi
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
        >
          <Wallet className="h-5 w-5" />
          Finansal İşlemler
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
        >
          <User className="h-5 w-5" />
          Profil
        </Link>
        <Link
          href="/destek"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
        >
          <LifeBuoy className="h-5 w-5" />
          Destek
        </Link>
      </nav>
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted/50 p-4 text-sm">
          <p className="font-medium">Yardıma mı ihtiyacınız var?</p>
          <p className="text-xs text-muted-foreground mt-1">
            İhaleleriniz için destek ekibimizle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </aside>
  )
}
