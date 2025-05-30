import React, { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';
import axios from 'axios';
import styles from './DashboardPage.module.css';

function DashboardPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
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

    return (
        <div className={styles.DashboardPage}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ApplicationList applications={applications} />
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