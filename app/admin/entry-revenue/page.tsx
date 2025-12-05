"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const overallSummary = {
  totalDeposits: 60000, // TL
  totalEntryFees: 3000, // TL
  totalBalance: 63000, // TL (örnek: bakiye + giriş bedeli)
}

const entryRevenues = [
  {
    auctionId: "ALT-1001",
    title: "Forklift Lastik Lotu",
    approvedCount: 3,
    depositAmount: 45000,
    entryFeeAmount: 2250,
    totalBalance: 47250,
  },
  {
    auctionId: "ALT-0999",
    title: "OTR Karışık Lot",
    approvedCount: 2,
    depositAmount: 30000,
    entryFeeAmount: 1500,
    totalBalance: 31500,
  },
]

export default function EntryRevenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">İhale Giriş Gelirleri</h1>
        <p className="text-sm text-muted-foreground">
          Teminat aşamasında onaylanan katılımcılardan toplanan teminat ve ihale giriş bedeli gelirlerini görüntüleyin.
        </p>
      </div>

      {/* Genel özet */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam Yatırılan Teminat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{overallSummary.totalDeposits.toLocaleString("tr-TR")} TL</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam İhale Giriş Bedeli</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{overallSummary.totalEntryFees.toLocaleString("tr-TR")} TL</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam Bakiye (Net)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{overallSummary.totalBalance.toLocaleString("tr-TR")} TL</div>
          </CardContent>
        </Card>
      </div>

      {/* İhale bazlı giriş bedeli gelirleri */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">İhale Bazlı Gelirler</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İhale No</TableHead>
                <TableHead>İhale</TableHead>
                <TableHead>Onaylanan Katılımcı</TableHead>
                <TableHead>Toplam Teminat</TableHead>
                <TableHead>Toplam Giriş Bedeli</TableHead>
                <TableHead>Net Bakiye</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entryRevenues.map((item) => (
                <TableRow key={item.auctionId}>
                  <TableCell>
                    <Badge variant="outline">{item.auctionId}</Badge>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.approvedCount}</TableCell>
                  <TableCell>{item.depositAmount.toLocaleString("tr-TR")} TL</TableCell>
                  <TableCell>{item.entryFeeAmount.toLocaleString("tr-TR")} TL</TableCell>
                  <TableCell className="font-semibold">{item.totalBalance.toLocaleString("tr-TR")} TL</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
