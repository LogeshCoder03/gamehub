import type { useForm } from 'react-hook-form';
import {z} from 'zod'

export const SignUpSchema=z.object({
    username:z.string().min(3,'Username must contains atleast 3 chars'),
    email:z.email(),
    password:z.string()
    .min(8,'Password must be greater than 8 characters')
    .max(18,'Password must be less than 18 chars')
    .regex(/[A-Z]/,'Password must includes atleast one uppercase letter')
    .regex(/[a-z]/,'Password must includes atleast one lowercase letter')
    .regex(/[0-9]/,'Password must includes atleast one number')
    .regex(/[^A-Za-z0-9]/,'Password must includes atleast one spcial character'),
    confirmPassword:z.string(),
}).refine(
    (data)=>data.password===data.confirmPassword,
    {error:"Password do not match",path:["confirmPassword"]},
)


export type SignUpType=z.infer<typeof SignUpSchema>

export interface AuthFormFieldProps{
    id:keyof SignUpType;
    label:string,
    register:ReturnType<typeof useForm<SignUpType>>["register"];
    errors:Record<string,{message?:string}>;
    type?:string;
    maxLength?:number;
}

export const passwordSchema=z.object({
    password:z.string()
    .min(8,'Password must be greater than 8 characters')
    .max(18,'Password must be less than 18 chars')
    .regex(/[A-Z]/,'Password must includes atleast one uppercase letter')
    .regex(/[a-z]/,'Password must includes atleast one lowercase letter')
    .regex(/[0-9]/,'Password must includes atleast one number')
    .regex(/[^A-Za-z0-9]/,'Password must includes atleast one spcial character'),
    confirmPassword:z.string(),
}).refine(
    (data)=>data.password===data.confirmPassword,
    {error:"Password do not match",path:["confirmPassword"]},
)