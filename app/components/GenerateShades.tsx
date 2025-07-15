"use client";

import { useEffect } from 'react';
import convert from 'color-convert';
import namer from "color-namer";
import { useColorContext } from '../context/ColorContext';
import { useShadesContext } from '../context/ShadesContext';

type ColorShades = {
    name: string;
    original_hex: string;
    shades: number[][];
}

export default function GenerateShades() {
    const { colors } = useColorContext();
    const { shades, setShades } = useShadesContext();

    useEffect(() => {
        //const colors = JSON.parse(localStorage.getItem("array") ?? "[]");
        const allShades: ColorShades[] = [];

        colors.map((color: string) => {
            const hsl = convert.hex.hsl(color);
            const numberOfShades = 10;
            const start = 10;
            const end = 90;
            const range = end - start;
            const increment = range / numberOfShades;
            const thisColorShades: number[][] = [];
            const names = namer(color[0]);
            

            for (let i = 1; i < numberOfShades + 1; i++) {
                const lightness = start + increment * i;
                const tempHsl = [...hsl.slice(0, 2), lightness];
                
                thisColorShades.push(tempHsl);
            }

            allShades.push({
                original_hex: color,
                name: names.basic[0].name,
                shades: thisColorShades
            })
        });

        setShades(allShades);
        console.log("SHADES: ", allShades)
    }, [colors])

    return (
        <div className="">
            {shades?.map((shadeObj) => {
                return (
                    <div key={shadeObj.original_hex} className="flex mb-10">
                    {shadeObj.shades.map((hsl, i) => (
                        <div 
                            key={i}
                            className="w-15 h-15"
                            style={{backgroundColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}}
                        >
                            <div className="flex justify-center">
                                <div className="flex justify-center relative bottom-7 bg-gray-400 w-10 rounded">
                                    <p className="flex">{hsl[2]}%</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                );
            })}
        </div>
    );
}
