import React, { useState, useEffect } from 'react';

function useFetchData(apiMethod, ...params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  }, [apiMethod])

  return {
    data,
    loading,
    error,
  }

}

export default useFetchData;
