"use client";

import { useEffect } from 'react';
import convert from 'color-convert';
import namer from "color-namer";
import { useColorContext } from '../context/ColorContext';
import { useShadesContext } from '../context/ShadesContext';
import isEqual from 'lodash.isequal';
import { IoCopyOutline } from "react-icons/io5";

type ColorShades = {
    name: string;
    original_hex: string;
    shades: number[][];
}

export default function GenerateShades() {
    const { colors } = useColorContext();
    const { shades, setShades } = useShadesContext();

    useEffect(() => {
        const allShades: ColorShades[] = [];

        colors.map((color: string) => {
            const hsl = convert.hex.hsl(color);
            const hex = convert.hsl.hex();
            const numberOfShades = 10;
            const start = 10;
            const end = 90;
            const range = end - start;
            const increment = range / numberOfShades;
            const thisColorShades: number[][] = [];
            const names = namer(color);
            

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

        if (!isEqual(allShades, shades)) {
            setShades(allShades);
        }
    }, [colors, setShades])

    return (
        <div className="h-full flex flex-col justify-center items-center mx-auto">
            {shades?.map((shadeObj) => {
                return (
                    <div key={shadeObj.original_hex} className="flex justify-center mb-10">
                    {shadeObj.shades.map((hsl, i) => (
                        <div 
                            key={i}
                            className="relative group w-20 h-20 mb-8"
                            style={{backgroundColor: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}}
                        >
                            <button
                                onClick={() => navigator.clipboard.writeText(`#${convert.hsl.hex(hsl as [number, number, number])}`)}
                                className="absolute px-2 py-1 text-xs bg-white bg-opacity-80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                <IoCopyOutline />
                            </button>
                            <div className="flex justify-center">
                                <div className="flex justify-center relative bottom-8 bg-gray-50 text-text text-sm font-bold w-10 rounded">
                                    <p className="flex">{hsl[2]}%</p>
                                </div>
                            </div>
                            <div className="flex justify-center relative top-16 text-sm">
                                <p className="lowercase">{convert.hsl.hex(hsl as [number, number, number])}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                );
            })}
        </div>
    );
}
