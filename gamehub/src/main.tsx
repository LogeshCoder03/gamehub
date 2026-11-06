import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router'
import App from './App'
import Home from './pages/Home'

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route index element={<Home/>}/>
        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
