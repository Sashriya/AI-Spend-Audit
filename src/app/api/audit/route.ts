import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { teamSize, monthlySpend, selectedTools, email } = body

    const monthly = parseFloat(monthlySpend)
    const savings = monthly * 0.35
    const annual = savings * 12

    const result = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      input: { teamSize, monthlySpend, selectedTools, email },
      analysis: {
        monthlySpend: monthly,
        potentialSavings: savings,
        annualSavings: annual,
        recommendations: [
          { message: "Consider switching to annual billing", savings: `$${(monthly * 0.15).toFixed(2)}/month` }
        ]
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
