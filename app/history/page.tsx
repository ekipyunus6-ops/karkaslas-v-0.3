import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const bids = [
  {
    date: "2024-01-15",
    auctionCode: "ALT-2024-001",
    item: "Forklift Lastik Karkas Lotu (1.200 KG)",
    yourBid: "45.000 TL",
    status: "Kazandın",
    statusVariant: "default" as const,
  },
  {
    date: "2024-01-14",
    auctionCode: "ALT-2024-002",
    item: "Binek Lastik Karkas Karışık Lot (800 KG)",
    yourBid: "18.500 TL",
    status: "Geçersiz (Alt Teklif)",
    statusVariant: "outline" as const,
  },
  {
    date: "2024-01-13",
    auctionCode: "ALT-2024-003",
    item: "Kamyon / Tır Lastik Karkas Lotu (2.000 KG)",
    yourBid: "72.000 TL",
    status: "Devam Ediyor",
    statusVariant: "secondary" as const,
  },
  {
    date: "2024-01-11",
    auctionCode: "ALT-2024-004",
    item: "OTR / İş Makinesi Lastik Karkas Lotu (600 KG)",
    yourBid: "55.000 TL",
    status: "Kazandın",
    statusVariant: "default" as const,
  },
]

export default function BiddingHistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Teklif Geçmişi</h1>
          <p className="text-sm text-muted-foreground">
            Geçmiş tüm tekliflerini; hangi ihalede, hangi tutarla, hangi sonuçla verdiğini buradan takip edebilirsin.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Teklif Geçmişi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>İhale Kodu</TableHead>
                    <TableHead>Lot / Ürün</TableHead>
                    <TableHead className="text-right">Teklifin</TableHead>
                    <TableHead className="text-right">Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{bid.date}</TableCell>
                      <TableCell className="font-mono text-xs">{bid.auctionCode}</TableCell>
                      <TableCell>{bid.item}</TableCell>
                      <TableCell className="text-right font-medium">{bid.yourBid}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={bid.statusVariant}>{bid.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
