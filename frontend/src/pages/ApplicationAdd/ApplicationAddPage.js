import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styles from './ApplicationAddPage.module.css';
import { useNavigate } from 'react-router-dom';

function ApplicationAddPage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    id: null,
    company_name: "",
    location: "",
    date_applied: "",
    status: "",
    role: "",
    career_site_link: "",
    pay: null,
    deadline_to_apply: "",
    notes: "",
    source: "",
    username: user.username || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/new`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(application)
    });
    if(resp.ok) {
      setApplication({
        id: null,
        company_name: "",
        location: "",
        date_applied: "",
        status: "",
        role: "",
        career_site_link: "",
        pay: null,
        deadline_to_apply: "",
        notes: "",
        source: "",
        username: user.username || ''
      });
      navigate('/');  
    }
  };

  return (
    <div className={styles.ApplicationAddPage}>
      <div className={`${styles.box} add`}>
        <form onSubmit={handleSubmit}>
          <label>Company</label>
          <input id="company_name" name="company_name" value={application.company_name} onChange={handleChange} />

          <label>Location</label>
          <input id="location" name="location" value={application.location} onChange={handleChange} />

          <label>Date Applied</label>
          <input id="date_applied" name="date_applied" type="date" value={application.date_applied} onChange={handleChange} />

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
          <input id="role" name="role" value={application.role} onChange={handleChange} />

          <label>Career Site Link</label>
          <input id="career_site_link" name="career_site_link" value={application.career_site_link} onChange={handleChange} />

          <label>Pay</label>
          <input id="pay" name="pay" type="number" value={application.pay} onChange={handleChange} />

          <label>Deadline to Apply</label>
          <input id="deadline_to_apply" name="deadline_to_apply" type="date" value={application.deadline_to_apply || ''} onChange={handleChange} />

          <label>Notes</label>
          <textarea id="notes" name="notes" value={application.notes} onChange={handleChange}></textarea>

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

          <button type='submit'>Save changes</button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationAddPage;