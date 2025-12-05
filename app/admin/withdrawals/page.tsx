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

const withdrawalRequests = [
  {
    id: "WDR-001",
    company: "XYZ Otomotiv Ltd. Şti.",
    amount: "40.000 TL",
    iban: "TR00 0000 0000 0000 0000 0000 00",
    createdAt: "28.11.2025 10:15",
    status: "Pending",
  },
  {
    id: "WDR-002",
    company: "Delta Forklift Servis",
    amount: "25.000 TL",
    iban: "TR11 1111 1111 1111 1111 1111 11",
    createdAt: "27.11.2025 17:40",
    status: "Pending",
  },
]

const processedWithdrawals = [
  {
    id: "WDR-010",
    company: "ABC Lojistik A.Ş.",
    amount: "55.000 TL",
    iban: "TR22 2222 2222 2222 2222 2222 22",
    processedAt: "26.11.2025 14:20",
    refCode: "ALT-9001",
  },
  {
    id: "WDR-011",
    company: "Kaya Lojistik",
    amount: "18.000 TL",
    iban: "TR33 3333 3333 3333 3333 3333 33",
    processedAt: "25.11.2025 09:15",
    refCode: "ALT-9002",
  },
]

export default function AdminWithdrawalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "processed">("all")

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Para Çekme Talepleri
        </h1>
        <p className="text-sm text-muted-foreground">
          Kullanıcıların tanımlı IBAN&apos;larına göndermek istedikleri tutarları buradan onaylayın.
        </p>
      </div>

      {/* Arama + bekleyen talepler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Bekleyen Talepler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Firma veya Ref Kodu ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[260px]"
              />
              <Button variant="outline">Ara</Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Durum:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                <option value="all">Tümü</option>
                <option value="pending">Bekleyen</option>
                <option value="processed">Gerçekleşen</option>
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Talep No</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>IBAN</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalRequests
                .filter(
                  (req) =>
                    req.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    req.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((req) => (statusFilter === "pending" ? req.status === "Pending" : true))
                .map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.id}</TableCell>
                    <TableCell>{req.company}</TableCell>
                    <TableCell>{req.amount}</TableCell>
                    <TableCell className="text-xs">
                      {req.iban}
                    </TableCell>
                    <TableCell>{req.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{req.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="default">
                        Onayla
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reddet
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gerçekleşen işlemler - tablo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Gerçekleşen İşlemler</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşlem No</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>IBAN</TableHead>
                <TableHead>Ref Kodu</TableHead>
                <TableHead>Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedWithdrawals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell className="text-xs font-mono">{item.iban}</TableCell>
                  <TableCell>{item.refCode}</TableCell>
                  <TableCell>{item.processedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
