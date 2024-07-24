import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
const Projects = React.lazy(() => import('./Pages/Projects_Folder/Projects/Projects'))
const Tickets = React.lazy(() => import('./Pages/Tickets_Folder/Tickets/Tickets'))
const Login = React.lazy(() => import('./Pages/User/Login/Login'))
const Profile = React.lazy(() => import('./Pages/User/Profile/Profile'))
const Delete = React.lazy(() => import('./Pages/User/Delete/Delete'))
const Registration = React.lazy(() => import('./Pages/User/Registration/Registration'))
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
        <Route path='/' element={<React.Suspense><Login /></React.Suspense>} />
        <Route path='/Registration' element={<React.Suspense><Registration /></React.Suspense>} />
        <Route path='/Profile' element={<React.Suspense><Profile /></React.Suspense>} />
        <Route path='/Delete' element={<React.Suspense><Delete /></React.Suspense>} />
      </Routes>
    </div>
  )
}

export default App
