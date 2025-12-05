"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Copy, Check } from "lucide-react"

export function FinancialActions() {
  const [copiedIban, setCopiedIban] = useState(false)
  const [copiedId, setCopiedId] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [accountHolder, setAccountHolder] = useState("")
  const [iban, setIban] = useState("")

  const uniqueId = "ALT-4589"
  const bankIban = "TR33 0006 1005 1978 6457 8413 26"
  const companyIban = "TR98 0001 2009 4520 0016 3000 01"

  const copyToClipboard = (text: string, type: "iban" | "id") => {
    navigator.clipboard.writeText(text)
    if (type === "iban") {
      setCopiedIban(true)
      setTimeout(() => setCopiedIban(false), 2000)
    } else {
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Finansal İşlemler</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Para Yatır</TabsTrigger>
            <TabsTrigger value="withdraw">Para Çek</TabsTrigger>
          </TabsList>

          {/* DEPOSIT SEKME İÇERİĞİ */}
          <TabsContent value="deposit" className="space-y-4 mt-4">
            <Alert className="flex items-start gap-3">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <AlertDescription className="space-y-2">
                <p>
                  EFT/Havale ile bakiye yüklerken açıklama kısmına mutlaka{" "}
                  <span className="font-semibold">benzersiz müşteri ID&apos;nizi</span> yazmalısınız.
                </p>
                <p className="text-xs text-muted-foreground">
                  Örneğin: <span className="font-mono">AÇIKLAMA: {uniqueId}</span>
                </p>
              </AlertDescription>
            </Alert>

            <div className="space-y-3 rounded-md border p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Banka IBAN</p>
                  <p className="font-mono text-sm">{bankIban}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(bankIban, "iban")}
                >
                  {copiedIban ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-md border p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Açıklama Alanında Kullanılacak ID</p>
                  <p className="font-mono text-sm">{uniqueId}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(uniqueId, "id")}
                >
                  {copiedId ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Havale/EFT gönderirken alıcı IBAN&apos;ı ve açıklama kısmındaki ID&apos;yi doğru yazdığınızdan
              emin olun. İşlemler genellikle 1 iş günü içerisinde bakiyenize yansıtılır.
            </p>
          </TabsContent>

          {/* WITHDRAW SEKME İÇERİĞİ */}
          <TabsContent value="withdraw" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Çekim Tutarı (TL)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Çekmek istediğiniz tutarı girin"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Kullanılabilir bakiye: 13.400 TL</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-holder">Hesap Adı</Label>
                <Input
                  id="account-holder"
                  placeholder="Örn: Karkaslas A.Ş. - Vadesiz TL"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Para çekme işlemi bu IBAN bilgilerine göre EFT olarak gerçekleştirilecektir.
                </p>
              </div>

              <Button className="w-full" size="lg">
                Para Çekme Talebi Oluştur
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Para çekme talepleri 1-3 iş günü içerisinde işlenir.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
