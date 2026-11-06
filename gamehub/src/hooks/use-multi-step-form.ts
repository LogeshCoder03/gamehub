import type { Step } from '@/types/stepTypes'
import {baseGameSchema,developmentDetailsSchema,gameDetailsSchema,type StepFormData} from '@/validations/gameValidations'
import { Gamepad, Layers, Notebook } from 'lucide-react'
import { useState } from 'react'

const stepSchemas=[
    baseGameSchema,
    gameDetailsSchema,
    developmentDetailsSchema,
]

export const steps:Step[]=[
    {
        id:1,
        icon:Layers,
        name:"Game"
    },
    {
        id:2,
        icon:Gamepad,
        name:"Details"
    },
    {
        id:3,
        icon:Notebook,
        name:"Development"
    },
]

const useMultiStepForm=()=>{
    const [currentStep,setCurrentStep]=useState(0)
    const [formData,setFormData]=useState<Partial<StepFormData>>({})
    const isFirstStep=currentStep===0
    const isLastStep=currentStep===steps.length-1

    const getCurrentStepSchema=()=>stepSchemas[currentStep]

    const goToNextStep=()=>{
        if (!isLastStep)setCurrentStep((prev)=>prev+1)
    }
    const goToPrevStep=()=>{
        if(!isFirstStep) setCurrentStep((prev)=>prev-1)
    }

    const updateFormData=(newData:Partial<StepFormData>)=>{
        setFormData((prev)=>(
        {...prev,...newData})
        )
    }

    const reset=()=>{
        setFormData({})
    }

    return {
        currentStep,
        isFirstStep,
        isLastStep,
        formData,
        steps,
        getCurrentStepSchema,
        goToNextStep,
        goToPrevStep,
        updateFormData,
        reset
    }
}

export {useMultiStepForm}