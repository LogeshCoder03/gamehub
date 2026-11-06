export const useClipboard=async(text:string)=>{
    try {
        await navigator.clipboard.writeText(text)
        return "copied"
    } catch (error) {
        return error instanceof Error ? error.message :"Error occured"
    }
}