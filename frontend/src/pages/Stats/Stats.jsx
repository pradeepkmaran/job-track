import StatAreaChart from "../../components/ui/statAreaChart/StatAreaChart";
import StatPieChart from "../../components/ui/statPieChart/statPieChart";
import StatBarChart from "../../components/ui/statBarChart/statBarChart";
import './Stats.css';
import { useEffect, useState } from "react";

const Stats = () => {
  const [applications, setApplications] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      // change the mocki link to the backend endpoint for the corresponding api
      const resp = await fetch("https://mocki.io/v1/9576a18c-7921-4bb6-b9e2-950124f06997");
      const data = await resp.json();
      setApplications(data);
    }
    fetchData();
  }, []);

  return (
    <div className='stats-layout-wrapper'>
      <div className='chart-card'>
        <h2>Application Timeline</h2>
        <StatAreaChart data={applications} />
      </div>
      <div className='chart-card'>
        <h2>Application Status Distribution</h2>
        <StatPieChart data={applications} />
      </div>
      <div className='chart-card'>
        <h2>Source and Status Distribution</h2>
        <StatBarChart data={applications}/>
      </div>
    </div>
  );
};

export default Stats;