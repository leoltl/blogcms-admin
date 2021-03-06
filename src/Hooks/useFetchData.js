import { useState, useEffect } from 'react';

function useFetchData(apiMethod, ...params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    console.log('refresh');
    (async function(){
      setLoading(true);
      try {
        const res = await apiMethod.call(null, ...params);
        setData(res.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }())

  }, [apiMethod, ...params])

  return {
    data,
    loading,
    error,
  }

}

export default useFetchData;
