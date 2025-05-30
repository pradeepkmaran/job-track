import styles from './Filter.module.css';
import { useApplicationOptions } from '../../utils/useApplicationOptions';

function Filter({ selectedStatuses, setSelectedStatuses }) {
  const { statusOptions, loading } = useApplicationOptions();

  function handleChange(e) {
    setSelectedStatuses(e.target.value === "all" ? [] : [e.target.value]);
  }

  if (loading) return <div>Loading...</div>;

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
      {statusOptions.filter(opt => opt).map(opt => (
        <div
          className={`${styles.filterStatus} ${selectedStatuses[0] === opt ? styles.filterStatusSelected : ""}`}
          key={opt}
        >
          <input
            type="radio"
            name="status"
            value={opt}
            id={opt}
            checked={selectedStatuses[0] === opt}
            onChange={handleChange}
          />
          <label htmlFor={opt}>{opt}</label>
        </div>
      ))}
    </div>
  );
}

export default Filter;

