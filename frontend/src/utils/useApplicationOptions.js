import { useEffect, useState } from 'react';
import axios from 'axios';

export function useApplicationOptions() {
  const [statusOptions, setStatusOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [statusRes, sourceRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/details/application/statuses`),
          axios.get(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/details/application/sources`)
        ]);
        setStatusOptions(statusRes.data || []);
        setSourceOptions(sourceRes.data || []);
      } catch {
        setStatusOptions([]);
        setSourceOptions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOptions();
  }, []);

  return { statusOptions, sourceOptions, loading };
}