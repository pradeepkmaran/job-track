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

    // day 0 is Sunday, 1 is Monday, ...6 is Saturday
    // Adjust to get the first week of the year
    // ISO week starts on Monday
    // The first week of the year is the week with the first Thursday
    // or the week containing January 4th

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

export function aggregateBySourceAndStatus(data, statuses) {
  const result = {};
  data.forEach(item => {
    const source = item.source || 'Unknown';
    const status = item.status || 'Unknown';
    if (!result[source]) {
      result[source] = {};
      statuses.forEach(s => { result[source][s] = 0; });
    }
    if (statuses.includes(status)) {
      result[source][status] += 1;
    }
  });
  // Convert to array for recharts
  return Object.entries(result).map(([source, counts]) => ({
    source,
    ...counts,
  }));
}

export function getSortedOffers(data) {
  if (!Array.isArray(data)) return [];

  const filteredOffers = data.filter(
    (offer) => offer.pay !== undefined && offer.company_name && offer.status==='Offer'
  );

  filteredOffers.sort((a, b) => b.pay - a.pay);

  filteredOffers.length=5;
  return filteredOffers;
}

export function getApplicationsByDates(data) {
  if (!Array.isArray(data)) return [];

  const filteredData = data.filter(
    (offer) => offer.date_applied !== undefined
  );

  filteredData.sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));

  filteredData.length=5;
  return filteredData;
}