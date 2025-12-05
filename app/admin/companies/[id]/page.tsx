"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ---------------------------
// MOCK DATA (backend yokken)
// ---------------------------

const companyInfo = {
  id: 1,
  name: "ABC Lojistik A.Ş.",
  vkn: "1234567890",
  sector: "Lojistik",
  subSector: "Taşıma Hizmetleri",
  authority: "Ali Demir",
  phone: "+90 555 111 22 33",
  email: "info@abclojistik.com",
  city: "Ankara",
  district: "Yenimahalle",
  address: "İvedik OSB Mah. 1406. Cad. No:21",
  status: "Active",
  createdAt: "12.11.2025",
  approvedAt: "13.11.2025",
}

const balanceInfo = {
  total: 250000,
  locked: 80000,
  available: 170000,
}

const lastTransactions = [
  {
    id: "TX-001",
    type: "Deposit",
    amount: "150.000 TL",
    date: "27.11.2025",
    status: "Approved",
  },
  {
    id: "TX-002",
    type: "Bid Lock",
    amount: "40.000 TL",
    date: "28.11.2025",
    status: "Locked",
  },
  {
    id: "TX-003",
    type: "Withdrawal",
    amount: "20.000 TL",
    date: "28.11.2025",
    status: "Pending",
  },
]

const buyerAuctions = [
  {
    id: "ALT-0991",
    lastBid: "82.000 TL",
    actions: ["Teklif verdi: 70.000 TL", "Teklif artırdı: 82.000 TL"],
    won: true,
    closedAt: "29.11.2025 18:00",
    deposit: "40.000 TL",
    entryFee: "5.000 TL",
  },
]

const deposits = [
  {
    id: "DEP-001",
    amount: "150.000 TL",
    ref: "ALT-4589",
    bank: "Ziraat Bankası",
    date: "27.11.2025",
    status: "Approved",
    admin: "Admin1",
  },
]

const withdrawals = [
  {
    id: "WDR-003",
    amount: "20.000 TL",
    iban: "TR00 0000 0000 0000 0000 0000 00",
    date: "28.11.2025",
    status: "Pending",
    admin: "-",
  },
]

const financialMovements = [
  ...lastTransactions.map((t) => ({
    id: t.id,
    type: t.type,
    amount: t.amount,
    date: t.date,
    status: t.status,
    note: "",
  })),
  ...deposits.map((d) => ({
    id: d.id,
    type: "Para Yatırma",
    amount: d.amount,
    date: d.date,
    status: d.status,
    note: d.bank,
  })),
  ...withdrawals.map((w) => ({
    id: w.id,
    type: "Para Çekme",
    amount: w.amount,
    date: w.date,
    status: w.status,
    note: w.iban,
  })),
]

const guaranteeStatuses = [
  {
    auctionId: "ALT-1005",
    amount: "50.000 TL",
    status: "Bloke",
    date: "28.11.2025 15:10",
  },
]

const entryFees = [
  {
    auctionId: "ALT-1005",
    amount: "5.000 TL",
    date: "28.11.2025 15:10",
  },
]

// ---------------------------
// PAGE COMPONENT
// ---------------------------

export default function CompanyDetailPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {companyInfo.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>VKN: {companyInfo.vkn}</span>
            <Badge variant={companyInfo.status === "Active" ? "default" : "outline"}>
              {companyInfo.status}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="default">Onayla</Button>
          <Button variant="outline">Askıya Al</Button>
          <Button variant="destructive">Reddet</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        {/* TAB BUTTONS */}
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
          <TabsTrigger value="financial">Finansal Durum</TabsTrigger>
          <TabsTrigger value="auctions">İhale Aktivitesi</TabsTrigger>
          <TabsTrigger value="deposits">Para Yatırma</TabsTrigger>
          <TabsTrigger value="withdrawals">Para Çekme</TabsTrigger>
        </TabsList>

        {/* ---------------- TAB 1 — GENEL ---------------- */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Firma Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Firma Adı:</strong> {companyInfo.name}
              </div>
              <div>
                <strong>VKN:</strong> {companyInfo.vkn}
              </div>
              <div>
                <strong>Sektör:</strong> {companyInfo.sector}
              </div>
              <div>
                <strong>Alt Alan:</strong> {companyInfo.subSector}
              </div>
              <div>
                <strong>Kayıt Tarihi:</strong> {companyInfo.createdAt}
              </div>
              <div>
                <strong>Onay Tarihi:</strong> {companyInfo.approvedAt}
              </div>
              <div>
                <strong>Durum:</strong> {companyInfo.status}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yetkili Kişi</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Adı Soyadı:</strong> {companyInfo.authority}
              </div>
              <div>
                <strong>Telefon:</strong> {companyInfo.phone}
              </div>
              <div>
                <strong>E-mail:</strong> {companyInfo.email}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adres Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Şehir:</strong> {companyInfo.city}
              </div>
              <div>
                <strong>İlçe:</strong> {companyInfo.district}
              </div>
              <div className="col-span-2">
                <strong>Adres:</strong> {companyInfo.address}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- TAB 2 — FINANSAL DURUM ---------------- */}
        <TabsContent value="financial" className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Toplam Bakiye</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {balanceInfo.total.toLocaleString("tr-TR")} TL
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Teminat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {balanceInfo.locked.toLocaleString("tr-TR")} TL
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Kullanılabilir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {balanceInfo.available.toLocaleString("tr-TR")} TL
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All financial movements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tüm Finansal Hareketler</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>İşlem</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Ek Bilgi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {financialMovements.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.id}</TableCell>
                      <TableCell>{t.type}</TableCell>
                      <TableCell>{t.amount}</TableCell>
                      <TableCell>{t.date}</TableCell>
                      <TableCell>
                        <Badge>{t.status}</Badge>
                      </TableCell>
                      <TableCell>{t.note || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Teminat Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İhale</TableHead>
                      <TableHead>Tutar</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Tarih</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guaranteeStatuses.map((g) => (
                      <TableRow key={g.auctionId}>
                        <TableCell>{g.auctionId}</TableCell>
                        <TableCell>{g.amount}</TableCell>
                        <TableCell>
                          <Badge>{g.status}</Badge>
                        </TableCell>
                        <TableCell>{g.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">İhale Giriş Bedelleri</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İhale</TableHead>
                      <TableHead>Tutar</TableHead>
                      <TableHead>Tarih</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entryFees.map((f) => (
                      <TableRow key={f.auctionId}>
                        <TableCell>{f.auctionId}</TableCell>
                        <TableCell>{f.amount}</TableCell>
                        <TableCell>{f.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ---------------- TAB 3 — IHALE AKTIVITESI ---------------- */}
        <TabsContent value="auctions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Alıcı Olduğu İhaleler</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>İşlemler</TableHead>
                    <TableHead>Son Teklif</TableHead>
                    <TableHead>Kazandı mı?</TableHead>
                    <TableHead>Teminat</TableHead>
                    <TableHead>İhale Giriş Bedeli</TableHead>
                    <TableHead>Kapanış</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buyerAuctions.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.id}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {a.actions.map((action, idx) => (
                            <div key={idx} className="text-sm text-muted-foreground">
                              {action}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{a.lastBid}</TableCell>
                      <TableCell>{a.won ? "Evet" : "Hayır"}</TableCell>
                      <TableCell>{a.deposit}</TableCell>
                      <TableCell>{a.entryFee}</TableCell>
                      <TableCell>{a.closedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- TAB 4 — DEPOSITS ---------------- */}
        <TabsContent value="deposits" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Para Yatırma Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>Ref Kod</TableHead>
                    <TableHead>Banka</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deposits.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.id}</TableCell>
                      <TableCell>{d.amount}</TableCell>
                      <TableCell>{d.ref}</TableCell>
                      <TableCell>{d.bank}</TableCell>
                      <TableCell>{d.date}</TableCell>
                      <TableCell>
                        <Badge>{d.status}</Badge>
                      </TableCell>
                      <TableCell>{d.admin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- TAB 5 — WITHDRAWALS ---------------- */}
        <TabsContent value="withdrawals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Para Çekme Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>IBAN</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell>{w.id}</TableCell>
                      <TableCell>{w.amount}</TableCell>
                      <TableCell>{w.iban}</TableCell>
                      <TableCell>{w.date}</TableCell>
                      <TableCell>
                        <Badge>{w.status}</Badge>
                      </TableCell>
                      <TableCell>{w.admin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
