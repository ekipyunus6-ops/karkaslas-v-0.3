"use server"

import { redirect } from "next/navigation"

export default function RedirectCreateAuction() {
  // Legacy path; creation is now admin-only.
  redirect("/ihale")
}
