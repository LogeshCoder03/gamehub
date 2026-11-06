import { AvailbleOn, Gametype, Popularity } from '@/types/gameTypes'
import {z} from 'zod'

export const baseGameSchema=z.object({
    name:z.string().nonempty(),
    description:z.string().min(12),
    game_type:z.enum(Gametype),
    logo:z.instanceof(File),
})

export const gameDetailsSchema=z.object({
    available_on:z.array(z.enum(AvailbleOn)).optional(),
    popularity:z.enum(Popularity),
    ratings:z.number().max(10),
    category:z.string().nonempty(),
    is_conduct_tournament:z.boolean().optional(),
    downloads:z.number()
})

export const developmentDetailsSchema=z.object({
    founder:z.string().nonempty(),
    published_at:z.coerce.date(),
    made_in:z.string().nonempty()
})

export type BaseGameInfoType=z.infer<typeof baseGameSchema>
export type GameDetailsType=z.infer<typeof gameDetailsSchema>
export type DevelopmentDetailsType=z.infer<typeof developmentDetailsSchema>

export type StepFormData=BaseGameInfoType | GameDetailsType | DevelopmentDetailsType
export type AllFormFields=BaseGameInfoType & GameDetailsType & DevelopmentDetailsType
