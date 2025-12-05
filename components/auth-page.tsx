"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronDown, Eye, EyeOff, Building2, Truck, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type AuthPageProps = {
  initialTab?: "login" | "register"
}

export function AuthPage({ initialTab = "login" }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab)

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      {/* Left Side - Hero Image */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-auto bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="Lastik Deposu"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full mb-6 border border-white/20">
            <Truck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Karkaslas</h1>
          <p className="text-xl lg:text-2xl font-light text-slate-200 max-w-md">
            Güvenilir B2B Lastik İhaleleri
          </p>
          <div className="mt-8 flex gap-4 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Doğrulanmış Kurumsal İş Ortakları</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Üreticiden Doğrudan Tedarik</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 my-auto">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Tekrar Hoş Geldiniz</h2>
            <p className="text-slate-500 mt-2">En kapsamlı lastik ihalesi platformuna giriş yapın.</p>
          </div>

          {/* Custom Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab("login")}
              className={cn(
                "py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                activeTab === "login"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={cn(
                "py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                activeTab === "register"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Kayıt Ol
            </button>
          </div>

          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>&copy; 2025 Karkaslas. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input 
            id="email" 
            placeholder="ornek@firma.com" 
            type="email" 
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Parola</Label>
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              Şifremi unuttum?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      <Button className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20">
        Giriş Yap
      </Button>
    </div>
  )
}

function RegisterForm() {
  const [taxId, setTaxId] = useState("")
  const [isValidTaxId, setIsValidTaxId] = useState(false)
  const [acceptedProtocol, setAcceptedProtocol] = useState(false)
  const [acceptedKvkk, setAcceptedKvkk] = useState(false)

  // Simulate validation
  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTaxId(value)
    setIsValidTaxId(value.length === 10) // Simple validation simulation
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Kurumsal Kayıt (Sadece B2B)
        </h3>
        <p className="text-sm text-blue-700 mt-1">
          Doğrulama için resmi şirket bilgilerinizi girin.
        </p>
      </div>

      <div className="space-y-4">
        {/* Tax ID Field with Validation Look */}
        <div className="space-y-2">
          <Label htmlFor="taxId">Vergi No (VKN)</Label>
          <div className="relative">
            <Input
              id="taxId"
              value={taxId}
              onChange={handleTaxIdChange}
              placeholder="1234567890"
              maxLength={10}
              className={cn(
                "h-11 transition-colors pr-10",
                isValidTaxId 
                  ? "bg-green-50 border-green-200 focus-visible:ring-green-500" 
                  : "bg-slate-50 border-slate-200"
              )}
            />
            {isValidTaxId && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 bg-green-100 rounded-full p-0.5">
                <Check className="h-3 w-3" />
              </div>
            )}
          </div>
          {isValidTaxId && <p className="text-xs text-green-600 font-medium">Geçerli VKN formatı</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Şirket Unvanı</Label>
          <Input id="companyName" placeholder="Örn: Alternatif Lojistik Ltd. Şti." className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sector">Sektör</Label>
            <div className="relative">
              <select 
                id="sector"
                defaultValue=""
                className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="" disabled>Sektör Seçin</option>
                <option value="automotive">Otomotiv</option>
                <option value="logistics">Lojistik</option>
                <option value="retail">Perakende</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subActivity">Alt Faaliyet Alanı</Label>
            <div className="relative">
              <select 
                id="subActivity"
                defaultValue=""
                className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="" disabled>Faaliyet Seçin</option>
                <option value="tires">Lastik Satışı</option>
                <option value="service">Servis</option>
                <option value="fleet">Filo Yönetimi</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="commercialCode">Cari Kart Kodu</Label>
            <span className="text-xs text-slate-400">Opsiyonel</span>
          </div>
          <Input id="commercialCode" placeholder="C-12345" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="authName">Yetkili Kişi</Label>
            <Input id="authName" placeholder="Ad Soyad" className="h-11 bg-slate-50 border-slate-200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authPhone">Telefon Numarası</Label>
            <Input id="authPhone" placeholder="+90 555 000 0000" className="h-11 bg-slate-50 border-slate-200" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Adres</Label>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="relative">
              <select defaultValue="" className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none">
                <option value="" disabled>Şehir</option>
                <option value="istanbul">İstanbul</option>
                <option value="ankara">Ankara</option>
                <option value="izmir">İzmir</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
            <div className="relative">
              <select defaultValue="" className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none">
                <option value="" disabled>İlçe</option>
                <option value="kadikoy">Kadıköy</option>
                <option value="besiktas">Beşiktaş</option>
                <option value="sisli">Şişli</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
          </div>
          <Input placeholder="Cadde, bina no, kat..." className="h-11 bg-slate-50 border-slate-200" />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="protocol"
            checked={acceptedProtocol}
            onChange={(e) => setAcceptedProtocol(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <label htmlFor="protocol" className="text-sm text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <a href="#" className="text-primary hover:underline font-medium">B2B İhale Protokolü</a> ve hizmet şartlarını kabul ediyorum.
          </label>
        </div>
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="kvkk"
            checked={acceptedKvkk}
            onChange={(e) => setAcceptedKvkk(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <label htmlFor="kvkk" className="text-sm text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <a href="#" className="text-primary hover:underline font-medium">KVKK Aydınlatma Metni</a>ni okudum, kabul ediyorum.
          </label>
        </div>
      </div>

      <Button 
        className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20" 
        disabled={!acceptedProtocol || !acceptedKvkk}
      >
        Kurumsal Hesap Oluştur
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
