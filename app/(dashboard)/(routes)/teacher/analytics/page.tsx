import PaymentService from "@/services/payment/payment-service";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";

const AnalyticsPage = async () => {
  const analytics = await PaymentService.getAnalytics();
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total revenue"
          value={analytics?.totalRevenue}
          shouldFormat
        />
        <DataCard label="Total sales" value={analytics?.totalSales} />
      </div>
      <Chart data={analytics?.data} />
    </main>
  );
};

export default AnalyticsPage;
