"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReportPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedReport = localStorage.getItem("auditResult");
    if (savedReport) {
      setReport(JSON.parse(savedReport));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center bg-white rounded-2xl p-8 max-w-md shadow-xl">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
          <p className="text-gray-600 mb-6">Please generate a new audit report.</p>
          <Link href="/audit" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Start New Audit
          </Link>
        </div>
      </div>
    );
  }

  const monthlySpend = report.analysis?.monthlySpend || 0;
  const monthlySavings = report.analysis?.potentialSavings || 0;
  const annualSavings = report.analysis?.annualSavings || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your AI Spend Audit Report
          </h1>
          <p className="text-gray-600">Here's your personalized savings analysis</p>
        </div>

        {/* Savings Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl text-center">
          <div className="text-sm uppercase tracking-wider mb-2">Total Annual Savings Potential</div>
          <div className="text-5xl font-bold mb-2">${annualSavings.toFixed(2)}</div>
          <div className="text-sm opacity-90">${monthlySavings.toFixed(2)} per month</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm text-gray-600">Monthly Spend</div>
            <div className="text-2xl font-bold text-blue-600">${monthlySpend}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm text-gray-600">Monthly Savings</div>
            <div className="text-2xl font-bold text-green-600">${monthlySavings.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm text-gray-600">Tools Used</div>
            <div className="text-2xl font-bold text-purple-600">{report.input?.selectedTools?.length || 0}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/audit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            New Audit
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition"
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}