import './App.css';
import React from 'react';
import Login from './Pages/User/Login/Login';
import { Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import { useGetUserID } from './Components/Hooks/useGetUserID';
import ErrorBoundary from './Pages/Error_Boundary/Error_Boundary';
import { AdministrationID } from './Components/Hooks/Administrator';
const Delete = React.lazy(() => import('./Pages/User/Delete/Delete'))
const Profile = React.lazy(() => import('./Pages/User/Profile/Profile'))
const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard'))
const Tickets = React.lazy(() => import('./Pages/Tickets_Folder/Tickets/Tickets'))
const EditProfile = React.lazy(() => import('./Pages/User/Edit_Profile/Edit_Profile'))
const Projects = React.lazy(() => import('./Pages/Projects_Folder/Projects/Projects'))
const Registration = React.lazy(() => import('./Pages/User/Registration/Registration'))
const Administration = React.lazy(() => import('./Pages/Administration/Administration'))
const My_Tickets = React.lazy(() => import('./Pages/Tickets_Folder/My_Tickets/My_Tickets'))
const Edit_Ticket = React.lazy(() => import('./Pages/Tickets_Folder/Edit_Ticket/Edit_Ticket'))
const My_Projects = React.lazy(() => import('./Pages/Projects_Folder/My_Projects/My_Projects'))
const Edit_Project = React.lazy(() => import('./Pages/Projects_Folder/Edit_Project/Edit_Project'))
const Create_Ticket = React.lazy(() => import('./Pages/Tickets_Folder/Create_Ticket/Create_Ticket'))
const Create_Project = React.lazy(() => import('./Pages/Projects_Folder/Create_Project/Create_Project'))
const TicketArchives = React.lazy(() => import('./Pages/Archives_Folder/Ticket_Archives/Ticket_Archives'))
const TicketDetailsPage = React.lazy(() => import('./Pages/Tickets_Folder/Ticket_Details/Ticket_Details'))
const ProjectArchives = React.lazy(() => import('./Pages/Archives_Folder/Project_Archives/Project_Archives'))
const ProjectDetailsPage = React.lazy(() => import('./Pages/Projects_Folder/Project_Details/Project_Details'))
const TicketInformation = React.lazy(() => import('./Pages/Archives_Folder/Ticket_Information/Ticket_Information'))
const ProjectInformation = React.lazy(() => import('./Pages/Archives_Folder/Project_Information/Project_Information'))

function App() {

  const Administrator = AdministrationID()
  const ID = useGetUserID()

  return (
    <div className='flex flex-col gap-3 m-auto xl:flex-row xl:mt-0.5 xl:p-2 w-full'>
      <SideBar />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Ticket/:id' element={<React.Suspense><Edit_Ticket /></React.Suspense>}/>
        <Route path='/DeleteProfile/:id' element={<React.Suspense><Delete /></React.Suspense>}/>
        <Route path='/Project/:id' element={<React.Suspense><Edit_Project /></React.Suspense>}/>
        <Route path='/Registration' element={<React.Suspense><Registration /></React.Suspense>}/>
        <Route path='/EditProfile/:id' element={<React.Suspense><EditProfile /></React.Suspense>}/>
        <Route path='/TicketDetails/:id' element={<React.Suspense><TicketDetailsPage /></React.Suspense>}/>
        <Route path='/TicketArchives/:id' element={<React.Suspense><TicketInformation /></React.Suspense>}/>
        <Route path='/ProjectDetails/:id' element={<React.Suspense><ProjectDetailsPage /></React.Suspense>}/>
        <Route path='/ProjectArchives/:id' element={<React.Suspense><ProjectInformation /></React.Suspense>}/>
        <Route path='/Administration' element={Administrator ? <React.Suspense><Administration /> </React.Suspense> : ''}/>
        <Route path='/:id' element={Administrator || ID ? <React.Suspense><Profile /></React.Suspense> : <ErrorBoundary /> }/>
        <Route path='/Tickets' element={Administrator || ID ? <React.Suspense><Tickets /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/Projects' element={Administrator || ID ? <React.Suspense><Projects /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/Dashboard' element={Administrator || ID ? <React.Suspense><Dashboard /></React.Suspense> : <ErrorBoundary /> }/>
        <Route path='/My_Tickets' element={Administrator || ID ? <React.Suspense><My_Tickets /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/My_Projects' element={Administrator || ID ? <React.Suspense><My_Projects /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/Create_Ticket' element={Administrator || ID ? <React.Suspense><Create_Ticket /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/TicketArchives' element={Administrator || ID ? <React.Suspense><TicketArchives /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/Create_Project' element={Administrator || ID ? <React.Suspense><Create_Project /></React.Suspense> : <ErrorBoundary />}/>
        <Route path='/ProjectArchives' element={Administrator || ID ? <React.Suspense><ProjectArchives /></React.Suspense> : <ErrorBoundary />}/>
      </Routes>
    </div>
  )
}

export default App
