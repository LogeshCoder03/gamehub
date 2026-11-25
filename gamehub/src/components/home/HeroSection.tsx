import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { animate, motion } from "motion/react";
import hero from "@/assests/hero.jpg";
import React, { useRef } from "react";

interface Props {
  onNavigate: (pathName: string) => void;
}

const HeroSection: React.FC<Props> = ({ onNavigate }) => {    
    const ref=useRef<HTMLDivElement>(null)
    const heroRef=useRef<HTMLDivElement>(null)
    const handleMouseEnter=(_:React.MouseEvent<HTMLElement>)=>{
        const el=ref.current
        const heroEl=heroRef.current
        if (!el||!heroEl) return;
        const rect=el.getBoundingClientRect()
        const heroRect=heroEl.getBoundingClientRect()        
        animate(ref.current,{
            x:(heroRect.width-rect.width)+20,
        },{
            duration:1
        })
    }    
    return (
        <div className=" flex">
        <div className="space-y-2 pt-18">
            <div className="inline-flex relative bg-accent rounded-2xl shadow-xs px-4 py-2 gap-2 items-center">
            <Sparkles size={16} />
            <span className="font-medium text-xs">
                Explore the world of gaming
            </span>
            </div>
            <div className="text-6xl font-medium tracking-tight leading-16 pb-3">
            <h1>Discover Games</h1>
            <h1>
                Explore Without{" "}
                <span className="text-muted-foreground">Limits</span>
            </h1>
            </div>
            <p className="max-w-xl font-normal text-muted-foreground text-sm leading-relaxed tracking-wide pb-4">
            Access structured data for thousands of online, indoor and outdoor
            games through a single fast and reliable,API built for developers
            worldwide.
            </p>
            <div className="space-x-4">
            <Button size="lg" onClick={() => onNavigate("/games")}>Explore Games</Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate("/docs/overview")}>
                Docs
            </Button>
            </div>
        </div>
        <div className="relative w-full max-w-xl mx-auto h-110" ref={heroRef}>
            <div className="absolute inset-8 overflow-hidden rounded-2xl">
            <img src={hero} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"/>
            </div>
            <div 
            ref={ref}
            onMouseEnter={handleMouseEnter}
            className="absolute bottom-2 left-0 w-48 p-3 rounded-xl bg-background/90 backdrop-blur-lg border shadow-xl hover:scale-105">
            <img
                src={hero}
                alt="Popular game"
                className="w-full h-24 object-cover rounded-lg "
            />
            <p className="mt-2 font-semibold text-sm">Popular Games</p>
            <p className="text-xs text-muted-foreground">
                Explore trending titles
            </p>
            </div>
            <motion.div
            animate={{
            rotate:[10,5,0,-5,-10]
            }}
            transition={{
            repeat:Infinity,
            duration:1,
            ease:"linear",
            repeatType:"reverse"
            }}
            className="absolute top-4 right-0 rounded-xl   border bg-background/90 backdrop-blur-lg
                    shadow-lg px-4 py-3"
            >
            <p className="text-xs text-muted-foreground">Discover worldwide</p>
            <p className="font-bold text-lg">10K+ Games</p>
            </motion.div>
        </div>
        </div>
    );
};

export default HeroSection;