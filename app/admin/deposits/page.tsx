"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const activeDepositWindows = [
  {
    auctionId: "ALT-1005",
    title: "OTR Lastik Lotu",
    depositAmount: 50000,
    entryFeeAmount: 5000,
    deadline: "05.12.2025 18:00",
    participants: 7,
  },
  {
    auctionId: "ALT-1006",
    title: "Forklift Lastik Lotu",
    depositAmount: 35000,
    entryFeeAmount: 3000,
    deadline: "06.12.2025 12:00",
    participants: 3,
  },
]

const pendingTransfers = [
  {
    id: "DEP-001",
    company: "ABC Lojistik A.Ş.",
    amount: 150000,
    refCode: "ALT-4589",
    bank: "Ziraat Bankası",
    createdAt: "28.11.2025 14:32",
  },
  {
    id: "DEP-002",
    company: "XYZ Otomotiv Ltd. Şti.",
    amount: 75000,
    refCode: "ALT-7721",
    bank: "Garanti BBVA",
    createdAt: "28.11.2025 11:05",
  },
]

const processedTransfers = [
  {
    id: "BANK-001",
    company: "ABC Lojistik A.Ş.",
    amount: 150000,
    bank: "Ziraat Bankası",
    refCode: "ALT-4589",
    processedAt: "28.11.2025 15:10",
  },
  {
    id: "BANK-002",
    company: "Delta Forklift Servis",
    amount: 75000,
    bank: "Garanti BBVA",
    refCode: "ALT-7721",
    processedAt: "29.11.2025 09:25",
  },
]

export default function Page() {
  const [searchRef, setSearchRef] = useState("")
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [balanceAmount, setBalanceAmount] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Teminat & Para Yatırma</h1>
        <p className="text-sm text-muted-foreground">
          IBAN’dan gelen transferleri onaylayın, teminat toplama süreçlerini yönetin ve teminata aktarılan tutarları
          görüntüleyin.
        </p>
      </div>

      {/* Arama + Transferler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Transferler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ref kodu ile ara..."
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="w-[260px]"
              />
              <Button
                variant="outline"
                onClick={() => {
                  // Basit filter; gerçek API araması ile değiştirilebilir
                }}
              >
                Ara
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              Ref kodu ile filtreleme yapabilirsiniz.
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Firma</TableHead>
                <TableHead>Ref. Kodu</TableHead>
                <TableHead className="text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTransfers
                .filter((req) => req.refCode.toLowerCase().includes(searchRef.toLowerCase()))
                .map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.company}</TableCell>
                  <TableCell>{req.refCode}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        setBalanceAmount(req.amount.toString())
                        setShowBalanceModal(true)
                      }}
                    >
                      Bakiye Ekle
                    </Button>
                    <Button size="sm" variant="destructive">Reddet</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bankaya işlenen transferler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">İşlenen Transferler (Banka)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşlem No</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Banka</TableHead>
                <TableHead>Ref. Kodu</TableHead>
                <TableHead>Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedTransfers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.amount.toLocaleString("tr-TR")} TL</TableCell>
                  <TableCell>{item.bank}</TableCell>
                  <TableCell>{item.refCode}</TableCell>
                  <TableCell>{item.processedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showBalanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Bakiye Ekle</h3>
                <p className="text-sm text-muted-foreground">
                  Bu işlem manuel olarak bakiyeye eklenecektir. Tutarı kontrol edin.
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowBalanceModal(false)}>
                ×
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium" htmlFor="balanceAmount">
                Eklenecek Tutar (TL)
              </label>
              <Input
                id="balanceAmount"
                type="number"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBalanceModal(false)}>
                Vazgeç
              </Button>
              <Button
                onClick={() => {
                  // TODO: Manuel ekleme işlemi burada yapılacak
                  setShowBalanceModal(false)
                }}
              >
                Bakiye Ekle
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
