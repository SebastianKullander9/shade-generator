"use client";
import { useState } from "react";
import Color from 'color';

export default function ColorInput() {
    const [color, setColor] = useState("");
    const [isValidColor, setIsValidColor] = useState(false);
    
    const colorRegex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rgb\(\s*(?:\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*\)$|^rgba\(\s*(?:\d{1,3}%?\s*,\s*){3}(?:0|1|0?\.\d+)\s*\)$|^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$|^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i;

    function validateInput(color: string) {
        return colorRegex.test(color)
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event?.preventDefault();
        setIsValidColor(validateInput(color));
        const formatColorTo = Color(color);

        if (isValidColor) {
            localStorage.setItem("color", JSON.stringify(formatColorTo.hsl()))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={color}
                    onChange={(e) => {
                        setColor(e.target.value);
                    }}
                    className="w-32 h-8 p-4 border rounded cursor-pointer"
                />
                <p className="text-xs text-red-500">{isValidColor ? "" : "The color needs to be in the format of HEX, RGB/RGBA or HSL/HSLA"}</p>
            </form>
            
        </div>
        
    );
}    