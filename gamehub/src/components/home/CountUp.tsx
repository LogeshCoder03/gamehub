import { useMotionValue, useTransform,motion, useInView, animate } from "motion/react"
import { useEffect, useRef } from "react"

const CountUp = ({target,className}:{target:number,className:string}) => {
    const count=useMotionValue(0)
    const transformedCount=useTransform(count,(input)=>{
        return Math.round(input)
    })
    const countRef=useRef(null);
    const isInView=useInView(countRef,{amount:0.9,once:true})
    useEffect(()=>{        
        if (isInView){
            const controls=animate(
                count,
                target,
                {
                    duration:2,
                    ease:"easeInOut",
                    stiffness:300,
                    damping:5
                }
            )
            return ()=> controls.stop()
        }
    },[isInView,target])
    return (
        <motion.span className={className} ref={countRef}>{transformedCount}</motion.span>
    )
}

export default CountUp