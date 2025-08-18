import './App.css'
import Default from './pages/Default'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login'
import Reports from './pages/Reports'
import { PublicRoute, PrivateRoute } from './components/RouteGuards'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Default />
      </PrivateRoute>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/reports', element: <Reports /> },
      { path: '/profile', element: <Profile /> }
    ]
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
