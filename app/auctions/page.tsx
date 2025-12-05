"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AuctionParticipationPanel } from "@/components/auction-participation-panel"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function AuctionsPage() {
  const userFinancials = {
    balance: 50000,
    locked: 12500,
  }

  const auctions = [
    {
      id: "AL-2025-001",
      title: "Forklift Lastik Lotu - 1.2 Ton",
      category: "Forklift",
      subCategory: "Dolgu / Çıkma",
      size: "7.00-12",
      brand: "Michelin",
      type: "Dolgu - Radyal",
      treadDepth: "%60",
      sidewall: "Sağlam",
      casing: "Kaplamaya Uygun",
      totalKg: "1.200 kg",
      startPrice: "10.000 TL",
      currentPrice: "18.500 TL",
      bidStep: "500 TL",
      buyNowPrice: "25.000 TL",
      timeLeft: "02:31:45",
      status: "Aktif",
      lastBid: "18.500 TL (Siz / Başka Kullanıcı)",
      images: [
        "/ozka-forklift.png",
        "https://images.unsplash.com/photo-1610963498617-75b36cdb3fd4?auto=format&fit=crop&w=900&q=80", // endüstriyel forklift lastiği
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80&sat=-60", // ağır hizmet lastiği
      ],
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Sayfa başlığı */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">İhaleler</h1>
          <p className="text-sm text-muted-foreground">
            Mevcut açık artırmaları görüntüleyin, bakiye durumunuza göre teklif verin veya hemen satın alın.
          </p>
        </div>

        {/* İhale kartları */}
        <div className="space-y-4">
          {auctions.map((auction) => (
            <Card key={auction.id}>
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <CardTitle>{auction.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>İhale ID: {auction.id}</span>
                    <span>•</span>
                    <span>Kategori: {auction.category}</span>
                    <span>•</span>
                    <span>Alt Kategori: {auction.subCategory}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{auction.status}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Kalan Süre: <span className="font-mono font-medium">{auction.timeLeft}</span>
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-[360px_minmax(0,1fr)] sm:items-start">
                  {/* Görsel */}
                  <div className="space-y-3">
                    <AuctionImageCarousel images={auction.images} title={auction.title} />
                    <p className="text-xs text-muted-foreground">
                      Ok ile sağa tıklayarak diğer görsellere geçebilirsiniz.
                    </p>
                  </div>

                  {/* Detay + aksiyonlar */}
                  <div className="space-y-4 text-sm">
                    {/* Ürün detayları */}
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <DetailItem label="Ölçü / Ebat" value={auction.size} />
                        <DetailItem label="Tür" value={auction.type} />
                        <DetailItem label="Yanak Sağlamlığı" value={auction.sidewall} />
                        <DetailItem label="Toplam KG" value={auction.totalKg} />
                        <DetailItem label="Marka" value={auction.brand} />
                        <DetailItem label="Diş Kalınlığı" value={auction.treadDepth} />
                        <DetailItem label="Karkas Durumu" value={auction.casing} />
                      </div>
                    </div>

                    <Separator />

                    {/* Katılım & teminat paneli */}
                    <AuctionParticipationPanel
                      state={{
                        auctionId: auction.id,
                        depositAmount: 15000,
                        entryFeeAmount: 750,
                        registrationStatus: "NONE",
                        balance: userFinancials.balance,
                        locked: userFinancials.locked,
                        isDepositWindowOpen: true,
                      }}
                      onJoinClick={() => console.log(`İhaleye katıl tıklandı: ${auction.id}`)}
                      onTopUpClick={() => console.log(`Bakiye artırma sayfasına yönlendir: ${auction.id}`)}
                    />

                    {/* Teklif alanı kartı */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Teklif ve Satın Alma Seçenekleri</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                        {/* Miktar gir + teklif gönder */}
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <div className="flex-1">
                              <label
                                htmlFor={`bid-amount-${auction.id}`}
                                className="mb-1 block text-xs font-medium text-muted-foreground"
                              >
                                Teklif Miktarı (TL)
                              </label>
                              <Input
                                id={`bid-amount-${auction.id}`}
                                type="number"
                                placeholder={auction.currentPrice}
                                className="h-10"
                              />
                            </div>
                            <Button className="md:w-40 mt-1 md:mt-6">Teklif Gönder</Button>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Teklif gönderebilmeniz için hesabınızda en az{" "}
                            <span className="font-medium">Hemen Al</span> tutarı kadar kullanılabilir bakiye bulunmalıdır.
                          </p>
                        </div>

                        {/* Sabit arttırma */}
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div className="text-xs text-muted-foreground">
                              Sabit artış ile mevcut teklifi artırın. Artış miktarı:{" "}
                              <span className="font-semibold">{auction.bidStep}</span>
                            </div>
                            <Button variant="outline" className="md:w-56">
                              Sabit Artış ile Teklif Ver (+{auction.bidStep})
                            </Button>
                          </div>
                        </div>

                        {/* Hemen Al */}
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div className="text-xs text-muted-foreground">
                              Hemen Al seçeneği ile ihaleyi anında{" "}
                              <span className="font-semibold">{auction.buyNowPrice}</span> üzerinden kazanırsınız.
                              İşlem geri alınamaz.
                            </div>
                            <Button variant="default" className="md:w-40">
                              Hemen Al
                            </Button>
                          </div>
                        </div>

                        {/* Mini özet kartlar */}
                        <div className="grid gap-2 md:grid-cols-3 text-xs">
                          <div className="space-y-1 rounded-md border bg-muted/40 p-2">
                            <div className="text-[11px] text-muted-foreground">Başlangıç Fiyatı</div>
                            <div className="text-sm font-semibold">{auction.startPrice}</div>
                          </div>
                          <div className="space-y-1 rounded-md border bg-muted/40 p-2">
                            <div className="text-[11px] text-muted-foreground">Son Teklif</div>
                            <div className="text-sm font-semibold">{auction.currentPrice}</div>
                            <p className="text-[10px] text-muted-foreground">{auction.lastBid}</p>
                          </div>
                          <div className="space-y-1 rounded-md border bg-muted/40 p-2">
                            <div className="text-[11px] text-muted-foreground">Hemen Al Fiyatı</div>
                            <div className="text-sm font-semibold">{auction.buyNowPrice}</div>
                          </div>
                        </div>

                        <p className="text-[11px] text-muted-foreground">
                          Tüm teklifler ve işlemler tek yönlüdür, geri alınamaz ve sistem tarafından loglanır. İhale
                          sonlandığında kazanan teklif ve tutar, ihale detaylarında ayrıca gösterilecektir.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

type DetailItemProps = {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}

type AuctionImageCarouselProps = {
  images?: string[]
  title: string
}

function AuctionImageCarousel({ images = [], title }: AuctionImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const safeImages =
    images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=720&q=80"]
  const currentImage = safeImages[index % safeImages.length]

  const goNext = () => setIndex((prev) => (prev + 1) % safeImages.length)
  const goPrev = () => setIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length)

  return (
    <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-md border bg-muted">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-300"
        style={{ backgroundImage: `url(${currentImage})` }}
        role="img"
        aria-label={title}
      />
      {safeImages.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 bg-background/80 shadow"
            onClick={goPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 bg-background/80 shadow"
            onClick={goNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {safeImages.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${i === index % safeImages.length ? "bg-primary" : "bg-muted-foreground/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
