import type { FormFieldProps, StepProps } from '@/types/stepTypes'
import React, { useEffect, useState } from 'react'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { availableOnOptions, gamePopularities, gameTypes } from '@/lib/constants'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import type { StepFormData } from '@/validations/gameValidations'
import type { AvailbleOn } from '@/types/gameTypes'

const FormField:React.FC<FormFieldProps>=({errors,id,register,maxLength,label,type="text",valueAsNumber=false})=>{
    return(
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input type={type} id={id} maxLength={maxLength} {...register(id,{valueAsNumber})}/>
            {errors[id] && <FieldError>{errors[id].message}</FieldError>}
        </Field>
    )
}

export const BaseGameStep:React.FC<StepProps>  = ({errors,register,setValue}) => {
    return (
        <FieldGroup>
            <FieldSet>
                <FieldLegend>Game</FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField id="name" label="Name" register={register} errors={errors}/>
                        <Field>
                            <FieldLabel htmlFor='game_type'>Type</FieldLabel>
                            <Select onValueChange={(data)=>{
                                setValue?.("game_type",data as Extract<StepFormData,{type:string}>["game_type"])
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Game Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {gameTypes.map((gameType,idx)=>
                                    <SelectItem value={gameType as string} key={idx}>{gameType}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.game_type && <FieldError>{errors.game_type.message}</FieldError>}
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor='description'>Description</FieldLabel>
                        <Textarea {...register('description')} id="description"/>
                        {errors.description && <FieldError>{errors.description.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='logo'>Logo</FieldLabel>
                        <Input name='logo' type='file' onChange={(e)=>{
                            const file=e.target.files?.[0]
                            if (file) {
                                setValue?.('logo',file)
                            }
                            }}/>
                        {errors.logo && <FieldError>{errors.logo.message}</FieldError>}
                    </Field>
                </FieldGroup>
            </FieldSet>
        </FieldGroup>
    )
}
export const DetailsGameStep:React.FC<StepProps>  = ({errors,register,setValue}) => {
    const [values,setValues]=useState<string[]>([])
    const handleChange=(isChecked:boolean,option:string)=>{
        if (isChecked) {
            setValues?.(prev=>[...prev,option])
        }else{
            setValues(prev=>prev.filter(v=>v!==option))
        }
    }
    useEffect(()=>{
        setValue?.('available_on',values as AvailbleOn[])
    },[values])
    return (
        <FieldGroup>
            <FieldSet>
                <FieldLegend>Game Details</FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField id="downloads" type='number' label="Downloards" register={register} valueAsNumber errors={errors}/>
                        <FormField id="ratings" type='number' label="Ratings" register={register} valueAsNumber errors={errors}/>
                    </div>
                    <Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor='popularity'>Popularity</FieldLabel>
                                <Select onValueChange={(data)=>{
                                    setValue?.("popularity",data as Extract<StepFormData,{popularity:string}>["popularity"])
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Game Popularity"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {gamePopularities.map((gamePopularity,idx)=>
                                        <SelectItem value={gamePopularity as string} key={idx}>{gamePopularity}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.popularity && <FieldError>{errors.popularity.message}</FieldError>}
                            </Field>
                            <FormField label='Category' register={register} errors={errors} id='category'/>
                        </div>

                    </Field>
                    <Field orientation="horizontal">
                        <FieldLabel htmlFor='is_conduct_tournament'>Conduct Tournament</FieldLabel>
                        <Checkbox  id='is_conduct_tournament' onCheckedChange={(value)=>setValue?.('is_conduct_tournament',value as boolean)}/>
                        {errors.is_conduct_tournament && <FieldError>{errors.is_conduct_tournament.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='available_on'>Available on</FieldLabel>
                        <FieldGroup className='flex-row py-2'>
                            {availableOnOptions.map(option=>(
                            <Field orientation="horizontal" key={option}>
                                <FieldLabel htmlFor={option} className='capitalize'>{option}</FieldLabel>
                                <Checkbox 
                                id={option}
                                key={option} 
                                value={option}
                                onCheckedChange={isChecked=>handleChange(isChecked as boolean,option)}
                                />
                            </Field>
                            ))}
                        </FieldGroup>
                        {errors.available_on&&<FieldError>{errors.available_on.message}</FieldError>}
                    </Field>               
                </FieldGroup>
            </FieldSet>
        </FieldGroup>
    )
}
export const DevelopmentDetailsGameStep:React.FC<StepProps>  = ({errors,register}) => {
    return (
        <FieldGroup>
            <FieldSet>
                <FieldLegend>Game Details</FieldLegend>
                <FieldGroup>
                    <FormField id="founder" label="Founder" register={register} errors={errors}/>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField id="made_in" label="Made In" register={register} errors={errors}/>
                        <FormField id="published_at" label="Published At" type='datetime-local' register={register} errors={errors}/>
                    </div>
                </FieldGroup>
            </FieldSet>
        </FieldGroup>
    )
}