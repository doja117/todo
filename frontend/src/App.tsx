import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestInput from './pages/test'
import SignUp from './pages/signUp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SignUp />
    </>
  )
}

export default App
