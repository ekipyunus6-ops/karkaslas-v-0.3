"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

// ---------------------------
// MOCK DATA (Backend bağlantısı yokken)
// ---------------------------

const pendingCompanies = [
  {
    id: 1,
    name: "ABC Lojistik A.Ş.",
    vkn: "1234567890",
    sector: "Lojistik",
    createdAt: "28.11.2025",
  },
  {
    id: 2,
    name: "XYZ Otomotiv Ltd. Şti.",
    vkn: "9876543210",
    sector: "Otomotiv",
    createdAt: "27.11.2025",
  },
]

const allCompanies = [
  {
    id: 1,
    name: "ABC Lojistik A.Ş.",
    vkn: "1234567890",
    sector: "Lojistik",
    status: "Pending",
  },
  {
    id: 2,
    name: "XYZ Otomotiv Ltd. Şti.",
    vkn: "9876543210",
    sector: "Otomotiv",
    status: "Active",
  },
  {
    id: 3,
    name: "Delta Forklift Servis",
    vkn: "1112223334",
    sector: "Servis",
    status: "Suspended",
  },
]


export default function AdminCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPending = useMemo(
    () =>
      pendingCompanies.filter((c) =>
        `${c.name} ${c.vkn}`.toLocaleLowerCase("tr-TR").includes(searchTerm.toLocaleLowerCase("tr-TR")),
      ),
    [searchTerm],
  )

  const filteredAll = useMemo(
    () =>
      allCompanies.filter((c) =>
        `${c.name} ${c.vkn}`.toLocaleLowerCase("tr-TR").includes(searchTerm.toLocaleLowerCase("tr-TR")),
      ),
    [searchTerm],
  )

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Firmalar & Üyeler</h1>
        <p className="text-sm text-muted-foreground">
          VKN sahibi KOBİ üyelik başvurularını inceleyin, onaylayın veya askıya alın.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-sm font-medium">Firma Başvuruları</CardTitle>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Firma adı veya VKN ile ara"
            className="w-full md:max-w-xs"
          />
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Onay Bekleyenler</TabsTrigger>
              <TabsTrigger value="all">Tüm Firmalar</TabsTrigger>
            </TabsList>

            {/* -------------------- Pending Companies -------------------- */}
            <TabsContent value="pending" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Firma Adı</TableHead>
                    <TableHead>VKN</TableHead>
                    <TableHead>Sektör</TableHead>
                    <TableHead>Kayıt Tarihi</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredPending.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.vkn}</TableCell>
                      <TableCell>{company.sector}</TableCell>
                      <TableCell>{company.createdAt}</TableCell>

                      <TableCell className="text-right space-x-2">

                        {/* --- Detay Butonu (Dinamik Route) --- */}
                        <Link href={`/admin/companies/${company.id}`}>
                          <Button size="sm" variant="outline">
                            Detay
                          </Button>
                        </Link>

                        <Button size="sm" variant="default">Onayla</Button>
                        <Button size="sm" variant="destructive">Reddet</Button>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* -------------------- All Companies -------------------- */}
            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Firma Adı</TableHead>
                    <TableHead>VKN</TableHead>
                    <TableHead>Sektör</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredAll.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.vkn}</TableCell>
                      <TableCell>{company.sector}</TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            company.status === "Active"
                              ? "default"
                              : company.status === "Pending"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {company.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right space-x-2">

                        {/* --- Detay Butonu (Dinamik Route) --- */}
                        <Link href={`/admin/companies/${company.id}`}>
                          <Button size="sm" variant="outline">
                            Detay
                          </Button>
                        </Link>

                        <Button size="sm" variant="outline">Düzenle</Button>

                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
