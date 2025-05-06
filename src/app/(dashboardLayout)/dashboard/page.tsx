import ReviewPieChart from '@/components/dashboard/dashboardOverview';
import { Card, CardContent } from '@/components/ui/card';

type DashboardData = {
  totalReviews: number;
  totalPendingReviews: number;
  totalPremiumReviews: number;
  totalPayments: number;
  totalUsers: number;
};

async function getDashboardData(): Promise<DashboardData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard-overview`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const json = await res.json();
  return json.data;
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  const cards = [
    {
      title: 'Total Reviews',
      value: data.totalReviews,
    },
    {
      title: 'Pending Reviews',
      value: data.totalPendingReviews,
    },
    {
      title: 'Premium Reviews',
      value: data.totalPremiumReviews,
    },
    {
      title: 'Total Payments',
      value: `$${data.totalPayments.toFixed(2)}`,
    },
    {
      title: 'Total Users',
      value: data.totalUsers,
    },
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Admin Overview</h2>
      <div className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Card key={idx} className={`bg-primary/5 shadow-lg rounded-2xl`}>
            <CardContent className="p-5">
              <h3 className="text-lg font-medium text-gray-600">
                {card.title}
              </h3>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ReviewPieChart
        total={data.totalReviews}
        premium={data.totalPremiumReviews}
        pending={data.totalPendingReviews}
      />
    </div>
  );
}
