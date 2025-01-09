import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import Hero from './pages/Hero'
import Profile from './pages/Profile'
import Fav from './pages/Fav'
import CreateRecipe from './pages/CreateRecipe'
import ViewRecipe from './pages/ViewRecipe'
import EditRecipe from './pages/EditRecipe'
import Browse from './pages/Browse'

const App = () => {
  const appRouter = createBrowserRouter([
    {
path: "/",
element: <MainLayout />,
children:[
  {
    path:"/",
    element: <Hero />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/profile",
    element: <Profile />
  },
  {
    path:"/favorite",
    element: <Fav />
  },
  {
    path:"/create",
    element: <CreateRecipe />
  },
  {
    path:"/view/:id",
    element: <ViewRecipe />
  },
  {
    path:"/edit/:id",
    element: <EditRecipe />
  },
  {
    path : "/browse",
    element: <Browse/>
  },
  {
    path:"/favorite/:id",
    element: <Fav />
  },
  {
    path:"/favorite/view/:id",
    element: <ViewRecipe />
  },
]
  }])
  return (
  <main>
    <RouterProvider router={appRouter} />
  </main>
  )
}

export default App