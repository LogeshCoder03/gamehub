import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { API_BASE_KEY } from "@/lib/constants"
import { SignUpSchema, type AuthFormFieldProps, type SignUpType } from "@/validations/authValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

const FormField:React.FC<AuthFormFieldProps>=({errors,id,register,maxLength,label,type="text"})=>{
    return(
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input type={type} id={id} maxLength={maxLength} {...register(id)}/>
            {errors[id] && <FieldError>{errors[id].message}</FieldError>}
        </Field>
    )
}

const SignUp = () => {
    const navigate=useNavigate()
    const {register,formState:{errors},handleSubmit,trigger}=useForm({
        resolver:zodResolver(SignUpSchema),
        mode:"onChange"
    })
    const createUser=async(data:SignUpType)=>{
        const response=await axios.post(`${API_BASE_KEY}/auth/signup`,{
            username:data.username,
            email:data.email,
            password:data.password
        })
        return response.data
    }
    const {mutate,isPending,data,isSuccess}=useMutation({
        mutationKey:['auth'],
        mutationFn:createUser,
        onSuccess() {
            navigate("/login")
        },
        onError:(error)=>{
            if (axios.isAxiosError(error)) {
                toast.add({title:error.response?.data.detail})
            }else{
                toast.add({title:"Error occured"})
            }
        }
    })
    const onSubmit=async(data:SignUpType)=>{
        const isValid=await trigger()
        if (!isValid) return
        mutate(data)        
    }
    
    if (isSuccess) {
        toast.add({title:data.message})
    }
    return (
        <div className="min-h-screen p-4 w-full flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="flex items-center justify-center">
                    <CardTitle className="text-center bg-linear-to-r w-fit from-violet-800 via-indigo-500 to-blue-500 text-2xl bg-clip-text text-transparent font-bold">Signup</CardTitle>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <FieldSet>
                            <FormField errors={errors} register={register} id="username" label="Username"/>
                            <FormField errors={errors} register={register} id="email" label="Email" type="email"/>
                            <FieldGroup>
                                <FormField errors={errors} register={register} id="password" type="password" label="Password"/>
                                <FormField errors={errors} register={register} id="confirmPassword" type="password" label="Confirm Password"/>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </CardContent>
                <CardFooter>
                    <CardAction>
                        <Button  onClick={handleSubmit(onSubmit)}>{isPending?"Registering":"Signup"}</Button>
                    </CardAction>
                </CardFooter>
                <FieldSeparator className="mx-2"/>
                <div className="text-center">
                    <p>Already have an account <Link to="/login" className="text-purple-400 font-bold">Login</Link></p>
                </div>
            </Card>
        </div>
    )
}

export default SignUp