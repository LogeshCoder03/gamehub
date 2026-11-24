import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { API_BASE_KEY } from "@/lib/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Link, useNavigate } from "react-router"

const Login = () => {
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const login=async (data:{email:string,password:string}) => {
        const response=await axios.post(`${API_BASE_KEY}/auth/login`,data,{
            withCredentials:true
        })
        return response
    }
    const {mutate,isPending}=useMutation({
        mutationKey:['login'],
        mutationFn:login,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['is_auth_user']
            })
            navigate('/')
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                toast.add({type:"error",title:error.response?.data.detail})
            }else{
                toast.add({title:"Error occured",type:"error"})
            }
        },
    })
        const handleSubmit=(data:FormData)=>{
                const email=data.get('email') as string
        const password=data.get('password') as string
        mutate({email,password})
    }
    return (
        <div className="w-full flex items-center justify-center">
            <Card className="w-full h-full flex-row m-10">
                <div className="items-center justify-center flex-1 flex-col space-y-3 hidden md:flex">
                    <h1 className="text-5xl font-bold">Welcome Back</h1>
                    <div className="bg-linear-to-r from-purple-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                        <h1 className="text-5xl font-bold">GameHub</h1>
                    </div>
                </div>
                <div className="flex-1 pt-10">
                    <CardHeader >
                        <CardTitle className="bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            <h2 className="text-center text-3xl font-bold">Login</h2>
                        </CardTitle>
                    </CardHeader>
                    <form className="pt-10" action={handleSubmit}>
                        <CardContent>
                            <FieldGroup>
                                <FieldSet className="space-y-4">
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input name="email" required type="email" className="rounded-none size-12 focus-visible:ring-indigo-300"/>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input type="password" name="password" required autoComplete="new-password" className="rounded-none size-12 focus-visible:ring-indigo-300"/>
                                        <FieldDescription className="text-end text-blue-400"><Link to="/forgot-password">Forgot Password</Link></FieldDescription>
                                    </Field>
                                </FieldSet>
                                <FieldSeparator/>
                            </FieldGroup>
                        </CardContent>
                        <CardFooter className="mt-4">
                            <Button type="submit"  size="lg">{isPending?<><Spinner/>Logging....</>:"Login"}</Button>
                        </CardFooter>
                    </form>
                    <div className="text-center mt-5">
                        <p>Don't have an account <Link to="/signup" className="text-purple-400 font-bold">Signup</Link></p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Login