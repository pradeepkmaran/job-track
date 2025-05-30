import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ApplicationSavePage from './ApplicationSavePage';
import { useApplicationOptions } from '../../utils/useApplicationOptions';
import toast from 'react-hot-toast';

function ApplicationEditPage() { 
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);

    const { statusOptions, sourceOptions, loading: optionsLoading } = useApplicationOptions();

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`) 
        .then(res => {
            toast.success("Application loaded successfully!");
            setApplication(res.data);
            setLoading(false);
        })
        .catch( error => console.log(error) )
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(application)
        })
        if(resp.ok) {
            toast.success("Application updated successfully");
            setApplication({
                company_name: "",
                location: "",
                date_applied: "",
                status: "",
                role: "",
                career_site_link: "",
                pay: null,
                deadline_to_apply: "",
                notes: "",
                source: ""
            });
            navigate('/');
        } else {   
            toast.error("Failed to update application");
            console.error("Failed to update application");
        }
    }

    return (
        <div className="ApplicationEditPage">
            {(loading || optionsLoading) && <h1>Loading...</h1>}
            {!loading && !optionsLoading && application && 
                <ApplicationSavePage 
                    application={application}
                    setApplication={setApplication} 
                    handleSubmit={handleSubmit}
                    statusOptions={statusOptions}
                    sourceOptions={sourceOptions}
                />
            }
        </div>
    )
}

export default ApplicationEditPage;