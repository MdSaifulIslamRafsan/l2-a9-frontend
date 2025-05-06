import ReviewPieChart from '@/components/dashboard/dashboardOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Clock,
  Star,
  DollarSign,
  Users,
  LucideIcon,
} from 'lucide-react';

interface cardType  {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}
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

  const cards: cardType[] = [
    {
      title: 'Total Reviews',
      value: data.totalReviews,
      icon: BarChart,
      description: 'All reviews in the system',
    },
    {
      title: 'Pending Reviews',
      value: data.totalPendingReviews,
      icon: Clock,
      description: 'Reviews awaiting approval',
    },
    {
      title: 'Premium Reviews',
      value: data.totalPremiumReviews,
      icon: Star,
      description: 'Paid premium reviews',
    },
    {
      title: 'Total Payments',
      value: `$${data.totalPayments.toFixed(2)}`,
      icon: DollarSign,
      description: 'Total payment amount',
    },
    {
      title: 'Total Users',
      value: data.totalUsers,
      icon: Users,
      description: 'Registered users',
    },
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Admin Overview</h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4  gap-6">
        {cards.map((card, idx) => (
         <Card key={idx} className="border-green-100 gap-0">
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
           <CardTitle className="text-lg font-medium">{card?.title}</CardTitle>
           <card.icon className="h-4 w-4 text-green-600" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold">{card.value}</div>
           <p className="text-xs text-muted-foreground">{card.description}</p>
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
