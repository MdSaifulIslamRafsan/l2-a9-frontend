'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type PieChartProps = {
  total: number;
  premium: number;
  pending: number;
};

export default function ReviewPieChart({
  total,
  premium,
  pending,
}: PieChartProps) {
  const pieData = [
    { name: 'Premium', value: premium },
    { name: 'Pending', value: pending },
    { name: 'Others', value: total - premium - pending },
  ];

  return (
    <div className="bg-white mt-5 rounded-xl shadow p-6">
      <h3 className="text-2xl font-semibold mb-4">Review Type Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* Add the Legend */}
            <Legend
              //   layout="horizentel"
              align="center"
              verticalAlign="bottom"
              payload={[
                { value: 'Premium', type: 'square', color: COLORS[0] },
                { value: 'Pending', type: 'square', color: COLORS[1] },
                { value: 'Others', type: 'square', color: COLORS[2] },
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
