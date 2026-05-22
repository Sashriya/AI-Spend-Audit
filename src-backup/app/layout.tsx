import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Credex AI Spend Audit",
  description: "Optimize your startup's AI tool spending",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
