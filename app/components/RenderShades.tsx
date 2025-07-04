"use client";
import { useEffect, useState } from "react";
import generateShades from "./GenerateShades";

export default function ColorInput() {
    const [shades, setShades] = useState<number[][]>([]);

    useEffect(() => {
        setShades(generateShades())
    }, [])

    return (
        <div className="flex justify-center">
            {shades.map((shadeHSL, index) => {
                return <div key={index} className="w-15 h-15" style={{backgroundColor: `hsl(${shadeHSL[0]}, ${shadeHSL[1]}%, ${shadeHSL[2]}%)`}}>

                </div>
            })}
        </div>
    );
}    