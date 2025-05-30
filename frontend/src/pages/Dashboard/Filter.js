import styles from './Filter.module.css';

function Filter({ selectedStatuses, setSelectedStatuses, allStatuses }) {
  function handleChange(e) {
    setSelectedStatuses(e.target.value === "all" ? [] : [e.target.value]);
  }

  return (
    <div className={styles.filter}>
      <div
        className={`${styles.filterStatus} ${selectedStatuses.length === 0 ? styles.filterStatusSelected : ""}`}
      >
        <input
          type="radio"
          name="status"
          value="all"
          id="all"
          checked={selectedStatuses.length === 0}
          onChange={handleChange}
        />
        <label htmlFor="all">All</label>
      </div>
      {allStatuses.map(status => (
        <div
          className={`${styles.filterStatus} ${selectedStatuses[0] === status ? styles.filterStatusSelected : ""}`}
          key={status}
        >
          <input
            type="radio"
            name="status"
            value={status}
            id={status}
            checked={selectedStatuses[0] === status}
            onChange={handleChange}
          />
          <label htmlFor={status}>{status}</label>
        </div>
      ))}
    </div>
  );
}

export default Filter;

