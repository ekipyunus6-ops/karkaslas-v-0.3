"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CreateAuctionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: İleride burada gerçek API çağrısı olacak
    setTimeout(() => {
      setIsSubmitting(false)
      console.log("İhale onaya gönderildi (dummy).")
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">İhale Başlat</h1>
        <p className="text-sm text-muted-foreground">
          Lastik lotunuzu açık artırmaya çıkarmak için gerekli tüm bilgileri bu ekrandan doldurup onaya gönderebilirsiniz.
        </p>
      </div>

      {/* İhale oluşturma formu */}
      <Card>
        <CardHeader>
          <CardTitle>İhale Oluştur</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Ürün bilgileri */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Ürün Bilgileri</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Lastik Kategorisi</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="Örn: Forklift / OTR / Binek / Kamyon"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subCategory">Alt Kategorisi</Label>
                  <Input
                    id="subCategory"
                    name="subCategory"
                    placeholder="Örn: Dolgu, Kaplama, Çıkma vb."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="size">Ölçü / Ebat</Label>
                  <Input
                    id="size"
                    name="size"
                    placeholder="Örn: 7.00-12, 18.00-25"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="brand">Marka</Label>
                  <Input
                    id="brand"
                    name="brand"
                    placeholder="Örn: Michelin, Lassa, Petlas"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="type">Tür</Label>
                  <Input
                    id="type"
                    name="type"
                    placeholder="Örn: Radyal / Diyagonal, Dolgu / Havalı"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="treadDepth">Diş Kalınlıkları</Label>
                  <Input
                    id="treadDepth"
                    name="treadDepth"
                    placeholder="Örn: %60, mm cinsinden vb."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sidewall">Yanak Sağlamlığı</Label>
                  <Input
                    id="sidewall"
                    name="sidewall"
                    placeholder="Örn: Sağlam / Hafif Çatlak / Onarım Gerekiyor"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="casing">Karkas Durumu</Label>
                  <Input
                    id="casing"
                    name="casing"
                    placeholder="Örn: Kaplamaya Uygun / Hurda / Söküm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="totalKg">Toplam KG</Label>
                  <Input
                    id="totalKg"
                    name="totalKg"
                    type="number"
                    placeholder="Toplam lot ağırlığı (kg)"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Görseller */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Görseller</h2>
              <p className="text-xs text-muted-foreground">
                Her görseli ayrı ayrı yükleyin. 1. görsel kapak olarak kullanılacaktır.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="image1">1. Görsel</Label>
                  <Input id="image1" name="image1" type="file" accept="image/*" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="image2">2. Görsel</Label>
                  <Input id="image2" name="image2" type="file" accept="image/*" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="image3">3. Görsel</Label>
                  <Input id="image3" name="image3" type="file" accept="image/*" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Fiyat & zamanlama */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Fiyat ve Zamanlama</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="startPrice">Başlangıç Fiyatı</Label>
                  <Input
                    id="startPrice"
                    name="startPrice"
                    type="number"
                    placeholder="Örn: 10.000 TL"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bidStep">Artış Miktarı</Label>
                  <Input
                    id="bidStep"
                    name="bidStep"
                    type="number"
                    placeholder="Örn: 500 TL"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="schedule">Zamanlama</Label>
                  <Input
                    id="schedule"
                    name="schedule"
                    placeholder="Örn: 24 saat / Başlangıç-Bitiş tarih-saat"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="buyNowPrice">Hemen Al Fiyatı</Label>
                  <Input
                    id="buyNowPrice"
                    name="buyNowPrice"
                    type="number"
                    placeholder="Opsiyonel"
                  />
                </div>
              </div>
            </div>

            {/* Teminat ve Giriş Bedeli */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Teminat ve Giriş Bedeli</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="depositAmount">İhale Teminat Tutarı</Label>
                  <Input
                    id="depositAmount"
                    name="depositAmount"
                    type="number"
                    placeholder="Örn: 15.000 TL"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="entryFee">İhale Giriş Bedeli</Label>
                  <Input
                    id="entryFee"
                    name="entryFee"
                    type="number"
                    placeholder="Örn: 750 TL"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Eksper raporu */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Lastik Eksperi Raporu</h2>
              <div className="space-y-2">
                <Label htmlFor="expertReport">Eksper Raporu (Metin)</Label>
                <textarea
                  id="expertReport"
                  name="expertReport"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Eksper notlarını buraya yazın. (Gözlemler, ölçümler, özel notlar vb.)"
                />
              </div>

              <div className="space-y-2">
                <Label>Eksper Görselleri</Label>
                <p className="text-xs text-muted-foreground">
                  Görseller sistemde tarafımızdan yüklenecektir. Bu alan daha sonra upload bileşeni ile
                  güncellenecektir.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Onaya Gönderiliyor..." : "İhaleyi Onaya Gönder"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
