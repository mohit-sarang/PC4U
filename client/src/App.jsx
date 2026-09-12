import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // Pointing to the Express server port
    axios.get('http://localhost:5000/api/test')
      .then(res => setData(res.data.message))
      .catch(err => console.error("Error connecting to backend", err));
  }, []);

  return (
    <div>
      <h1>MERN Stack is Live</h1>
      <p>Backend says: {data}</p>
    </div>
  );
}

export default App;