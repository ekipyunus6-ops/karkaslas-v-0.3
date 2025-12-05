import { DashboardLayout } from "@/components/dashboard-layout"
import { SummaryCards } from "@/components/summary-cards"
import { FinancialActions } from "@/components/financial-actions"
import { RecentActivity } from "@/components/recent-activity"

export default function FinancialsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Finansal İşlemler</h1>
          <p className="text-sm text-muted-foreground">
            Bakiye özetinizi, para yatırma / çekme işlemlerinizi ve son hesap hareketlerinizi buradan yönetebilirsiniz.
          </p>
        </div>

        {/* Dashboard’tan gelen özet kartlar */}
        <SummaryCards />

        {/* Para yatır / çek kartı */}
        <FinancialActions />

        {/* Son işlemler tablosu */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  )
}
