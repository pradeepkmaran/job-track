import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplicationSavePage from './ApplicationSavePage';

function ApplicationEditPage() { 
    const {id} = useParams();
    const [loading, setLoading] = useState(true);

    const [application, setApplication] = useState(null);

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`) 
        .then(res => {
            setApplication(res.data);
            setLoading(false);
        })
        .catch( error => console.log(error) )
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(application);
        await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/${id}`, {
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
            <ApplicationSavePage 
            application={application}
            setApplication={setApplication} 
            handleSubmit={handleSubmit} 
            />}
     
        </div>
    )
}

export default ApplicationEditPage;