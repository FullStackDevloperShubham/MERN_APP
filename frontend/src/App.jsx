import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
// import HomeScreen from './screens/HomeScreen'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>

      <Header />
      <ToastContainer />
      <container className="my-2">
        <Outlet />

      </container>
    </>
  )
}

export default App