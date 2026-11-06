import { AvailbleOn, Gametype, Popularity } from "@/types/gameTypes"

export const API_BASE_KEY=import.meta.env.VITE_API_BASE_URI
export const API_ADMIN_URI=`${API_BASE_KEY}/admin`
export const API_HEADER=import.meta.env.VITE_HEADER

export const gameTypes=Object.values(Gametype)
export const gamePopularities=Object.values(Popularity)
export const availableOnOptions=Object.values(AvailbleOn)
