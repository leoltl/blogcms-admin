import React from 'react';
import useFetchData from './Hooks/useFetchData';
import API from './RemoteAPI/API';

function App() {
  const { data, loading, error } = useFetchData(API.listPosts);
  
  async function handleSignin() {
    const { data: { token } } = await API.signin('admin', 'password');
    console.log(token);
  }
  
  return (
    <main className="app">
      { JSON.stringify(data) }
      { JSON.stringify(loading) }
      { JSON.stringify(error) }
      <button onClick={handleSignin}>Signin</button>
    </main> 
  );
}

export default App;
