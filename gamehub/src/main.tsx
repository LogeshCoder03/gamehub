import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router'
import App from './App'
import Home from './pages/Home'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { TooltipProvider } from './components/ui/tooltip'
import Games from './pages/games/Games'
import GameDetails from './pages/games/GameDetails'
import AuthProtectRoute from './pages/auth/AuthProtectRoute'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import ResetPassword from './pages/auth/ResetPassword'
import ForgotPassword from './pages/auth/ForgotPassword'
import AdminRouter from './pages/admin/AdminRouter'
import AdminPage from './pages/admin/AdminPage'
import CreateGame from './pages/admin/CreateGame'
import DocsLayout from './pages/docs/DocsLayout'
import Docs from './pages/docs/Docs'
import SearchQueries from './pages/docs/SearchQueries'
import Dashboard from './pages/private/Dashboard'
import PrivateRoute from './pages/private/PrivateRoute'
import ApiKeys from './pages/private/ApiKeys'
import Logout from './pages/private/Logout'

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='' element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path='/games' element={<Games/>}/>
            <Route path='/games/:id' element={<GameDetails/>}/>
            <Route element={<AuthProtectRoute/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
            </Route>
            <Route path='/admin/:page' element={<AdminRouter/>}>
                <Route element={<AdminPage/>} index/>
            </Route>
            <Route path='/admin/games/create' element={<AdminRouter/>}>
                <Route index element={<CreateGame/>}/>
            </Route>
            <Route path='/docs/:page' element={<DocsLayout/>}>
                <Route element={<Docs/>} index/>
            </Route>
            <Route path='docs/search-queries' element={<DocsLayout/>}>
                <Route element={<SearchQueries/>} index/>
            </Route>
            <Route path='/' element={<PrivateRoute/>}>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='api-keys' element={<ApiKeys/>}/>
                <Route path='logout' element={<Logout/>}/>
            </Route>
            {/* <Route path='*' element={<Error404/>}/> */}
        </Route>
    )
)

const client=new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <TooltipProvider>
            <RouterProvider router={router}/>
        </TooltipProvider>    
    </QueryClientProvider>
)
