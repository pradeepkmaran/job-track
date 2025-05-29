import React, { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../store/authSlice';
import styles from './DashboardPage.module.css';

function DashboardPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/all`, {
            withCredentials: true
        }) 
        .then(res => {
            setApplications(res.data);
            setLoading(false);
        })
        .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.DashboardPage}>
            {loading ? <p>Loading...</p> : <ApplicationList applications={applications}/>}
        </div>
    )
}

export default DashboardPage;