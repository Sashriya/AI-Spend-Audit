"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamSize: "",
    monthlySpend: "",
    useCase: "",
    email: "",
    companyName: "",
    selectedTools: [] as string[],
  });

  const tools = ["ChatGPT", "Cursor", "Claude", "GitHub Copilot", "Gemini", "OpenAI API"];

  const toggleTool = (toolName: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTools: prev.selectedTools.includes(toolName)
        ? prev.selectedTools.filter((t) => t !== toolName)
        : [...prev.selectedTools, toolName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      localStorage.setItem("auditResult", JSON.stringify(result));
      router.push(`/report/${result.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Spend Audit
          </h1>
          <p className="text-gray-600">Let's analyze your AI spending and find savings opportunities</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Audit Information</h2>
            <p className="text-blue-100 text-sm">Fill out the details below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🏢 Company Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">👥 Team Size</label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Monthly AI Spend (USD)</label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                value={formData.monthlySpend}
                onChange={(e) => setFormData({ ...formData, monthlySpend: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">📧 Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">🛠️ AI Tools You Use</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <label key={tool} className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer hover:border-blue-500">
                    <input type="checkbox" checked={formData.selectedTools.includes(tool)} onChange={() => toggleTool(tool)} />
                    <span className="font-medium">{tool}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🎯 Primary Use Case</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                required
              >
                <option value="">Select use case</option>
                <option value="coding">Software Development</option>
                <option value="content">Content Creation</option>
                <option value="design">Design & Creative</option>
                <option value="research">Research & Analysis</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Generating Report..." : "Generate Audit Report →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}