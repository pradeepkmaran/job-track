import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getMonthlyCounts,
  getWeeklyCounts,
  getYearlyCounts,
} from "../../../utils/chartUtils";

import './TimelineAreaChart.css';

const VIEW_TYPES = {
  YEARLY: "yearly",
  MONTHLY: "monthly",
  WEEKLY: "weekly",
};

const VIEW_OPTIONS = [
  { value: VIEW_TYPES.YEARLY, label: "Yearly" },
  { value: VIEW_TYPES.MONTHLY, label: "Monthly" },
  { value: VIEW_TYPES.WEEKLY, label: "Weekly" },
];

const TimelineAreaChart = ({ data }) => {
  const [view, setView] = useState(VIEW_TYPES.WEEKLY);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || !data.length) {
      setChartData([]);
      return;
    }

    switch (view) {
      case VIEW_TYPES.MONTHLY:
        setChartData(getMonthlyCounts(data));
        break;
      case VIEW_TYPES.WEEKLY:
        setChartData(getWeeklyCounts(data));
        break;
      case VIEW_TYPES.YEARLY:
      default:
        setChartData(getYearlyCounts(data));
        break;
    }
  }, [data, view]);

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <select
        value={view}
        onChange={(e) => setView(e.target.value)}
        style={{ marginBottom: 20, padding: "6px 12px", fontSize: 16 }}
      >
        {VIEW_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineAreaChart;
