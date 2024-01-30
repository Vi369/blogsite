import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux' 
import store from './store/store.js'
import {
   AddPost,
    AllPost,
    EditPost,
    Home,
    Login,
    Post,
    Signup
} from './pages/index.js'
import {
  AuthLayout
} from './components/index.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout>
            <Login authentication = {false} />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout>
            <Signup authentication = {false} />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          // if only authentication write so its also consider as a true
          <AuthLayout authentication ={true}> 
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication ={true}> 
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication ={true}>
                <EditPost />
          </AuthLayout>
        )

      },
      {
        path: "/post/:slug",
        element: <Post />
      }
      
    ]
  }
])

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
