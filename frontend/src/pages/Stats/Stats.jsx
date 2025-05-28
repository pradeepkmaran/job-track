import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StatAreaChart from "../../components/ui/statAreaChart/StatAreaChart";
import StatPieChart from "../../components/ui/statPieChart/statPieChart";
import StatBarChart from "../../components/ui/statBarChart/statBarChart";
import './Stats.css';

const Stats = () => {
  const user = useSelector((state) => state.auth.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!user || !user.username) return;

      try {
        const resp = await fetch(
          `${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/all?username=${user.username}`
        );

        if (!resp.ok) {
          console.error("Failed to fetch applications");
          return;
        }

        const data = await resp.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, [user]);

  return (
    <div className="stats-layout-wrapper">
      <div className="chart-card-large">
        <h2>Application Timeline</h2>
        <StatAreaChart data={applications} />
      </div>
      <div className="chart-card">
        <h2>Application Status Distribution</h2>
        <StatPieChart data={applications} />
      </div>
      <div className="chart-card">
        <h2>Source and Status Distribution</h2>
        <StatBarChart data={applications} />
      </div>
    </div>
  );
};

export default Stats;
