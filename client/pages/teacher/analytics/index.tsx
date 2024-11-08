"use client"
import { getAnalytics } from "@/actions/get-analytics";
import { redirect } from "next/navigation";
import { DataCard } from "../../../components/teacher/analytics/data-card";
import { Chart } from "../../../components/teacher/analytics/chart";

const AnalyticsPage = async () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user?._id;
        
  if (!userId) {
    return redirect("/login");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <DataCard
    label="Total Revenue"
    value={totalRevenue}
    shouldFormat/>
    <DataCard
    label="Total Sales"
    value={totalSales}/>
    </div>
    <Chart data={data} />
  </div>;
};

export default AnalyticsPage;
