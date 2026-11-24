import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { API_BASE_KEY } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

const ForgotPassword = () => {
    const [email,setEmail]=useState<string|undefined>()
    const changePassword=async (data:string) => {        
        const response=await axios.post(`${API_BASE_KEY}/auth/forgot-password`,{
            email:data
        })
        return response
    }
    const {isPending,mutate}=useMutation({
        mutationKey:["forgot-password"],
        mutationFn:changePassword
    })
    return (
        <div className="flex items-center justify-center h-96">
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-center'>Forgot Password</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <Label htmlFor='email'>Email</Label>
                    <Input name='email' value={email} type='email' onChange={(e)=>setEmail(e.target.value)}/>
                </CardContent>
                <CardFooter>
                    <CardAction>
                        <Button onClick={()=>mutate(email!)}>{isPending?<><Spinner/>Sending..</>:"Reset"}</Button>
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ForgotPassword