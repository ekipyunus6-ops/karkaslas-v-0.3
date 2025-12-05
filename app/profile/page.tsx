"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function ProfilePage() {
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSavingProfile(true)
    // TODO: Buraya gerçek API isteği gelecek
    setTimeout(() => {
      setIsSavingProfile(false)
      // Şimdilik sadece console.log
      console.log("Profil bilgileri kaydedildi (dummy).")
    }, 800)
  }

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsChangingPassword(true)
    // TODO: Buraya gerçek parola değiştirme işlemi gelecek
    setTimeout(() => {
      setIsChangingPassword(false)
      console.log("Parola değişikliği isteği gönderildi (dummy).")
    }, 800)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profil</h1>
          <p className="text-sm text-muted-foreground">
            Firma ve kullanıcı bilgilerinizi güncelleyebilir, parolanızı değiştirebilirsiniz.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
          {/* Firma / Kullanıcı Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle>Firma Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleProfileSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="companyName">Firma İsmi</Label>
                    <Input id="companyName" name="companyName" placeholder="Karkaslas A.Ş." />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="vkn">VKN</Label>
                    <Input id="vkn" name="vkn" placeholder="1234567890" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="authorizedPerson">Yetkili</Label>
                    <Input id="authorizedPerson" name="authorizedPerson" placeholder="Ad Soyad" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">İletişim Telefonu</Label>
                    <Input id="phone" name="phone" placeholder="+90 5xx xxx xx xx" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-posta Adresi</Label>
                    <Input id="email" name="email" type="email" placeholder="ornek@firma.com" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sector">Sektör</Label>
                    <Input id="sector" name="sector" placeholder="Otomotiv / Lojistik / vb." />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subSector">Alt Faaliyet Alanı</Label>
                    <Input id="subSector" name="subSector" placeholder="Lastik toptan / hurda lastik / vb." />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cari">Cari Kart Bilgisi</Label>
                    <Input id="cari" name="cari" placeholder="ERP / muhasebe cari kodu" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="city">Şehir</Label>
                    <Input id="city" name="city" placeholder="Ankara" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="district">İlçe</Label>
                    <Input id="district" name="district" placeholder="Çankaya" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Mahalle, cadde, sokak, no, daire bilgisi"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={isSavingProfile}>
                    {isSavingProfile ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Parola Değiştirme */}
          <Card>
            <CardHeader>
              <CardTitle>Parola Değiştir</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                <p className="text-sm text-muted-foreground">
                  Parola değişikliği doğrudan sistem üzerinden yapılır. Mail onayı gerekmemektedir.
                </p>

                <Separator />

                <div className="space-y-1.5">
                  <Label htmlFor="currentPassword">Mevcut Parola</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="newPassword">Yeni Parola</Label>
                  <Input id="newPassword" name="newPassword" type="password" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="newPasswordAgain">Yeni Parola (Tekrar)</Label>
                  <Input id="newPasswordAgain" name="newPasswordAgain" type="password" />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="outline" disabled={isChangingPassword}>
                    {isChangingPassword ? "Güncelleniyor..." : "Parolayı Güncelle"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
