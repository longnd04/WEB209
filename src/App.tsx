import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (theme) {
      document.body.classList.add('dark')
    }
    else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])
  const handleClick = () => {
    setTheme(!theme)
  }
  return (
    <>
      <div >haha</div>
      <button onClick={handleClick}>Click</button>
    </>
  )
}

export default App
