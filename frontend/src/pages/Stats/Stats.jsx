import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TimelineAreaChart from "../../components/ui/TimelineAreaChart/TimelineAreaChart";
import StatusPieChart from "../../components/ui/StatusPieChart/StatusPieChart";
import SourceStatusBarChart from "../../components/ui/SourceStatusBarChart/SourceStatusBarChart";
import OfferPayList from "../../components/ui/OfferPayList/OfferPayList";
import RecentApplications from "../../components/ui/RecentApplications/RecentApplications";
import './Stats.css';

const Stats = () => {
  const user = useSelector((state) => state.auth.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!user || !user.username) return;

      try {
        const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/all`, {
          method: 'GET',
          credentials: 'include'
        }
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
      <div className="chart-card">
        <h2>Offers with highest pay</h2>
        <OfferPayList data={applications} />
      </div>
      <div className="chart-card">
        <h2>Recent Applications</h2>
        <RecentApplications data={applications} />
      </div>
      <div className="chart-card-large">
        <h2>Application Timeline</h2>
        <TimelineAreaChart data={applications} />
      </div>
      <div className="chart-card">
        <h2>Application Status Distribution</h2>
        <StatusPieChart data={applications} />
      </div>
      <div className="chart-card">
        <h2>Source and Status Distribution</h2>
        <SourceStatusBarChart data={applications} />
      </div>
    </div>
  );
};

export default Stats;
