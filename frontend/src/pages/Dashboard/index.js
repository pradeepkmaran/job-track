import React, { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('http://localhost:8080/api/v1/application/all?username=alice') 
        .then(res => {
            setApplications(res.data);
            console.log(res)
            setLoading(false);
        })
        .catch( error => console.log(error) )
    }, []);

    function handleAdd(){
        navigate("/add")
    }

    return (
        <div className='DashboardPage'>
            {loading ? <p>Loading...</p> : <>
            <button onClick={handleAdd}>Add Application</button> 
            <ApplicationList applications={applications}/>
            </> }
        </div>
    )


}

export default DashboardPage;