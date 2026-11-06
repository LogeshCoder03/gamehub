// @ts-ignore
export enum Gametype{
    Indoor='indoor',
    Outdoor='outdoor',
    Online="online"
}
// @ts-ignore
export enum AvailbleOn{
    PC='pc',
    Mobile='mobile',
    PlayStation='playstation'
}
// @ts-ignore
export enum Popularity{
    Extreme='extreme',
    High='high',
    Medium='medium',
    Low='low'
}

export interface GameDevelopmentDetails{
    founder:string,
    published_at:Date
    made_in:string
}

export interface GameDetails{
    type:Gametype
    downloads:number
    category:string
    is_conduct_tournament:boolean,
    available_on:AvailbleOn[]
    popularity:Popularity
    ratings: number
}

export interface MetadataType{
    total_games:number
    indoor_games:number
    outdoor_games:number
    online_games:number
}

export interface BaseGameType{
    id:number
    name:string
    logo:string
    is_approved?:boolean
    description:string
    development_details:GameDevelopmentDetails
    details:GameDetails
}

export interface GameDataType{
    total_pages:number|null
    total_data:number|null
    page:number
    data:BaseGameType[]
}