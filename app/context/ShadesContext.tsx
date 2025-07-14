"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ShadeColor = {
    originalHex: string;
    name: string;
    shades: number[][];
}

type ShadeContextType = {
    shades: ShadeColor[];
    setShades: (colors: ShadeColor[]) => void;
    clearShades: () => void;
}

const codeContext = createContext<ShadeContextType | null>(null);

export const ShadesProvider = ({ children }: { children: ReactNode }) => {
    const [ shades, setShadesState ] = useState<ShadeColor[]>([]);

    const setShades = (colors: ShadeColor[]) => {
        setShadesState(colors);
    };

    const clearShades = () => {
        setShadesState([]);
    };

    return (
        <codeContext.Provider value={{ shades, setShades, clearShades }}>
            {children}
        </codeContext.Provider>
    );
};

export const useShadesContext = () => {
    const context = useContext(codeContext);
    if (!context) throw new Error("useCodeContext must be within CodeProvider");
    return context;
};
