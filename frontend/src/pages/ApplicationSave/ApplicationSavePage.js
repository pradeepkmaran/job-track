import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function ApplicationSavePage( {application, setApplication, handleSubmit} ) {
    const user = useSelector((state) => state.auth.user);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setApplication( prev => ({...prev, [name]: value}) );
    }

    return (
    <div className="ApplicationSavePage">
      <div className="box add">
        <form onSubmit={handleSubmit}>
          <label htmlFor="company_name">Company</label>
          <input id="company_name" name="company_name" value={application.company_name} onChange={handleChange} />

          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={application.location} onChange={handleChange} />

          <label htmlFor="date_applied">Date Applied</label>
          <input id="date_applied" name="date_applied" type="date" value={application.date_applied} onChange={handleChange} />

          <label htmlFor="status">Status</label>
          <input id="status" name="status" value={application.status} onChange={handleChange} />

          <label htmlFor="role">Role</label>
          <input id="role" name="role" value={application.role} onChange={handleChange} />

          <label htmlFor="career_site_link">Career Site Link</label>
          <input id="career_site_link" name="career_site_link" value={application.career_site_link} onChange={handleChange} />

          <label htmlFor="pay">Pay</label>
          <input id="pay" name="pay" type="number" value={application.pay} onChange={handleChange} />

          <label htmlFor="deadline_to_apply">Deadline to Apply</label>
          <input id="deadline_to_apply" name="deadline_to_apply" type="date" value={application.deadline_to_apply || ''} onChange={handleChange} />

          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" value={application.notes} onChange={handleChange}></textarea>

          <label htmlFor="source">Source</label>
          <input id="source" name="source" type="text" value={application.source} onChange={handleChange} />

          <button type="submit">Save changes</button>
        </form>
      </div>
    </div>
  );
}

