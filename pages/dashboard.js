import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const sampleData = [
    { day: "Mon", pnl: 120 },
    { day: "Tue", pnl: -50 },
    { day: "Wed", pnl: 200 },
    { day: "Thu", pnl: -80 },
    { day: "Fri", pnl: 150 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Total Trades</h2>
          <p className="text-3xl font-bold mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Win Rate</h2>
          <p className="text-3xl font-bold mt-2">62%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Net PnL</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">+$1,240</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pnl" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trades List */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Trades</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((t) => (
            <div key={t} className="p-4 border rounded-xl flex justify-between items-center">
              <div>
                <p className="font-medium">AAPL</p>
                <p className="text-sm text-gray-500">Long • 2.1R</p>
              </div>
              <p className="font-bold text-green-600">+$120</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
