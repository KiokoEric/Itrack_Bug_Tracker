import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import Login from './Pages/User/Login/Login';
const Projects = React.lazy(() => import('./Pages/Projects_Folder/Projects/Projects'))
const Tickets = React.lazy(() => import('./Pages/Tickets_Folder/Tickets/Tickets'))
const Administration = React.lazy(() => import('./Pages/Administration/Administration'))
const ProjectArchives = React.lazy(() => import('./Pages/Archives_Folder/ProjectArchives/ProjectArchives'))
const TicketArchives = React.lazy(() => import('./Pages/Archives_Folder/TicketArchives/TicketArchives'))
const My_Projects = React.lazy(() => import('./Pages/Projects_Folder/My_Projects/My_Projects'))
const My_Tickets = React.lazy(() => import('./Pages/Tickets_Folder/My_Tickets/My_Tickets'))
const Create_Ticket = React.lazy(() => import('./Pages/Tickets_Folder/Create_Ticket/Create_Ticket'))
const Create_Project = React.lazy(() => import('./Pages/Projects_Folder/Create_Project/Create_Project'))

function App() {

  return (
    <div className='flex gap-3 m-auto mt-0.5 p-2 w-full'>
      <SideBar />
      <Routes>
        <Route path='/Create_Project' element={ <React.Suspense><Create_Project /> </React.Suspense> } />
        <Route path='/Create_Ticket' element={ <React.Suspense><Create_Ticket /> </React.Suspense> } />
        <Route path='/Projects' element={<React.Suspense><Projects /> </React.Suspense>} />
        <Route path='/My_Projects' element={<React.Suspense><My_Projects /> </React.Suspense>} />
        <Route path='/Tickets' element={<React.Suspense><Tickets /> </React.Suspense>} />
        <Route path='/My_Tickets' element={<React.Suspense><My_Tickets /> </React.Suspense>} />
        <Route path='/Administration' element={<React.Suspense><Administration /> </React.Suspense>} />
        <Route path='/ProjectArchives' element={<React.Suspense><ProjectArchives /></React.Suspense>} />
        <Route path='/TicketArchives' element={<React.Suspense><TicketArchives /></React.Suspense>} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
