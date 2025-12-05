import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Copy } from "lucide-react"

export function FinancialSection() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Finansal İşlemler</CardTitle>
        <CardDescription>Bakiye ve hesap hareketlerinizi buradan yönetin.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Para Yatır</TabsTrigger>
            <TabsTrigger value="withdraw">Para Çek</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4 pt-4">
            <div className="rounded-md bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-medium text-amber-900 dark:text-amber-400">ÖNEMLİ</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-500">
                    EFT/Havale açıklamasına mutlaka benzersiz ID&apos;nizi yazın: <span className="font-bold">ALT-4589</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Banka Adı</Label>
                <div className="font-medium">Garanti BBVA</div>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Hesap Sahibi</Label>
                <div className="font-medium">Karkaslas A.Ş.</div>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">IBAN</Label>
                <div className="flex items-center gap-2">
                  <code className="rounded bg-muted px-2 py-1 font-mono text-sm">TR12 0006 2000 0001 2345 6789 01</code>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Çekim Tutarı (TL)</Label>
              <Input id="amount" placeholder="0.00" type="number" />
            </div>

            <div className="space-y-2">
              <Label>Kayıtlı Şirket IBAN</Label>
              <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                TR45 0001 5001 5800 7293 4829 10
              </div>
              <p className="text-xs text-muted-foreground">
                Para çekme işlemleri yalnızca kayıtlı şirket hesabına gönderilir.
              </p>
            </div>

            <Button className="w-full">Para Çekme Talebi Oluştur</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
