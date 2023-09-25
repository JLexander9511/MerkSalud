"use client";
import { useEffect, useState } from "react"

export const useScreenSize = () => {

    const [screenType, setScreenType] = useState('Desktop')

    useEffect(() => {
        if(window.matchMedia("(max-width: 767px)").matches){
            setScreenType('SmartPhone')
        } else if(window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches){
            setScreenType('Tab')
        } else if(window.matchMedia("(min-width: 1024px)").matches){
            setScreenType('Desktop')
        }
    }, [])
    
    return { screenType }
    
}