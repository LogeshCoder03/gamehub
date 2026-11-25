import { useParams } from "react-router"
import AdminPresenter from "@/components/admin/AdminPresenter"
import { useAdmin } from "@/hooks/use-admin"
import { AdminContext } from "./useAdminContext"


const AdminPage = () => {
    const pages=["games","api-keys","users","key-usages"]
    const {page}=useParams()
    const adminContext=useAdmin({page})
    if (!pages.includes(page!)) return
    
    return (
        <AdminContext.Provider value={adminContext} >
            <AdminPresenter 
            filter="id"
            page={page!}
            />
        </AdminContext.Provider>
    )
}

export default AdminPage