import React, { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../store/authSlice';
import Filter from './Filter';

function DashboardPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const allStatuses = ["interested", "applied", "interview", "offer", "rejected"];

    console.log(user);

    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/all`, {
            withCredentials: true
        }) 
        .then(res => {
            setApplications(res.data);
            console.log(res)
            setLoading(false);
        })
        .catch( error => console.log(error) )
    }, []);


    //handling filter
    useEffect(() => {
        if(selectedStatuses.length === 0) 
            setFilteredApplications(applications);
        else
        {
            console.log("stats", selectedStatuses);
            setFilteredApplications( 
                applications.filter( application =>  selectedStatuses.includes(application.status.toLowerCase()) )
            )   
        }
    }, [selectedStatuses, applications]);

    //handling search
    useEffect(() => {
        if(searchQuery.trim()!==''){
            setFilteredApplications(applications.filter(
                app => app.company_name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }, [searchQuery, applications])

    function handleAdd(){
        navigate("/application/new")
    }

    return (
        <div className='DashboardPage'>
            {loading ? <p>Loading...</p> : <>
             <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button onClick={handleAdd}>Add Application</button> 
            <Filter selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} allStatuses={allStatuses}/>
            <ApplicationList applications={filteredApplications}/>
            </> }
        </div>
    )
}

export default DashboardPage;