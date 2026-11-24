import { useMultiStepForm,steps } from "@/hooks/use-multi-step-form"
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { type AllFormFields, type StepFormData } from "@/validations/gameValidations"
import { useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ProgressSteps from "@/components/game/ProgressSteps"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BaseGameStep, DetailsGameStep, DevelopmentDetailsGameStep } from "@/components/game/GameSteps"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { API_BASE_KEY } from "@/lib/constants"
import { useNavigate } from "react-router"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

const CreateGame = () => {
    const navigate=useNavigate()
    const {getCurrentStepSchema,
        updateFormData,
        goToNextStep,
        formData,
        currentStep,
        isLastStep,
        isFirstStep,
        goToPrevStep}=useMultiStepForm()

    const {reset,trigger,handleSubmit,formState:{errors},register,setValue}=useForm<StepFormData>({
        resolver:zodResolver(getCurrentStepSchema()),
        mode:"onChange",
        defaultValues:formData
    })

    useEffect(()=>{reset(formData)},[formData,currentStep])

    const createGame=async(data:AllFormFields)=>{
        data.available_on=JSON.stringify(data.available_on)
        const response=await axios.post(`${API_BASE_KEY}/games`,data,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data
    }

    const {mutate,isPending}=useMutation({
        mutationKey:['create-game'],
        mutationFn:createGame,
        onSuccess:()=>{
            navigate('/')
        },
        onError:(error)=>{
            if (axios.isAxiosError(error)) {
                toast.add({title:error.response?.data.detail})
            }else{
                toast.add({title:"Error occured"})
            }
        }
    })

    const onNext=async(data:StepFormData)=>{
        const isValid=await trigger()
        if(!isValid)return
        const updatedData={...formData,...data}
        updateFormData(updatedData)
        if (isLastStep) {
            updatedData.published_at=new Date(updatedData.published_at).toISOString()
            mutate(updatedData)
        }else{
            goToNextStep()
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <ProgressSteps currentStep={currentStep} steps={steps}/>
                </CardHeader>
                <CardContent>
                    {currentStep===0&&<BaseGameStep errors={errors} register={register} setValue={setValue}/>}
                    {currentStep===1&&<DetailsGameStep errors={errors} register={register} setValue={setValue}/>}
                    {currentStep===2&&<DevelopmentDetailsGameStep errors={errors} register={register} setValue={setValue}/>}
                    <div className="flex justify-between pt-4">
                        <Button variant={'outline'} disabled={isFirstStep} onClick={goToPrevStep}>
                            <ChevronLeft className='w-4 h-4 mr-1'/>
                            Previous
                        </Button>
                        <Button type='button' onClick={handleSubmit(onNext)}>
                            {isPending&&<Spinner/>}
                            {isLastStep ? 'Submit' : "Next"}
                            {!isLastStep && <ChevronRight className='w-4 h-4 mr-1'/>}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateGame