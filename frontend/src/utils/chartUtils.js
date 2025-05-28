
export function getMonthlyCounts(data) {
  const counts = {};

  data.forEach((item) => {
    if (!item.date_applied) return;
    const date = new Date(item.date_applied);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    counts[monthKey] = (counts[monthKey] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));
}

export function getWeeklyCounts(data) {
  const counts = {};

  function getISOWeekYear(date) {
    const tmpDate = new Date(date);
    tmpDate.setHours(0, 0, 0, 0);

    tmpDate.setDate(tmpDate.getDate() + 3 - ((tmpDate.getDay() + 6) % 7));
    const week1 = new Date(tmpDate.getFullYear(), 0, 4);
    const weekNumber = 1 + Math.round(((tmpDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    const year = tmpDate.getFullYear();
    
    return { year, weekNumber };
  }

  data.forEach((item) => {
    if (!item.date_applied) return;
    const date = new Date(item.date_applied);
    const { year, weekNumber } = getISOWeekYear(date);
    const weekKey = `${year}-W${String(weekNumber).padStart(2, '0')}`;

    counts[weekKey] = (counts[weekKey] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));
}

export function getYearlyCounts(data) {
  const counts = {};

  data.forEach((item) => {
    if (!item.date_applied) return;
    const date = new Date(item.date_applied);
    const year = date.getFullYear();

    counts[year] = (counts[year] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => a[0] - b[0])
    .map(([date, count]) => ({ date, count }));
}

export function getStatusCounts(data) {
  const counts = {};

  data.forEach((item) => {
    const status = item.status || "Unknown";
    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([status, count]) => ({ name: status, value: count }));
}

export function aggregateBySourceAndStatus(applications) {
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

  const sourceStatusMap = {};

  applications.forEach((appl) => {
    let source = appl.source;
    let status = appl.status;
    console.log({source, status});
    if (!source) {
      source = "Unknown";
    }

    if (!sourceStatusMap[source]) {
      sourceStatusMap[source] = { source };
      statuses.forEach((s) => (sourceStatusMap[source][s] = 0));
    }

    if (statuses.includes(status)) {
      sourceStatusMap[source][status]++;
    }
  });

  return Object.values(sourceStatusMap);
}

