import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ApplicationEditPage.module.css';

function ApplicationEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState({
        company_name: "",
        location: "",
        date_applied: "",
        status: "",
        role: "",
        career_site_link: "",
        pay: "",
        deadline_to_apply: "",
        notes: "",
        source: "",
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`)
            .then(res => {
                setApplication(res.data);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplication(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(application);
        const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(application)
        })
        if(resp.ok) {
            setApplication({
                company_name: "",
                location: "",
                date_applied: "",
                status: "",
                role: "",
                career_site_link: "",
                pay: "",
                deadline_to_apply: "",
                notes: "",
                source: "",
            });
            navigate(`/`);
        }
    }

    return (
        <div className={styles.ApplicationEditPage}>

            {loading && <h1>Loading...</h1>}
            {!loading && application &&
                <div className={styles.box}>
                    <form onSubmit={handleSubmit} >
                        <label>Company</label>
                        <input name="company_name" value={application.company_name} onChange={handleChange} />

                        <label>Location</label>
                        <input name="location" value={application.location} onChange={handleChange} />

                        <label>Date Applied</label>
                        <input name="date_applied" type="date" value={application.date_applied} onChange={handleChange} />

                        <label>Status</label>
                        <select id="status" name="status" value={application.status} onChange={handleChange}>
                            <option value="">Select status</option>
                            <option value="Not Applied">Not Applied</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewed">Interviewed</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                        <label>Role</label>
                        <input name="role" value={application.role} onChange={handleChange} />

                        <label>Career Site Link</label>
                        <input name="career_site_link" value={application.career_site_link} onChange={handleChange} />

                        <label>Pay</label>
                        <input name="pay" type="number" value={application.pay} onChange={handleChange} />

                        <label>Deadline to Apply</label>
                        <input name="deadline_to_apply" type="date" value={application.deadline_to_apply || ''} onChange={handleChange} />

                        <label>Notes</label>
                        <textarea name="notes" value={application.notes} onChange={handleChange}></textarea>

                        <label>Source</label>
                        <select
                            name="source"
                            value={application.source}
                            onChange={handleChange}
                        >
                            <option value="">Select source</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Glassdoor">Glassdoor</option>
                            <option value="Indeed">Indeed</option>
                            <option value="Referral">Referral</option>
                            <option value="Company Website">Company Website</option>
                            <option value="Other">Other</option>
                        </select>
                        {application.source === "Other" && (
                            <input
                                name="source"
                                type="text"
                                placeholder="Enter source"
                                value={application.sourceOther || ""}
                                onChange={e =>
                                    setApplication(prev => ({
                                        ...prev,
                                        source: e.target.value
                                    }))
                                }
                                style={{ marginTop: 8 }}
                            />
                        )}

                        <button type="submit">Save changes</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default ApplicationEditPage;