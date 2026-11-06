import type { AllFormFields, StepFormData } from "@/validations/gameValidations";
import {useForm} from 'react-hook-form'

export interface Step{
    id:number;
    name:string;
    icon:React.ComponentType<{className?:string}>;
}

export interface FormFieldProps{
    id:keyof AllFormFields;
    label:string,
    register:ReturnType<typeof useForm<StepFormData>>["register"];
    errors:Record<string,{message?:string}>;
    type?:string;
    maxLength?:number;
    valueAsNumber?:boolean
}

export interface StepProps{
    register:ReturnType<typeof useForm<StepFormData>>["register"];
    setValue?:ReturnType<typeof useForm<StepFormData>>["setValue"];
    getValues?:ReturnType<typeof useForm<StepFormData>>["getValues"];
    errors:Record<string,{message?:string}>;
}