"use client";

import { useEffect, useState } from 'react';
import convert from 'color-convert';

export default function GenerateShades() {
    //const [colorArray, setColorArray] = useState([])
    //const [shades, setShades] = useState<string[][]>([])

    useEffect(() => {
        const colors = JSON.parse(localStorage.getItem("array") ?? "[]");

        colors.map((color: string) => {
            const hsl = convert.hex.hsl(color);
            const numberOfShades = 10;
            const start = 10;
            const end = 90;
            const range = end - start;
            const increment = range / numberOfShades;
            const shades = [];

            for (let i = 1; i < numberOfShades + 1; i++) {
                const tempHsl = hsl.splice(2, 1, increment * i);

                shades.push(tempHsl);
            }

            console.log(shades);
        });
    }, [])

    return (
        <div>

        </div>
    );
}