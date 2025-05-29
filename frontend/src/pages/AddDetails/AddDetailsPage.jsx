import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

function ApplicationAddPage() {
  const user = useSelector((state) => state.auth.user);
    const [application, setApplication] = useState({
        id: null,
        company_name:"sdsdf",
        location:"sdfadf",
        date_applied:"",
        status:"sdf",
        role:"sdf",
        career_site_link:"sd",
        pay:1010,
        deadline_to_apply:"",
        notes:"df",
        source:"as",
        username: "alice"
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setApplication( prev => ({...prev, [name]: value}) );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(application);
        await fetch("http://localhost:8080/api/v1/application/new", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(application)
        })
    }
    return (
        <div className = "ApplicationAddPage">
            <div className = "box add">
                <form onSubmit={handleSubmit}>
                    <label>Company</label>
                    <input name="company_name" value={application.company_name} onChange={handleChange} />
                    <label>Location</label>
                    <input name="location" value={application.location} onChange={handleChange} />
                    <label>Date Applied</label>
                    <input name="date_applied" type="date" value={application.date_applied} onChange={handleChange} />
                    <label>Status</label>
                    <input name="status" value={application.status} onChange={handleChange} />
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
                    <input name = "source" type ="text" value={application.source} onChange={handleChange} />
                    <button type='submit'>Save changes</button>
                </form>
            </div>
        </div>
    )
}
export default ApplicationAddPage;