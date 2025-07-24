"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextType = {
    colors: string[];
    addColors: (colors: string[]) => void;
    clearColors: () => void;
    setColor: (newColors: string[]) => void;
}

const colorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
    const [colors, setColors] = useState<string[]>([]);

    const addColors = (colors: string[]) => {
        setColors(colors);
    };

    const setColor = (newColors: string[]) => {
        setColors(newColors);
    };

    const clearColors = () => setColors([]);

    return (
        <colorContext.Provider value={{ colors, addColors, clearColors, setColor }}>
            {children}
        </colorContext.Provider>
    );
};

export const useColorContext = () => {
    const context = useContext(colorContext);
    if (!context) throw new Error("useColorContext must be used within ColorProvider");
    return context;
}