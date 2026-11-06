import type { FieldProps } from "@/types/commanTypes"
import { availableOnOptions, gamePopularities, gameTypes } from "./constants"

export const userFields:FieldProps[]=[
    {
        type:"text",
        name:"username",
        label:"Username"
    },
    {
        type:"email",
        name:"email",
        label:"Email"
    },
    {
        type:"password",
        name:"password",
        label:"Password"
    },
    {
        type:"checkbox",
        name:"is_superuser",
        label:"Is Superuser"
    },
    {
        type:"checkbox",
        name:"is_admin",
        label:"Is Admin"
    },
    {
        type:"checkbox",
        name:"is_active",
        label:"Is Active"
    },
]

export const apiKeyFields:FieldProps[]=[
    {
        type:"number",
        name:"user_id",
        label:"User Id"
    },
    {
        type:"text",
        name:"name",
        label:"Name"
    },
    {
        type:"text",
        name:"api_key",
        label:"API-Key"
    },
    {
        type:"select",
        name:"role",
        label:"Role",
        options:["free","premium","super"]
    }
]

export const gameFields:FieldProps[]=[
    {
        label:"Name",
        name:"name",
        type:"text",
    },
    {
        label:"Description",
        name:"description",
        type:"text",
    },
    {
        label:"Founder",
        name:"founder",
        type:"text",
    },
    {
        label:"Made In",
        name:"made_in",
        type:"text",
    },
    {
        label:"Downloads",
        name:"downloads",
        type:"number",
    },
    {
        label:"Ratings",
        name:"ratings",
        type:"number",
    },
    {
        label:"Category",
        name:"category",
        type:"text",
    },
    {
        label:"Is Conduct Tournament",
        name:"is_conduct_tournament",
        type:"checkbox",
    },
    {
        label:"Approved",
        name:"is_approved",
        type:"checkbox",
    },
    {
        label:"Published At",
        name:"published_at",
        type:"datetime-local",
    },
    {
        label:"Game Type",
        name:"type",
        type:"select",
        options:gameTypes
    },
    {
        label:"Available On",
        name:"available_on",
        type:"other",
        options:availableOnOptions
    },
    {
        label:"Popularity",
        name:"popularity",
        type:"select",
        options:gamePopularities
    },
]

export const apiKeyUsageFields:FieldProps[]=[
    {
        type:"number",
        label:"ApiKey",
        name:"api_key_id"
    },
    {
        label:"Count",
        name:"count",
        type:"number"
    },
    {
        label:"Date",
        name:"date",
        type:"datetime-local"
    },
    {
        label:"Endpoint",
        name:"endpoint",
        type:"text"
    }
]