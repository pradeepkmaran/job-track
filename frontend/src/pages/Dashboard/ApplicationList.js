import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';

function ApplicationList({ applications }) {
    const navigate = useNavigate();

    if (!applications.length) {
        return <p>No applications found.</p>;
    }

    return (
        <div className={styles.applicationList}>
            {applications.map(app => (
                <div
                    className={styles.applicationCard}
                    key={app.id}
                    onClick={() => navigate(`/application/${app.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className={styles.cardHeader}>
                        <h3>{app.company_name}</h3>
                        <span className={`${styles.status} ${styles[app.status.replace(/\s/g, '').toLowerCase()]}`}>{app.status}</span>
                    </div>
                    <div className={styles.cardDetails}>
                        <div><strong>Role:</strong> {app.role}</div>
                        <div><strong>Date:</strong> {app.date_applied}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ApplicationList;
