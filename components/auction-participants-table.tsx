"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ParticipantRow = {
  companyName: string
  joinedAt: string
  depositAmount: number
  entryFeeAmount: number
  status: "ACTIVE" | "PENDING"
}

export function AuctionParticipantsTable({ rows }: { rows: ParticipantRow[] }) {
  if (!rows.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Katılan Firmalar</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-xs text-muted-foreground">
            <tr>
              <th className="py-2 text-left">Firma</th>
              <th className="py-2 text-left">Katılım Zamanı</th>
              <th className="py-2 text-right">Teminat</th>
              <th className="py-2 text-right">Giriş Bedeli</th>
              <th className="py-2 text-center">Durum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.companyName} className="border-b last:border-0">
                <td className="py-2">{row.companyName}</td>
                <td className="py-2 text-xs text-muted-foreground">{row.joinedAt}</td>
                <td className="py-2 text-right">{row.depositAmount.toLocaleString("tr-TR")} TL</td>
                <td className="py-2 text-right">{row.entryFeeAmount.toLocaleString("tr-TR")} TL</td>
                <td className="py-2 text-center text-xs">
                  <Badge variant={row.status === "ACTIVE" ? "default" : "outline"}>
                    {row.status === "ACTIVE" ? "Aktif" : "Beklemede"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
