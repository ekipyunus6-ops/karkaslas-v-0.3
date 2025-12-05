"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, MessageCircle } from "lucide-react"

export default function SupportPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Destek</h1>
          <p className="text-sm text-muted-foreground">
            Destek için şu anda sadece WhatsApp hattımız üzerinden hizmet veriyoruz.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">E-posta</div>
                <a
                  href="mailto:destek@alternatiflastik.com"
                  className="text-sm text-primary hover:underline"
                >
                  destek@alternatiflastik.com
                </a>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm font-medium">WhatsApp Destek</div>
                <p className="text-sm text-muted-foreground">
                  Tüm destek talepleri <span className="font-medium">sadece WhatsApp</span> üzerinden
                  alınmaktadır.
                </p>
                <a
                  href="https://wa.me/905551112233"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex text-sm text-primary hover:underline"
                >
                  +90 555 111 22 33 üzerinden WhatsApp&apos;tan yazın
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
