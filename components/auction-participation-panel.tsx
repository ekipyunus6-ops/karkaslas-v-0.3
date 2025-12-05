"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AuctionParticipationProps = {
  state: {
    auctionId: string
    depositAmount: number
    entryFeeAmount: number
    registrationStatus: "NONE" | "PENDING" | "ACTIVE"
    balance: number
    locked: number
    isDepositWindowOpen: boolean
  }
  onJoinClick?: () => void
  onTopUpClick?: () => void
}

export function AuctionParticipationPanel({ state, onJoinClick, onTopUpClick }: AuctionParticipationProps) {
  const {
    depositAmount,
    entryFeeAmount,
    registrationStatus,
    balance,
    locked,
    isDepositWindowOpen,
  } = state

  const available = balance - locked
  const totalNeeded = depositAmount + entryFeeAmount
  const hasEnough = available >= totalNeeded

  if (!isDepositWindowOpen) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>İhale Katılımı</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <Alert className="border-dashed">
            <AlertTitle>Teminat toplama süresi sona erdi</AlertTitle>
            <AlertDescription>Bu ihaleye yeni katılım kabul edilmemektedir.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (registrationStatus === "ACTIVE") {
    return (
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>İhale Katılımı</CardTitle>
          <Badge variant="outline">Katılım Onaylandı</Badge>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Bu ihaleye katılımınız onaylandı. Teminat ve ihale giriş bedeli hesabınızdan alınmış ve teminatınız bloke
            edilmiştir.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            <div className="space-y-1 rounded-md border bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">Bloke Teminat</div>
              <div className="font-semibold">{depositAmount.toLocaleString("tr-TR")} TL</div>
            </div>
            <div className="space-y-1 rounded-md border bg-muted/50 p-2">
              <div className="text-[11px] text-muted-foreground">İhale Giriş Bedeli</div>
              <div className="font-semibold">{entryFeeAmount.toLocaleString("tr-TR")} TL</div>
            </div>
          </div>
          <Alert className="mt-2">
            <AlertDescription>Artık bu ihalede teklif verebilirsiniz.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>İhale Katılımı</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid gap-2 md:grid-cols-3 text-xs md:text-sm">
          <div className="space-y-1 rounded-md border bg-muted/40 p-2">
            <div className="text-[11px] text-muted-foreground">Teminat</div>
            <div className="font-semibold">{depositAmount.toLocaleString("tr-TR")} TL</div>
          </div>
          <div className="space-y-1 rounded-md border bg-muted/40 p-2">
            <div className="text-[11px] text-muted-foreground">İhale Giriş Bedeli</div>
            <div className="font-semibold">{entryFeeAmount.toLocaleString("tr-TR")} TL</div>
          </div>
          <div className="space-y-1 rounded-md border bg-muted/40 p-2">
            <div className="text-[11px] text-muted-foreground">Toplam Gereken</div>
            <div className="font-semibold">{totalNeeded.toLocaleString("tr-TR")} TL</div>
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-3 text-xs md:text-sm">
          <div className="space-y-1">
            <div className="text-[11px] text-muted-foreground">Toplam Bakiye</div>
            <div className="font-semibold">{balance.toLocaleString("tr-TR")} TL</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-muted-foreground">Bloke Tutar</div>
            <div className="font-semibold">{locked.toLocaleString("tr-TR")} TL</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-muted-foreground">Kullanılabilir Bakiye</div>
            <div className="font-semibold">{available.toLocaleString("tr-TR")} TL</div>
          </div>
        </div>

        {!hasEnough ? (
          <Alert>
            <AlertTitle>Yetersiz bakiye</AlertTitle>
            <AlertDescription>
              Bu ihaleye katılmak için en az{" "}
              <span className="font-semibold">{totalNeeded.toLocaleString("tr-TR")} TL</span> kullanılabilir bakiyeniz
              olmalıdır. Lütfen önce hesabınıza para yatırın.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertDescription>
              Katıl butonuna bastığınızda teminat ve ihale giriş bedeli hesabınızdan alınacak, teminat tutarı bloke
              edilecektir.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            className="w-full md:w-auto"
            disabled={!hasEnough}
            onClick={hasEnough ? onJoinClick : onTopUpClick}
          >
            {hasEnough ? "Bu İhaleye Katıl" : "Para Yatırma Sayfasına Git"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
