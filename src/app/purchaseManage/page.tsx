"use client";

// frontend/components/StatisticsPage.tsx
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatisticsPage: React.FC = () => {
  const [isBarChart, setIsBarChart] = useState(true);

  // Mock data for the charts
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Thức ăn",
        data: [200000, 400000, 300000, 150000, 500000, 250000],
        backgroundColor: "#4F81BD",
      },
      {
        label: "Vật dụng gia đình",
        data: [150000, 250000, 400000, 200000, 300000, 200000],
        backgroundColor: "#C0504D",
      },
      {
        label: "Khác",
        data: [100000, 200000, 150000, 100000, 200000, 150000],
        backgroundColor: "#9BBB59",
      },
    ],
  };

  const doughnutData = {
    labels: ["Thức Ăn", "Vật Dụng", "Quần Áo", "Giải trí", "Du lịch", "Khác"],
    datasets: [
      {
        data: [3000000, 4000000, 1200000, 2001000, 4500000, 800000],
        backgroundColor: ["#4F81BD", "#C0504D", "#9BBB59", "#F3A43B", "#5B9BD5", "#70AD47"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chi tiêu theo tháng",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: number) {
            return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4E4C67] text-white p-4 h-full overflow-y-auto">
        <nav className="space-y-4">
          <a href="/purchaseplan" className="block py-2 px-4 hover:bg-gray-600">Quản lý danh mục mua sắm</a>
          <a className="block py-2 px-4 hover:bg-gray-600">Kế hoạch mua sắm</a>
          <a href="/purchaseHistory" className="block py-2 px-4 hover:bg-gray-600">Lịch sử mua sắm</a>
          <a href="/purchaseManage" className="block py-2 px-4 bg-gray-700 rounded">Thống kê</a>
        </nav>
        <div className="mt-8 space-y-4">
          <a href="/settings" className="block py-2 px-4 hover:bg-gray-600">Cài đặt</a>
          <a href="/blocklist" className="block py-2 px-4 hover:bg-gray-600">BlockList</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#4E4C67]">Quản lý lịch sử mua sắm</h1>
        </header>

        {/* Dropdown and Total Spending */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#4E4C67]">Chi tiêu theo Tuần</h2>
            <p className="text-3xl font-bold text-blue-600">5.000.000đ</p>
            <p className="text-gray-500">50 món hàng</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded px-4 py-2 text-black"
              defaultValue="This Week"
            >
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="This Month">This Month</option>
            </select>
            <button
              className="px-4 py-2 bg-[#4E4C67] text-white rounded shadow-md hover:bg-[#3C3A54]"
              onClick={() => setIsBarChart(!isBarChart)}
            >
              {isBarChart ? "Hiển thị biểu đồ tròn" : "Hiển thị biểu đồ cột"}
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg h-[400px] w-full max-w-[600px] mx-auto">
          {isBarChart ? <Bar options={barOptions} data={barData} /> : <Doughnut options={doughnutOptions} data={doughnutData} />}
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
