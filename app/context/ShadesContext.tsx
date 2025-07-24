"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ShadeColor = {
    original_hex: string;
    name: string;
    shades: number[][];
}

type ShadeContextType = {
    shades: ShadeColor[];
    setShades: (colors: ShadeColor[]) => void;
    clearShades: () => void;
}

const shadesContext = createContext<ShadeContextType | null>(null);

export const ShadesProvider = ({ children }: { children: ReactNode }) => {
    const [ shades, setShadesState ] = useState<ShadeColor[]>([]);

    const setShades = (colors: ShadeColor[]) => {
        setShadesState(colors);
    };

    const clearShades = () => {
        setShadesState([]);
    };

    return (
        <shadesContext.Provider value={{ shades, setShades, clearShades }}>
            {children}
        </shadesContext.Provider>
    );
};

export const useShadesContext = () => {
    const context = useContext(shadesContext);
    if (!context) throw new Error("useShadeContext must be within CodeProvider");
    return context;
};
