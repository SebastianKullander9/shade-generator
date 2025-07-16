"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextType = {
    colors: string[];
    addColor: (color: string) => void;
    clearColors: () => void;
    setColor: (newColors: string[]) => void;
}

const colorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
    const [colors, setColors] = useState<string[]>([]);

    const addColor = (color: string) => {
        setColors((prev) => [...prev, color]);
    };

    const setColor = (newColors: string[]) => {
        setColors(newColors);
    };

    /*const removeColor = (hex: string) => {
        setColors((prev) => prev.filter((c) => c.originalHex !== hex));
    };*/

    const clearColors = () => setColors([]);

    return (
        <colorContext.Provider value={{ colors, addColor, clearColors, setColor }}>
            {children}
        </colorContext.Provider>
    );
};

export const useColorContext = () => {
    const context = useContext(colorContext);
    if (!context) throw new Error("useColorContext must be used within ColorProvider");
    return context;
}