import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
const Create_Ticket = React.lazy(() => import('./Pages/Tickets_Folder/Create_Ticket/Create_Ticket'))
const Create_Project = React.lazy(() => import('./Pages/Projects_Folder/Create_Project/Create_Project'))

function App() {

  return (
    <div className='flex gap-3 m-auto mt-0.5 p-2 w-full'>
      <SideBar />
      <Routes>
        <Route path='/Create_Project' element={ <React.Suspense><Create_Project /> </React.Suspense> } />
        <Route path='/Create_Ticket' element={ <React.Suspense><Create_Ticket /> </React.Suspense> } />
      </Routes>
    </div>
  )
}

export default App
