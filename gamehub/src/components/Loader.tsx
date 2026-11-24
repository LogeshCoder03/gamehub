import { Spinner } from "./ui/spinner"

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-[85vh]">
            <Spinner className="size-20 text-cyan-500" />
        </div>
    )
}

export default Loader