import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    date: "2024-01-15",
    type: "Para Yatırma",
    amount: "+5,000 TL",
    status: "Tamamlandı",
    statusVariant: "default" as const,
  },
  {
    date: "2024-01-14",
    type: "Teminat Bloke",
    amount: "-1,200 TL",
    status: "Aktif",
    statusVariant: "secondary" as const,
  },
  {
    date: "2024-01-13",
    type: "Teminat Bloke",
    amount: "-800 TL",
    status: "Aktif",
    statusVariant: "secondary" as const,
  },
  {
    date: "2024-01-12",
    type: "Para Çekme",
    amount: "-3,000 TL",
    status: "Tamamlandı",
    statusVariant: "default" as const,
  },
  {
    date: "2024-01-10",
    type: "Para Yatırma",
    amount: "+10,000 TL",
    status: "Tamamlandı",
    statusVariant: "default" as const,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Son İşlemler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>İşlem Tipi</TableHead>
                <TableHead className="text-right">Tutar</TableHead>
                <TableHead className="text-right">Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{activity.date}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      activity.amount.startsWith("+") ? "text-success" : "text-foreground"
                    }`}
                  >
                    {activity.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={activity.statusVariant}>{activity.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
