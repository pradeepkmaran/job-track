import React, { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import { useSelector, useDispatch } from 'react-redux'
import Filter from './Filter';


function DashboardPage() {
    const user = useSelector((state) => state.auth.user);
    const allStatuses = ["rejected", "interviewed", "applied", "offer", "not applied"];
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/page/count`, {
            withCredentials: true
        })
        .then(res => {
            setPageCount(res.data || 1);
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/page/${page}`, {
            withCredentials: true
        })
        .then(res => {
            setApplications(res.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        });
    }, [page]);

    const handlePrev = () => setPage(prev => Math.max(1, prev - 1));
    const handleNext = () => setPage(prev => Math.min(pageCount, prev + 1));

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

    useEffect(() => {
        if(searchQuery.trim()!==''){
            setFilteredApplications(applications.filter(
                app => app.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) || app.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.status?.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }
    }, [searchQuery, applications]);

    function handleAdd(){
        navigate("/application/new")
    }

    return (
        <div className={styles.DashboardPage}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <input className={styles.searchInput} type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <Filter className={styles.filterChip} selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} allStatuses={allStatuses}/>
                    <ApplicationList applications={filteredApplications} />
                    <div className={styles.pagination}>
                        <button onClick={handlePrev} disabled={page === 1}>Previous</button>
                        <span>Page {page} of {pageCount}</span>
                        <button onClick={handleNext} disabled={page === pageCount}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
}
export default DashboardPage;