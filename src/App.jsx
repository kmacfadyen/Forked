import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from "./assets/96D7C1F6-753D-4554-9E26-7B3AA1817E6F.jpeg";



function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching from backend:', error));
  }, []);

  return (
    <>
    <div>
        <img src={logo} alt="Forked Logo" />
      </div>
    <div className="App">
      <h1>Frontend Connected!</h1>
      <p>Message from backend: {message}</p>
    </div>
      
      
    </>
  )
}

export default App
