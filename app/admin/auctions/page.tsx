 "use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const depositStageAuctions = [
  {
    id: "ALT-1001",
    company: "ABC Lojistik A.Ş.",
    kg: 1200,
    category: "A",
    condition: "Yeniden kaplanabilir",
    createdAt: "28.11.2025",
  },
]

const activeAuctions = [
  {
    id: "ALT-0991",
    company: "XYZ Otomotiv Ltd. Şti.",
    kg: 800,
    category: "B",
    condition: "İkinci el",
    highestBid: "95.000 TL",
    endsAt: "30.11.2025 18:00",
    bids: [
      { company: "Mert Oto", amount: "90.000 TL", time: "29.11.2025 15:30" },
      { company: "XYZ Otomotiv Ltd. Şti.", amount: "95.000 TL", time: "29.11.2025 16:05" },
    ],
  },
]

const endedAuctions = [
  {
    id: "ALT-0890",
    company: "Mert Oto Lastik",
    kg: 950,
    category: "B",
    finalPrice: "110.000 TL",
    winner: "ABC Lojistik A.Ş.",
    endedAt: "15.11.2025 17:30",
    lastBid: "110.000 TL (ABC Lojistik A.Ş.)",
    bids: [
      { company: "Kaya Lojistik", amount: "100.000 TL", time: "15.11.2025 16:45" },
      { company: "ABC Lojistik A.Ş.", amount: "110.000 TL", time: "15.11.2025 17:10" },
    ],
  },
]

type EndedParticipant = {
  id: string
  company: string
  result: "Kazandı" | "Kaybetti"
  deposit: string
  refundStatus: "Bekliyor" | "İade Edildi"
}

const initialEndedParticipants: Record<string, EndedParticipant[]> = {
  "ALT-0890": [
    { id: "ALT-0890-1", company: "ABC Lojistik A.Ş.", result: "Kazandı", deposit: "15.000 TL", refundStatus: "Bekliyor" },
    { id: "ALT-0890-2", company: "Kaya Lojistik", result: "Kaybetti", deposit: "15.000 TL", refundStatus: "Bekliyor" },
    { id: "ALT-0890-3", company: "Beta Oto", result: "Kaybetti", deposit: "15.000 TL", refundStatus: "Bekliyor" },
  ],
}

type Participant = {
  id: string
  company: string
  deposit: string
  entryFee: string
  status: string
  entryFeeStatus: string
  approved?: boolean
}

const initialDepositParticipants: Record<string, Participant[]> = {
  "ALT-1001": [
    {
      id: "ALT-1001-1",
      company: "Kaya Lojistik",
      deposit: "15.000 TL",
      entryFee: "750 TL",
      status: "Teminat Yatırdı",
      entryFeeStatus: "Ödendi",
      approved: false,
    },
    {
      id: "ALT-1001-2",
      company: "Beta Oto",
      deposit: "15.000 TL",
      entryFee: "750 TL",
      status: "Ön Talep",
      entryFeeStatus: "Bekliyor",
      approved: false,
    },
  ],
}

export default function AdminAuctionsPage() {
  const [selectedDeposit, setSelectedDeposit] = useState<string | null>("ALT-1001")
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [countdown, setCountdown] = useState("24")
  const [participantsByAuction, setParticipantsByAuction] = useState<Record<string, Participant[]>>(
    initialDepositParticipants,
  )
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<"all" | "teminat" | "talep" | "katilabilir">("all")
  const [endedParticipantsByAuction, setEndedParticipantsByAuction] =
    useState<Record<string, EndedParticipant[]>>(initialEndedParticipants)
  const [selectedEndedAuction, setSelectedEndedAuction] = useState<string | null>(endedAuctions[0]?.id ?? null)
  const [selectedEndedIds, setSelectedEndedIds] = useState<string[]>([])

  const selectedParticipants = useMemo(() => {
    if (!selectedDeposit) return []
    return participantsByAuction[selectedDeposit] ?? []
  }, [participantsByAuction, selectedDeposit])

  const filteredParticipants = useMemo(() => {
    if (statusFilter === "all") return selectedParticipants
    return selectedParticipants.filter((p) => {
      if (statusFilter === "teminat") return p.status === "Teminat Yatırdı"
      if (statusFilter === "talep") return p.status === "Ön Talep"
      if (statusFilter === "katilabilir") return p.status === "Katılabilir"
      return true
    })
  }, [selectedParticipants, statusFilter])

  const toggleSelectAll = () => {
    if (!selectedDeposit) return
    const current = filteredParticipants
    const allIds = current.map((p) => p.id)
    const allSelected = allIds.every((id) => selectedParticipantIds.includes(id))
    setSelectedParticipantIds(allSelected ? [] : allIds)
  }

  const toggleSelectOne = (id: string) => {
    setSelectedParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    )
  }

  const approveSelected = () => {
    if (!selectedDeposit) return
    setParticipantsByAuction((prev) => {
      const copy = { ...prev }
      const list = copy[selectedDeposit]?.map((p) =>
        selectedParticipantIds.includes(p.id)
          ? {
              ...p,
              status: "Katılabilir",
              entryFeeStatus: "Ödendi (düşüldü)",
              approved: true,
            }
          : p
      )
      copy[selectedDeposit] = list ?? []
      return copy
    })
    setSelectedParticipantIds([])
  }

  const selectedEndedParticipants = useMemo(() => {
    if (!selectedEndedAuction) return []
    return endedParticipantsByAuction[selectedEndedAuction] ?? []
  }, [endedParticipantsByAuction, selectedEndedAuction])

  const toggleSelectAllEnded = () => {
    if (!selectedEndedAuction) return
    const current = selectedEndedParticipants.filter((p) => p.result !== "Kazandı")
    const allIds = current.map((p) => p.id)
    const allSelected = allIds.every((id) => selectedEndedIds.includes(id))
    setSelectedEndedIds(allSelected ? [] : allIds)
  }

  const toggleSelectOneEnded = (id: string) => {
    setSelectedEndedIds((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]))
  }

  const refundSelected = () => {
    if (!selectedEndedAuction) return
    setEndedParticipantsByAuction((prev) => {
      const copy = { ...prev }
      const list = copy[selectedEndedAuction]?.map((p) =>
        selectedEndedIds.includes(p.id) && p.result !== "Kazandı"
          ? { ...p, refundStatus: "İade Edildi" }
          : p
      )
      copy[selectedEndedAuction] = list ?? []
      return copy
    })
    setSelectedEndedIds([])
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          İhale Yönetimi
        </h1>
        <p className="text-sm text-muted-foreground">
          Satıcı firmalardan gelen ihale taleplerini inceleyin, onaylayın ve tarihlerini planlayın.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            İhale Listesi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deposit">
            <TabsList>
              <TabsTrigger value="deposit">Teminat Aşamasında Olanlar</TabsTrigger>
              <TabsTrigger value="active">Aktif İhaleler</TabsTrigger>
              <TabsTrigger value="ended">Sonlanan İhaleler</TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>İhale No</TableHead>
                    <TableHead>Firma</TableHead>
                    <TableHead>Toplam KG</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Kondisyon</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {depositStageAuctions.map((auction) => (
                    <TableRow key={auction.id}>
                      <TableCell>{auction.id}</TableCell>
                      <TableCell>{auction.company}</TableCell>
                      <TableCell>{auction.kg} KG</TableCell>
                      <TableCell>{auction.category}</TableCell>
                      <TableCell>{auction.condition}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedDeposit(auction.id)}>
                          Detay
                        </Button>
                        <Button size="sm" onClick={() => setShowScheduleModal(true)}>Onayla / Tarih Belirle</Button>
                        <Button size="sm" variant="destructive">
                          Reddet
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {selectedDeposit && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      {selectedDeposit} - Katılım Talepleri / Teminat Durumu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          id="select-all"
                          checked={
                            filteredParticipants.length > 0 &&
                            filteredParticipants.every((p) => selectedParticipantIds.includes(p.id))
                          }
                          onChange={toggleSelectAll}
                        />
                        <label htmlFor="select-all" className="select-none">
                          Hepsini Seç
                        </label>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Select
                          value={statusFilter}
                          onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
                        >
                          <SelectTrigger className="w-[180px] h-9">
                            <SelectValue placeholder="Duruma göre filtrele" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tümü</SelectItem>
                            <SelectItem value="teminat">Teminat Yatırdı</SelectItem>
                            <SelectItem value="talep">Ön Talep</SelectItem>
                            <SelectItem value="katilabilir">Katılabilir</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" onClick={approveSelected} disabled={selectedParticipantIds.length === 0}>
                          Seçilenleri Onayla
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead />
                          <TableHead>Firma</TableHead>
                          <TableHead>Teminat</TableHead>
                          <TableHead>İhale Giriş Bedeli</TableHead>
                          <TableHead>Durum</TableHead>
                          <TableHead>İşlem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredParticipants.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                              Henüz katılım talebi yok.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredParticipants.map((item, idx) => (
                            <TableRow key={`${selectedDeposit}-${idx}`}>
                              <TableCell className="w-8">
                                <input
                                  type="checkbox"
                                  checked={selectedParticipantIds.includes(item.id)}
                                  onChange={() => toggleSelectOne(item.id)}
                                />
                              </TableCell>
                              <TableCell>{item.company}</TableCell>
                              <TableCell>{item.deposit}</TableCell>
                              <TableCell>{item.entryFee} — {item.entryFeeStatus}</TableCell>
                              <TableCell>{item.status}</TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="px-2"
                                  disabled={item.approved}
                                  onClick={() => {
                                    setSelectedParticipantIds([item.id])
                                    approveSelected()
                                  }}
                                >
                                  Onayla
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İhale No</TableHead>
                      <TableHead>Firma</TableHead>
                      <TableHead>Toplam KG</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>En Yüksek Teklif</TableHead>
                      <TableHead>Bitiş</TableHead>
                      <TableHead className="text-right">Durum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeAuctions.map((auction) => (
                      <TableRow key={auction.id}>
                        <TableCell>{auction.id}</TableCell>
                        <TableCell>{auction.company}</TableCell>
                        <TableCell>{auction.kg} KG</TableCell>
                        <TableCell>{auction.category}</TableCell>
                        <TableCell>{auction.highestBid}</TableCell>
                        <TableCell>{auction.endsAt}</TableCell>
                        <TableCell className="text-right">
                          <Badge>Aktif</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {activeAuctions.map((auction) => (
                  <Card key={`${auction.id}-bids`} className="border">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        {auction.id} - Tüm Teklifler
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Firma</TableHead>
                            <TableHead>Teklif Tutarı</TableHead>
                            <TableHead>Teklif Zamanı</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auction.bids?.map((bid, idx) => (
                            <TableRow key={`${auction.id}-bid-${idx}`}>
                              <TableCell>{bid.company}</TableCell>
                              <TableCell className="font-semibold">{bid.amount}</TableCell>
                              <TableCell>{bid.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ended" className="mt-4">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İhale No</TableHead>
                      <TableHead>Firma</TableHead>
                      <TableHead>Toplam KG</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Final Tutar</TableHead>
                      <TableHead>Kazanan</TableHead>
                      <TableHead>Son Teklif</TableHead>
                      <TableHead>Bitiş</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endedAuctions.map((auction) => (
                      <TableRow
                        key={auction.id}
                        className={selectedEndedAuction === auction.id ? "bg-muted/50" : ""}
                        onClick={() => setSelectedEndedAuction(auction.id)}
                      >
                        <TableCell>{auction.id}</TableCell>
                        <TableCell>{auction.company}</TableCell>
                        <TableCell>{auction.kg} KG</TableCell>
                        <TableCell>{auction.category}</TableCell>
                        <TableCell>{auction.finalPrice}</TableCell>
                        <TableCell>{auction.winner}</TableCell>
                        <TableCell>{auction.lastBid}</TableCell>
                        <TableCell>{auction.endedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {endedAuctions.map((auction) => (
                  <Card key={`${auction.id}-ended-bids`} className="border">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        {auction.id} - Teklif Geçmişi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Firma</TableHead>
                            <TableHead>Teklif Tutarı</TableHead>
                            <TableHead>Teklif Zamanı</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auction.bids?.map((bid, idx) => (
                            <TableRow key={`${auction.id}-ended-bid-${idx}`}>
                              <TableCell>{bid.company}</TableCell>
                              <TableCell className="font-semibold">{bid.amount}</TableCell>
                              <TableCell>{bid.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}

                {selectedEndedAuction && (
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        {selectedEndedAuction} - Teminat İadeleri (Kazanan hariç)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            id="select-all-ended"
                            checked={
                              selectedEndedParticipants.filter((p) => p.result !== "Kazandı").length > 0 &&
                              selectedEndedParticipants
                                .filter((p) => p.result !== "Kazandı")
                                .every((p) => selectedEndedIds.includes(p.id))
                            }
                            onChange={toggleSelectAllEnded}
                          />
                          <label htmlFor="select-all-ended" className="select-none">
                            Hepsini Seç
                          </label>
                        </div>
                        <Button
                          size="sm"
                          onClick={refundSelected}
                          disabled={selectedEndedIds.length === 0}
                          variant="secondary"
                        >
                          Seçilenlere Teminat İadesi Yap
                        </Button>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead />
                            <TableHead>Firma</TableHead>
                            <TableHead>Sonuç</TableHead>
                            <TableHead>Teminat</TableHead>
                            <TableHead>İade Durumu</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedEndedParticipants.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                                Kayıt bulunamadı.
                              </TableCell>
                            </TableRow>
                          ) : (
                            selectedEndedParticipants.map((p, idx) => (
                              <TableRow key={`${selectedEndedAuction}-ended-${idx}`}>
                                <TableCell className="w-8">
                                  <input
                                    type="checkbox"
                                    disabled={p.result === "Kazandı"}
                                    checked={selectedEndedIds.includes(p.id)}
                                    onChange={() => toggleSelectOneEnded(p.id)}
                                  />
                                </TableCell>
                                <TableCell>{p.company}</TableCell>
                                <TableCell>
                                  <Badge variant={p.result === "Kazandı" ? "default" : "outline"}>{p.result}</Badge>
                                </TableCell>
                                <TableCell>{p.deposit}</TableCell>
                                <TableCell>{p.refundStatus}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">İhaleyi Başlat / Geri Sayım</h3>
                <p className="text-sm text-muted-foreground">
                  İhale başlamadan önce geri sayım süresini (saat cinsinden) girin.
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowScheduleModal(false)}>
                ×
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium" htmlFor="countdown">
                Geri Sayım (saat)
              </label>
              <input
                id="countdown"
                type="number"
                value={countdown}
                onChange={(e) => setCountdown(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                min={1}
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                Vazgeç
              </Button>
              <Button onClick={() => setShowScheduleModal(false)}>
                Onayla ve Başlat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
