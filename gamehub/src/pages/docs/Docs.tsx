import type { DocProps } from "@/types/commanTypes";
import { useParams } from "react-router";
import { API_BASE_KEY } from "@/lib/constants";
import { useHighlightedCode } from "@/hooks/use-highlighted-code";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import { DownloadIcon, FileCodeIcon, WrapTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const docs = {
  overview: [
    {
      id: 1,
      title: "Overview",
      description: `
        This API allows you to retrieve game data including the game logo, 
        name, description, category, type (indoor, outdoor, or online), 
        popularity, downloads, ratings, availability platforms, and basic publisher details.
        It is designed for frontend applications to easily display complete 
        game information in listing and detail pages.
        `,
      code: `   fetch(${API_BASE_KEY}/games,{
            method:"GET",
            headers:{
                "X-API-KEY":"<YOUR-APIKEY>"
            },
        })
        `,
    },
    {
      id: 2,
      title: "Required Headers",
      description: `
        All requests must include an API key for authentication.
        You can generate your API key from the /apikey endpoint. 
        Once generated, include it in the request headers as x-api-key.`,
      code: `
        {
            method:"GET",
            headers:{
                "X-API-KEY":"<YOUR-APIKEY>"
            },
        `,
    },
  ],
  "quick-start": [
    {
      id: 1,
      title: "Get All Games",
      endPoint: "/games",
      description:
        "Fetch a list of all available games with basic details such as name, logo, category, and popularity.Fetch a list of all available games with basic details such as name, logo, category, and popularity.",
      code: `
            fetch(${API_BASE_KEY}/games,{
                method:"GET",
                headers:{
                    "X-API-KEY":"<YOUR-APIKEY>"
                },
            })
    `,
    },
    {
      id: 2,
      title: "Get Game by ID",
      endPoint: "/games/{id}",
      description:
        "Retrieve complete details of a single game using its unique ID.Opening a game details page Deep linking to a specific game",
      code: `
                fetch(${API_BASE_KEY}/games/{id},{
                method:"GET",
                headers:{
                    "X-API-KEY":"<YOUR-APIKEY>"
                },
            })
    `,
    },
    {
      id: 3,
      title: "Pagination",
      endPoint: "",
      description:
        "Paginate game results to improve performance and load data in chunks.Default page: 1,Used with /games",
      code: `
                fetch(${API_BASE_KEY}/games?page=1,{
                method:"GET",
                headers:{
                    "X-API-KEY":"<YOUR-APIKEY>"
                },
            })
    `,
    },
    {
      id: 4,
      title: "Search",
      endPoint: "",
      description:
        "Search games by name using a keyword.Case-insensitive search,Partial matches supported",
      code: `
            fetch(${API_BASE_KEY}/games?search=cricket,{
                method:"GET",
                headers:{
                    "X-API-KEY":"<YOUR-APIKEY>"
                },
            })
    `,
    },
  ],
  "api-format": [
    {
      id: 1,
      title: "All Games – Data Format",
      description: `This structure represents the response format when retrieving a list of games.
    It contains minimal game information optimized for listing pages.`,
      code: `[
    {
    "id":"number",
    "name":"string",
    "logo":"string",
    "description":"string",
    "developmentDetails":{
        "publishedAt":"date",
    },
    "gameDetails":{
        "type":"Indoor|Outdoor|Online",
        "downloads":"number",
        "popularity":"Extreme|High|Medium|Low",
        "ratings": "number"
      }
    }
  ]
    `,
    },
    {
      id: 2,
      title: "JSON Response Format",
      description: `Below is an example JSON response returned by the API.JSON for all games
    JSON for single game
    Clean, formatted, no explanation inside JSON`,
      code: `
    {
    "id":"number",
    "name":"string",
    "logo":"string",
    "description":"string",
    "developmentDetails":{
        "founder":"string",
        "publishedAt":"date",
        "madeIn":"string"
    },
    "gameDetails":{
        "type":"Indoor|Outdoor|Online",
        "downloads":"number",
        "isConductTournament":"bool",
        "availableOn":["PC","Mobile","PlayStation"],
        "popularity":"Extreme|High|Medium|Low",
        "ratings": "number"
    }
  }
    `,
    },
    {
      id: 3,
      description:
        "These TypeScript interfaces can be directly used in React applications.",
      title: "TypeScript Interfaces",
      code: `
    interface GameDevelopmentDetails{
        founder:string,
        published_at:Date
        made_in:string
    }
    
    interface GameDetails{
        type:Gametype
        downloads:number
        category:string
        is_conduct_tournament:boolean,
        availableOn:string[]
        popularity:string
        ratings: number
    }
    
    interface GameType{
        id:number
        name:string
        logo:string
        description:string
        development_details:GameDevelopmentDetails
        details:GameDetails
    }
    `,
    },
  ],
};
const CodeSection=({title,description,code}:{title:string,description:string,code:string})=>{
    const lines = useHighlightedCode(code.trim(), "ts");
      const [wrap, setWrap] = useState(false);
    return(
          <div className="flex flex-col gap-8">
            <div className="">
                <h1 className="font-semibold text-2xl pb-4">{title}</h1>
                <p className="text-sm font-normal leading-relaxed tracking-wide text-muted-foreground">{description}</p>
            </div>
            <div className="w-full max-w-md">
              <CodeBlock>
                <CodeBlockHeader>
                  <CodeBlockTitle>
                    <FileCodeIcon />
                    app/api/chat/route.ts
                  </CodeBlockTitle>
                  <CodeBlockActions>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Wrap lines"
                      aria-pressed={wrap}
                      className="aria-pressed:text-foreground"
                      onClick={() => setWrap(!wrap)}
                    >
                      <WrapTextIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Download"
                      onClick={() => download(code, "route.ts")}
                    >
                      <DownloadIcon />
                    </Button>
                    <CodeBlockCopyButton value={code} />
                  </CodeBlockActions>
                </CodeBlockHeader>
                <CodeBlockContent>
                  {lines.map((line, index) => (
                    <CodeBlockLine
                      key={index}
                      variant={
                        "default"
                      }
                    >
                      {line}
                    </CodeBlockLine>
                  ))}
                </CodeBlockContent>
              </CodeBlock>
            </div>
          </div>
    )
}

const Docs = () => {
  const pages = ["overview", "quick-start", "api-format"];
  const { page } = useParams();
  if (!pages.includes(page!)) return;
  const data = docs[page as "overview" | "quick-start" | "api-format"];
  return (
    <div className="space-y-8 py-10">
      {data.map((value: DocProps) => {
        return <CodeSection key={value.id} title={value.title} description={value.description} code={value.code}/>
      })}
    </div>
  );
};

export default Docs;

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// export function CodeBlockDemo() {
//   const [wrap, setWrap] = React.useState(false)
//   const lines = useHighlightedCode(code, "ts")

//   return (
//   )
// }
