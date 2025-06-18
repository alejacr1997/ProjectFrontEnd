import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Router, RouterProvider, Route, Routes, Navigate, createBrowserRouter } from 'react-router-dom'
import UserContext from './contexts/userContext.jsx'
import App from './App.jsx'
import NavigationBar from './items/navbar.jsx'
import CreateUser from './pages/users/createUser.jsx'
import GetUsers from './pages/users/getUsers.jsx'
import UpdateUser from './pages/users/updateUser.jsx'
import CreateTask from './pages/tasks/createTask.jsx'
import UpdateTask from './pages/tasks/updateTask.jsx'
import GetTask from './pages/tasks/getTask.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/createUser',
    element: <CreateUser/>,
  },
   {
     path: '/getUsers',
    element: <GetUsers/>,
  },
   {
     path: '/createTask',
    element: <CreateTask/>,
  },
   {
     path: '/getTask',
    element: <GetTask/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <UserContext.Provider value={{users:{}}}>
      <NavigationBar/>
      <div className='container' style={{paddingTop:'50px'}}>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/createUser' element={<CreateUser/>}/>
          <Route path='/getUsers' element={<GetUsers/>}/>
          <Route path='/createTask' element={<CreateTask/>}/>
          <Route path='/getTask' element={<GetTask/>}/>
        </Routes>
      </div>
    </UserContext.Provider>
  </HashRouter>,
)
