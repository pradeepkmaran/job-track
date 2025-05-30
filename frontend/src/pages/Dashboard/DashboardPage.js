import { useState, useEffect } from 'react';
import ApplicationList from './ApplicationList';
import axios from 'axios';
import styles from './DashboardPage.module.css';
import { useSelector, } from 'react-redux';
import Filter from './Filter';
import { useApplicationOptions } from '../../utils/useApplicationOptions';
function DashboardPage() {
    const user = useSelector((state) => state.auth.user);
    const { statusOptions } = useApplicationOptions();
    console.log(user);
    const [pageApplications, setPageApplications] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const PAGE_SIZE = 10;
    //fetching data
    useEffect( () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/application/all`, {
            withCredentials: true
        })
        .then(res => {
            setApplications(res.data)
            setPageApplications(filteredApplications.slice(pageIndex, pageIndex+10))
            setLoading(false);
        })
        .catch( error => console.log(error) )
    }, []);
    //handling buttons
    const handlePrev = () => {
        setPageIndex(prev => Math.max(0, prev - 1));
        console.log(pageCount);
        console.log(pageIndex);
    }
    const handleNext = () => {
        setPageIndex(prev => Math.min(pageCount-1, prev+1));
    }
    //handling filteration
    useEffect( () => {
        setPageApplications(filteredApplications.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE));
    }, [pageIndex, filteredApplications])
    //handling page count
    useEffect( () => {
        setPageCount(Math.ceil(filteredApplications.length/10));
    }, [filteredApplications, applications])
    //handling filter
    useEffect(() => {
        if(selectedStatuses.length === 0)
            setFilteredApplications(applications);
        else
        {
            console.log("stats", selectedStatuses);
            setFilteredApplications(
                applications.filter( application =>  selectedStatuses.includes(application.status) )
            )
        }
    }, [selectedStatuses, applications, pageApplications]);
    //handling search
    useEffect(() => {
        if(searchQuery.trim()!==''){
            setFilteredApplications(applications.filter(
                app => app.company_name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }, [searchQuery, applications]);
    return (
        <div className={styles.DashboardPage}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <input className={styles.searchInput} type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    {/* <button onClick={handleAdd}>Add Application</button> */}
                    <Filter selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} allStatuses={statusOptions}/>
                    <ApplicationList applications={pageApplications} />
                    <div className={styles.pagination}>
                        <button onClick={handlePrev} disabled={pageIndex === 0}>Previous</button>
                        <span>Page {pageIndex+1} of {pageCount}</span>
                        <button onClick={handleNext} disabled={pageIndex === pageCount-1}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
}
export default DashboardPage;