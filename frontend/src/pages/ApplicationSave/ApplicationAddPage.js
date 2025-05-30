import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ApplicationSavePage from './ApplicationSavePage';

function ApplicationAddPage() {

    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [application, setApplication] = useState({
        id: null,
        company_name:"",
        location:"",
        date_applied:"",
        status:"",
        role:"",
        career_site_link:"",
        pay: null,
        deadline_to_apply:"",
        notes:"",
        source:"",
        username: null
    });

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
                username: user.username
            });
            navigate('/')
        } else {
            console.error("Failed to add application");
        } 
    }

    return (
    <div className="ApplicationAddPage">
      <ApplicationSavePage 
        application={application}
        setApplication={setApplication} 
        handleSubmit={handleSubmit} 
      />  
    </div>
  );
}

export default ApplicationAddPage;