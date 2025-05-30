import React from 'react';
import { useSelector } from "react-redux";
import styles from './ApplicationSavePage.module.css';
import { useApplicationOptions } from '../../utils/useApplicationOptions';

export default function ApplicationSavePage({ application, setApplication, handleSubmit }) {
    const user = useSelector((state) => state.auth.user);
    const { statusOptions, sourceOptions, loading } = useApplicationOptions();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplication(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.ApplicationSavePage}>
            <div className={`${styles.box} ${styles.add}`}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="company_name">Company</label>
                    <input className={styles.input} id="company_name" name="company_name" value={application.company_name} onChange={handleChange} />

                    <label className={styles.label} htmlFor="location">Location</label>
                    <input className={styles.input} id="location" name="location" value={application.location} onChange={handleChange} />

                    <label className={styles.label} htmlFor="date_applied">Date Applied</label>
                    <input className={styles.input} id="date_applied" name="date_applied" type="date" value={application.date_applied} onChange={handleChange} />

                    <label className={styles.label} htmlFor="status">Status</label>
                    <select
                        className={styles.input}
                        id="status"
                        name="status"
                        value={application.status}
                        onChange={handleChange}
                    >
                        <option value="">Select status</option>
                        {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <label className={styles.label} htmlFor="role">Role</label>
                    <input className={styles.input} id="role" name="role" value={application.role} onChange={handleChange} />

                    <label className={styles.label} htmlFor="career_site_link">Career Site Link</label>
                    <input className={styles.input} id="career_site_link" name="career_site_link" value={application.career_site_link} onChange={handleChange} />

                    <label className={styles.label} htmlFor="pay">Pay</label>
                    <input className={styles.input} id="pay" name="pay" type="number" value={application.pay} onChange={handleChange} />

                    <label className={styles.label} htmlFor="deadline_to_apply">Deadline to Apply</label>
                    <input className={styles.input} id="deadline_to_apply" name="deadline_to_apply" type="date" value={application.deadline_to_apply || ''} onChange={handleChange} />

                    <label className={styles.label} htmlFor="notes">Notes</label>
                    <textarea className={styles.textarea} id="notes" name="notes" value={application.notes} onChange={handleChange}></textarea>

                    <label className={styles.label} htmlFor="source">Source</label>
                    <select
                        className={styles.input}
                        id="source"
                        name="source"
                        value={application.source}
                        onChange={handleChange}
                    >
                        <option value="">Select source</option>
                        {sourceOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <button className={styles.submitButton} type="submit">Save changes</button>
                </form>
            </div>
        </div>
    );
}

