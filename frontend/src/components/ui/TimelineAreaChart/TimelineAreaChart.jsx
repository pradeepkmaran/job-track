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

const TimelineAreaChart = ({ data }) => {
  const [view, setView] = useState("weekly");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || !data.length) {
      setChartData([]);
      return;
    }

    switch (view) {
      case "monthly":
        setChartData(getMonthlyCounts(data));
        break;
      case "weekly":
        setChartData(getWeeklyCounts(data));
        break;
      case "yearly":
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
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
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
