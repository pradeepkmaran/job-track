import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ApplicationEditPage() { 
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);

    useEffect( () => {
    axios.get('http://localhost:8080/api/v1/application/'+id) 
    .then(res => {
        setApplication(res.data);
        setLoading(false);
    })
    .catch( error => console.log(error) )
}, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setApplication( prev => ({...prev, [name]: value}) );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(application);
        await fetch("http://localhost:8080/api/v1/application/"+id, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(application)
        })
    }

    return (
        <div className = "ApplicationEditPage">

            {loading && <h1>Loading...</h1>}
            {!loading && application &&
            <div className = "box edit">
                <form onSubmit = {handleSubmit} >
                    <label>Company</label>
                    <input name="company_name" value={application.company_name} onChange={handleChange} />

                    <label>Location</label>
                    <input name="location" value={application.location} onChange={handleChange} />

                    <label>Date Applied</label>
                    <input name="date_applied" type="date" value={application.dateApplied} onChange={handleChange} />

                    <label>Status</label>
                    <input name="status" value={application.status} onChange={handleChange} />

                    <label>Role</label>
                    <input name="role" value={application.role} onChange={handleChange} />

                    <label>Career Site Link</label>
                    <input name="careerSiteLink" value={application.career_site_link} onChange={handleChange} />

                    <label>Pay</label>
                    <input name="pay" type="number" value={application.pay} onChange={handleChange} />

                    <label>Deadline to Apply</label>
                    <input name="deadline_to_apply" type="date" value={application.deadlineToApply || ''} onChange={handleChange} />

                    <label>Notes</label>
                    <textarea name="notes" value={application.notes} onChange={handleChange}></textarea>

                    <label>Source</label>
                    <input name = "source" type ="text" value={application.source} onChange={handleChange} />

                    <button type = "submit">Save changes</button>
                </form>
            </div>
            }
        </div>
    )
}

export default ApplicationEditPage;