
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { aggregateBySourceAndStatus } from '../../../utils/chartUtils';

const statusColors = {
  Applied: '#8884d8',
  Interview: '#82ca9d',
  Offer: '#ffc658',
  Rejected: '#ff6b6b',
};

const statuses = Object.keys(statusColors);

const StatBarChart = ({ data }) => {
  const chartData = aggregateBySourceAndStatus(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="source" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        {statuses.map((status) => (
          <Bar
            key={status}
            dataKey={status}
            fill={statusColors[status]}
            // For grouped bars, do NOT set stackId
            // Uncomment the next line if you want stacked bars instead
            stackId="a"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatBarChart;
