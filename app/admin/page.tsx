"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const balanceSummary = {
  totalBalance: 935000,
  totalLocked: 280000,
  totalAvailable: 655000,
  totalEntryFees: 125000,
  companyCount: 142,
}

const companies = [
  { id: 1, name: "ABC Lojistik A.Ş.", total: 250000, locked: 80000, available: 170000 },
  { id: 2, name: "XYZ Otomotiv Ltd. Şti.", total: 350000, locked: 120000, available: 230000 },
  { id: 3, name: "Delta Forklift Servis", total: 180000, locked: 40000, available: 140000 },
  { id: 4, name: "Kaya Geri Dönüşüm", total: 155000, locked: 40000, available: 115000 },
]

export default function AdminDashboardPage() {
  const [sortBy, setSortBy] = useState<"total" | "available">("total")

  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      if (sortBy === "total") return b.total - a.total
      return b.available - a.available
    })
  }, [sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Firma bazlı bakiye dağılımını görüntüleyin ve sıralayın.
        </p>
      </div>

      {/* Bakiye özeti kartları */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam Platform Bakiyesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {balanceSummary.totalBalance.toLocaleString("tr-TR")} TL
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam Teminat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {balanceSummary.totalLocked.toLocaleString("tr-TR")} TL
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam Kullanılabilir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {balanceSummary.totalAvailable.toLocaleString("tr-TR")} TL
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam İhale Giriş Bedeli</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {balanceSummary.totalEntryFees.toLocaleString("tr-TR")} TL
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Toplam Firma Sayısı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {balanceSummary.companyCount.toLocaleString("tr-TR")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-medium">Firma Bazlı Bakiye Dağılımı</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "total" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("total")}
            >
              Toplam Bakiyeye Göre
            </Button>
            <Button
              variant={sortBy === "available" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("available")}
            >
              Kullanılabilir Bakiyeye Göre
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Firma</TableHead>
                <TableHead>Toplam Bakiye</TableHead>
                <TableHead>Teminat</TableHead>
                <TableHead>Kullanılabilir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCompanies.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell className="font-medium">{c.total.toLocaleString("tr-TR")} TL</TableCell>
                  <TableCell>{c.locked.toLocaleString("tr-TR")} TL</TableCell>
                  <TableCell className="font-semibold">{c.available.toLocaleString("tr-TR")} TL</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
