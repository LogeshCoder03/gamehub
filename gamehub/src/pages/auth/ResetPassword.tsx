import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { API_BASE_KEY } from '@/lib/constants'
import { passwordSchema } from '@/validations/authValidation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router'

const ResetPassword = () => {
    const [password,setPassword]=useState<string>("")
    const [error,setError]=useState<{password?:string,confirmPassword?:string}|undefined>(undefined)
    const [searchParams]=useSearchParams()
    const token=searchParams.get("token")
    
    const changePassword=async (data:string) => {
        const response=await axios.post(`${API_BASE_KEY}/auth/reset-password?token=${token}`,data)
        return response
    }
    const {mutate,isPending}=useMutation({
        mutationKey:["reset-password"],
        mutationFn:changePassword
    })
    
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        const {value,name}=event.target
        if (name=="password") {
            setPassword(value)
        }
        const result=passwordSchema.safeParse({
            [name]:value
        })
        if (!result.success) {
            const fieldErrors:Record<string,string>={}
            result.error.issues.forEach(issue=>{
                const field=issue.path[0] as "password"|"confirmPassword"
                if (!fieldErrors[field]) {
                    fieldErrors[field]=issue.message
                }
            })
            setError(fieldErrors)
        }else{
            setError(undefined)
        }
    }
    
    return (
        <div className="flex items-center justify-center h-96">
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-center'>Reset Password</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className="space-y-4">
                        <Label htmlFor='password'>Password</Label>
                        <Input name='password' onChange={handleChange}/>
                        {error&&<FieldError>{error.password}</FieldError>}
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <Input name='confirmPassword' onChange={handleChange}/>
                        {error&&<FieldError>{error.confirmPassword}</FieldError>}
                    </div>
                </CardContent>
                <CardFooter>
                    <CardAction>
                        <Button onClick={()=>mutate(password)}>{isPending?<><Spinner/>Changing</>:"Change"}</Button>
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ResetPassword