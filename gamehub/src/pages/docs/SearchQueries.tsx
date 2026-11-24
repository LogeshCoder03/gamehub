import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface KeyWordProps{
    id:number
    keyword:string,
    type:string
    default?:string|number
    description:string
}

const rows:KeyWordProps[]=[
    {
        id:1,
        keyword:"page",
        type:"number",
        default:1,
        description:"Page number for paginated results"
    },
    {
        id:2,
        keyword:"search",
        type:"string",
        description:"Search games by name (partial match)"
    },
    {
        id:3,
        keyword:"popularity",
        type:"string",
        description:"Filter by popularity (low, medium, high)"
    },
    {
        id:4,
        keyword:"published",
        type:"number",
        description:"Filter games by published year"
    },
]

const SearchQueries = () => {
    return (
        <div className="space-y-8">
            <div className="">
                <h1 className="font-semibold text-2xl pb-4">Keywords / Query Parameters</h1>
                <p className="text-sm font-normal leading-relaxed tracking-wide text-muted-foreground">"These query parameters allow you to filter, search, and paginate game data efficiently.</p>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="overflow-hidden rounded-md font-semibold border w-full max-w-3xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Keyword / Param</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Default</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map(row=>(
                                <TableRow key={row.id}>
                                    <TableCell>{row.keyword}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.default??"-"}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div> 
            </div>
        </div>
    )
}

export default SearchQueries