import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Lock, Wallet, Gavel } from "lucide-react"

const summaryData = [
  {
    title: "Toplam Bakiye",
    value: "15,400 TL",
    icon: Wallet,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Teminat Tutarı",
    value: "2,000 TL",
    icon: Lock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Kullanılabilir Bakiye",
    value: "13,400 TL",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Aktif Teklif",
    value: "3",
    icon: Gavel,
    color: "text-foreground",
    bgColor: "bg-muted",
  },
]

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
