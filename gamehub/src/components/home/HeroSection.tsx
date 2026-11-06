import { Button } from "../ui/button";

interface Props{
    onNavigate:(pathName:string)=>void
}

const HeroSection:React.FC<Props> = ({onNavigate}) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-y-4">
      <div className="mt-10 flex font-semibold flex-col text-5xl md:text-8xl tracking-tight font-stretch-ultra-expanded items-center">
        <span className="">
          <h1>The Global</h1>
        </span>
        <div className="flex gap-4 md:gap-10">
          <h1>Game Data</h1>
          <div className="bg-linear-to-r from-pink-500 via-red-400 to-rose-600 text-transparent bg-clip-text">
            <h1>API</h1>
          </div>
        </div>
      </div>
      <p className="text-gray-600 font-normal leading-relaxed tracking-wide my-2 mx-4 md:mx-0">
        Access structured data for thousands of online, indoor and outdoor games
        through <br />a single fast and reliable,API built for developers
        worldwide.
      </p>
      <div className="flex gap-x-4 mb-10">
        <Button
          size="lg"
          className="cursor-pointer"
          onClick={() => onNavigate("/docs/overview")}
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="cursor-pointer"
          onClick={() => onNavigate("/games")}
        >
          Explore Games
        </Button>
      </div>
    </div>
  );
};


export default HeroSection;
