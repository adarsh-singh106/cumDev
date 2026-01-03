// App.jsx
import React from 'react'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    // Use h-screen so it takes up exactly 100% of the viewport height
    <div className='h-screen w-full'>
      <Dashboard/>
    </div>
  )
}

export default App