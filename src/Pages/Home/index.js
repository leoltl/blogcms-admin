import React from 'react';
import useFetchData from '../../Hooks/useFetchData';
import API from '../../RemoteAPI/API';

export default function Index() {
  const { data, loading } = useFetchData(API.listPosts);

  return (
    <>
      <section>
        { loading 
          ? 'loading...'
          :  JSON.stringify(data) 
        }
      </section>
    </>
  )  
}
