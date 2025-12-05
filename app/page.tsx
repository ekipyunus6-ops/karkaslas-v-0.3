import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gavel, LogIn } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="mx-auto flex h-screen max-w-5xl flex-col px-6 py-8">
        {/* Üst navbar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              AL
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Karkaslas
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/giris">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Giriş / Kayıt
              </Button>
            </Link>
            <Link href="/ihale">
              <Button size="sm" className="gap-2">
                <Gavel className="h-4 w-4" />
                Demo Dashboard
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero alanı */}
        <div className="flex flex-1 flex-col items-start justify-center gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Kullanılmış lastiklerinizi{" "}
              <span className="text-primary">şeffaf açık artırma</span>{" "}
              ile satın.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Karkaslas, B2B odaklı, depo teslimli ve IBAN ile çalışan
              bir lastik açık artırma platformudur. Depo teslim, eksper raporu
              ve güvenli ödeme akışı tek panelde birleşir.
            </p>
          </div>

          {/* CTA butonları */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/giris">
              <Button size="lg" className="gap-2">
                Hemen Başla
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ihale">
              <Button variant="outline" size="lg" className="gap-2">
                İhaleleri gör
              </Button>
            </Link>
          </div>

          {/* Küçük özellik kartları */}
          <div className="grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="rounded-lg border bg-background p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                Depo Teslim Modeli
              </div>
              <p className="mt-1">
                Lotlar depoya teslim edilir, alıcı teslim alana kadar süreç
                panel üzerinden izlenir.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                Eksper Raporu
              </div>
              <p className="mt-1">
                Her lot için lastik eksperi raporu ve görselleri tek ekranda
                gösterilir.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                IBAN ile Ödeme
              </div>
              <p className="mt-1">
                EFT/Havale ve benzersiz açıklama kodu ile tamamen kurumsal
                ve izlenebilir bir akış sağlanır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
