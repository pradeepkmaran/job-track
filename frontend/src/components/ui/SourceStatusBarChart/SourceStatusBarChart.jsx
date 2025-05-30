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

// Use consistent status keys as in your app
const statusColors = {
  'Not Applied': '#AA47BC',
  'Applied': '#8884d8',
  'Interviewed': '#82ca9d',
  'Offer': '#ffc658',
  'Rejected': '#ff6b6b',
};

const statuses = Object.keys(statusColors);

const SourceStatusBarChart = ({ data }) => {
  if (!data || !data.length) return <p>No data to display</p>;

  // Aggregate data by source and status
  const chartData = aggregateBySourceAndStatus(data, statuses);

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
            stackId="a" // stacked bars for better comparison
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SourceStatusBarChart;
